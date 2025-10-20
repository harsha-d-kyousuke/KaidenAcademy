import React, { useMemo } from 'react';
import AdventureButton from '../ui/AdventureButton';
import { ArrowRight } from 'lucide-react';

interface TutorialOverlayProps {
    step: number;
    onNext: () => void;
    onComplete: () => void;
}

const tutorialSteps = [
    {
        title: "Welcome to Kaiden Academy!",
        text: "I'm Kaiden, your guide on this grand adventure of learning. Together, we'll unlock the magic of code and grow stronger every day. Ready to begin?",
        highlight: null,
        buttonText: "Let's Go!"
    },
    {
        title: "Your Adventurer's Log",
        text: "This is your dashboard. Keep an eye on your XP, Intellect, Energy, Health, and Social stats. They reflect your journey and growth.",
        highlight: { top: '220px', left: '50%', width: '90%', height: '220px', transform: 'translateX(-50%)' },
        buttonText: "Got It!"
    },
    {
        title: "Choose Your Path",
        text: "Every adventurer's journey is unique. Here you can choose to follow the 'Path of Code' or the 'Path of Vigor'. Let's start with coding.",
        highlight: { top: '500px', left: '50%', width: '90%', height: '300px', transform: 'translateX(-50%)' },
        buttonText: "Next Step"
    },
    {
        title: "Your Daily Pursuits",
        text: "Balance is key. Use your daily pursuits to study, train, or socialize. Each choice shapes your character and opens new possibilities.",
        highlight: { top: '850px', left: '50%', width: '90%', height: '250px', transform: 'translateX(-50%)' },
        buttonText: "Let's Finish!"
    },
];

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ step, onNext, onComplete }) => {
    const currentStep = tutorialSteps[step];

    if (!currentStep) {
        onComplete();
        return null;
    }

    const handleNext = () => {
        if (step === tutorialSteps.length - 1) {
            onComplete();
        } else {
            onNext();
        }
    };
    
    const highlightStyle = useMemo(() => {
        if (!currentStep.highlight) return {};
        return {
            ...currentStep.highlight,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)',
            borderRadius: '1.5rem',
            transition: 'all 0.5s ease-in-out',
        };
    }, [currentStep.highlight]);

    return (
        <div className="fixed inset-0 z-[200]">
            {/* Highlighter */}
            {currentStep.highlight && (
                <div
                    className="absolute pointer-events-none"
                    style={highlightStyle}
                ></div>
            )}

            {/* Dialog Box */}
            <div className="fixed bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 w-full max-w-md p-4 animate-slide-in-up">
                 <div className="bg-parchment-light p-6 rounded-2xl shadow-2xl border-2 border-warm-gold text-center relative">
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-5xl animate-float" role="img" aria-label="sparkle">✨</span>
                    <h2 className="font-display text-2xl font-bold text-warm-gold mt-6">{currentStep.title}</h2>
                    <p className="font-body text-ink-dark/90 my-4">{currentStep.text}</p>
                    <AdventureButton onClick={handleNext}>
                        {currentStep.buttonText} <ArrowRight size={18} className="ml-2" />
                    </AdventureButton>
                </div>
            </div>
        </div>
    );
};

export default TutorialOverlay;
