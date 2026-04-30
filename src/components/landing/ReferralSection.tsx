import React from 'react';
import { motion } from 'motion/react';
import { Star, Zap } from 'lucide-react';
import { LandingContent } from '../../types';

export const ReferralSection: React.FC<{ content: LandingContent }> = ({ content }) => (
  <section className="py-24 px-6 bg-zinc-900 overflow-hidden relative">
    <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
      <Zap size={300} className="text-white" strokeWidth={1} />
    </div>
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
      <div className="flex-1 space-y-8 text-white">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand text-black rounded-full text-[10px] font-black uppercase tracking-widest">
          <Star size={12} strokeWidth={3} /> Beneficio de Comunidad
        </div>
        <h2 className="font-display text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
          {content.referralTitle}
        </h2>
        <p className="text-xl text-zinc-400 max-w-xl font-medium tracking-wide">
          {content.referralSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 pt-4">
          <div className="flex flex-col">
            <span className="text-brand text-4xl font-black font-display italic leading-none">S/ 0.00</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mt-2">Costo para tu amigo</span>
          </div>
          <div className="w-px h-12 bg-zinc-800 hidden sm:block"></div>
          <div className="flex flex-col">
            <span className="text-white text-4xl font-black font-display italic leading-none">1 Mes</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mt-2">Tu recompensa gratis</span>
          </div>
        </div>
      </div>
      <div className="flex-1 w-full max-w-md">
        <div className="bento-card bg-zinc-800 border-zinc-700 p-8 space-y-6">
          <p className="text-xs font-black uppercase tracking-widest text-brand">Generar Mi Link</p>
          <div className="p-4 bg-black rounded-xl border border-zinc-700 text-zinc-500 text-xs font-mono break-all">
            gymsmart.pe/refer/USER_ID_123
          </div>
          <button className="w-full py-4 bg-brand text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-brand/10">Compartir en WhatsApp</button>
        </div>
      </div>
    </div>
  </section>
);
