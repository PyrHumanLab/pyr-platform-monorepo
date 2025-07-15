// /web/components/course/LO_Badge.tsx

import { Check, Circle } from 'lucide-react'; // Cool icons for visual feedback

interface LO_BadgeProps {
  index: number;
  title: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export default function LO_Badge({ index, title, isCompleted, isCurrent }: LO_BadgeProps) {
  // We'll change the styles based on the badge's state
  const containerClasses = `
    flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-300
    ${isCompleted ? 'bg-success/20 border-success' : 'bg-lab-blue border-gray-600'}
    ${isCurrent ? 'border-flame scale-110 shadow-lg' : ''}
  `;

  const iconClasses = `
    w-6 h-6 flex-shrink-0
    ${isCompleted ? 'text-success' : 'text-gray-400'}
    ${isCurrent ? 'text-flame' : ''}
  `;

  const textClasses = `
    font-medium
    ${isCompleted ? 'text-white' : 'text-text-muted'}
    ${isCurrent ? 'text-amber' : ''}
  `;

  return (
    <div className={containerClasses} title={title}>
      <div className={iconClasses}>
        {isCompleted ? <Check /> : <Circle />}
      </div>
      <p className={textClasses}>
        LO {index + 1}
      </p>
    </div>
  );
}