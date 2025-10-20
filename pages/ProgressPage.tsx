import React, { useState } from 'react';
import { Page, PlayerStatsHistory, PlayerStats } from '../types';
import AdventureButton from '../components/ui/AdventureButton';
import ParchmentCard from '../components/ui/ParchmentCard';
import { ArrowLeft, BrainCircuit, Heart, Users, Bolt } from 'lucide-react';

// FIX: Correct StatKey to only include chartable stats, resolving a type error.
type StatKey = keyof Omit<PlayerStats, 'xp' | 'level' | 'skillPoints'>;

const StatChart: React.FC<{ history: PlayerStatsHistory; stat: StatKey }> = ({ history, stat }) => {
  const data = history.map(h => ({ x: h.timestamp, y: h[stat] }));

  if (data.length < 2) {
    return <div className="h-64 flex items-center justify-center text-shadow-soft">Not enough data to display a chart. Complete some activities!</div>;
  }

  const width = 500;
  const height = 200;
  const padding = 40;

  const minX = data[0].x;
  const maxX = data[data.length - 1].x;
  const maxY = Math.max(...data.map(d => d.y), 100);

  const getX = (val: number) => padding + ((val - minX) / (maxX - minX)) * (width - 2 * padding);
  const getY = (val: number) => height - padding - (val / maxY) * (height - 2 * padding);

  const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.x)} ${getY(d.y)}`).join(' ');

  const statColors: Record<StatKey, string> = {
      intellect: 'stroke-magic-purple',
      energy: 'stroke-amber-glow',
      health: 'stroke-health-red',
      social: 'stroke-sky-blue'
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      {/* Y-Axis */}
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#BFA08A" strokeWidth="1" />
      <text x={padding - 10} y={padding} textAnchor="end" fill="#BFA08A" fontSize="10">{maxY}</text>
      <text x={padding - 10} y={height - padding} textAnchor="end" fill="#BFA08A" fontSize="10">0</text>
      
      {/* X-Axis */}
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#BFA08A" strokeWidth="1" />
      <text x={padding} y={height-padding + 15} textAnchor="start" fill="#BFA08A" fontSize="10">Start</text>
      <text x={width-padding} y={height-padding + 15} textAnchor="end" fill="#BFA08A" fontSize="10">Now</text>

      {/* Data Path */}
      <path d={path} fill="none" className={statColors[stat]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Data Points */}
      {data.map((d, i) => (
          <circle key={i} cx={getX(d.x)} cy={getY(d.y)} r="3" className={statColors[stat].replace('stroke', 'fill')} />
      ))}
    </svg>
  );
};


const ProgressPage: React.FC<{ statsHistory: PlayerStatsHistory; navigateTo: (page: Page) => void; }> = ({ statsHistory, navigateTo }) => {
    const [selectedStat, setSelectedStat] = useState<StatKey>('intellect');

    const statInfo = {
        intellect: { icon: BrainCircuit, color: 'text-magic-purple', name: 'Intellect' },
        health: { icon: Heart, color: 'text-health-red', name: 'Health' },
        energy: { icon: Bolt, color: 'text-amber-glow', name: 'Energy' },
        social: { icon: Users, color: 'text-sky-blue', name: 'Social' },
    };

    return (
        <div className="min-h-screen p-4 sm:p-8">
            <header className="flex items-center justify-between mb-8">
                <AdventureButton onClick={() => navigateTo('home')}>
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Hub
                </AdventureButton>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-forest-mist">
                    Progress Overview
                </h1>
                <div style={{ width: '150px' }}></div>
            </header>
            <main>
                <ParchmentCard className="p-8">
                    <div className="flex justify-center space-x-4 mb-8">
                        {(Object.keys(statInfo) as StatKey[]).map(statKey => {
                            const { icon: Icon, color, name } = statInfo[statKey];
                            const isActive = selectedStat === statKey;
                            return (
                                <button
                                    key={statKey}
                                    onClick={() => setSelectedStat(statKey)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-full font-heading font-semibold border-2 transition-all duration-200 ${
                                        isActive ? `${color.replace('text', 'bg')}/20 ${color.replace('text', 'border')}` : 'bg-parchment-dark border-transparent hover:bg-parchment-medium'
                                    }`}
                                >
                                    <Icon size={20} className={color} />
                                    <span>{name}</span>
                                </button>
                            )
                        })}
                    </div>

                    <div className="bg-parchment-dark/50 p-4 rounded-xl border border-amber-glow/20">
                         <h2 className="font-heading text-2xl font-bold text-center mb-4 text-ink-dark">{statInfo[selectedStat].name} Growth Over Time</h2>
                        <StatChart history={statsHistory} stat={selectedStat} />
                    </div>
                </ParchmentCard>
            </main>
        </div>
    );
};

export default ProgressPage;