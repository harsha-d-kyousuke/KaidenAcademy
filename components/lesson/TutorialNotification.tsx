import React from 'react';
import { CodingChallenge } from '../../types';
import AdventureButton from '../ui/AdventureButton';

interface TutorialNotificationProps {
  challenge: CodingChallenge;
  onClose: () => void;
}

const TutorialNotification: React.FC<TutorialNotificationProps> = ({ challenge, onClose }) => {
  if (!challenge.tutorialStep) return null;

  return (
    <div className="border-t-2 border-amber-glow/30 p-6 bg-amber-glow/10 animate-fadeIn">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 pt-1">
            <span className="text-3xl animate-sparkle" style={{animationDuration: '4s'}} role="img" aria-label="sparkle">✨</span>
        </div>
        <div>
            <h4 className="font-heading font-bold text-lg text-warm-gold">A Message from Kaiden</h4>
            <p className="font-body text-ink-dark mt-1">
              {challenge.tutorialStep}
            </p>
        </div>
      </div>
       <div className="mt-4 flex justify-end">
          <AdventureButton onClick={onClose}>
            Continue Journey
          </AdventureButton>
        </div>
    </div>
  );
};

// Add fadeIn animation to tailwind config if it were a real project, for now we can use a simple style for it
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}
`;
document.head.appendChild(style);


export default TutorialNotification;
