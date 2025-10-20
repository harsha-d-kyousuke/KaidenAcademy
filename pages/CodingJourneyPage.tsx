import React from 'react';
import { Lesson, Page, CodingChallenge } from '../types';
import JourneyMap from '../components/journey/JourneyMap';
import AdventureButton from '../components/ui/AdventureButton';
import { ArrowLeft } from 'lucide-react';
import { challenges } from '../data/challenges';

interface CodingJourneyPageProps {
  lessons: Lesson[];
  navigateTo: (page: Page, challenge?: CodingChallenge | null) => void;
}

const CodingJourneyPage: React.FC<CodingJourneyPageProps> = ({ lessons, navigateTo }) => {

  const handleNodeClick = (lesson: Lesson) => {
    if (lesson.status === 'locked') return;

    const targetChallenge = challenges.find(c => c.id === lesson.challengeId);
    
    if (targetChallenge) {
      navigateTo('lesson', targetChallenge);
    } else {
        // This might happen for social/project nodes without direct challenges yet.
        alert(`Content for '${lesson.name}' is coming soon!`);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <header className="flex items-center justify-between mb-8">
        <AdventureButton onClick={() => navigateTo('codingHome')}>
          <ArrowLeft size={20} className="mr-2" />
          Back to Hub
        </AdventureButton>
        <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-amber-glow">
              The Path of Code
            </h1>
            <p className="font-body text-shadow-soft">JavaScript Fundamentals</p>
        </div>
        <div style={{width: '150px'}}></div>
      </header>
      <main>
        <JourneyMap lessons={lessons} onNodeClick={handleNodeClick} />
      </main>
    </div>
  );
};

export default CodingJourneyPage;
