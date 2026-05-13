import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LandingContent } from '../../types';

interface HeroProps {
  content: LandingContent;
  onJoin: () => void;
  onSedes: () => void;
}

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop"
];

export const Hero: React.FC<HeroProps> = ({ content, onJoin, onSedes }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = content.heroImg ? [content.heroImg, ...DEFAULT_IMAGES.slice(1)] : DEFAULT_IMAGES;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative h-[85vh] bg-black text-white flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt="Gym background" 
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-sm opacity-50"
            referrerPolicy="no-referrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      {/* Slider indicators */}
      <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? 'w-8 bg-brand' : 'w-4 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-display text-6xl md:text-9xl font-black uppercase italic leading-[0.8] mb-8 tracking-tighter drop-shadow-2xl">
            {content.heroTitle} <br /> <span className="text-brand drop-shadow-lg">{content.heroAccent}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 font-medium text-zinc-300 tracking-wide uppercase drop-shadow-md">
            {content.heroSubtitle}
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button onClick={onJoin} className="brutalist-button text-lg px-12 py-4 shadow-[0_0_40px_rgba(204,255,0,0.3)] hover:shadow-[0_0_60px_rgba(204,255,0,0.4)] active:scale-95 transition-all">
              Unirse Ahora
            </button>
            <button onClick={onSedes} className="brutalist-button text-lg px-12 py-4 bg-white text-black border-zinc-200 shadow-xl hover:shadow-2xl active:scale-95 transition-all">
              Conocer Sedes
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
