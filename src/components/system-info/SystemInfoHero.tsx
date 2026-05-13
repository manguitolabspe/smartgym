import React from 'react';
import { Dumbbell } from 'lucide-react';

export const SystemInfoHero: React.FC = () => {
  return (
    <header className="pt-24 pb-16 px-6 text-center max-w-4xl mx-auto">
      <div className="inline-flex items-center justify-center p-4 bg-brand rounded-3xl shadow-xl shadow-brand/20 mb-8 transform -rotate-3">
         <Dumbbell size={48} className="text-black" />
      </div>
      <h1 className="font-display text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-6 text-zinc-900">
        Smart Gym <span className="text-brand">OS</span>
      </h1>
      <p className="text-xl md:text-2xl font-medium text-zinc-500 tracking-wide uppercase max-w-2xl mx-auto">
        El sistema All-In-One definitivo para administrar tu gimnasio y fidelizar a tus atletas.
      </p>
    </header>
  );
};
