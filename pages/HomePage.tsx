import React from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import DailyActivities from '../components/activities/DailyActivities';
import ParchmentCard from '../components/ui/ParchmentCard';
import { PlayerStats, Page, CodingChallenge, FitnessActivity } from '../types';
import { ArrowRight, BookHeart, Dumbbell, TrendingUp, GitBranch } from 'lucide-react';

interface HomePageProps {
  stats: PlayerStats;
  navigateTo: (page: Page, data?: CodingChallenge | FitnessActivity | null) => void;
  onActivityComplete: (rewards: Partial<PlayerStats>) => void;
}

const JourneyCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}> = ({ title, description, icon, onClick, className = '' }) => (
  <ParchmentCard 
    className={`p-6 text-center flex flex-col items-center justify-between group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${className}`}
    onClick={onClick}
  >
    <div className="w-24 h-24 rounded-full bg-parchment-dark flex items-center justify-center mb-4 border-4 border-amber-glow/30 transition-all duration-300 group-hover:border-amber-glow">
      {icon}
    </div>
    <h3 className="font-display text-3xl font-bold text-ink-dark">{title}</h3>
    <p className="font-body text-shadow-soft my-3 flex-grow">{description}</p>
    <div className="flex items-center font-heading font-semibold text-warm-gold group-hover:text-quest-active transition-colors">
      <span>Explore</span>
      <ArrowRight size={20} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
    </div>
  </ParchmentCard>
);

const HomePage: React.FC<HomePageProps> = ({ stats, navigateTo, onActivityComplete }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="text-center py-12 px-4 animate-slide-in-up" style={{animationDuration: '0.5s'}}>
        <h1 className="font-display text-5xl md:text-7xl font-bold text-amber-glow tracking-wide" style={{ textShadow: '2px 2px 4px rgba(59, 44, 25, 0.2)' }}>
          Kaiden Academy
        </h1>
        <p className="font-body text-lg text-shadow-soft mt-2">Your adventure begins here!</p>
      </header>
      
      <main className="container mx-auto px-4 pb-20 space-y-16 flex-grow">
        <Dashboard stats={stats} navigateTo={navigateTo} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           <JourneyCard
            title="Coding Journey"
            description="Master the arcane arts of programming, from simple spells to powerful algorithms."
            icon={<BookHeart className="w-12 h-12 text-warm-gold transition-transform duration-300 group-hover:scale-110" />}
            onClick={() => navigateTo('codingHome')}
            className="md:col-span-1 bg-gradient-to-br from-highlight-cream to-parchment-medium"
          />
          <JourneyCard
            title="Fitness Journey"
            description="Train your body to fortify your mind. A strong adventurer needs both intellect and resilience."
            icon={<Dumbbell className="w-12 h-12 text-health-red transition-transform duration-300 group-hover:scale-110" />}
            onClick={() => navigateTo('fitness')}
             className="md:col-span-1 bg-gradient-to-br from-highlight-cream to-parchment-medium"
          />
           <JourneyCard
            title="Skill Tree"
            description="Spend your Skill Points to unlock powerful new abilities and passive bonuses."
            icon={<GitBranch className="w-12 h-12 text-magic-purple transition-transform duration-300 group-hover:scale-110" />}
            onClick={() => navigateTo('skillTree')}
             className="md:col-span-1 bg-gradient-to-br from-highlight-cream to-parchment-medium"
          />
          <JourneyCard
            title="Progress Overview"
            description="Review your growth, track your skills, and see how far you've come on your journey."
            icon={<TrendingUp className="w-12 h-12 text-forest-mist transition-transform duration-300 group-hover:scale-110" />}
            onClick={() => navigateTo('progress')}
             className="md:col-span-1 bg-gradient-to-br from-highlight-cream to-parchment-medium"
          />
        </div>

        <DailyActivities onActivityComplete={onActivityComplete} />
      </main>
    </div>
  );
};

export default HomePage;