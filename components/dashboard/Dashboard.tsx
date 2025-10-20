import React from 'react';
import ParchmentCard from '../ui/ParchmentCard';
import XPBar from '../ui/XPBar';
import { BrainCircuit, Bolt, Heart, Users, Star, Sparkles } from 'lucide-react';
import { PlayerStats, Page } from '../../types';

interface DashboardProps {
  stats: PlayerStats;
  navigateTo: (page: Page) => void;
}

const StatDisplay: React.FC<{ icon: React.ReactNode, value: number, label: string, color: string }> = ({ icon, value, label, color }) => (
    <div className={`flex items-center space-x-2 ${color}`} title={label}>
        {icon}
        <span className="font-heading font-bold">{value}</span>
    </div>
);


const Dashboard: React.FC<DashboardProps> = ({ stats, navigateTo }) => {
  return (
    <ParchmentCard className="p-6 space-y-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full border-2 border-warm-gold bg-parchment-dark flex items-center justify-center">
                    <Star className="text-achievement-gold" size={28} />
                </div>
                <div>
                    <p className="font-body text-sm text-shadow-soft">Adventurer</p>
                    <h2 className="font-heading text-2xl font-bold text-ink-dark -mt-1">Level {stats.level}</h2>
                </div>
            </div>
             <button
                onClick={() => navigateTo('skillTree')}
                className="flex items-center space-x-2 text-shadow-soft hover:text-ink-dark transition-colors duration-200 bg-parchment-dark p-3 rounded-full border-2 border-amber-glow/50 hover:border-amber-glow"
                title="Open Skill Tree"
            >
                <Sparkles size={24} className="text-magic-purple" />
                <span className="font-heading font-bold">{stats.skillPoints}</span>
                <span className="hidden sm:inline font-semibold">Skill Points</span>
            </button>
        </div>
        
        <XPBar current={stats.xp % 100} max={100} level={stats.level} />
        
        <div className="pt-4 flex flex-wrap justify-center sm:justify-between items-center gap-x-6 gap-y-4">
            <div className="flex items-center space-x-2 bg-parchment-dark p-3 rounded-full border-2 border-amber-glow/50">
                <div className="w-8 h-8 rounded-full bg-amber-glow flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                </div>
                <span className="font-heading font-bold text-ink-dark">5 Day Streak!</span>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-6">
                <StatDisplay icon={<BrainCircuit size={24} />} value={stats.intellect} label="Intellect" color="text-magic-purple" />
                <StatDisplay icon={<Bolt size={24} />} value={stats.energy} label="Energy" color="text-amber-glow" />
                <StatDisplay icon={<Heart size={24} />} value={stats.health} label="Health" color="text-health-red" />
                <StatDisplay icon={<Users size={24} />} value={stats.social} label="Social" color="text-sky-blue" />
            </div>
        </div>
    </ParchmentCard>
  );
};

export default Dashboard;