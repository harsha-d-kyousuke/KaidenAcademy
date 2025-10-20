
import React from 'react';

interface ParchmentCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const ParchmentCard: React.FC<ParchmentCardProps> = ({ children, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative bg-gradient-to-br from-highlight-cream to-parchment-light shadow-parchment rounded-2xl border-2 border-amber-glow/30 ${className}`}
    >
      {/* Subtle paper texture overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-[0.03] rounded-2xl pointer-events-none"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ParchmentCard;
