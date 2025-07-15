// /web/components/course/AITest.tsx

import { useState } from 'react';
import { BrainCircuit, Loader2 } from 'lucide-react';

interface AITestProps {
  // We'll define `assessment` more accurately later
  assessment: any;
  onComplete: () => void;
}

export default function AITest({ assessment, onComplete }: AITestProps) {
  const [submission, setSubmission] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submission.trim()) return;

    setIsLoading(true);
    setFeedback('');

    // --- AI LOGIC WILL GO HERE ---
    // In our next step, we will call a Server Action here.
    // For now, we'll just simulate a delay.
    await new Promise(resolve => setTimeout(resolve, 2000));
    setFeedback("This is where the AI's feedback on your submission will appear. We'll connect this in the next and final step of the vertical slice.");
    // --- END OF PLACEHOLDER ---

    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in-up">
      <div className="bg-lab-blue border-2 border-gray-700/80 rounded-2xl shadow-2xl max-w-2xl w-full p-8 mx-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-amber/20 p-3 rounded-full">
            <BrainCircuit className="w-6 h-6 text-amber" />
          </div>
          <h2 className="text-2xl font-bold text-white">Check for Understanding</h2>
        </div>
        
        <p className="text-text-secondary mb-6">{assessment?.question || "Loading question..."}</p>

        <form onSubmit={handleSubmit}>
          <textarea
            value={submission}
            onChange={(e) => setSubmission(e.target.value)}
            className="w-full h-48 p-4 rounded-lg bg-deep-blue border border-gray-600 focus:ring-2 focus:ring-flame focus:border-flame outline-none transition-colors text-text-primary"
            placeholder="Compose your thoughts here..."
            disabled={isLoading || !!feedback}
          />

          {!feedback && (
            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full px-10 py-3 rounded-full bg-gradient-flame text-white font-semibold shadow-lg hover:shadow-flame/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin mr-2" />
                  Evaluating...
                </span>
              ) : (
                "Submit for AI Feedback"
              )}
            </button>
          )}
        </form>

        {feedback && (
          <div className="mt-6 p-4 bg-green-900/50 border border-success rounded-lg animate-fade-in-up">
            <h3 className="font-bold text-success mb-2">Tutor Feedback:</h3>
            <p className="text-text-secondary">{feedback}</p>
            <button
              onClick={onComplete}
              className="mt-4 w-full px-10 py-2 rounded-full bg-success text-white font-semibold"
            >
              Chapter Complete!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}