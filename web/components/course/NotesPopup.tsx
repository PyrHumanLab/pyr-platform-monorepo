// /web/components/course/NotesPopup.tsx
import { BookOpen } from 'lucide-react';

interface NotesPopupProps {
  // We'll define `notesContent` more accurately later, for now `any` is fine.
  notesContent: any;
  onConfirm: () => void;
}

export default function NotesPopup({ notesContent, onConfirm }: NotesPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in-up">
      <div className="bg-lab-blue border-2 border-gray-700/80 rounded-2xl shadow-2xl max-w-2xl w-full p-8 mx-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-flame/20 p-3 rounded-full">
            <BookOpen className="w-6 h-6 text-flame" />
          </div>
          <h2 className="text-2xl font-bold text-white">Synthesize Your Notes</h2>
        </div>
        <p className="text-text-secondary mb-6">
          Writing is thinking. Before you proceed, take a moment to copy these key points into a physical notebook. This act of transcription solidifies knowledge.
        </p>

        <div className="prose prose-invert prose-lg max-h-[50vh] overflow-y-auto p-4 bg-black/20 rounded-lg text-text-secondary">
          {/* This is a temporary display. We'll upgrade this later. */}
          <p>{notesContent}</p>
        </div>

        <button
          onClick={onConfirm}
          className="mt-8 w-full px-10 py-3 rounded-full bg-gradient-flame text-white font-semibold shadow-lg hover:shadow-flame/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
        >
          I've Written My Notes, Let's Continue
        </button>
      </div>
    </div>
  );
}