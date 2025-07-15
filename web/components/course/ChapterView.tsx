// /web/components/course/ChapterView.tsx

'use client';

import { useState, useEffect } from 'react';
import { SanityChapter } from '@/types';
import ReadingBlock from './ReadingBlock';
import VideoPlayer from './VideoPlayer';
import LO_Path from './LO_Path';
import { saveLOProgress } from '@/app/actions';

// *** IMPORT THE NEW COMPONENTS ***
import NotesPopup from './NotesPopup';
import AITest from './AITest';

interface ChapterViewProps {
  chapterData: SanityChapter;
  initialCompletedLOs: string[];
}

export default function ChapterView({ chapterData, initialCompletedLOs }: ChapterViewProps) {
  // --- STATE MANAGEMENT ---
  const [currentLOIndex, setCurrentLOIndex] = useState(0);
  const [currentCycleIndex, setCurrentCycleIndex] = useState(0);
  const [completedLOs, setCompletedLOs] = useState<Set<string>>(new Set(initialCompletedLOs));

  // --- NEW STATE FOR POPUPS & COMPLETION ---
  const [showNotes, setShowNotes] = useState(false);
  const [showAITest, setShowAITest] = useState(false);
  const [isChapterComplete, setIsChapterComplete] = useState(false);

  useEffect(() => {
    // Check if all LOs were already completed on initial load
    if (initialCompletedLOs.length === chapterData.learningOutcomes.length && chapterData.learningOutcomes.length > 0) {
      setIsChapterComplete(true);
      return;
    }

    const firstUncompletedIndex = chapterData.learningOutcomes.findIndex(
      (lo) => !initialCompletedLOs.includes(lo._id)
    );
    
    if (firstUncompletedIndex !== -1) {
      setCurrentLOIndex(firstUncompletedIndex);
    } else if (chapterData.learningOutcomes.length > 0) {
      setCurrentLOIndex(chapterData.learningOutcomes.length - 1);
    }
  }, [chapterData.learningOutcomes, initialCompletedLOs]);

  // --- DERIVED STATE ---
  const currentLO = chapterData.learningOutcomes[currentLOIndex];
  const currentCycle = currentLO?.learningCycles[currentCycleIndex];

  // --- HANDLER FUNCTIONS ---
  const handleNext = async () => {
    if (!currentLO) return;

    const isLastCycleInLO = currentCycleIndex === currentLO.learningCycles.length - 1;
    
    if (isLastCycleInLO) {
      // Mark the LO as complete if it isn't already
      if (!completedLOs.has(currentLO._id)) {
        await saveLOProgress(currentLO._id, chapterData._id);
        setCompletedLOs(new Set(completedLOs).add(currentLO._id));
      }
      
      const isLastLOInChapter = currentLOIndex === chapterData.learningOutcomes.length - 1;
      
      if (isLastLOInChapter) {
        // *** THIS IS THE NEW LOGIC ***
        // Instead of finishing, we start the popup sequence
        setShowNotes(true);
      } else {
        // Move to the next LO
        setCurrentLOIndex(prevIndex => prevIndex + 1);
        setCurrentCycleIndex(0);
      }
    } else {
      // Move to the next cycle within the same LO
      setCurrentCycleIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleNotesDismissed = () => {
    setShowNotes(false);
    // After notes are dismissed, show the AI test
    setShowAITest(true);
  };

  const handleTestCompleted = () => {
    setShowAITest(false);
    // After the test is "complete", show the final chapter screen
    setIsChapterComplete(true);
  };

  // --- RENDER LOGIC ---

  // Final Completion State
  if (isChapterComplete) {
    return (
      <div className="bg-deep-blue text-white min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
            <h2 className="text-5xl font-bold bg-gradient-flame bg-clip-text text-transparent mb-4">Chapter Complete! 🎉</h2>
            <p className="text-xl text-text-secondary">You have mastered "{chapterData.title}"</p>
            {/* TODO: Add a button to navigate to the next chapter or dashboard */}
        </div>
      </div>
    );
  }

  // Loading or Error State
  if (!currentLO || !currentCycle) {
    return (
      <div className="bg-deep-blue text-white min-h-screen flex items-center justify-center">
        <h2 className="text-3xl font-bold">Loading...</h2>
      </div>
    );
  }

  // Main Learning View
  return (
    <>
      <div className="bg-deep-blue text-text-primary min-h-screen flex flex-col p-4 sm:p-8">
        <header className="mb-8 max-w-4xl w-full mx-auto">
          <p className="text-sm font-bold text-flame">Chapter: {chapterData.title}</p>
          <h1 className="text-2xl sm:text-4xl font-bold mt-1">{currentLO.title}</h1>
        </header>

        <main className="flex-1">
          {currentCycle.type === 'read' && <ReadingBlock content={currentCycle.readContent} />}
          {currentCycle.type === 'video' && <VideoPlayer videoId={currentCycle.videoId} />}
        </main>

        <footer className="mt-8 flex flex-col items-center gap-8">
          <LO_Path 
            learningOutcomes={chapterData.learningOutcomes}
            completedLOs={completedLOs}
            currentLOIndex={currentLOIndex}
          />
          
          <button 
            onClick={handleNext} 
            className="px-10 py-3 rounded-full bg-gradient-flame text-white font-semibold shadow-lg hover:shadow-flame/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            Next Step
          </button>
        </footer>
      </div>

      {/* --- CONDITIONAL POPUPS --- */}
      {showNotes && (
        <NotesPopup 
          notesContent={chapterData.notes} 
          onConfirm={handleNotesDismissed} 
        />
      )}

      {showAITest && (
        <AITest
          assessment={chapterData.aiAssessment}
          onComplete={handleTestCompleted}
        />
      )}
    </>
  );
}