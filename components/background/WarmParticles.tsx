
import React from 'react';

interface WarmParticlesProps {
  particleCount: number;
}

const WarmParticles: React.FC<WarmParticlesProps> = ({ particleCount }) => {
  const particles = Array.from({ length: particleCount }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 5 + 5}s`,
      animationDelay: `${Math.random() * 5}s`,
      transform: `scale(${Math.random() * 0.5 + 0.5})`,
    };
    return (
      <div
        key={i}
        className="absolute w-2 h-2 bg-amber-glow rounded-full opacity-0 animate-sparkle"
        style={style}
      />
    );
  });

  return (
    <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
      {particles}
    </div>
  );
};

export default WarmParticles;
