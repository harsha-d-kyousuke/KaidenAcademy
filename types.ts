import { ReactNode } from "react";

export type LessonStatus = 'complete' | 'current' | 'locked';
export type LessonType = 'coding' | 'social' | 'milestone' | 'project';

export interface Lesson {
  id: number;
  name: string;
  status: LessonStatus;
  type: LessonType;
  description: string;
  challengeId: string; // The challenge contained within this lesson
  unlocksOnChallengeId?: string; // The challenge from a PREVIOUS lesson that unlocks this one
}

export type FitnessActivityStatus = 'complete' | 'current' | 'locked';
export type FitnessActivityType = 'cardio' | 'strength' | 'flexibility';

export interface FitnessActivity {
  id: number;
  name: string;
  status: FitnessActivityStatus;
  type: FitnessActivityType;
  description: string;
  reward: Partial<PlayerStats>;
  unlocksOnActivityId?: number;
  challengeConfig: {
    type: 'rapid-click';
    duration: number; // in seconds
    target: number; // clicks needed to win
  } | {
    type: 'timed-hold';
    duration: number; // in seconds
  };
}

export interface PlayerStats {
  xp: number;
  level: number;
  skillPoints: number;
  intellect: number;
  energy: number;
  health: number;
  social: number;
}

export type PlayerStatsHistory = (PlayerStats & { timestamp: number })[];

export type ChallengeType = 'mcq' | 'code';
export type Language = 'javascript' | 'python' | 'java' | 'algo';

export interface CodingChallenge {
  id: string;
  challengeId: string; // To ensure consistency with lesson linking
  title: string;
  language: Language;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  question: string;
  reward: Partial<PlayerStats>;
  hint?: string;
  tutorialStep?: string;

  // Type-specific fields
  type: ChallengeType;
  options?: string[]; // For mcq
  correctIndex?: number; // For mcq
  explanation?: string; // For mcq

  starterCode?: string; // For code
  functionName?: string; // For code: the name of the function to call
  testCases?: { input: any[]; expected: any; description?: string }[]; // For code
}


export interface StoryEvent {
  id:string;
  title: string;
  text: string;
  icon: ReactNode;
  trigger: (stats: PlayerStats) => boolean;
  rewards?: Partial<PlayerStats>;
  isTriggered?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: React.ElementType;
  dependencies: string[];
  position: { x: number, y: number };
  effect: {
    stat: keyof PlayerStats | 'xp_gain' | 'energy_cost_reduction';
    value: number; // e.g., 1.1 for 10% boost, or 0.9 for 10% reduction
  };
}

export type Page = 'home' | 'codingHome' | 'coding' | 'fitness' | 'lesson' | 'fitnessActivity' | 'progress' | 'skillTree';
