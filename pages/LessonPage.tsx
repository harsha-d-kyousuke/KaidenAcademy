import React, { useState, useEffect } from 'react';
import { CodingChallenge, Page } from '../types';
import ChallengeView from '../components/lesson/ChallengeView';
import CodeChallengeView from '../components/lesson/CodeChallengeView';
import AdventureButton from '../components/ui/AdventureButton';
import { ArrowLeft, PartyPopper } from 'lucide-react';
import ParchmentCard from '../components/ui/ParchmentCard';

// FIX: Define LessonPageProps interface to resolve TypeScript error.
interface LessonPageProps {
  challenge: CodingChallenge;
  onChallengeComplete: (challenge: CodingChallenge) => void;
  navigateTo: (page: Page) => void;
}

const ConfettiPiece: React.FC<{ style: React.CSSProperties }> = React.memo(({ style }) => (
    <div className="absolute top-0 w-2 h-4 rounded-full animate-confettiFall" style={style}></div>
));

const SessionCompleteScreen: React.FC<{ challenge: CodingChallenge, onContinue: () => void }> = ({ challenge, onContinue }) => {
  const rewards = challenge.reward;
  
  const confetti = React.useMemo(() => Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 2 + 3}s`,
      animationDelay: `${Math.random() * 2}s`,
      backgroundColor: ['#F2B661', '#D8A04F', '#9DC183', '#A3C7D6', '#9D7B9C'][Math.floor(Math.random() * 5)],
    },
  })), []);

  return (
    <div className="absolute inset-0 bg-parchment-light/80 backdrop-blur-sm z-20 flex items-center justify-center p-4 animate-fade-in">
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confetti.map(c => <ConfettiPiece key={c.id} style={c.style} />)}
      </div>
      <ParchmentCard className="relative w-full max-w-md p-8 text-center animate-slide-in-up">
        <PartyPopper size={64} className="mx-auto text-achievement-gold" />
        <h2 className="font-display text-4xl font-bold text-warm-gold mt-4">Lesson Complete!</h2>
        <p className="font-body text-ink-dark/80 mt-2 mb-6">You've mastered the '{challenge.title}' challenge!</p>
        <div className="space-y-2 text-left bg-parchment-dark p-4 rounded-lg border border-amber-glow/20">
            <h3 className="font-heading font-bold text-lg text-center mb-2">Rewards Earned</h3>
            {Object.entries(rewards).map(([stat, value]) => (
                <div key={stat} className="flex justify-between items-center font-body">
                    <span className="capitalize text-shadow-soft">{stat}:</span>
                    <span className={`font-bold ${value > 0 ? 'text-success-green' : 'text-health-red'}`}>
                        {value > 0 ? '+' : ''}{value}
                    </span>
                </div>
            ))}
        </div>
        <AdventureButton className="mt-8" onClick={onContinue}>
            Back to Journey Map
        </AdventureButton>
      </ParchmentCard>
    </div>
  );
}

const LessonPage: React.FC<LessonPageProps> = ({ challenge, onChallengeComplete, navigateTo }) => {
  const [currentChallenge, setCurrentChallenge] = useState(challenge);
  const [isLessonFinished, setIsLessonFinished] = useState(false);

  useEffect(() => {
    setCurrentChallenge(challenge);
    setIsLessonFinished(false);
  }, [challenge]);

  const handleComplete = (completedChallenge: CodingChallenge) => {
    onChallengeComplete(completedChallenge);
  };

  const handleNext = () => {
    setIsLessonFinished(true);
  };

  if (!currentChallenge) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading challenge...</p>
      </div>
    );
  }
  
  const challengeTypeTitle = currentChallenge.type === 'code' ? 'Coding Challenge' : 'Knowledge Check';

  const renderChallenge = () => {
    switch (currentChallenge.type) {
      case 'code':
        return (
          <CodeChallengeView
            key={currentChallenge.id}
            challenge={currentChallenge}
            onComplete={handleComplete}
            onNext={handleNext}
          />
        );
      case 'mcq':
      default:
        return (
           <ParchmentCard className="w-full max-w-3xl h-full min-h-[500px]">
              <ChallengeView
                key={currentChallenge.id}
                challenge={currentChallenge}
                onComplete={handleComplete}
                onNext={handleNext}
              />
          </ParchmentCard>
        );
    }
  }

  return (
    <div className="relative min-h-screen p-4 sm:p-8 flex flex-col items-center">
       <header className="flex items-center justify-between mb-6 w-full max-w-7xl">
        <AdventureButton onClick={() => navigateTo('coding')}>
          <ArrowLeft size={20} className="mr-2" />
          End Session
        </AdventureButton>
        <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-warm-gold">{currentChallenge.title}</h1>
            <p className="font-body text-shadow-soft">{challengeTypeTitle}</p>
        </div>
        <div className="w-36"></div> {/* Spacer */}
      </header>

      <main className="flex-grow flex items-center justify-center w-full">
        {renderChallenge()}
      </main>

       {isLessonFinished && (
         <SessionCompleteScreen 
            challenge={currentChallenge} 
            onContinue={() => navigateTo('coding')} 
        />
       )}
    </div>
  );
};

export default React.memo(LessonPage);