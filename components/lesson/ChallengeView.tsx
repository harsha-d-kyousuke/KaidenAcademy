import React, { useState, useEffect, useMemo } from 'react';
import { CodingChallenge } from '../../types';
import AdventureButton from '../ui/AdventureButton';
import { CheckCircle, XCircle } from 'lucide-react';

interface ChallengeViewProps {
  challenge: CodingChallenge;
  onComplete: (challenge: CodingChallenge) => void;
  onNext: () => void;
}

const ChallengeView: React.FC<ChallengeViewProps> = ({ challenge, onComplete, onNext }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setIsCorrect(false);
  }, [challenge]);

  const { text: questionText, code: codeSnippet } = useMemo(() => {
    const parts = challenge.question.split('?');
    const text = parts[0] + (parts.length > 1 ? '?' : '');
    const codeMatch = text.match(/`([^`]+)`/);
    if (codeMatch) {
      return { text: text.replace(codeMatch[0], ''), code: codeMatch[1].trim() };
    }
    return { text, code: null };
  }, [challenge.question]);


  const handleSubmit = () => {
    if (selectedOption === null) return;

    const correct = selectedOption === challenge.correctIndex;
    setIsSubmitted(true);
    setIsCorrect(correct);

    if (correct) {
      onComplete(challenge);
    }
  };

  const getOptionClasses = (index: number) => {
    let classes = 'w-full text-left p-4 rounded-lg border-2 transition-all duration-200 font-body ';
    if (isSubmitted) {
      if (index === challenge.correctIndex) {
        return classes + 'bg-success-green/20 border-success-green text-ink-dark';
      }
      if (index === selectedOption && !isCorrect) {
        return classes + 'bg-health-red/20 border-health-red text-ink-dark';
      }
      return classes + 'bg-parchment-dark border-amber-glow/30 text-shadow-soft cursor-not-allowed';
    }
    
    if (selectedOption === index) {
      return classes + 'bg-amber-glow/30 border-amber-glow shadow-md';
    }
    
    return classes + 'bg-parchment-dark border-amber-glow/30 hover:border-amber-glow/70 hover:bg-amber-glow/10';
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div>
        <span className="font-body text-sm text-shadow-soft capitalize">{challenge.difficulty}</span>
        <h3 className="font-heading text-2xl font-bold border-b-2 border-amber-glow/30 pb-2 mb-4">{challenge.title}</h3>
      </div>
      <div className="prose prose-sm font-body text-ink-dark max-w-none mb-4">
        <p>{questionText}</p>
      </div>
      {codeSnippet && (
        <pre className="bg-parchment-dark p-3 rounded-md text-sm my-4 font-mono text-ink-dark/80 overflow-x-auto"><code>{codeSnippet}</code></pre>
      )}

      <div className="space-y-4 flex-grow overflow-y-auto pr-2">
        {challenge.options && challenge.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !isSubmitted && setSelectedOption(index)}
            disabled={isSubmitted}
            className={getOptionClasses(index)}
          >
            <pre className="font-mono whitespace-pre-wrap text-left">{option}</pre>
          </button>
        ))}
      </div>

      {isSubmitted && (
        <div className={`mt-4 p-4 rounded-lg border-2 animate-slide-in-up ${isCorrect ? 'bg-success-green/20 border-success-green' : 'bg-health-red/20 border-health-red'}`} style={{animationDuration: '0.3s'}}>
          <div className="flex items-center space-x-2">
            {isCorrect ? <CheckCircle className="text-success-green" /> : <XCircle className="text-health-red" />}
            <h4 className="font-heading font-bold">{isCorrect ? 'Correct!' : 'Not quite!'}</h4>
          </div>
          <p className="font-body text-sm mt-2 text-ink-dark/90">{challenge.explanation}</p>
        </div>
      )}
      
      <div className="mt-6 flex justify-end">
        {isSubmitted ? (
          <AdventureButton onClick={onNext} className={isCorrect ? 'bg-success-green border-green-700 shadow-adventure-press active:shadow-adventure-press-active' : ''}>Next Challenge</AdventureButton>
        ) : (
          <AdventureButton onClick={handleSubmit} disabled={selectedOption === null}>Check Answer</AdventureButton>
        )}
      </div>
    </div>
  );
};

export default ChallengeView;