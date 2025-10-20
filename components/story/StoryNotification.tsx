import React from 'react';
import { StoryEvent } from '../../types';
import ParchmentCard from '../ui/ParchmentCard';
import AdventureButton from '../ui/AdventureButton';

interface StoryNotificationProps {
  event: StoryEvent | null;
  onClose: () => void;
}

const StoryNotification: React.FC<StoryNotificationProps> = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] animate-fadeIn p-4">
      <ParchmentCard className="w-full max-w-lg p-8 text-center transform transition-all animate-slideIn">
        <div className="flex justify-center text-5xl mb-4">
          {event.icon}
        </div>
        <h2 className="font-display text-3xl font-bold text-warm-gold">{event.title}</h2>
        <p className="font-body text-ink-dark/90 mt-4 mb-8">
          {event.text}
        </p>
        <AdventureButton onClick={onClose}>
          Continue Your Journey
        </AdventureButton>
      </ParchmentCard>
    </div>
  );
};

// Add supporting animations to the document head
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}
@keyframes slideIn {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-slideIn {
  animation: slideIn 0.4s ease-out forwards;
}
`;
document.head.appendChild(style);

export default StoryNotification;
