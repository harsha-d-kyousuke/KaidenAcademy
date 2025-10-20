import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FitnessActivity, Page } from '../types';
import AdventureButton from '../components/ui/AdventureButton';
import ParchmentCard from '../components/ui/ParchmentCard';
import { ArrowLeft, PartyPopper, Zap, Pointer } from 'lucide-react';

const RapidClickChallenge: React.FC<{
  duration: number;
  target: number;
  onFinish: (success: boolean) => void;
}> = ({ duration, target, onFinish }) => {
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      onFinish(clicks >= target);
    }
    return () => clearTimeout(timer);
  }, [isActive, timeLeft, clicks, target, onFinish]);

  const handleStart = () => {
    setIsActive(true);
    setClicks(0);
    setTimeLeft(duration);
  };

  const handleClick = () => {
    if (isActive) {
      setClicks(c => c + 1);
    }
  };
  
  const progress = (clicks / target) * 100;

  if (!isActive && timeLeft === duration) {
    return (
        <div className="text-center">
            <h3 className="font-heading text-2xl mb-4">Ready to Go?</h3>
            <p className="font-body mb-6">Click the button as fast as you can to reach the target of {target} clicks in {duration} seconds!</p>
            <AdventureButton onClick={handleStart}>Start Challenge</AdventureButton>
        </div>
    );
  }

  return (
    <div className="text-center">
        <div className="font-display text-4xl mb-4">{timeLeft}s</div>
        <p className="font-body text-lg mb-4">Clicks: {clicks} / {target}</p>
        <div className="w-full h-8 bg-parchment-dark rounded-full border-2 border-amber-glow/50 mb-6 overflow-hidden">
             <div className="h-full bg-gradient-to-r from-health-red to-sunset-peach rounded-full transition-all duration-100" style={{ width: `${Math.min(progress, 100)}%` }}></div>
        </div>
        <button 
            onClick={handleClick} 
            disabled={!isActive}
            className="w-48 h-48 bg-fitness-blue rounded-full text-white font-heading text-2xl shadow-lg active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <div className="flex flex-col items-center">
             <Zap size={48} />
             <span>Click!</span>
          </div>
        </button>
    </div>
  );
};

const TimedHoldChallenge: React.FC<{
  duration: number;
  onFinish: (success: boolean) => void;
}> = ({ duration, onFinish }) => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startHold = useCallback(() => {
    if (isHolding) return;
    setStartTime(Date.now());
    setIsHolding(true);
  }, [isHolding]);

  const endHold = useCallback(() => {
    if (!isHolding) return;
    setIsHolding(false);
    if(intervalRef.current) clearInterval(intervalRef.current);
    
    const heldTime = startTime ? (Date.now() - startTime) / 1000 : 0;
    
    if (heldTime < duration) {
        // Only call finish if it's a failure. Success is handled in the effect.
        onFinish(false);
    }
    // Reset progress
    setProgress(0);
    setStartTime(null);
  }, [isHolding, startTime, duration, onFinish]);

  useEffect(() => {
    if (isHolding) {
      intervalRef.current = setInterval(() => {
        if (startTime) {
          const elapsed = (Date.now() - startTime) / 1000;
          const currentProgress = (elapsed / duration) * 100;
          setProgress(Math.min(currentProgress, 100));
          if (elapsed >= duration) {
            if(intervalRef.current) clearInterval(intervalRef.current);
            onFinish(true);
            setIsHolding(false);
          }
        }
      }, 50);
    }
    return () => {
      if(intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHolding, startTime, duration, onFinish]);

  
  if (progress === 0 && !isHolding) {
       return (
        <div className="text-center">
            <h3 className="font-heading text-2xl mb-4">Ready to Hold?</h3>
            <p className="font-body mb-6">Press and hold the button for {duration} seconds. Letting go too early will reset the timer!</p>
             <button
                onMouseDown={startHold}
                onMouseUp={endHold}
                onTouchStart={(e) => { e.preventDefault(); startHold(); }}
                onTouchEnd={(e) => { e.preventDefault(); endHold(); }}
                className="w-48 h-48 bg-fitness-blue rounded-full text-white font-heading text-2xl shadow-lg active:scale-95 transition-transform flex items-center justify-center"
            >
              <div className="flex flex-col items-center">
                 <Pointer size={48} />
                 <span>Hold</span>
              </div>
            </button>
        </div>
    );
  }

  return (
    <div className="text-center">
      <div className="font-display text-4xl mb-4">{(Math.max(0, duration - (progress / 100 * duration))).toFixed(1)}s</div>
      <p className="font-body text-lg mb-4">Hold Steady!</p>
      <div className="w-full h-8 bg-parchment-dark rounded-full border-2 border-amber-glow/50 mb-6 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-sage-green to-success-green rounded-full transition-all" style={{ width: `${progress}%` }}></div>
      </div>
      <button
        onMouseUp={endHold}
        onTouchEnd={(e) => { e.preventDefault(); endHold(); }}
        className="w-48 h-48 bg-fitness-blue-light rounded-full text-white font-heading text-2xl shadow-lg flex items-center justify-center"
      >
        <div className="flex flex-col items-center">
           <Pointer size={48} />
           <span>Holding...</span>
        </div>
      </button>
    </div>
  );
};


const ActivityCompleteScreen: React.FC<{ activity: FitnessActivity, onContinue: () => void }> = ({ activity, onContinue }) => {
  const rewards = activity.reward;
  
  return (
    <div className="absolute inset-0 bg-parchment-light/80 backdrop-blur-sm z-20 flex items-center justify-center p-4 animate-fade-in">
      <ParchmentCard className="relative w-full max-w-md p-8 text-center animate-slide-in-up">
        <PartyPopper size={64} className="mx-auto text-achievement-gold" />
        <h2 className="font-display text-4xl font-bold text-warm-gold mt-4">Activity Complete!</h2>
        <p className="font-body text-ink-dark/80 mt-2 mb-6">Great work! You feel stronger already.</p>
        <div className="space-y-2 text-left bg-parchment-dark p-4 rounded-lg border border-amber-glow/20">
            <h3 className="font-heading font-bold text-lg text-center mb-2">Rewards</h3>
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
            Continue Your Journey
        </AdventureButton>
      </ParchmentCard>
    </div>
  );
};


interface FitnessActivityPageProps {
  activity: FitnessActivity;
  onComplete: (activity: FitnessActivity) => void;
  navigateTo: (page: Page) => void;
}

const FitnessActivityPage: React.FC<FitnessActivityPageProps> = ({ activity, onComplete, navigateTo }) => {
  const [status, setStatus] = React.useState<'idle' | 'active' | 'finished'>('idle');
  const [success, setSuccess] = React.useState(false);
  
  // Reset state when activity changes
  React.useEffect(() => {
    setStatus('idle');
    setSuccess(false);
  }, [activity]);

  const handleFinish = useCallback((isSuccess: boolean) => {
    setStatus('finished');
    if (isSuccess) {
      setSuccess(true);
      onComplete(activity);
    } else {
      setSuccess(false);
    }
  }, [activity, onComplete]);

  const renderChallenge = () => {
    switch (activity.challengeConfig.type) {
      case 'rapid-click':
        return <RapidClickChallenge {...activity.challengeConfig} onFinish={handleFinish} />;
      case 'timed-hold':
        return <TimedHoldChallenge {...activity.challengeConfig} onFinish={handleFinish} />;
      default:
        return <p>Unknown challenge type!</p>;
    }
  };
  
   const handleContinue = () => {
    navigateTo('fitness');
  };

  return (
    <div className="relative min-h-screen p-4 sm:p-8 flex flex-col items-center">
       <header className="flex items-center justify-between mb-6 w-full max-w-4xl">
        <AdventureButton onClick={() => navigateTo('fitness')}>
          <ArrowLeft size={20} className="mr-2" />
          End Session
        </AdventureButton>
        <h1 className="font-display text-2xl text-center font-bold text-fitness-blue">{activity.name}</h1>
        <div className="w-36"></div> {/* Spacer */}
      </header>
      
      <main className="flex-grow flex items-center justify-center w-full">
         <ParchmentCard className="p-8 w-full max-w-2xl">
            {status === 'idle' && (
                <div className="text-center">
                    <h2 className="font-heading text-3xl mb-4">{activity.name}</h2>
                    <p className="font-body text-lg text-shadow-soft mb-8">{activity.description}</p>
                    <AdventureButton onClick={() => setStatus('active')}>Begin Activity</AdventureButton>
                </div>
            )}
            {status === 'active' && renderChallenge()}
            {status === 'finished' && !success && (
                <div className="text-center">
                    <h2 className="font-heading text-3xl mb-4 text-health-red">Try Again!</h2>
                    <p className="font-body text-lg text-shadow-soft mb-8">You didn't quite make it. Give it another shot!</p>
                    <AdventureButton onClick={() => setStatus('active')}>Retry Activity</AdventureButton>
                </div>
            )}
         </ParchmentCard>
      </main>
      
      {status === 'finished' && success && (
        <ActivityCompleteScreen activity={activity} onContinue={handleContinue} />
      )}
    </div>
  );
};

export default FitnessActivityPage;
