import React, { useState, useEffect, useCallback } from 'react';
import KaidenAssistant from './components/kaiden/KaidenAssistant';
import WarmParticles from './components/background/WarmParticles';
import { Lesson, PlayerStats, CodingChallenge, StoryEvent, Page, FitnessActivity, PlayerStatsHistory, Skill } from './types';
import { initialLessons } from './data/lessons';
import { initialFitnessActivities } from './data/fitnessActivities';
import { storyEvents as allStoryEvents } from './data/storyEvents';
import { skills as allSkills } from './data/skills';
import StoryNotification from './components/story/StoryNotification';
import HomePage from './pages/HomePage';
import CodingHomePage from './pages/CodingHomePage';
import CodingJourneyPage from './pages/CodingJourneyPage';
import FitnessJourneyPage from './pages/FitnessJourneyPage';
import LessonPage from './pages/LessonPage';
import TutorialOverlay from './components/tutorial/TutorialOverlay';
import FitnessActivityPage from './pages/FitnessActivityPage';
import ProgressPage from './pages/ProgressPage';
import WelcomePage from './pages/WelcomePage';
import SkillTreePage from './pages/SkillTreePage';

const XP_PER_LEVEL = 100;

const initialStats: PlayerStats = {
  xp: 0,
  level: 1,
  skillPoints: 1,
  intellect: 50,
  energy: 80,
  health: 100,
  social: 50,
};

const App: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [stats, setStats] = useState<PlayerStats>(initialStats);
  const [statsHistory, setStatsHistory] = useState<PlayerStatsHistory>([{...initialStats, timestamp: Date.now()}]);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [pageKey, setPageKey] = useState(0); 
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [fitnessActivities, setFitnessActivities] = useState<FitnessActivity[]>(initialFitnessActivities);
  
  const [activeCodingChallenge, setActiveCodingChallenge] = useState<CodingChallenge | null>(null);
  const [activeFitnessActivity, setActiveFitnessActivity] = useState<FitnessActivity | null>(null);
  
  const [storyEvents, setStoryEvents] = useState<StoryEvent[]>(allStoryEvents.map(e => ({...e, isTriggered: false })));
  const [activeStoryEvent, setActiveStoryEvent] = useState<StoryEvent | null>(null);
  
  const [tutorial, setTutorial] = useState({ isActive: true, step: 0 });
  
  const [skills, setSkills] = useState<Skill[]>(allSkills);
  const [unlockedSkills, setUnlockedSkills] = useState<Set<string>>(new Set());

  const handleTutorialNext = () => setTutorial(prev => ({ ...prev, step: prev.step + 1 }));
  const handleTutorialComplete = () => setTutorial({ isActive: false, step: 0 });
  
  const checkForLevelUp = useCallback((currentXp: number, currentLevel: number) => {
    const newLevel = Math.floor(currentXp / XP_PER_LEVEL) + 1;
    if (newLevel > currentLevel) {
      const levelsGained = newLevel - currentLevel;
      setStats(prev => ({
        ...prev,
        level: newLevel,
        skillPoints: prev.skillPoints + levelsGained,
      }));
      // Here you could trigger a level-up notification
      console.log(`Leveled up to ${newLevel}! Gained ${levelsGained} skill point(s).`);
    }
  }, []);

  const handleStatChange = useCallback((reward: Partial<PlayerStats>) => {
    setStats(prevStats => {
      let xpGain = reward.xp || 0;
      let energyCost = reward.energy || 0;

      // Apply skill effects
      if (unlockedSkills.has('xp_boost_1')) {
        xpGain *= 1.1; // 10% XP boost
      }
      if (unlockedSkills.has('energy_saver_1')) {
        energyCost *= 0.9; // 10% energy cost reduction
      }
      
      const newStats = {
        ...prevStats,
        xp: prevStats.xp + Math.round(xpGain),
        intellect: Math.max(0, prevStats.intellect + (reward.intellect || 0)),
        energy: Math.max(0, prevStats.energy + Math.round(energyCost)),
        health: Math.max(0, prevStats.health + (reward.health || 0)),
        social: Math.max(0, prevStats.social + (reward.social || 0)),
      };

      setStatsHistory(prevHistory => [...prevHistory, { ...newStats, timestamp: Date.now() }]);
      checkForLevelUp(newStats.xp, prevStats.level);
      return newStats;
    });
  }, [unlockedSkills, checkForLevelUp]);

  useEffect(() => {
    if (showWelcome) return; 
    const untriggeredEvent = storyEvents.find(event => !event.isTriggered && event.trigger(stats));
    if (untriggeredEvent) {
      setActiveStoryEvent(untriggeredEvent);
      setStoryEvents(events => events.map(e => e.id === untriggeredEvent.id ? { ...e, isTriggered: true } : e));
      if (untriggeredEvent.rewards) {
         handleStatChange(untriggeredEvent.rewards);
      }
    }
  }, [stats, storyEvents, showWelcome, handleStatChange]);
  
  const handleChallengeComplete = (challenge: CodingChallenge) => {
    handleStatChange(challenge.reward);

    setLessons(prevLessons => {
        let lessonToCompleteIndex = -1;
        let lessonToUnlockIndex = -1;

        for(let i = 0; i < prevLessons.length; i++) {
            if(prevLessons[i].challengeId === challenge.id) {
                lessonToCompleteIndex = i;
            }
            if(prevLessons[i].unlocksOnChallengeId === challenge.id) {
                lessonToUnlockIndex = i;
            }
        }
        
        if(lessonToCompleteIndex === -1) return prevLessons; // Should not happen

        const newLessons = [...prevLessons];

        // Mark current lesson as complete
        newLessons[lessonToCompleteIndex] = { ...newLessons[lessonToCompleteIndex], status: 'complete' };
        
        // Mark next lesson as current
        if (lessonToUnlockIndex !== -1) {
            newLessons[lessonToUnlockIndex] = { ...newLessons[lessonToUnlockIndex], status: 'current' };
        }
        
        return newLessons;
    });
};

  const handleFitnessActivityComplete = (activity: FitnessActivity) => {
    handleStatChange(activity.reward);
    setFitnessActivities(prevActivities => {
        const newActivities = JSON.parse(JSON.stringify(prevActivities));
        const currentActivityIndex = newActivities.findIndex((a: FitnessActivity) => a.id === activity.id);
        
        if (currentActivityIndex !== -1) {
            newActivities[currentActivityIndex].status = 'complete';
        }

        const activityToUnlockIndex = newActivities.findIndex((a: FitnessActivity) => a.unlocksOnActivityId === activity.id);
        
        if (activityToUnlockIndex !== -1) {
            newActivities[activityToUnlockIndex].status = 'current';
        }
        return newActivities;
    });
    navigateTo('fitness');
  };
  
  const handleUnlockSkill = (skillId: string) => {
    const skill = skills.find(s => s.id === skillId);
    if (skill && stats.skillPoints >= skill.cost && !unlockedSkills.has(skillId)) {
        setStats(prev => ({
            ...prev,
            skillPoints: prev.skillPoints - skill.cost,
        }));
        setUnlockedSkills(prev => new Set(prev).add(skillId));
    }
  };

  const navigateTo = (page: Page, data: any = null) => {
    setPageKey(prev => prev + 1); 
    setCurrentPage(page);

    if (page === 'lesson' && data && 'language' in data) {
      setActiveCodingChallenge(data);
    } else if (page === 'fitnessActivity' && data && 'challengeConfig' in data) {
      setActiveFitnessActivity(data);
    }
  };
  
  const handleCloseStoryEvent = () => setActiveStoryEvent(null);

  const renderPage = () => {
    const animationClass = pageKey % 2 === 0 ? 'animate-slide-in-right' : 'animate-slide-in-left';

    switch (currentPage) {
      case 'codingHome':
        return <CodingHomePage navigateTo={navigateTo} />;
      case 'coding':
        return <CodingJourneyPage lessons={lessons} navigateTo={navigateTo} />;
      case 'fitness':
        return <FitnessJourneyPage activities={fitnessActivities} navigateTo={navigateTo} />;
      case 'lesson':
        return activeCodingChallenge ? <LessonPage challenge={activeCodingChallenge} onChallengeComplete={handleChallengeComplete} navigateTo={navigateTo} /> : <HomePage stats={stats} navigateTo={navigateTo} onActivityComplete={handleStatChange}/>;
      case 'fitnessActivity':
        return activeFitnessActivity ? <FitnessActivityPage activity={activeFitnessActivity} onComplete={handleFitnessActivityComplete} navigateTo={navigateTo} /> : <HomePage stats={stats} navigateTo={navigateTo} onActivityComplete={handleStatChange}/>;
      case 'progress':
        return <ProgressPage statsHistory={statsHistory} navigateTo={navigateTo} />;
      case 'skillTree':
        return <SkillTreePage stats={stats} skills={skills} unlockedSkills={unlockedSkills} onUnlockSkill={handleUnlockSkill} navigateTo={navigateTo} />;
      case 'home':
      default:
        return <HomePage stats={stats} navigateTo={navigateTo} onActivityComplete={handleStatChange} />;
    }
  };

  if (showWelcome) {
    return <WelcomePage onBegin={() => setShowWelcome(false)} />;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#fffaf4] to-parchment-medium text-ink-dark font-body overflow-x-hidden">
      <WarmParticles particleCount={30} />
      
      {tutorial.isActive && currentPage === 'home' && <TutorialOverlay step={tutorial.step} onNext={handleTutorialNext} onComplete={handleTutorialComplete} />}
      
      <div key={pageKey} className="animate-fade-in">
        {renderPage()}
      </div>

      {!tutorial.isActive && <KaidenAssistant />}
      <StoryNotification event={activeStoryEvent} onClose={handleCloseStoryEvent} />
    </div>
  );
};

export default App;
