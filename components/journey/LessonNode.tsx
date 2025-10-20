import React, { useMemo } from 'react';
import { Lesson, LessonType } from '../../types';
import { Code, Coffee, Award, Lock, GitFork } from 'lucide-react';
import { challenges } from '../../data/challenges';

interface LessonNodeProps {
  lesson: Lesson;
  onClick: () => void;
}

const ICONS: Record<LessonType, React.ElementType> = {
  coding: Code,
  social: Coffee,
  milestone: Award,
  project: GitFork,
};

const LessonNode: React.FC<LessonNodeProps> = ({ lesson, onClick }) => {
  const IconComponent = ICONS[lesson.type];

  const prerequisiteText = useMemo(() => {
    if (lesson.status === 'locked' && lesson.unlocksOnChallengeId) {
      const prerequisiteChallenge = challenges.find(c => c.id === lesson.unlocksOnChallengeId);
      if (prerequisiteChallenge) {
        return `Complete '${prerequisiteChallenge.title}' to unlock.`;
      }
    }
    return 'Complete the previous lesson to unlock.';
  }, [lesson.status, lesson.unlocksOnChallengeId]);

  const getStatusClasses = () => {
    let base = 'w-24 h-24 rounded-full flex items-center justify-center text-4xl transition-all duration-500 ease-in-out transform group-hover:scale-110 ';
    
    switch (lesson.status) {
      case 'complete':
        return base + 'bg-gradient-to-br from-amber-glow to-warm-gold shadow-lg shadow-amber-glow/30 text-white cursor-pointer';
      case 'current':
        const typeColor = {
          coding: 'from-sunset-peach to-amber-glow shadow-sunset-peach/60',
          social: 'from-sky-blue to-blue-400 shadow-sky-blue/60',
          milestone: 'from-magic-purple to-purple-500 shadow-magic-purple/60',
          project: 'from-gray-400 to-gray-600 shadow-gray-500/60',
        }[lesson.type];
        return base + `bg-gradient-to-br ${typeColor} shadow-2xl animate-pulseGlow text-white cursor-pointer`;
      case 'locked':
        return base + 'bg-parchment-dark border-4 border-dashed border-shadow-soft/50 text-shadow-soft/60 cursor-not-allowed';
    }
  };
  
  const getIconColor = () => {
     switch (lesson.status) {
      case 'complete':
      case 'current':
        return 'white';
      case 'locked':
        return 'rgba(191, 160, 138, 0.6)'; // shadow-soft/60
    }
  }
  
  const getIconForType = () => {
       switch(lesson.type) {
           case 'coding': return <Code size={48} color={getIconColor()} />;
           case 'social': return <Coffee size={48} color={getIconColor()} />;
           case 'milestone': return <Award size={48} color={getIconColor()} />;
           case 'project': return <GitFork size={48} color={getIconColor()} />;
           default: return <Code size={48} color={getIconColor()} />;
       }
  }

  return (
    <div className="relative group flex-shrink-0 flex flex-col items-center z-10">
      <button onClick={onClick} disabled={lesson.status === 'locked'} className={getStatusClasses()} aria-label={`Lesson: ${lesson.name}`}>
        {lesson.status === 'locked' ? <Lock size={48} color={getIconColor()} /> : getIconForType() }
      </button>
      <div className="mt-4 text-center w-28">
        <h3 className={`font-heading font-semibold text-ink-dark transition-colors duration-300 ${lesson.status === 'locked' && 'opacity-60'}`}>{lesson.name}</h3>
      </div>
      
      <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
        <div className="bg-parchment-light border-2 border-amber-glow rounded-lg p-3 shadow-xl">
          <h4 className="font-heading text-ink-dark font-bold border-b border-amber-glow/30 pb-1 mb-2 flex items-center">
            {React.createElement(IconComponent, { size: 16, className: "mr-2 text-warm-gold" })}
            <span className="ml-2">{lesson.name}</span>
          </h4>
          <p className="font-body text-sm text-shadow-soft mb-2">{lesson.description}</p>
          {lesson.status === 'locked' && (
            <div className="flex items-center text-xs font-body text-health-red/80 mt-2 p-2 bg-health-red/10 rounded-md border border-health-red/20">
              <Lock size={14} className="mr-2 flex-shrink-0" />
              <span>{prerequisiteText}</span>
            </div>
          )}
        </div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-[8px] border-t-amber-glow"></div>
      </div>

    </div>
  );
};

export default React.memo(LessonNode);