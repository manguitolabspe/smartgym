import React from 'react';
import { Globe, Target, Users, TrendingUp } from 'lucide-react';
import { LandingContent } from '../../types';

interface StatsSectionProps {
  content: LandingContent;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ content }) => {
  return (
    <section id="stats" className="py-32 px-6 max-w-7xl mx-auto w-full">
      <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-16">{content.statsSectionTitle}</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Sedes en Perú', value: '15+', icon: <Globe className="text-brand" size={20} /> },
          { label: 'Máquinas Pro', value: '500+', icon: <Target className="text-brand" size={20} /> },
          { label: 'Comunidad', value: '10k+', icon: <Users className="text-brand" size={20} /> },
          { label: 'Resultados', value: '98%', icon: <TrendingUp className="text-brand" size={20} /> },
        ].map((stat, i) => (
          <div key={i} className="group p-10 bento-card bg-white hover:bg-zinc-950 hover:text-white transition-all duration-500 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand group-hover:text-black transition-colors duration-500">
              {stat.icon}
            </div>
            <h3 className="font-display text-5xl font-black mb-2 italic tracking-tighter leading-none">{stat.value}</h3>
            <p className="uppercase text-[10px] font-black tracking-[0.2em] text-zinc-400 group-hover:text-zinc-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
