// CACHE_BUSTER_1
'use client'

import { useState } from 'react';
import { BrainCircuit, Loader2, User, Sparkles } from 'lucide-react';
import { getAITutorResponse } from '@/app/actions';

// ... (the rest of the file is exactly the same as before) ...

interface Message {
  role: 'user' | 'ai';
  content: string | object;
}

interface AITestProps {
  assessment: { question: string };
  onComplete: () => void;
}

const MAX_INTERACTIONS = 3;

export default function AITest({ assessment, onComplete }: AITestProps) {
  const [submission, setSubmission] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
  const [interactionCount, setInteractionCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submission.trim() || isLoading) return;

    setIsLoading(true);
    setError('');

    const userMessageContent = interactionCount < MAX_INTERACTIONS - 1
        ? `Here is my response: "${submission}"`
        : `Here is my response: "${submission}". This is my final interaction.`;

    const newHistory: Message[] = [...conversationHistory, { role: 'user', content: userMessageContent }];
    
    setConversationHistory(newHistory);
    setSubmission('');

    const result = await getAITutorResponse(assessment.question, newHistory);
    
    setIsLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setConversationHistory(prev => [...prev, { role: 'ai', content: result }]);
      setInteractionCount(prev => prev + 1);
      if (result.isFinalFeedback) {
        setIsFinished(true);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-lab-blue border-2 border-gray-700/80 rounded-2xl shadow-2xl max-w-3xl w-full h-[90vh] flex flex-col p-6">
        <div className="flex-shrink-0 flex items-center gap-4 mb-4 pb-4 border-b border-gray-700">
          <div className="bg-amber/20 p-3 rounded-full">
            <BrainCircuit className="w-6 h-6 text-amber" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Check for Understanding</h2>
            <p className="text-sm text-text-secondary">{assessment?.question || "Loading question..."}</p>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {conversationHistory.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'ai' && <div className="bg-flame/20 p-2 rounded-full"><Sparkles className="w-5 h-5 text-flame" /></div>}
              <div className={`max-w-xl p-4 rounded-lg ${msg.role === 'user' ? 'bg-deep-blue text-text-primary' : 'bg-black/20 text-text-secondary'}`}>
                {typeof msg.content === 'string' ? <p>{msg.content.replace(/^here is my response: "/i, '').slice(0, -1)}</p> : <AIResponse response={msg.content} />}
              </div>
              {msg.role === 'user' && <div className="bg-blue-900/50 p-2 rounded-full"><User className="w-5 h-5 text-blue-300" /></div>}
            </div>
          ))}
          {isLoading && <div className="flex justify-center items-center gap-2 text-text-muted"><Loader2 className="w-5 h-5 animate-spin" /><span>Pyr is thinking...</span></div>}
          {error && <div className="p-4 bg-error/20 border border-error rounded-lg text-error">{error}</div>}
        </div>

        <div className="flex-shrink-0 pt-4 mt-4 border-t border-gray-700">
          {!isFinished ? (
            <form onSubmit={handleSubmit}>
              <textarea
                value={submission}
                onChange={(e) => setSubmission(e.target.value)}
                className="w-full h-24 p-4 rounded-lg bg-deep-blue border border-gray-600 focus:ring-2 focus:ring-flame focus:border-flame outline-none transition-colors text-text-primary"
                placeholder={interactionCount === 0 ? "Compose your initial thoughts here..." : "Respond to the tutor's question..."}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !submission.trim()}
                className="mt-4 w-full px-10 py-3 rounded-full bg-gradient-flame text-white font-semibold shadow-lg hover:shadow-flame/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Submitting..." : "Send Response"}
              </button>
            </form>
          ) : (
            <button onClick={onComplete} className="w-full px-10 py-3 rounded-full bg-success text-white font-semibold">
              Great Work! Chapter Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function AIResponse({ response }: { response: any }) {
  if (response.isFinalFeedback) {
    return (
      <div>
        <h4 className="font-bold text-white mb-2">Final Summary</h4>
        <div className="font-semibold text-success">What Went Well:</div>
        <p className="mb-2 whitespace-pre-wrap">{response.finalSummary.whatWasGreat}</p>
        <div className="font-semibold text-amber">Opportunity to Grow:</div>
        <p className="whitespace-pre-wrap">{response.finalSummary.opportunityToGrow}</p>
      </div>
    );
  }
  return (
    <div>
      <p className="mb-3 whitespace-pre-wrap">{response.initialFeedback}</p>
      <p className="p-3 bg-black/30 rounded-md font-medium text-text-primary">{response.followUpQuestion}</p>
    </div>
  )
}