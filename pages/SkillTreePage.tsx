import React from 'react';
import { Page, PlayerStats, Skill } from '../types';
import AdventureButton from '../components/ui/AdventureButton';
import ParchmentCard from '../components/ui/ParchmentCard';
import { ArrowLeft, Lock } from 'lucide-react';

interface SkillNodeProps {
  skill: Skill;
  isUnlocked: boolean;
  canUnlock: boolean;
  onClick: () => void;
}

const SkillNode: React.FC<SkillNodeProps> = ({ skill, isUnlocked, canUnlock, onClick }) => {
  const Icon = skill.icon;
  let stateClasses = '';
  let iconColor = 'text-shadow-soft';
  let animation = '';

  if (isUnlocked) {
    stateClasses = 'bg-gradient-to-br from-amber-glow to-warm-gold border-warm-gold shadow-lg shadow-amber-glow/30';
    iconColor = 'text-white';
  } else if (canUnlock) {
    stateClasses = 'bg-parchment-dark border-warm-gold cursor-pointer hover:bg-amber-glow/20';
    iconColor = 'text-warm-gold';
    animation = 'animate-pulse-gold';
  } else {
    stateClasses = 'bg-parchment-dark/50 border-shadow-soft/30 cursor-not-allowed';
  }

  return (
     <div className="relative group">
      <button
        onClick={onClick}
        disabled={!canUnlock || isUnlocked}
        className={`w-24 h-24 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${stateClasses} ${animation}`}
        style={{ position: 'absolute', left: `${skill.position.x}%`, top: `${skill.position.y}%`, transform: 'translate(-50%, -50%)' }}
      >
        <Icon size={40} className={`transition-colors ${iconColor}`} />
        {!isUnlocked && !canUnlock && <Lock size={20} className="absolute text-shadow-soft/50" />}
      </button>
      <div className="absolute left-full ml-14 top-1/2 -translate-y-1/2 w-64 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20"
        style={{ position: 'absolute', left: `${skill.position.x}%`, top: `${skill.position.y}%` }}
      >
        <div className="bg-parchment-light border-2 border-amber-glow rounded-lg p-3 shadow-xl">
          <h4 className="font-heading text-ink-dark font-bold border-b border-amber-glow/30 pb-1 mb-2 flex items-center">
            <Icon size={16} className="mr-2" />
            <span>{skill.name}</span>
          </h4>
          <p className="font-body text-sm text-shadow-soft mb-2">{skill.description}</p>
          <div className="font-body text-xs text-amber-glow font-semibold">Cost: {skill.cost} Skill Point(s)</div>
        </div>
      </div>
     </div>
  );
};


const SkillPath: React.FC<{ from: Skill; to: Skill; isUnlocked: boolean }> = ({ from, to, isUnlocked }) => {
    const x1 = from.position.x;
    const y1 = from.position.y;
    const x2 = to.position.x;
    const y2 = to.position.y;

    return (
        <line
            x1={`${x1}%`}
            y1={`${y1}%`}
            x2={`${x2}%`}
            y2={`${y2}%`}
            className={`transition-all duration-500 ${isUnlocked ? 'stroke-warm-gold' : 'stroke-shadow-soft/30'}`}
            strokeWidth="3"
        />
    );
};

interface SkillTreePageProps {
  stats: PlayerStats;
  skills: Skill[];
  unlockedSkills: Set<string>;
  onUnlockSkill: (skillId: string) => void;
  navigateTo: (page: Page) => void;
}

const SkillTreePage: React.FC<SkillTreePageProps> = ({ stats, skills, unlockedSkills, onUnlockSkill, navigateTo }) => {

  const canUnlock = (skill: Skill) => {
    if (unlockedSkills.has(skill.id)) return false;
    if (stats.skillPoints < skill.cost) return false;
    return skill.dependencies.every(depId => unlockedSkills.has(depId));
  };
  
  return (
    <div className="min-h-screen p-4 sm:p-8">
      <header className="flex items-center justify-between mb-8">
        <AdventureButton onClick={() => navigateTo('home')}>
          <ArrowLeft size={20} className="mr-2" />
          Back to Hub
        </AdventureButton>
        <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-magic-purple">
                Skill Tree
            </h1>
            <p className="font-heading font-bold text-lg text-shadow-soft">You have {stats.skillPoints} Skill Points</p>
        </div>
        <div style={{ width: '150px' }}></div>
      </header>
      <main>
        <ParchmentCard className="p-8">
          <div className="relative w-full h-[600px]">
             <svg width="100%" height="100%" className="absolute inset-0">
                {skills.map(skill => (
                    skill.dependencies.map(depId => {
                        const fromSkill = skills.find(s => s.id === depId);
                        if (!fromSkill) return null;
                        return <SkillPath key={`${depId}-${skill.id}`} from={fromSkill} to={skill} isUnlocked={unlockedSkills.has(skill.id)} />
                    })
                ))}
             </svg>
            {skills.map(skill => (
              <SkillNode
                key={skill.id}
                skill={skill}
                isUnlocked={unlockedSkills.has(skill.id)}
                canUnlock={canUnlock(skill)}
                onClick={() => onUnlockSkill(skill.id)}
              />
            ))}
          </div>
        </ParchmentCard>
      </main>
    </div>
  );
};

export default SkillTreePage;
