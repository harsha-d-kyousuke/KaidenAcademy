import React from 'react';
import WarmParticles from '../components/background/WarmParticles';
import AdventureButton from '../components/ui/AdventureButton';

interface WelcomePageProps {
  onBegin: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onBegin }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#fffaf4] to-parchment-medium text-ink-dark font-body flex items-center justify-center text-center overflow-hidden">
      <WarmParticles particleCount={50} />
      <div className="relative z-10 p-8">
        <div 
          className="relative w-28 h-28 rounded-full bg-gradient-to-br from-magic-purple to-amber-glow shadow-2xl shadow-amber-glow/50 animate-float mx-auto mb-8 flex items-center justify-center"
          style={{ animationDelay: '0.5s' }}
        >
          <span className="text-6xl" role="img" aria-label="sparkle">✨</span>
        </div>
        <h1 
          className="font-display text-5xl md:text-7xl font-bold text-amber-glow tracking-wide animate-fade-in" 
          style={{ textShadow: '2px 2px 4px rgba(59, 44, 25, 0.2)', animationDelay: '1s' }}
        >
          Kaiden Academy
        </h1>
        <p 
          className="font-body text-lg text-shadow-soft mt-4 max-w-xl mx-auto animate-fade-in"
          style={{ animationDelay: '1.5s' }}
        >
          Welcome, adventurer. A journey of code, discovery, and personal growth awaits.
        </p>
        <div className="mt-12 animate-fade-in" style={{ animationDelay: '2s' }}>
          <AdventureButton onClick={onBegin} className="text-xl px-8 py-4">
            Begin Your Adventure
          </AdventureButton>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
