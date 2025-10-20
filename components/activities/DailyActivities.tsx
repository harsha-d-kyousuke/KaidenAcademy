import React from 'react';
import ParchmentCard from '../ui/ParchmentCard';
import AdventureButton from '../ui/AdventureButton';
import { PlayerStats } from '../../types';
import { BookOpen, Dumbbell, Coffee } from 'lucide-react';

interface DailyActivitiesProps {
  onActivityComplete: (rewards: Partial<PlayerStats>) => void;
}

const DailyActivities: React.FC<DailyActivitiesProps> = ({ onActivityComplete }) => {
  
  const handleActivity = (rewards: Partial<PlayerStats>) => {
    onActivityComplete(rewards);
  }

  return (
    <section>
      <h2 className="font-display text-4xl text-center mb-8 text-warm-gold font-bold">Daily Pursuits</h2>
      <ParchmentCard className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          
          {/* Study Session */}
          <div className="group flex flex-col items-center p-4 bg-parchment-dark rounded-xl border border-amber-glow/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-amber-glow/40 cursor-pointer" onClick={() => handleActivity({ intellect: 10, energy: -15, xp: 5 })}>
            <BookOpen className="w-12 h-12 text-magic-purple mb-3 transition-transform duration-300 group-hover:scale-110" />
            <h3 className="font-heading font-bold text-lg text-ink-dark">Deep Study Session</h3>
            <p className="font-body text-sm text-shadow-soft flex-grow my-2">Hit the books in the Grand Library. Great for your mind, but draining.</p>
            <AdventureButton>
              Begin (+10 INT, -15 ENE)
            </AdventureButton>
          </div>

          {/* Gym Workout */}
          <div className="group flex flex-col items-center p-4 bg-parchment-dark rounded-xl border border-amber-glow/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-amber-glow/40 cursor-pointer" onClick={() => handleActivity({ health: 5, energy: -20, xp: 5 })}>
            <Dumbbell className="w-12 h-12 text-health-red mb-3 transition-transform duration-300 group-hover:scale-110" />
            <h3 className="font-heading font-bold text-lg text-ink-dark">Gym Workout</h3>
            <p className="font-body text-sm text-shadow-soft flex-grow my-2">Train your body to fortify your mind. Increases resilience and long-term energy.</p>
            <AdventureButton>
              Train (+5 HP, -20 ENE)
            </AdventureButton>
          </div>
          
          {/* Cafe Hangout */}
          <div className="group flex flex-col items-center p-4 bg-parchment-dark rounded-xl border border-amber-glow/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-amber-glow/40 cursor-pointer" onClick={() => handleActivity({ social: 10, energy: 5, xp: 5 })}>
            <Coffee className="w-12 h-12 text-sky-blue mb-3 transition-transform duration-300 group-hover:scale-110" />
            <h3 className="font-heading font-bold text-lg text-ink-dark">Café Hangout</h3>
            <p className="font-body text-sm text-shadow-soft flex-grow my-2">Meet fellow adventurers at the 'Syntax & Tea' café. A great way to relax and connect.</p>
            <AdventureButton>
              Relax (+10 SOC, +5 ENE)
            </AdventureButton>
          </div>

        </div>
      </ParchmentCard>
    </section>
  );
};

export default DailyActivities;