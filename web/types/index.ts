// /web/types/index.ts

export interface LearningCycle {
  _id: string;
  type: 'read' | 'video';
  cycleIndex: number;
  readContent?: any; // Using 'any' for now, will be Portable Text later
  audioUrl?: string;
  videoId?: string;
}

export interface LearningOutcome {
  _id: string;
  title: string;
  loIndex: number;
  learningCycles: LearningCycle[];
}

export interface SanityChapter {
  _id:string;
  title: string;
  learningOutcomes: LearningOutcome[];
  // --- ADDED/UPDATED FIELDS ---
  notes: any; // Or PortableTextBlock[] if you use Portable Text
  aiAssessment: {
    question: string;
  };
  // --------------------------
}

// This will represent a row in our user_progress table
export interface UserProgress {
  learning_outcome_id: string;
  completed_at: string;
}