import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dumbbell, Zap, Globe, Target, Users, TrendingUp, Star, ArrowRight, X, ChevronRight, Home, Award, Image as ImageIcon, User
} from 'lucide-react';
import { LandingContent } from '../types';
import { Hero } from '../components/landing/Hero';
import { SedesSection } from '../components/landing/SedesSection';
import { PlanesSection } from '../components/landing/PlanesSection';
import { ReferralSection } from '../components/landing/ReferralSection';
import { Modal } from '../components/common/Modal';
import { Toast } from '../components/common/Toast';

interface LandingPageProps {
  content: LandingContent;
  onLogin: () => void;
  onViewInfo?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ content, onLogin, onViewInfo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowLeadModal(false);
    setToast("¡Genial! Recibirás tu pase de 1 día gratis en tu WhatsApp.");
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans scroll-smooth uppercase tracking-normal">
      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
        
        {showJoinModal && (
          <Modal title="Únete a la Revolución" onClose={() => setShowJoinModal(false)}>
            <form onSubmit={(e) => { e.preventDefault(); setShowJoinModal(false); setToast("Registro exitoso"); }} className="space-y-4">
              <input type="text" placeholder="Nombre completo" required className="w-full px-4 py-4 bg-zinc-100 border border-zinc-200 rounded-xl outline-none font-bold text-xs" />
              <input type="email" placeholder="Correo electrónico" required className="w-full px-4 py-4 bg-zinc-100 border border-zinc-200 rounded-xl outline-none font-bold text-xs" />
              <button type="submit" className="w-full py-4 bg-black text-white rounded-2xl font-black uppercase tracking-widest shadow-xl">Solicitar Membresía</button>
            </form>
          </Modal>
        )}

        {showLeadModal && (
          <Modal title="Tu Primer Día es Gratis" onClose={() => setShowLeadModal(false)}>
            <form onSubmit={handleLeadSubmit} className="space-y-6">
               <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 flex gap-4 items-center mb-4">
                <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center text-black shadow-lg"><Zap size={24} /></div>
                <div className="text-left">
                   <p className="text-[10px] font-black uppercase text-brand">Promoción Activa</p>
                   <p className="text-xs font-black uppercase text-white">Full Access por 24 horas</p>
                </div>
              </div>
              <div className="space-y-4">
                <input type="text" placeholder="Tu Nombre" required className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none font-bold text-xs" />
                <input type="tel" placeholder="WhatsApp" required className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none font-bold text-xs" />
              </div>
              <button type="submit" className="w-full py-4 bg-brand text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl">Obtener Mi Pase <ChevronRight size={14} className="inline ml-2" /></button>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav className="bg-white border-b border-zinc-200 sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
          <div className="bg-black p-1.5 rounded-lg">
            <Dumbbell className="text-brand w-6 h-6" />
          </div>
          <span className="font-display text-2xl font-black italic uppercase tracking-tighter">
            {content.gymName}
          </span>
        </div>
        
        <div className="hidden md:flex gap-6 font-bold uppercase text-sm tracking-widest items-center">
          <button onClick={() => scrollToSection('sedes')} className="hover:text-brand transition-colors text-[10px] font-black">Sedes</button>
          <button onClick={() => scrollToSection('planes')} className="hover:text-brand transition-colors text-[10px] font-black">Planes</button>
          <button onClick={() => setShowLeadModal(true)} className="bg-brand text-black px-5 py-2.5 rounded-xl text-[10px] font-black uppercase shadow-lg shadow-brand/10 transition-all active:scale-95 border border-brand-dark">Pase Gratis</button>
          <button onClick={onLogin} className="flex items-center gap-2 bg-zinc-900 text-white px-5 py-2.5 rounded-xl hover:bg-black transition-all text-[10px] font-black uppercase shadow-lg">Iniciar Sesión <ArrowRight size={14} /></button>
        </div>

        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Zap className="text-brand" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-zinc-950 z-[60] flex flex-col p-12 gap-8"
          >
             <button onClick={() => setIsMenuOpen(false)} className="self-end p-4 bg-white/10 rounded-2xl"><X className="text-white" /></button>
             <div className="flex flex-col gap-6 mt-12">
               {['Sedes', 'Planes', 'Horarios'].map((item) => (
                 <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-4xl font-display font-black uppercase italic text-white text-left tracking-tighter hover:text-brand transition-colors">{item}</button>
               ))}
               <button onClick={() => { setShowLeadModal(true); setIsMenuOpen(false); }} className="mt-8 bg-brand text-black py-6 rounded-3xl font-black uppercase tracking-widest text-xl italic shadow-2xl shadow-brand/20">Obtener Pase Gratis</button>
               <button onClick={() => { onLogin(); setIsMenuOpen(false); }} className="mt-2 bg-zinc-900 text-white py-6 rounded-3xl font-black uppercase tracking-widest text-xl italic shadow-2xl">Iniciar Sesión</button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Hero content={content} onJoin={() => setShowJoinModal(true)} onSedes={() => scrollToSection('sedes')} />

      {/* Stats Section */}
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

      <ReferralSection content={content} />
      <PlanesSection onJoin={() => setShowJoinModal(true)} />
      <SedesSection />

      {/* Testimonials */}
      <section className="py-32 bg-black text-white overflow-hidden relative">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <Star className="text-brand mx-auto mb-12 animate-pulse" size={48} fill="currentColor" />
            <blockquote className="font-display text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-12 leading-none">
              "{content.testimonialText}"
            </blockquote>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 italic">— {content.testimonialAuthor}</p>
         </div>
      </section>

      {/* System Sales CTA */}
      <section className="py-24 bg-brand text-black text-center px-6">
        <div className="max-w-4xl mx-auto space-y-8">
           <h2 className="font-display text-4xl md:text-6xl font-black uppercase italic tracking-tighter">¿Buscas un sistema como este para tu gimnasio?</h2>
           <p className="text-lg font-bold text-black/70 max-w-2xl mx-auto">Descubre cómo Smart Gym OS puede transformar la administración de tu negocio, fidelizar a tus clientes y aumentar tus ingresos.</p>
           <button 
             onClick={onViewInfo} 
             className="bg-black text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-3 mx-auto"
           >
             Ver información del Sistema <ArrowRight size={18} />
           </button>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="footer" className="bg-white border-t border-zinc-200 py-32 px-6">
         <div className="max-w-7xl mx-auto text-center space-y-12">
            <div className="flex flex-col items-center gap-6">
              <div className="bg-black p-4 rounded-3xl shadow-xl">
                 <Dumbbell className="text-brand w-10 h-10" />
              </div>
              <h4 className="font-display text-4xl font-black uppercase italic tracking-tighter italic">Entrena con los Mejores</h4>
            </div>
            <p className="max-w-2xl mx-auto text-zinc-500 font-medium">Únete a la red de gimnasios premium líder en Perú. Tecnología de vanguardia, los mejores entrenadores y una comunidad que te impulsa.</p>
            <div className="flex justify-center gap-4">
               <button className="p-4 bg-zinc-100 rounded-2xl hover:bg-zinc-200 transition-all"><Zap size={20} /></button>
               <button className="p-4 bg-zinc-100 rounded-2xl hover:bg-zinc-200 transition-all"><Star size={20} /></button>
            </div>
         </div>
      </footer>
    </div>
  );
};
