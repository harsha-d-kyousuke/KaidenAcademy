# Kaiden Academy

**Kaiden Academy** is a life-simulation + learning platform built with **React**, **TypeScript**, and **Vite**. It blends campus life (social networks, gym & health, jobs, exploration) with gamified learning and coding challenges (JavaScript, Python, Java, Algorithms). The app supports audio immersion (music, SFX, voice), modular content via JSON/TS types, and is structured for rapid content generation and extension.

---

## 🚀 Features

- Integrated life-simulation systems: **energy**, **fitness**, **mood**, **social** and more.
- Coding challenge tracks by language: **JavaScript**, **Python**, **Java**, and **Algorithms**.
- Tutorial flow that ties into stats and progression (rewards: XP, intellect, energy cost).
- NPC system with relationships, dialogue, and study partner mechanics.
- Audio system: ambient music, SFX, and short voice lines for tutorial narration.
- Content-driven design: challenges, NPCs, activities stored as JSON / TypeScript types for easy authoring.
- Accessibility and responsive UI (Tailwind-ready design patterns).
- Extensible services: `ChallengeService`, `RelationshipService`, `HealthManager`, `SoundService`.

---

## 🔧 Tech Stack

- Frontend: **React** + **TypeScript**
- Bundler: **Vite**
- Styling: Tailwind CSS (recommended — project includes examples)
- State: local React state + services (singletons) — can be replaced with Redux or Zustand
- Audio: HTML5 Audio + a `soundService` wrapper
- Testing: Jest (unit tests recommended)
- Optional: TTS/voice generation for prototyping voice lines

---

## 🧭 Repo layout (typical)

/src
/components
/dashboard
/tutorial
/challenges
/health
/npc
/services
challengeService.ts
relationshipService.ts
soundService.ts
healthManager.ts
/types
game.ts
/data
challenges/
npcs/
activities/
App.tsx
main.tsx
/public
/audio
/music
/sfx
/voice
index.html
vite.config.ts
package.json
README.md


---

## ✅ Getting started (local)

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn
- Optional: `pnpm` for faster installs

### Install

```bash
# using npm
npm install

# or yarn
yarn

# or pnpm
pnpm install

Run (development)

npm run dev
# or
yarn dev
# or
pnpm dev

Open http://localhost:5173

(or the port Vite reports).
Build (production)

npm run build
# or
yarn build
# or
pnpm build

Preview production build locally

npm run preview

📦 Recommended package.json scripts

"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint . --ext .ts,.tsx",
  "test": "jest",
  "format": "prettier --write ."
}

🧠 Key design & data models

Create src/types/game.ts and centralize game types. Example:

export type StatKey = 'energy' | 'fitness' | 'mood' | 'social' | 'intellect';

export interface NPC {
  id: string;
  name: string;
  bio: string;
  avatar?: string;
  relationship: {
    affinity: number; // -100..100
    status: 'acquaintance' | 'friend' | 'close' | 'romantic' | 'blocked';
    lastInteraction?: string | null;
  };
  interests: string[];
}

export interface PlayerState {
  id: string;
  name: string;
  stats: Record<StatKey, number>;
  friends: string[]; // NPC ids
  schedule: Record<string, string[]>; // e.g., { "2025-10-20": ["gym_30min"] }
}

export interface CodingChallenge {
  id: string;
  title: string;
  language: 'javascript' | 'python' | 'java' | 'algo';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  reward: { intellect: number; xp: number; energy: number };
  hint?: string;
  tutorialStep?: string;
}

🧩 How content is organized

Place content in the /src/data folder (or /public/data if you want raw JSON served).

Examples:

    src/data/challenges/js_loops_01.json

    src/data/challenges/py_func_02.json

    src/data/npcs/maya.json

    src/data/activities/gym_30min.json

Sample challenge JSON (copy/paste):

{
  "id": "py_func_02",
  "title": "Function Arguments",
  "language": "python",
  "difficulty": "intermediate",
  "question": "What does print(sum([1,2,3])) output?",
  "options": ["123", "6", "[1,2,3]", "Error"],
  "correctIndex": 1,
  "explanation": "sum() adds the list elements and returns 6.",
  "reward": { "intellect": 6, "xp": 15, "energy": -2 }
}

🔌 Services & integration tips
ChallengeService (skeleton)

src/services/challengeService.ts

import { CodingChallenge } from '../types/game';

class ChallengeService {
  private challenges: CodingChallenge[] = [];

  load(challenges: CodingChallenge[]) {
    this.challenges = challenges;
  }

  getByLanguage(lang: string) {
    return this.challenges.filter(c => c.language === lang);
  }

  completeChallenge(id: string) {
    const ch = this.challenges.find(c => c.id === id);
    if (!ch) return null;
    // tie into player state — return reward object for whoever calls it.
    return ch.reward;
  }
}

export default new ChallengeService();

RelationshipService (skeleton)

src/services/relationshipService.ts

import { NPC } from '../types/game';

class RelationshipService {
  private npcs: Record<string, NPC> = {};

  load(npcs: NPC[]) {
    npcs.forEach(n => (this.npcs[n.id] = n));
  }

  changeAffinity(id: string, delta: number) {
    const npc = this.npcs[id];
    if (!npc) return;
    npc.relationship.affinity = Math.max(-100, Math.min(100, npc.relationship.affinity + delta));
    // derive status
    if (npc.relationship.affinity > 60) npc.relationship.status = 'close';
    else if (npc.relationship.affinity > 20) npc.relationship.status = 'friend';
    else npc.relationship.status = 'acquaintance';
  }
}

export default new RelationshipService();

🔊 Audio conventions & folder layout

Put audio in /public/audio:

public/audio/
  music/
    ambient-campus-loop.mp3
    gym-loop.mp3
  sfx/
    button-click.wav
    error-buzz.wav
    success-chime.wav
  voice/
    tutorial_step1_welcome.mp3
    npc_maya_greeting.mp3

Integration tips

    Lazy-load heavy music files (load only when user enters a zone).

    Use short clips (2–8s) for voice lines.

    Respect autoplay restrictions on mobile: require a user gesture before running audio.

🧪 Testing & QA

    Unit test services (ChallengeService, RelationshipService, HealthManager) with Jest.

    Accessibility: run axe or Lighthouse to verify semantic HTML and keyboard navigation.

    Playtests: run scripted sequences (first tutorial, first study session, gym -> exam flow).

    Performance: aim to lazy-load audio and large content; prefetch only required assets during idle time.

🛠 Adding new coding challenges (how-to)

    Add a JSON file to src/data/challenges/ following the CodingChallenge schema.

    Call ChallengeService.load() with the new list (or auto-import all JSON files at app boot).

    Update UI lists (filter by language and difficulty) and display hint and explanation in modal after attempt.

    Example of adding a Python beginner challenge:

{
  "id": "py_basics_01",
  "title": "Print Hello",
  "language": "python",
  "difficulty": "beginner",
  "question": "What does print('Hello') output?",
  "options": ["Hello", "'Hello'", "print('Hello')", "Error"],
  "correctIndex": 0,
  "explanation": "print() outputs the string content to stdout.",
  "reward": { "intellect": 3, "xp": 8, "energy": -1 }
}

Batch generation tip: Use the provided LLM prompt templates (see docs/prompts.md) to generate many challenges quickly.
📚 Tutorial & onboarding flow

    Step 1: Welcome & avatar setup

    Step 2: First code run (JS) — lightweight challenge

    Step 3: Study partner NPC introduction (Python)

    Step 4: Debugging lesson (Java)

    Step 5: Algorithm Arena (timed Algo challenge)

Each step:

    awards XP/intellect,

    may reduce energy,

    triggers audio narration and short SFX.

⚙️ Environment variables (example)

Create .env in root for runtime flags or API keys:

VITE_API_BASE_URL=
VITE_ENABLE_TTS=false
VITE_SENTRY_DSN=

    Note: Vite exposes env variables with VITE_ prefix. Do not commit secrets.

👩‍💻 Contribution & development

    Fork -> branch -> PR

    Write unit tests for any new business logic

    Keep UI accessible (aria labels, keyboard navigation)

    Add content in src/data using provided types

    Use TypeScript types; avoid any unless necessary

Suggested workflow

    git checkout -b feat/<short-desc>

    Implement the feature

    Add/Update tests

    git push origin feat/<short-desc>

    Open PR with description and screenshot/gif

🛣 Roadmap & ideas (short)

    Multiplayer study sessions & hackathon events

    Voice-acted NPCs and full narration

    Mobile-friendly controls & push notifications

    AI-driven adaptive challenges (difficulty scaling)

    DLC-style “Extreme Modules”: VR Coding Room, Time Loop Mode, AI Rival NPC

⚠️ Known issues & limitations

    Audio autoplay may be blocked on some browsers until user interacts.

    Large batches of audio or voice files can slow initial load—use lazy loading.

    Complex NPC memory systems require careful serialization when saving state.

    The built-in content is a prototype; content generation pipelines must be used for production scale.

📄 License

Add your license here (MIT recommended for public educational projects):

MIT License

👥 Credits & acknowledgements

    Built as a rapid prototype combining life-sim mechanics with gamified learning.

    Project skeleton was analyzed and enhanced with recommended services, data models, and content prompts.

📎 Quick links

    App entry: src/main.tsx / src/App.tsx

    Data: src/data/

    Services: src/services/

    Types: src/types/game.ts

🙋 Frequently used prompts (for bulk content generation)

Challenge prompt

Create a new coding challenge JSON object. Fields: id, title, language (javascript|python|java|algo), difficulty, question, options (4), correctIndex, explanation, reward {intellect,xp,energy}. Keep question under 20 words and avoid ambiguous phrasing.

NPC prompt

Create an NPC JSON: id, name, age, bio(1 paragraph), interests (3), default_affinity (0-30), tone, sample_greeting (1 sentence). Keep it inclusive and brief.

Contact / Maintainer

    Maintainer: Your name or team

    Repo: <your-github-repo-url>

    Issues: Use GitHub Issues for bugs/feature requests

Enjoy building Kaiden Academy! If you want, 


