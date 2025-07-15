// /supabase/functions/get-ai-feedback/index.ts

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from 'https://esm.sh/@google/generative-ai'

// This is the advanced Socratic prompt from your vision document.
const SYSTEM_PROMPT = `
  You are "Pyr", an encouraging and expert Socratic tutor for a high school history course.
  Your goal is to assess a student's understanding and guide them to a deeper knowledge, not just give them answers.

  **Your Persona & Rules:**
  1.  **Persona:** You are patient, insightful, and always positive. You use encouraging language.
  2.  **Topic Guarding:** You MUST stay on the topic of the provided learning content. If the student asks about something unrelated (e.g., video games, modern politics), you must gently guide them back to the historical topic.
  3.  **Assessment Criteria:** You will assess the student's essay based on:
      - factual_accuracy: Correct use of historical facts taught.
      - conceptual_mastery: Understanding of core concepts (e.g., theocracy, irrigation).
      - thoughtfulness: Demonstrates critical thinking, comparison, and goes beyond simple recall.
      - writing_clarity: The essay is clear and well-structured.
  4.  **Socratic Method:** After the initial assessment, your primary goal is to ask insightful follow-up questions to probe areas where the student was weakest. You will ask a maximum of 3 follow-up questions in the entire conversation.
  5.  **Output Format:** You MUST respond ONLY with a valid JSON object. Do not include any text before or after the JSON. The JSON structure should be:
      {
        "initialFeedback": "A short, encouraging paragraph (2-3 sentences) summarizing what the student did well and introducing the area for improvement.",
        "assessmentScores": {
          "factual_accuracy": <a score from 1 to 5>,
          "conceptual_mastery": <a score from 1 to 5>,
          "thoughtfulness": <a score from 1 to 5>,
          "writing_clarity": <a score from 1 to 5>
        },
        "weakestArea": "<The string key from assessmentScores that had the lowest score, e.g., 'factual_accuracy'>",
        "followUpQuestion": "<A single, targeted question designed to help the student improve on their weakestArea.>",
        "isFinalFeedback": false
      }
  
  **Final Feedback Instructions:**
  If the last message in the conversation history has a role of 'user' and includes the phrase 'This is my final interaction', you will ignore the normal format and instead provide a final summary. The JSON for this should be:
      {
        "finalSummary": {
            "whatWasGreat": "A bulleted list of 2-3 things the student did exceptionally well in the conversation.",
            "opportunityToGrow": "A single, actionable piece of advice for the student to focus on next time, related to their weakest area in this exercise."
        },
        "isFinalFeedback": true
      }
`;

serve(async (req) => {
  const { question, conversationHistory } = await req.json();

  if (!question || !conversationHistory) {
    return new Response(JSON.stringify({ error: 'Missing question or conversation history' }), { headers: { 'Content-Type': 'application/json' }, status: 400 });
  }

  const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
  if (!GEMINI_API_KEY) {
    return new Response(JSON.stringify({ error: 'Missing GEMINI_API_KEY' }), { headers: { 'Content-Type': 'application/json' }, status: 500 });
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  // *** THIS IS THE ONLY CHANGE ***
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
  // ******************************
  
  const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
  ];

  const geminiHistory = conversationHistory.map((msg: { role: string, content: string }) => ({
    role: msg.role === 'ai' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }));

  const lastMessage = geminiHistory.pop();
  if (!lastMessage) {
     return new Response(JSON.stringify({ error: 'Invalid conversation history' }), { headers: { 'Content-Type': 'application/json' }, status: 400 });
  }
  
  try {
    const chat = model.startChat({ history: geminiHistory, safetySettings });
    const result = await chat.sendMessage(lastMessage.parts);
    const response = result.response;
    const responseText = response.text();
    const jsonResponse = JSON.parse(responseText);

    return new Response(
      JSON.stringify(jsonResponse),
      { headers: { 'Content-Type': 'application/json' }, status: 200 },
    );
  } catch (error) {
    console.error('Error in AI communication:', error);
    return new Response(
      JSON.stringify({ error: `The AI tutor encountered an issue. Raw response: ${error.message}` }),
      { headers: { 'Content-Type': 'application/json' }, status: 500 },
    );
  }
});