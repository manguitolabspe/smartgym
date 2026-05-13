import React from 'react';
import { Star } from 'lucide-react';
import { LandingContent } from '../../types';

interface TestimonialSectionProps {
  content: LandingContent;
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({ content }) => {
  return (
    <section className="py-32 bg-black text-white overflow-hidden relative">
       <div className="max-w-4xl mx-auto px-6 text-center">
          <Star className="text-brand mx-auto mb-12 animate-pulse" size={48} fill="currentColor" />
          <blockquote className="font-display text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-12 leading-none">
            "{content.testimonialText}"
          </blockquote>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 italic">— {content.testimonialAuthor}</p>
       </div>
    </section>
  );
};
