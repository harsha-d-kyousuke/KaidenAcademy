import React from 'react';
import { FitnessActivity, Page } from '../types';
import AdventureButton from '../components/ui/AdventureButton';
import { ArrowLeft, Heart, Zap, Award, Dumbbell } from 'lucide-react';
import ParchmentCard from '../components/ui/ParchmentCard';

const ICONS: Record<FitnessActivity['type'], React.ElementType> = {
  cardio: Zap,
  strength: Dumbbell,
  flexibility: Heart,
};

const FitnessNode: React.FC<{ activity: FitnessActivity, onClick: () => void }> = ({ activity, onClick }) => {
  const IconComponent = ICONS[activity.type] || Award;
  const isDisabled = activity.status === 'locked';

  const getStatusClasses = () => {
    let base = 'w-24 h-24 rounded-full flex items-center justify-center text-4xl transition-all duration-500 ease-in-out transform group-hover:scale-110 ';
    
    switch (activity.status) {
      case 'complete':
        return base + 'bg-gradient-to-br from-success-green to-sage-green shadow-lg shadow-sage-green/30 text-white cursor-pointer';
      case 'current':
        return base + `bg-gradient-to-br from-fitness-blue to-sky-blue shadow-2xl shadow-sky-blue/60 animate-pulseGlow text-white cursor-pointer`;
      case 'locked':
        return base + 'bg-parchment-dark border-4 border-dashed border-shadow-soft/50 text-shadow-soft/60 cursor-not-allowed';
    }
  };

  return (
    <div className="relative group flex-shrink-0 flex flex-col items-center z-10">
      <button onClick={onClick} disabled={isDisabled} className={getStatusClasses()} aria-label={`Activity: ${activity.name}`}>
        <IconComponent size={48} color={isDisabled ? 'rgba(191, 160, 138, 0.6)' : 'white'} />
      </button>
      <div className="mt-4 text-center w-28">
        <h3 className={`font-heading font-semibold text-ink-dark transition-colors duration-300 ${isDisabled && 'opacity-60'}`}>{activity.name}</h3>
      </div>
      <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
        <div className="bg-parchment-light border-2 border-fitness-blue rounded-lg p-3 shadow-xl">
          <h4 className="font-heading text-ink-dark font-bold border-b border-fitness-blue/30 pb-1 mb-2 flex items-center">
             <IconComponent size={16} className="mr-2 text-fitness-blue" />
            {activity.name}
          </h4>
          <p className="font-body text-sm text-shadow-soft">{activity.description}</p>
        </div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-[8px] border-t-fitness-blue"></div>
      </div>
    </div>
  );
};

const PathSegment: React.FC<{ status: FitnessActivity['status'] }> = ({ status }) => {
  const baseClasses = 'h-1.5 w-16 rounded-full transition-all duration-700 ease-in-out flex-shrink-0';
  switch (status) {
    case 'complete':
      return <div className={`${baseClasses} bg-gradient-to-r from-success-green to-sage-green animate-pulse-subtle`} />;
    case 'current':
      return (
        <div className={`${baseClasses} bg-fitness-blue-light/30 relative overflow-hidden`}>
          <div className="absolute top-0 left-0 h-full w-1/2 animate-path-shimmer bg-gradient-to-r from-transparent via-highlight-cream/90 to-transparent"></div>
        </div>
      );
    case 'locked':
    default:
      return <div className={`${baseClasses} bg-repeat-x bg-center [background-image:repeating-linear-gradient(90deg,_#BFA08A,_#BFA08A_6px,_transparent_6px,_transparent_12px)]`} />;
  }
};

interface FitnessJourneyPageProps {
  activities: FitnessActivity[];
  navigateTo: (page: Page, activity?: FitnessActivity) => void;
}

const FitnessJourneyPage: React.FC<FitnessJourneyPageProps> = ({ activities, navigateTo }) => {
  
  const handleNodeClick = (activity: FitnessActivity) => {
    if (activity.status !== 'locked') {
      navigateTo('fitnessActivity', activity);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <header className="flex items-center justify-between mb-8">
        <AdventureButton onClick={() => navigateTo('home')}>
          <ArrowLeft size={20} className="mr-2" />
          Back to Hub
        </AdventureButton>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-fitness-blue">
          The Path of Vigor
        </h1>
        <div style={{width: '150px'}}></div>
      </header>
      <main>
        <ParchmentCard className="p-8 overflow-hidden">
            <div className="flex overflow-x-auto scrolling-touch pb-4 items-center -mx-2 px-2">
                {activities.map((activity, index) => (
                    <React.Fragment key={activity.id}>
                        <FitnessNode activity={activity} onClick={() => handleNodeClick(activity)} />
                        {index < activities.length - 1 && (
                           <PathSegment status={activity.status} />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </ParchmentCard>
      </main>
    </div>
  );
};

export default FitnessJourneyPage;