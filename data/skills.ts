import { Skill } from '../types';
import { BookOpen, Zap, Heart, Users, BrainCircuit, Shield, MessageSquare, BarChart } from 'lucide-react';

export const skills: Skill[] = [
  // --- MIND / INTELLECT BRANCH ---
  {
    id: 'root_mind',
    name: 'Focused Mind',
    description: 'The foundation of all learning. Unlocks the path of intellect.',
    cost: 1,
    icon: BookOpen,
    dependencies: [],
    position: { x: 50, y: 10 },
    effect: { stat: 'intellect', value: 5 },
  },
  {
    id: 'xp_boost_1',
    name: 'Efficient Learner I',
    description: 'Absorb knowledge faster. Increases all XP gains by 10%.',
    cost: 2,
    icon: BarChart,
    dependencies: ['root_mind'],
    position: { x: 35, y: 30 },
    effect: { stat: 'xp_gain', value: 1.1 },
  },
  {
    id: 'energy_saver_1',
    name: 'Mental Fortitude I',
    description: 'Studying feels less draining. Reduces energy cost of coding challenges by 10%.',
    cost: 2,
    icon: BrainCircuit,
    dependencies: ['root_mind'],
    position: { x: 65, y: 30 },
    effect: { stat: 'energy_cost_reduction', value: 0.9 },
  },

  // --- BODY / HEALTH BRANCH ---
  {
    id: 'root_body',
    name: 'Healthy Body',
    description: 'A strong body supports a strong mind. Unlocks the path of vigor.',
    cost: 1,
    icon: Heart,
    dependencies: [],
    position: { x: 20, y: 50 },
    effect: { stat: 'health', value: 10 },
  },
  {
    id: 'resilience_1',
    name: 'Resilience I',
    description: 'Recover from setbacks faster. Reduces health loss from difficult challenges.',
    cost: 2,
    icon: Shield,
    dependencies: ['root_body'],
    position: { x: 20, y: 75 },
    effect: { stat: 'health', value: 0 }, // This would need to be a custom effect
  },

  // --- CHARISMA / SOCIAL BRANCH ---
  {
    id: 'root_social',
    name: 'Charismatic',
    description: 'You find it easier to connect with others. Unlocks the path of social connection.',
    cost: 1,
    icon: Users,
    dependencies: [],
    position: { x: 80, y: 50 },
    effect: { stat: 'social', value: 10 },
  },
  {
    id: 'networker_1',
    name: 'Networker I',
    description: 'Your social interactions are more rewarding. Gain more social points from hangouts.',
    cost: 2,
    icon: MessageSquare,
    dependencies: ['root_social'],
    position: { x: 80, y: 75 },
    effect: { stat: 'social', value: 0 }, // Another custom effect
  },
];
