import React from 'react';
import { motion } from 'motion/react';
import { LandingContent } from '../../types';

interface HeroProps {
  content: LandingContent;
  onJoin: () => void;
  onSedes: () => void;
}

export const Hero: React.FC<HeroProps> = ({ content, onJoin, onSedes }) => (
  <section className="relative h-[85vh] bg-black text-white flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 opacity-40">
      <img 
        src={content.heroImg} 
        alt="Gym background" 
        className="w-full h-full object-cover scale-110 blur-sm opacity-50"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="relative z-10 text-center px-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="font-display text-6xl md:text-9xl font-black uppercase italic leading-[0.8] mb-8 tracking-tighter">
          {content.heroTitle} <br /> <span className="text-brand">{content.heroAccent}</span>
        </h1>
        <p className="text-xl md:text-2xl mb-12 font-medium text-zinc-300 tracking-wide uppercase">
          {content.heroSubtitle}
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <button onClick={onJoin} className="brutalist-button text-lg px-12 py-4 shadow-lg shadow-brand/20 active:scale-95 transition-all">
            Unirse Ahora
          </button>
          <button onClick={onSedes} className="brutalist-button text-lg px-12 py-4 bg-white text-black border-zinc-200 active:scale-95 transition-all">
            Conocer Sedes
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);
