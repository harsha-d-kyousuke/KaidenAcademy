import React from 'react';
import { Lesson } from '../../types';
import LessonNode from './LessonNode';
import ParchmentCard from '../ui/ParchmentCard';

// Helper component for the connector path between nodes
const PathSegment: React.FC<{ status: Lesson['status'] }> = ({ status }) => {
  // Base classes with transition for smooth status changes
  const baseClasses = 'h-1.5 w-16 rounded-full transition-all duration-700 ease-in-out flex-shrink-0';

  switch (status) {
    case 'complete':
      // A solid, bright path with a subtle pulsing glow
      return (
        <div 
          className={`${baseClasses} bg-gradient-to-r from-amber-glow to-warm-gold animate-pulse-subtle`} 
        />
      );
      
    case 'current':
      // An animated path with a more sophisticated shimmering light effect
      return (
        <div className={`${baseClasses} bg-amber-glow/30 relative overflow-hidden`}>
          <div className="absolute top-0 left-0 h-full w-1/2 animate-path-shimmer bg-gradient-to-r from-transparent via-highlight-cream/90 to-transparent">
          </div>
        </div>
      );

    case 'locked':
    default:
      // A faint, dashed path for locked sections
      return (
        <div 
          className={`${baseClasses} bg-repeat-x bg-center [background-image:repeating-linear-gradient(90deg,_#BFA08A,_#BFA08A_6px,_transparent_6px,_transparent_12px)]`} 
        />
      );
  }
};


const JourneyMap: React.FC<{ lessons: Lesson[], onNodeClick: (lesson: Lesson) => void }> = ({ lessons, onNodeClick }) => {
  return (
    <ParchmentCard className="p-8 overflow-hidden">
        {/* The container uses flexbox to align nodes and paths horizontally */}
        <div className="flex overflow-x-auto scrolling-touch pb-4 items-center -mx-2 px-2">
            {lessons.map((lesson, index) => (
                // Using Fragment to group each node with its subsequent path
                <React.Fragment key={lesson.id}>
                    <LessonNode lesson={lesson} onClick={() => onNodeClick(lesson)} />
                    {/* Render a path segment after each node except the last one */}
                    {index < lessons.length - 1 && (
                       <PathSegment status={lesson.status} />
                    )}
                </React.Fragment>
            ))}
        </div>
    </ParchmentCard>
  );
};

export default JourneyMap;
