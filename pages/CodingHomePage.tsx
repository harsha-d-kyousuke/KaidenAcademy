import React from 'react';
import { Page } from '../types';
import AdventureButton from '../components/ui/AdventureButton';
import ParchmentCard from '../components/ui/ParchmentCard';
import { ArrowLeft, Code } from 'lucide-react';

interface CodingHomePageProps {
  navigateTo: (page: Page) => void;
}

const LanguagePathCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}> = ({ title, description, icon, onClick, disabled }) => (
  <ParchmentCard
    onClick={!disabled ? onClick : undefined}
    className={`p-8 flex flex-col items-center text-center transition-all duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer group hover:shadow-2xl hover:-translate-y-2'}`}
  >
    <div className={`w-28 h-28 rounded-full bg-parchment-dark flex items-center justify-center mb-4 border-4 ${disabled ? 'border-shadow-soft/30' : 'border-amber-glow/30 group-hover:border-amber-glow'}`}>
      {icon}
    </div>
    <h3 className="font-display text-4xl font-bold text-ink-dark">{title}</h3>
    <p className="font-body text-shadow-soft my-3 flex-grow">{description}</p>
     <div className={`flex items-center font-heading font-semibold ${disabled ? 'text-shadow-soft' : 'text-warm-gold group-hover:text-quest-active'} transition-colors`}>
      <span>{disabled ? 'Coming Soon' : 'Begin Path'}</span>
    </div>
  </ParchmentCard>
);

const CodingHomePage: React.FC<CodingHomePageProps> = ({ navigateTo }) => {
  return (
    <div className="min-h-screen p-4 sm:p-8">
      <header className="flex items-center justify-between mb-12">
        <AdventureButton onClick={() => navigateTo('home')}>
          <ArrowLeft size={20} className="mr-2" />
          Back to Hub
        </AdventureButton>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-amber-glow">
          The Library of Code
        </h1>
        <div style={{width: '150px'}}></div>
      </header>
      <main className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <LanguagePathCard 
                title="JavaScript Path"
                description="Learn the language of the web, from basic scripts to complex applications. This is the foundational journey for all web adventurers."
                icon={<img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript" className="w-16 h-16"/>}
                onClick={() => navigateTo('coding')}
            />
             <LanguagePathCard 
                title="Python Path"
                description="Master the versatile language of data science, AI, and backend development. A powerful tool for any creator."
                icon={<img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" alt="Python" className="w-16 h-16"/>}
                onClick={() => {}}
                disabled={true}
            />
             <LanguagePathCard 
                title="Java Path"
                description="Embrace object-oriented programming to build robust, platform-independent applications from mobile to enterprise."
                icon={<img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1200px-Java_programming_language_logo.svg.png" alt="Java" className="w-16 h-12 object-contain"/>}
                onClick={() => {}}
                disabled={true}
            />
             <LanguagePathCard 
                title="Algorithm Arena"
                description="Hone your problem-solving skills with complex logic puzzles and data structure challenges. For the sharpest minds."
                icon={<Code className="w-16 h-16 text-forest-mist" />}
                onClick={() => {}}
                disabled={true}
            />
        </div>
      </main>
    </div>
  );
};

export default CodingHomePage;
