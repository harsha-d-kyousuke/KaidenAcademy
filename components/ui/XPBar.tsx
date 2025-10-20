import React from 'react';

interface XPBarProps {
  current: number;
  max: number;
  level: number;
}

const XPBar: React.FC<XPBarProps> = ({ current, max, level }) => {
  const percentage = (current / max) * 100;

  return (
    <div className="w-full">
        <div className="flex justify-between items-center mb-1 font-body text-sm text-shadow-soft">
            <span>Level {level}</span>
            <span>{current} / {max} XP</span>
        </div>
      <div className="relative w-full h-6 bg-parchment-dark rounded-full border-2 border-amber-glow/50 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-glow to-achievement-gold rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        >
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-heading text-xs font-bold text-ink-dark drop-shadow-sm">
                Next Level: {max - current} XP away
            </span>
        </div>
      </div>
    </div>
  );
};

export default XPBar;
