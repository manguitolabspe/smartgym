import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dumbbell, Zap, ArrowRight, X, ChevronRight, Home, Award, User
} from 'lucide-react';
import { LandingContent } from '../types';
import { Hero } from '../components/landing/Hero';
import { MobileHomeApp } from '../components/landing/MobileHomeApp';
import { SedesSection } from '../components/landing/SedesSection';
import { PlanesSection } from '../components/landing/PlanesSection';
import { ReferralSection } from '../components/landing/ReferralSection';
import { StatsSection } from '../components/landing/StatsSection';
import { TestimonialSection } from '../components/landing/TestimonialSection';
import { SystemSalesCTA } from '../components/landing/SystemSalesCTA';
import { Footer } from '../components/landing/Footer';
import { Modal } from '../components/common/Modal';
import { Toast } from '../components/common/Toast';

interface LandingPageProps {
  content: LandingContent;
  onLogin: () => void;
  onViewInfo?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ content, onLogin, onViewInfo }) => {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<'inicio' | 'planes'>('inicio');

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowLeadModal(false);
    setToast("¡Genial! Recibirás tu pase de 1 día gratis en tu WhatsApp.");
  };

  const scrollToSection = (id: string) => {
    // Si estamos en móvil y el ID es planes, cambia el tab
    if (window.innerWidth < 768 && id === 'planes') {
      setMobileTab('planes');
      window.scrollTo({top: 0});
      return;
    }
    if (window.innerWidth < 768 && id === 'sedes') {
      setMobileTab('inicio');
    }
    
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans scroll-smooth uppercase tracking-normal pb-20 md:pb-0">
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
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { window.scrollTo({top:0, behavior:'smooth'}); setMobileTab('inicio'); }}>
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
      </nav>

        {/* INICIO TAB VIEW */}
        {mobileTab === 'inicio' && (
          <div className="flex flex-col">
            {/* Desktop View */}
            <div className="hidden md:block">
              <Hero content={content} onJoin={() => setShowJoinModal(true)} onSedes={() => scrollToSection('sedes')} />
              <StatsSection content={content} />
              <ReferralSection content={content} />
              <SedesSection />
              <TestimonialSection content={content} />
              <SystemSalesCTA onViewInfo={onViewInfo} />
            </div>
            {/* Mobile App View */}
            <MobileHomeApp gymName={content.gymName} heroImg={content.heroImg} />
          </div>
        )}

      {/* PLANES TAB VIEW */}
      <div className={`pt-8 md:pt-0 md:block ${mobileTab === 'planes' ? 'block' : 'hidden'}`}>
        <PlanesSection onJoin={() => setShowJoinModal(true)} />
      </div>

      <Footer />

      {/* App-like Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 pb-2 pt-2 px-2 flex justify-around items-center z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <button onClick={() => { setMobileTab('inicio'); window.scrollTo({top:0, behavior:'smooth'}); }} className={`flex-1 min-w-0 py-2 flex flex-col items-center gap-1 transition-colors ${mobileTab === 'inicio' ? 'text-brand-dark' : 'text-zinc-400 hover:text-zinc-600'}`}>
          <div className={`p-1.5 rounded-xl transition-all ${mobileTab === 'inicio' ? 'bg-brand/20' : ''}`}><Home size={22} strokeWidth={mobileTab === 'inicio' ? 2.5 : 2} className={mobileTab === 'inicio' ? 'text-brand-dark' : ''} /></div>
          <span className="text-[9px] font-black uppercase tracking-widest truncate w-full text-center">Inicio</span>
        </button>
        <button onClick={() => { setMobileTab('planes'); window.scrollTo({top:0, behavior:'smooth'}); }} className={`flex-1 min-w-0 py-2 flex flex-col items-center gap-1 transition-colors ${mobileTab === 'planes' ? 'text-brand-dark' : 'text-zinc-400 hover:text-zinc-600'}`}>
          <div className={`p-1.5 rounded-xl transition-all ${mobileTab === 'planes' ? 'bg-brand/20' : ''}`}><Award size={22} strokeWidth={mobileTab === 'planes' ? 2.5 : 2} className={mobileTab === 'planes' ? 'text-brand-dark' : ''} /></div>
          <span className="text-[9px] font-black uppercase tracking-widest truncate w-full text-center">Planes</span>
        </button>
        <button onClick={onLogin} className="flex-1 min-w-0 py-2 flex flex-col items-center gap-1 transition-colors text-zinc-400 hover:text-zinc-600">
          <div className="p-1.5 rounded-xl"><User size={22} strokeWidth={2} /></div>
          <span className="text-[9px] font-black uppercase tracking-widest truncate w-full text-center">Perfil</span>
        </button>
      </nav>
    </div>
  );
};
