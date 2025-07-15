// /web/components/course/LO_Path.tsx

import { LearningOutcome } from '@/types';
import LO_Badge from './LO_Badge';

interface LO_PathProps {
  learningOutcomes: LearningOutcome[];
  completedLOs: Set<string>;
  currentLOIndex: number;
}

export default function LO_Path({ learningOutcomes, completedLOs, currentLOIndex }: LO_PathProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-black/20 rounded-xl">
      <div className="flex items-center justify-center gap-4">
        {learningOutcomes.map((lo, index) => (
          <LO_Badge
            key={lo._id}
            index={index}
            title={lo.title}
            isCompleted={completedLOs.has(lo._id)}
            isCurrent={index === currentLOIndex}
          />
        ))}
      </div>
    </div>
  );
}