import { FitnessActivity } from '../types';

export const initialFitnessActivities: FitnessActivity[] = [
  {
    id: 1,
    name: "Morning Run",
    status: "current",
    type: "cardio",
    description: "Start the day with a refreshing run through the academy grounds. Tap quickly to keep your pace!",
    reward: { health: 5, energy: -10, xp: 10 },
    challengeConfig: {
      type: 'rapid-click',
      duration: 10,
      target: 40,
    }
  },
  {
    id: 2,
    name: "Core Plank Challenge",
    status: "locked",
    type: "strength",
    description: "Build foundational strength in the training yard. Hold the pose to complete the exercise.",
    reward: { health: 8, energy: -15, xp: 15 },
    unlocksOnActivityId: 1,
    challengeConfig: {
      type: 'timed-hold',
      duration: 8,
    }
  },
  {
    id: 3,
    name: "Meditation Practice",
    status: "locked",
    type: "flexibility",
    description: "Improve your focus and recover energy with a guided meditation session. Hold your breath and focus.",
    reward: { health: 3, energy: 10, xp: 10 },
    unlocksOnActivityId: 2,
    challengeConfig: {
      type: 'timed-hold',
      duration: 15,
    }
  },
  {
    id: 4,
    name: "Hill Sprints",
    status: "locked",
    type: "cardio",
    description: "Push your limits with intense hill sprints behind the main hall. It's a true test of endurance!",
    reward: { health: 10, energy: -25, xp: 25 },
    unlocksOnActivityId: 3,
    challengeConfig: {
      type: 'rapid-click',
      duration: 15,
      target: 65,
    }
  },
  {
    id: 5,
    name: "Advanced Weightlifting",
    status: "locked",
    type: "strength",
    description: "Take on advanced lifting techniques to truly test your power. Requires sustained effort.",
    reward: { health: 12, energy: -20, xp: 30 },
    unlocksOnActivityId: 4,
    challengeConfig: {
      type: 'timed-hold',
      duration: 12,
    }
  },
];