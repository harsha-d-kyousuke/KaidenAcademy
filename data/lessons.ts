import { Lesson } from '../types';

// The progression is now explicitly chained. A lesson is unlocked by completing the challenge of the *previous* lesson.
export const initialLessons: Lesson[] = [
  // Tier 1: Fundamentals (MCQ)
  { id: 1, name: "Variables Valley", status: "current", type: 'coding', 
    description: "Learn the fundamentals of storing information with variables.",
    challengeId: "js_vars_01"
  },
  { id: 2, name: "Loop Lagoon", status: "locked", type: 'coding', 
    unlocksOnChallengeId: "js_vars_01",
    challengeId: "js_loops_01",
    description: "Master the art of repetition to automate tasks with loops." 
  },
  
  // Tier 2: First Interactive Code
  { id: 3, name: "The Adder's Lair", status: "locked", type: 'coding', 
    unlocksOnChallengeId: "js_loops_01",
    challengeId: "js_code_01_sum",
    description: "Write your first function. Task: Sum two numbers." 
  },
  
  // Tier 3: LeetCode-style Algorithm Challenges
  { id: 4, name: "The Tallest Mountain", status: "locked", type: 'coding', 
    unlocksOnChallengeId: "js_code_01_sum",
    challengeId: "js_code_02_max",
    description: "A challenge of arrays. Find the largest number in a given set." 
  },
  { id: 5, name: "Whispering Woods", status: "locked", type: 'coding', 
    unlocksOnChallengeId: "js_code_02_max",
    challengeId: "js_code_03_reverse",
    description: "Words twist and turn here. Write a function to reverse a string." 
  },
  { id: 6, name: "The Mirrored Maze", status: "locked", type: 'coding', 
    unlocksOnChallengeId: "js_code_03_reverse",
    challengeId: "js_code_04_palindrome",
    description: "Test your logic by checking if a word is a palindrome." 
  },
  { id: 7, "name": "FizzBuzz Falls", status: "locked", type: 'coding', 
    unlocksOnChallengeId: "js_code_04_palindrome",
    challengeId: "js_code_05_fizzbuzz",
    description: "Solve the classic FizzBuzz problem, a rite of passage for all coders." 
  },

  // Tier 4: Data Structures
  { id: 8, name: "Hash Map Hut", status: "locked", type: 'coding', 
    unlocksOnChallengeId: "js_code_05_fizzbuzz",
    challengeId: "js_ds_01_hashmap",
    description: "Learn efficient lookups by finding duplicates in a collection." 
  },
  { id: 9, name: "Linked List Grotto", status: "locked", type: 'coding', 
    unlocksOnChallengeId: "js_ds_01_hashmap",
    challengeId: "js_ds_02_revlist",
    description: "Master pointers and references by reversing a linked list." 
  },
  { id: 10, name: "The Great Tree", status: "locked", type: 'coding', 
    unlocksOnChallengeId: "js_ds_02_revlist",
    challengeId: "js_ds_03_maxtree",
    description: "Explore recursive structures by finding the depth of a binary tree."
  },
  
  // Tier 5: Advanced Concepts & Social Break
  { id: 11, name: "Promise Peak", status: "locked", type: 'coding', 
    unlocksOnChallengeId: "js_ds_03_maxtree",
    challengeId: "js_async_01",
    description: "Understand the asynchronous nature of JavaScript with Promises." 
  },
  { id: 12, name: "Café Connection", status: "locked", type: 'social', 
    unlocksOnChallengeId: "js_async_01",
    challengeId: "social_01", // Placeholder, social challenges would have a different structure
    description: "You've earned a break! Meet a fellow student at the 'Syntax & Tea' cafe. They might have a helpful tip for your next big project." 
  },

  // Tier 6: Milestone Project
  { id: 13, name: "Portfolio Portal", status: "locked", type: "project", 
    unlocksOnChallengeId: "social_01",
    challengeId: "project_01", // Placeholder
    description: "Combine all your skills to build a small, personal website project." 
  },
];
