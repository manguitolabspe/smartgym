/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, FormEvent } from 'react';
import { 
  Dumbbell, 
  Users, 
  User,
  CreditCard, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  X, 
  Check,
  CheckCircle2, 
  MapPin, 
  Phone, 
  HeartPulse,
  Activity,
  Flame,
  Timer,
  Target,
  Instagram, 
  Facebook,
  Search,
  Plus,
  ArrowRight,
  UserPlus,
  Settings,
  Palette,
  Clock,
  Calendar,
  Zap,
  Star,
  Shield,
  Bell,
  ChevronRight,
  Edit3,
  Globe,
  Image as ImageIcon,
  MessageSquare,
  Megaphone,
  Gift,
  Share2,
  TrendingUp,
  Award,
  QrCode,
  Wallet,
  Trophy,
  Home,
  Scale, 
  Ruler, 
  CreditCard as CardIcon,
  ShoppingBag,
  DollarSign,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

// --- Types ---
interface Client {
  id: string;
  name: string;
  email: string;
  plan: 'Básico' | 'Plus' | 'VIP';
  status: 'Activo' | 'Vencido' | 'Congelado';
  lastPayment: string;
  expiryDate: string;
  duesSoon: boolean;
  avatar?: string;
  membershipId: string;
  height?: number; // cm
  weight?: number; // kg
}

interface Schedule {
  id: string;
  class: string;
  instructor: string;
  time: string;
  day: string;
  capacity: number;
  booked: number;
}

interface Payment {
  id: string;
  clientId: string;
  clientName: string;
  amount: number;
  date: string;
  method: string;
}

interface LandingContent {
  heroTitle: string;
  heroAccent: string;
  heroSubtitle: string;
  heroImg: string;
  statsSectionTitle: string;
  featuredPlanName: string;
  gymName: string;
  referralTitle: string;
  referralSubtitle: string;
  testimonialText: string;
  testimonialAuthor: string;
}

interface LoyaltyConfig {
  isLoyaltyCardEnabled: boolean;
  stampsPerVisit: number;
  totalStampsToReward: number;
  rewardDescription: string;
  referralBonusEnabled: boolean;
  achievementSystemEnabled: boolean;
}

// --- Mock Data ---
const MOCK_CLIENTS: Client[] = [
  { id: '1', name: 'Juan Perez', email: 'juan@email.com', plan: 'Plus', status: 'Activo', lastPayment: '2026-03-15', expiryDate: '2026-04-15', duesSoon: false, membershipId: 'SM-8842', avatar: 'JP', height: 175, weight: 82 },
  { id: '2', name: 'Maria Garcia', email: 'maria@email.com', plan: 'Básico', status: 'Vencido', lastPayment: '2026-02-10', expiryDate: '2026-03-10', duesSoon: true, membershipId: 'SM-1123', avatar: 'MG', height: 162, weight: 58 },
  { id: '3', name: 'Carlos Rodriguez', email: 'carlos@email.com', plan: 'VIP', status: 'Activo', lastPayment: '2026-04-01', expiryDate: '2026-05-01', duesSoon: false, membershipId: 'SM-9901', avatar: 'CR', height: 180, weight: 95 },
  { id: '4', name: 'Ana Martinez', email: 'ana@email.com', plan: 'Plus', status: 'Activo', lastPayment: '2026-03-20', expiryDate: '2026-04-20', duesSoon: false, membershipId: 'SM-4452', avatar: 'AM', height: 168, weight: 64 },
  { id: '5', name: 'Luis Torres', email: 'luis@email.com', plan: 'Básico', status: 'Congelado', lastPayment: '2026-01-05', expiryDate: '2026-02-05', duesSoon: false, membershipId: 'SM-2231', avatar: 'LT', height: 172, weight: 78 },
  { id: '6', name: 'Sofia Vega', email: 'sofia@email.com', plan: 'VIP', status: 'Activo', lastPayment: '2026-04-05', expiryDate: '2026-05-05', duesSoon: false, membershipId: 'SM-7761', avatar: 'SV', height: 165, weight: 55 },
];

const MOCK_SCHEDULES: Schedule[] = [
  { id: 's1', class: 'CrossFit Power', instructor: 'Renzo G.', time: '07:00 AM', day: 'Lunes', capacity: 20, booked: 18 },
  { id: 's2', class: 'Yoga Flow', instructor: 'Milagros L.', time: '09:00 AM', day: 'Lunes', capacity: 15, booked: 10 },
  { id: 's3', class: 'Spinning Intense', instructor: 'Diego P.', time: '06:00 PM', day: 'Martes', capacity: 25, booked: 25 },
  { id: 's4', class: 'Zumba Fiesta', instructor: 'Carla M.', time: '07:30 PM', day: 'Miércoles', capacity: 30, booked: 12 },
  { id: 's5', class: 'Musculación', instructor: 'Oscar R.', time: '06:00 AM', day: 'Jueves', capacity: 40, booked: 22 },
  { id: 's6', class: 'Funcional Elite', instructor: 'Karla M.', time: '05:00 PM', day: 'Viernes', capacity: 20, booked: 19 },
];

const GYM_INFO = {
  address: "Av. Javier Prado Este 1234, Lima",
  phone: "(01) 456-7890",
  hours: [
    { label: 'Lunes - Viernes', time: '06:00 - 23:00' },
    { label: 'Sábados', time: '08:00 - 20:00' },
    { label: 'Domingos', time: '09:00 - 15:00' },
  ]
};

const MOCK_PAYMENTS: Payment[] = [
  { id: 'p1', clientId: '1', clientName: 'Juan Perez', amount: 120, date: '2026-03-15', method: 'Tarjeta' },
  { id: 'p2', clientId: '3', clientName: 'Carlos Rodriguez', amount: 250, date: '2026-04-01', method: 'Transferencia' },
  { id: 'p3', clientId: '4', clientName: 'Ana Martinez', amount: 120, date: '2026-03-20', method: 'Efectivo' },
];

// --- Components ---

const Toast = ({ message, onClose }: { message: string, onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-zinc-900 text-white px-8 py-4 rounded-2xl shadow-2xl border border-zinc-800 flex items-center gap-4"
    >
      <div className="w-6 h-6 bg-brand rounded-full flex items-center justify-center text-black">
        <CheckCircle2 size={14} />
      </div>
      <p className="text-xs font-black uppercase tracking-widest">{message}</p>
    </motion.div>
  );
};

const Modal = ({ title, children, onClose }: { title: string, children: React.ReactNode, onClose: () => void }) => (
  <AnimatePresence>
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-zinc-200"
      >
        <div className="bg-black text-white p-6 flex justify-between items-center">
          <h3 className="font-display text-2xl font-black italic uppercase tracking-tighter">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-xl transition-colors"><X size={20} /></button>
        </div>
        <div className="p-8">{children}</div>
      </motion.div>
    </div>
  </AnimatePresence>
);

const Landing = ({ onLogin, content }: { onLogin: () => void, content: LandingContent }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowLeadModal(false);
    setToast("¡Genial! Recibirás tu pase de 1 día gratis en tu WhatsApp.");
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowJoinModal(false);
    setToast("¡Registro Exitoso! Un asesor te contactará pronto.");
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const landingTabs = [
    { id: 'hero', icon: Home, label: 'Inicio' },
    { id: 'services', icon: Zap, label: 'Servicios' },
    { id: 'pricing', icon: Award, label: 'Planes' },
    { id: 'gallery', icon: ImageIcon, label: 'Sedes' },
    { id: 'login', icon: User, label: 'Acceso' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans scroll-smooth">
      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
        {showJoinModal && (
          <Modal title="Únete a la Revolución" onClose={() => setShowJoinModal(false)}>
            <form onSubmit={handleJoinSubmit} className="space-y-4">
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em] mb-4">Completa tus datos para empezar tu transformación.</p>
              <input type="text" placeholder="Nombre completo" required className="w-full px-4 py-4 bg-zinc-100 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-brand font-bold text-xs uppercase" />
              <input type="email" placeholder="Correo electrónico" required className="w-full px-4 py-4 bg-zinc-100 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-brand font-bold text-xs" />
              <button type="submit" className="w-full brutalist-button py-4 text-black shadow-lg shadow-brand/20">Solicitar Membresía</button>
            </form>
          </Modal>
        )}
        {showLeadModal && (
          <Modal title="Tu Primer Día es Gratis" onClose={() => setShowLeadModal(false)}>
            <form onSubmit={handleLeadSubmit} className="space-y-6">
              <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 flex gap-4 items-center mb-4">
                <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center text-black shadow-lg"><Zap size={24} /></div>
                <div>
                   <p className="text-[10px] font-black uppercase text-brand">Promoción Activa</p>
                   <p className="text-xs font-black uppercase text-white">Full Access por 24 horas</p>
                </div>
              </div>
              <div className="space-y-4">
                 <input type="text" placeholder="Nombre" required className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none font-bold text-xs" />
                 <input type="tel" placeholder="Tu WhatsApp" required className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none font-bold text-xs" />
              </div>
              <button type="submit" className="w-full py-4 bg-zinc-900 text-brand rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl">Obtener Mi Pase <ChevronRight size={14} className="inline ml-2" /></button>
              <p className="text-[8px] text-zinc-400 text-center font-bold uppercase tracking-widest">Al dar clic aceptas los términos de Gym Smart</p>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav className="bg-white border-b border-zinc-200 sticky top-0 z-50 px-6 py-4 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-2">
          <div className="bg-black p-1.5 rounded-lg">
            <Dumbbell className="text-brand w-6 h-6" />
          </div>
          <span className="font-display text-2xl font-black italic uppercase tracking-tighter">
            {content.gymName}
          </span>
        </div>
        
        <div className="hidden md:flex gap-6 font-bold uppercase text-sm tracking-widest items-center">
          <button onClick={() => scrollToSection('sedes')} className="hover:text-brand-dark transition-colors text-[10px] font-black">Sedes</button>
          <button onClick={() => scrollToSection('planes')} className="hover:text-brand-dark transition-colors text-[10px] font-black">Planes</button>
          <button onClick={() => scrollToSection('footer')} className="hover:text-brand-dark transition-colors text-[10px] font-black">Horarios</button>
          <button onClick={() => setShowLeadModal(true)} className="flex items-center gap-2 bg-brand text-black px-5 py-2.5 rounded-xl hover:bg-black hover:text-white transition-all active:scale-95 border border-brand-dark shadow-lg shadow-brand/10">
            <Zap size={14} /> <span className="text-[10px] font-black uppercase tracking-widest mt-0.5">Pase Gratis</span>
          </button>
          <button onClick={onLogin} className="flex items-center gap-2 bg-zinc-100 text-zinc-900 px-5 py-2.5 rounded-xl hover:bg-zinc-200 transition-all active:scale-95">
            <span className="text-[10px] font-black uppercase tracking-widest mt-0.5">Acceso Staff</span> <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-[73px] left-0 right-0 bg-white border-b border-zinc-200 z-40 p-6 flex flex-col gap-6 shadow-2xl"
          >
            <button onClick={() => { scrollToSection('sedes'); setIsMenuOpen(false); }} className="font-black uppercase tracking-widest text-left">Sedes</button>
            <button onClick={() => { scrollToSection('planes'); setIsMenuOpen(false); }} className="font-black uppercase tracking-widest text-left">Planes</button>
            <button onClick={() => { setShowLeadModal(true); setIsMenuOpen(false); }} className="bg-brand text-black px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-center shadow-lg shadow-brand/20 active:scale-95 transition-all">Obtener Pase Gratis</button>
            <button onClick={() => { onLogin(); setIsMenuOpen(false); }} className="bg-black text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-center active:bg-brand active:text-black">Panel Staff</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
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
              <button onClick={() => setShowJoinModal(true)} className="brutalist-button text-lg px-12 py-4 shadow-lg shadow-brand/20 active:scale-95 transition-all">
                Unirse Ahora
              </button>
              <button onClick={() => scrollToSection('sedes')} className="brutalist-button text-lg px-12 py-4 bg-white text-black border-zinc-200 active:scale-95 transition-all">
                Conocer Sedes
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto w-full overflow-hidden">
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

      {/* Referral Program */}
      <section className="py-24 px-6 bg-zinc-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
          <Zap size={300} className="text-white" strokeWidth={1} />
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand text-black rounded-full text-[10px] font-black uppercase tracking-widest">
              <Star size={12} strokeWidth={3} /> Beneficio de Comunidad
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-white leading-none">
              {content.referralTitle}
            </h2>
            <p className="text-zinc-400 font-bold uppercase text-sm md:text-base max-w-md">
              {content.referralSubtitle}
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <button className="brutalist-button px-8 py-5 bg-white text-black hover:bg-brand transition-all flex items-center gap-3 active:scale-95 group">
                <Share2 size={20} className="group-hover:rotate-12 transition-transform" /> 
                <span className="font-black uppercase tracking-widest text-xs">Compartir Código</span>
              </button>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="bento-card p-10 bg-black border-brand/10 hover:border-brand/40 transition-all duration-500 text-white relative group overflow-hidden">
               <div className="relative z-10">
                 <p className="text-3xl font-black text-brand italic font-display mb-8 leading-tight">"SMART es otro nivel. La comunidad me motiva a superar mis límites cada día."</p>
                 <div className="flex items-center gap-5">
                   <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center font-black text-xl italic border border-zinc-700 shadow-xl">LR</div>
                   <div>
                     <p className="text-sm font-black uppercase tracking-tight">Luis Rodriguez</p>
                     <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-1">Socio Élite • 5 Referidos este mes</p>
                   </div>
                 </div>
               </div>
               <div className="mt-10 pt-8 border-t border-zinc-800 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  <span>Referencia ID: #99282</span>
                  <span className="text-brand">+ S/ 150 AHORRADO</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof & Testimonials */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5 flex flex-col justify-center space-y-8">
               <h3 className="font-display text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.9]">
                 Más que un gym, es tu <span className="text-zinc-400">estilo de vida.</span>
               </h3>
               <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest max-w-sm leading-relaxed">
                 Instalaciones de primer nivel, tecnología de punta y el mejor ambiente para alcanzar tus metas.
               </p>
               <div className="flex items-center gap-4 py-6 border-y border-zinc-100">
                  <Award size={32} className="text-brand" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Reconocimiento</p>
                    <p className="text-xs font-black uppercase tracking-tight">Mejor Gimnasio de Lima 2026</p>
                  </div>
               </div>
            </div>
            
            <div className="md:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
               <div className="bento-card p-10 bg-zinc-50 flex flex-col justify-between group hover:bg-zinc-100 transition-colors duration-500">
                  <div className="flex gap-1.5 text-brand mb-10">
                    {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                  </div>
                  <p className="font-black text-2xl italic leading-tight mb-8">"{content.testimonialText}"</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 border-l-2 border-brand pl-4 mt-auto">— {content.testimonialAuthor}</p>
               </div>
               
               <div className="bento-card p-10 bg-zinc-950 border-none text-white flex flex-col justify-between overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 opacity-20"><MessageSquare size={120} /></div>
                  <div className="relative z-10 w-full mb-12">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Próximo paso</p>
                    <p className="font-black text-2xl italic leading-tight">¿Listo para transformar tu vida?</p>
                  </div>
                  <button onClick={() => setShowJoinModal(true)} className="relative z-10 text-brand text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3 group active:scale-95 transition-all">
                    Inscríbete hoy <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform duration-500" />
                  </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 overflow-hidden bg-white">
        <div className="flex flex-nowrap gap-4 animate-scroll">
           {[
             'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
             'https://images.unsplash.com/photo-1540497077202-7c8a3999166f',
             'https://images.unsplash.com/photo-1571902943202-507ec2618e8f',
             'https://images.unsplash.com/photo-1593079831268-3381b0db4a77',
             'https://images.unsplash.com/photo-1574680096145-d05b474e2155',
             'https://images.unsplash.com/photo-1517836357463-d25dfeac3438'
           ].concat([
             'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
             'https://images.unsplash.com/photo-1540497077202-7c8a3999166f',
             'https://images.unsplash.com/photo-1571902943202-507ec2618e8f',
             'https://images.unsplash.com/photo-1593079831268-3381b0db4a77',
             'https://images.unsplash.com/photo-1574680096145-d05b474e2155',
             'https://images.unsplash.com/photo-1517836357463-d25dfeac3438'
           ]).map((img, i) => (
             <div key={i} className="w-[300px] md:w-[450px] aspect-video shrink-0 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <img src={`${img}?auto=format&fit=crop&q=80`} alt="Gym Life" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
             </div>
           ))}
        </div>
      </section>

      {/* Planes Section */}
      <section id="planes" className="bg-bg-muted py-24 px-6 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="font-display text-6xl font-black uppercase italic mb-4 tracking-tighter">Planes Smart</h2>
              <p className="text-zinc-500 text-xl font-medium max-w-md">Sin letras pequeñas, solo entrenamiento real adaptado a tus objetivos.</p>
            </div>
            <div className="bg-brand px-4 py-2 rounded-full font-black uppercase text-[10px] tracking-widest border border-brand-dark">Ahorra 20% anual</div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Básico', price: 'S/ 89', features: ['Acceso a sedes seleccionadas', 'Área de cardio y pesas', 'Sin costo de matrícula'] },
              { name: 'Smart Plus', price: 'S/ 129', features: ['Acceso a todas las sedes', 'Clases grupales ilimitadas', 'Cita nutricional mensual', 'Invita a un amigo 4 veces/mes'], best: true },
              { name: 'Black VIP', price: 'S/ 199', features: ['Todo lo del plan Plus', 'Zona de recovery y masajes', 'Tallas y toallas ilimitadas', 'Acceso a canchas de padel'] },
            ].map((plan, i) => (
              <div key={i} className={`p-10 rounded-2xl border transition-all duration-300 group ${plan.best ? 'bg-black text-white scale-105 z-10 shadow-2xl shadow-brand/10' : 'bg-white text-black border-zinc-200 shadow-sm hover:shadow-xl'}`}>
                {plan.best && <span className="bg-brand text-black px-4 py-1.5 rounded-full font-black uppercase text-[9px] tracking-widest self-start mb-6 inline-block">Recomendado</span>}
                <h3 className="font-display text-4xl font-black mb-1 italic tracking-tight">{plan.name}</h3>
                <div className="text-5xl font-black mb-10 tracking-tighter">{plan.price}<span className="text-sm font-bold text-zinc-400">/mes</span></div>
                <ul className="space-y-6 mb-12 flex-grow">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex gap-4 text-sm font-bold italic uppercase tracking-tight">
                      <CheckCircle2 className={plan.best ? "text-brand" : "text-black"} size={20} /> {f}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => setShowJoinModal(true)}
                  className={`w-full py-5 rounded-xl font-black uppercase tracking-widest transition-all ${plan.best ? 'bg-brand text-black hover:bg-brand-dark hover:-translate-y-1' : 'bg-black text-white hover:bg-zinc-800 hover:-translate-y-1'}`}
                >
                  Elegir Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sedes Section */}
      <section id="sedes" className="py-32 px-6 max-w-7xl mx-auto w-full border-t border-zinc-200 bg-white">
        <h2 className="font-display text-7xl font-black uppercase italic mb-16 text-center tracking-tighter">Nuestras <span className="text-brand-dark">Sedes</span></h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { city: 'Miraflores', address: 'Av. Larco 456', img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80' },
            { city: 'San Isidro', address: 'Av. Javier Prado 1234', img: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80' },
            { city: 'Arequipa', address: 'C.C. Cayma Local 12', img: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80' }
          ].map((sede, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-white group border border-zinc-100 shadow-sm hover:shadow-2xl transition-all duration-500">
              <div className="h-64 overflow-hidden relative">
                <img src={sede.img} alt={sede.city} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              </div>
              <div className="p-8">
                <h3 className="font-display text-3xl font-black mb-2 tracking-tight italic">{sede.city}</h3>
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">{sede.address}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trainers Section */}
      <section className="py-32 px-6 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-6xl font-black uppercase italic tracking-tighter mb-4">Elite Staff</h2>
            <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">Entrena con los mejores profesionales del país</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: 'Renzo G.', role: 'Head Coach', img: 'https://images.unsplash.com/photo-1567013127542-490d757e51fe?auto=format&fit=crop&q=80' },
              { name: 'Milagros L.', role: 'Yoga Specialist', img: 'https://images.unsplash.com/photo-1518611012118-296156a2f44f?auto=format&fit=crop&q=80' },
              { name: 'Diego P.', role: 'Cycling Pro', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80' },
              { name: 'Carla M.', role: 'Zumba Master', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80' },
            ].map((trainer, i) => (
              <div key={i} className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-zinc-200">
                <img src={trainer.img} alt={trainer.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 blur-[0.5px] group-hover:blur-0" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand mb-1">{trainer.role}</p>
                  <h4 className="text-2xl font-black uppercase italic tracking-tight">{trainer.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-black text-white py-16 px-6 mt-auto">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Dumbbell className="text-brand w-8 h-8" />
              <span className="font-display text-3xl font-black italic uppercase">{content.gymName}</span>
            </div>
            <p className="text-zinc-400 max-w-sm mb-8">
              Transformando el fitness en Perú con tecnología y pasión. Encuentra tu mejor versión con nosotros.
            </p>
            <div className="flex gap-4">
              <div className="bg-white p-2 rounded-full text-black hover:bg-brand transition-colors cursor-pointer"><Facebook size={20} /></div>
              <div className="bg-white p-2 rounded-full text-black hover:bg-brand transition-colors cursor-pointer"><Instagram size={20} /></div>
            </div>
          </div>
          <div>
            <h4 className="font-black uppercase mb-6 text-brand">Contacto</h4>
            <div className="space-y-4 text-zinc-400">
              <p className="flex items-center gap-2"><MapPin size={18} /> Av. Javier Prado Este 1234, Lima</p>
              <p className="flex items-center gap-2"><Phone size={18} /> (01) 456-7890</p>
            </div>
          </div>
          <div>
            <h4 className="font-black uppercase mb-6 text-brand">Suscripción</h4>
            <div className="flex">
              <input type="email" placeholder="Tu email" className="bg-zinc-900 border-2 border-zinc-700 px-4 py-2 w-full focus:border-brand outline-none" />
              <button className="bg-brand text-black px-4 font-bold border-2 border-brand border-l-0">OK</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-zinc-800 mt-16 pt-8 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} Gym Smart Perú. Todos los derechos reservados.
        </div>
      </footer>

      <BottomNav 
        activeTab="hero" 
        onTabChange={(id) => {
          if (id === 'login') onLogin();
          else scrollToSection(id);
        }} 
        tabs={landingTabs} 
      />
    </div>
  );
};

const Dashboard = ({ 
  user, 
  onLogout, 
  landingContent, 
  onUpdateLanding,
  loyaltyConfig,
  onUpdateLoyalty
}: { 
  user: { name: string, role: 'admin' | 'superadmin' }, 
  onLogout: () => void, 
  landingContent: LandingContent, 
  onUpdateLanding: (content: LandingContent) => void,
  loyaltyConfig: LoyaltyConfig,
  onUpdateLoyalty: (config: LoyaltyConfig) => void
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'clients' | 'payments' | 'schedule' | 'marketing' | 'settings' | 'cms' | 'loyalty_config' | 'referral_config' | 'achievements_config'>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [brandColor, setBrandColor] = useState('#FF3B30'); // Default to Red
  const [toast, setToast] = useState<string | null>(null);
  const [showNewMemberModal, setShowNewMemberModal] = useState(false);

  // Local state for CMS form
  const [cmsForm, setCmsForm] = useState(landingContent);

  const handleCmsSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateLanding(cmsForm);
    setToast("Contenido de la Landing actualizado.");
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--brand-color', brandColor);
    // Dynamic dark shade calculation
    const isDefaultRed = brandColor === '#FF3B30';
    document.documentElement.style.setProperty('--brand-color-dark', isDefaultRed ? '#D7261E' : brandColor);
  }, [brandColor]);

  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [payments] = useState<Payment[]>(MOCK_PAYMENTS);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAction = (msg: string) => {
    setToast(msg);
  };

  const handleNewMember = (e: React.FormEvent) => {
    e.preventDefault();
    setShowNewMemberModal(false);
    setToast("Socio registrado con éxito.");
  };

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.membershipId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = useMemo(() => ({
    totalClients: clients.length,
    activeMembers: clients.filter(c => c.status === 'Activo').length,
    monthlyRevenue: payments.reduce((acc, curr) => acc + curr.amount, 0),
    expiringSoonEntries: clients.filter(c => c.duesSoon).length,
  }), [clients, payments]);

  const dashboardTabs = [
    { id: 'overview', icon: LayoutDashboard, label: 'Inicio' },
    { id: 'clients', icon: Users, label: 'Socios' },
    { id: 'payments', icon: CardIcon, label: 'Caja' },
    { id: 'marketing', icon: Megaphone, label: 'Comunidad' },
    { id: 'cms', icon: Globe, label: 'Web' },
  ];

  const NavButton = ({ tab, icon: Icon, label, disabled = false }: { tab: any, icon: any, label: string, disabled?: boolean, key?: any }) => (
    <button 
      onClick={() => { setActiveTab(tab); setIsSidebarOpen(false); }}
      disabled={disabled}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === tab ? 'bg-zinc-900 text-brand' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'} ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
    >
      {activeTab === tab && <div className="w-1.5 h-1.5 rounded-full bg-brand shadow-[0_0_8px_var(--brand-color)]" />}
      <Icon size={18} /> {label}
    </button>
  );

  return (
    <div className="flex h-screen bg-bg-muted font-sans overflow-hidden relative">
      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
        {showNewMemberModal && (
          <Modal title="Registrar Nuevo Socio" onClose={() => setShowNewMemberModal(false)}>
            <form onSubmit={handleNewMember} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Nombres" required className="px-4 py-3 bg-zinc-100 rounded-xl outline-none border border-zinc-200 text-xs font-bold" />
                <input type="text" placeholder="Apellidos" required className="px-4 py-3 bg-zinc-100 rounded-xl outline-none border border-zinc-200 text-xs font-bold" />
              </div>
              <input type="email" placeholder="Email" required className="w-full px-4 py-3 bg-zinc-100 rounded-xl outline-none border border-zinc-200 text-xs font-bold" />
              <select className="w-full px-4 py-3 bg-zinc-100 rounded-xl outline-none border border-zinc-200 text-xs font-bold">
                <option>Básico</option>
                <option>Plus</option>
                <option>VIP</option>
              </select>
              <button type="submit" className="w-full brutalist-button py-4 text-black">Finalizar Registro</button>
            </form>
          </Modal>
        )}
      </AnimatePresence>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden" 
            onClick={() => setIsSidebarOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-72 bg-black text-white flex flex-col border-r border-zinc-800 z-50 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-brand p-2 rounded-xl">
                <Dumbbell className="text-black w-6 h-6" />
              </div>
              <span className="font-display text-2xl font-black uppercase italic tracking-tighter">Gym<span className="text-brand">Smart</span></span>
            </div>
            <button className="lg:hidden p-2 text-zinc-400" onClick={() => setIsSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] mt-3 font-black">SISTEMA CENTRAL V1.2</p>
        </div>
        
        <nav className="flex-grow px-4 space-y-1 overflow-y-auto custom-scrollbar pb-8">
          <p className="px-4 text-[8px] font-black uppercase text-zinc-600 mb-2 mt-4 tracking-widest">General</p>
          {dashboardTabs.map(tab => (
            <NavButton key={tab.id} tab={tab.id} icon={tab.icon} label={tab.label} />
          ))}
          <NavButton tab="schedule" icon={Calendar} label="Horarios" />

          {/* Conditional Loyalty Menus */}
          {(loyaltyConfig.isLoyaltyCardEnabled || loyaltyConfig.referralBonusEnabled || loyaltyConfig.achievementSystemEnabled) && (
            <div className="pt-4 space-y-1">
              <p className="px-4 text-[8px] font-black uppercase text-brand/60 mb-2 tracking-widest">Config. Fidelidad</p>
              {loyaltyConfig.isLoyaltyCardEnabled && (
                <NavButton tab="loyalty_config" icon={QrCode} label="Config. Tarjeta" />
              )}
              {loyaltyConfig.referralBonusEnabled && (
                <NavButton tab="referral_config" icon={Gift} label="Config. Referidos" />
              )}
              {loyaltyConfig.achievementSystemEnabled && (
                <NavButton tab="achievements_config" icon={Award} label="Config. Logros" />
              )}
            </div>
          )}

          {user.role === 'superadmin' && (
            <div className="pt-4">
              <p className="px-4 text-[8px] font-black uppercase text-zinc-600 mb-2 tracking-widest">Sistema</p>
              <NavButton tab="settings" icon={Settings} label="Personalización" />
            </div>
          )}
        </nav>

        <div className="p-8 mt-auto border-t border-zinc-800">
          <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 mb-6 font-bold">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                <Shield size={14} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Estado Nodo</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase text-zinc-300 tracking-tight">Sincronizado</span>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 p-4 bg-zinc-900 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
          >
            <LogOut size={16} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-auto h-full pb-20 lg:pb-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-zinc-200 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 bg-zinc-100 rounded-xl text-zinc-900" 
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div>
               <h2 className="text-xl font-black uppercase italic tracking-tighter hidden sm:block">Panel de Control</h2>
               <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-none mt-1">Smart Nodes / Lima HQ</p>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-8">
            <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
              <input 
                type="text" 
                placeholder="Buscar (Alt + K)..." 
                className="bg-zinc-100 border border-zinc-200 rounded-2xl pl-11 pr-5 py-2.5 text-xs w-72 outline-none focus:ring-2 focus:ring-brand/30 font-bold transition-all" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-4 border-l border-zinc-100 pl-4 lg:pl-8">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-zinc-900 flex items-center justify-center text-[10px] text-brand font-black italic shadow-lg shadow-black/10">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-white rounded-full" />
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-[11px] font-black leading-none uppercase text-zinc-900">{user.name}</p>
                <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1.5 flex items-center justify-end gap-1">
                  <Activity size={10} className="text-brand-dark" /> {user.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 lg:p-10 mx-auto w-full max-w-[1600px] flex-1 overflow-auto">
          {activeTab === 'overview' ? (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Row 1: Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bento-card p-6 flex flex-col justify-between min-h-[160px] bg-white group hover:border-brand/40 transition-all">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-zinc-600 transition-colors">Socios Activos</span>
                    <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                      <Users size={16} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                       <p className="text-4xl font-black font-display italic leading-none">{stats.activeMembers}</p>
                       <span className="text-[10px] font-black text-green-600 uppercase">+12%</span>
                    </div>
                    <p className="text-[9px] font-bold text-zinc-400 mt-2 uppercase tracking-widest leading-none">Crecimiento en Lima</p>
                  </div>
                </div>

                <div className="bento-card p-6 flex flex-col justify-between min-h-[160px] bg-white group hover:border-brand/40 transition-all">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-zinc-600 transition-colors">Ingresos Hoy</span>
                    <div className="w-8 h-8 rounded-xl bg-brand/10 flex items-center justify-center text-brand-dark">
                      <CreditCard size={16} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                       <p className="text-4xl font-black font-display italic leading-none">S/ {stats.monthlyRevenue}</p>
                       <span className="text-[10px] font-black text-brand-dark uppercase">En Línea</span>
                    </div>
                    <p className="text-[9px] font-bold text-zinc-400 mt-2 uppercase tracking-widest leading-none">Corte a las 14:00 PM</p>
                  </div>
                </div>

                <div className="bento-card p-6 flex flex-col justify-between min-h-[160px] bg-white group hover:border-brand/40 transition-all border-l-4 border-l-brand">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Total Membresías</span>
                    <div className="w-8 h-8 rounded-xl bg-zinc-900 flex items-center justify-center text-brand">
                      <Star size={16} />
                    </div>
                  </div>
                  <div>
                    <p className="text-4xl font-black font-display italic leading-none">{stats.totalClients}</p>
                    <p className="text-[9px] font-bold text-zinc-400 mt-2 uppercase tracking-widest leading-none">Inscritos este año</p>
                  </div>
                </div>

                <div className="bento-card p-6 flex flex-col justify-between min-h-[160px] bg-zinc-900 text-white group border-none shadow-xl shadow-black/20">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Alertas Sistema</span>
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-red-500">
                      <Bell size={16} className="animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <p className="text-4xl font-black font-display italic leading-none">{stats.expiringSoonEntries}</p>
                    <p className="text-[9px] font-bold text-zinc-500 mt-2 uppercase tracking-widest leading-none text-red-400">Acción requerida</p>
                  </div>
                </div>
              </div>

              {/* Row 2: Analytics & Real-time alerts */}
              <div className="grid grid-cols-12 gap-6 items-stretch">
                {/* Chart Segment */}
                <div className="col-span-12 lg:col-span-8 bento-card p-8 bg-white overflow-hidden flex flex-col">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="font-black uppercase text-[10px] tracking-widest text-zinc-400 mb-1">Análisis de Datos</h3>
                      <h4 className="font-display text-2xl font-black italic uppercase tracking-tighter">Asistencia Semanal</h4>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-brand" />
                        <span className="text-[9px] font-black uppercase text-zinc-400">Presencial</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-black" />
                        <span className="text-[9px] font-black uppercase text-zinc-400">Digital</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex items-end gap-3 h-64">
                    {[65, 80, 95, 75, 100, 45, 30].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-3 group translate-y-2 hover:translate-y-0 transition-transform">
                        <div className="w-full relative flex flex-col justify-end gap-1 h-full">
                          <motion.div 
                            initial={{ height: 0 }} 
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className={`w-full rounded-t-lg transition-colors ${i === 4 ? 'bg-brand' : 'bg-zinc-100 group-hover:bg-zinc-200'}`} 
                          />
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <span className="text-[8px] font-black bg-black text-white px-1.5 py-0.5 rounded italic">{(h * 1.5).toFixed(0)} pax</span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-black ${i === 4 ? 'text-black' : 'text-zinc-400'}`}>
                          {['L', 'M', 'M', 'J', 'V', 'S', 'D'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vertical Alerts Sidebar */}
                <div className="col-span-12 lg:col-span-4 bento-card border-none bg-red-600 text-white p-8 flex flex-col group overflow-hidden relative shadow-2xl shadow-red-500/20">
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:scale-110 transition-transform">
                    <Activity size={160} strokeWidth={4} />
                  </div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-8">
                      <h3 className="font-display text-4xl font-black uppercase italic italic tracking-tighter leading-none">Alertas<br />Críticas</h3>
                      <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Bell size={20} className="animate-bounce" />
                      </div>
                    </div>
                    
                    <div className="space-y-4 flex-1">
                       {clients.filter(c => c.duesSoon).slice(0, 3).map(client => (
                         <div key={client.id} className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center gap-4 hover:bg-white/20 transition-colors">
                           <div className="w-10 h-10 rounded-xl bg-white text-red-600 flex items-center justify-center font-black italic">
                             {client.avatar}
                           </div>
                           <div className="flex-1">
                             <p className="text-xs font-black uppercase tracking-tight">{client.name}</p>
                             <p className="text-[9px] text-red-100 font-bold mt-0.5 uppercase tracking-widest tracking-widest">Socio {client.membershipId} • VENCE HOY</p>
                           </div>
                         </div>
                       ))}
                    </div>

                    <button className="mt-8 w-full bg-white text-red-600 text-[10px] font-black uppercase tracking-widest py-4 rounded-xl hover:bg-zinc-100 transition-all shadow-xl shadow-black/10 active:scale-95">
                      Gestionar Caducidades
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 3: Business Intelligence & Secondary Revenue */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {/* Heatmap Section */}
                <div className="lg:col-span-3 bento-card p-8 bg-black text-white border-none shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none"><Zap size={200} /></div>
                   <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-center mb-8">
                         <div>
                            <h4 className="text-xl font-black uppercase italic tracking-tighter text-brand">Heatmap de Afluencia</h4>
                            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Horas pico vs Capacidad</p>
                         </div>
                         <div className="bg-zinc-800 px-3 py-1.5 rounded-xl border border-zinc-700 text-[8px] font-black uppercase">Última Semana</div>
                      </div>
                      
                      <div className="flex-1 h-[140px] mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={[
                            { h: '06AM', p: 40 },
                            { h: '08AM', p: 85 },
                            { h: '10AM', p: 60 },
                            { h: '12PM', p: 30 },
                            { h: '14PM', p: 45 },
                            { h: '16PM', p: 70 },
                            { h: '18PM', p: 115 },
                            { h: '20PM', p: 95 },
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1F2937" />
                            <XAxis dataKey="h" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 900, fill: '#6B7280'}} dy={10} />
                            <Tooltip 
                              cursor={{fill: '#27272A'}}
                              contentStyle={{ backgroundColor: '#000', border: '1px solid #3F3F46', color: '#fff', fontSize: '10px' }}
                            />
                            <Bar dataKey="p" fill="#7FFF00" radius={[10, 10, 0, 0]}>
                              { [40, 85, 60, 30, 45, 70, 115, 95].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry > 100 ? '#F87171' : '#7FFF00'} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="mt-8 flex justify-between items-center bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
                         <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-red-400"></div>
                            <span className="text-[9px] font-black uppercase text-zinc-400">Sobrecapacidad</span>
                         </div>
                         <p className="text-[10px] font-black uppercase italic">Mejor hora para limpieza: <span className="text-brand font-display">01:00 PM</span></p>
                      </div>
                   </div>
                </div>

                {/* Secondary Revenue Card */}
                <div className="lg:col-span-2 bento-card p-8 bg-white flex flex-col justify-between group overflow-hidden">
                   <div className="absolute -bottom-10 -right-10 text-zinc-50 opacity-0 group-hover:opacity-100 transition-opacity"><ShoppingBag size={180} /></div>
                   <div className="relative z-10">
                      <div className="flex justify-between items-start mb-10">
                         <div className="p-4 bg-zinc-100 rounded-2xl text-zinc-400 group-hover:text-brand-dark group-hover:bg-brand/10 transition-all"><ShoppingBag size={24} /></div>
                         <div className="text-right">
                            <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Ingresos Secundarios</p>
                            <p className="text-[9px] font-black uppercase text-green-600 bg-green-50 px-2 py-0.5 rounded-full inline-block">S/ +2,450/mes</p>
                         </div>
                      </div>
                      <h4 className="text-3xl font-black uppercase italic tracking-tighter leading-none mb-6">Smart<br />Store & Bar</h4>
                      
                      <div className="space-y-4">
                        {[
                          { name: 'Suplementos', val: 'S/ 1,200', pct: 60 },
                          { name: 'Accesorios', val: 'S/ 850', pct: 30 },
                          { name: 'Café/Snacks', val: 'S/ 400', pct: 10 },
                        ].map((s, i) => (
                          <div key={i} className="space-y-1.5">
                             <div className="flex justify-between text-[8px] font-black uppercase italic">
                                <span>{s.name}</span>
                                <span>{s.val}</span>
                             </div>
                             <div className="w-full h-1 bg-zinc-50 rounded-full overflow-hidden">
                                <div className="h-full bg-zinc-900 group-hover:bg-brand transition-colors" style={{ width: `${s.pct}%` }}></div>
                             </div>
                          </div>
                        ))}
                      </div>
                   </div>
                   <button onClick={() => setActiveTab('marketing')} className="mt-8 relative z-10 w-full py-4 border border-zinc-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-950 hover:text-white transition-all">Ver Inventario Full</button>
                </div>
              </div>

              {/* Row 4: Loyalty & Retention */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bento-card p-8 bg-brand border-none text-black flex items-center justify-between shadow-xl shadow-brand/10">
                   <div className="space-y-4">
                      <div>
                         <p className="text-[10px] font-black uppercase text-black/60 tracking-widest">Puntos en Circulación</p>
                         <p className="text-4xl font-black font-display italic">12,450</p>
                      </div>
                      <div className="flex gap-2">
                         <span className="px-3 py-1 bg-black text-brand text-[8px] font-black uppercase rounded-full">Retention up 12%</span>
                         <span className="px-3 py-1 bg-white/40 text-black text-[8px] font-black uppercase rounded-full">Loyalty Active</span>
                      </div>
                   </div>
                   <Trophy size={64} className="text-black/10" strokeWidth={3} />
                </div>

                <div className="bento-card p-8 bg-white flex flex-col justify-between group">
                   <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Referidos este mes</p>
                        <p className="text-4xl font-black font-display italic mt-2">24</p>
                      </div>
                      <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:bg-brand/10 group-hover:text-brand transition-all">
                        <Share2 size={24} />
                      </div>
                   </div>
                   <div className="w-full flex gap-1 h-1.5 bg-zinc-100 rounded-full mt-6 overflow-hidden">
                      <div className="w-2/3 h-full bg-black rounded-full" />
                   </div>
                   <p className="text-[9px] font-black uppercase text-zinc-400 mt-2 tracking-widest">Meta mensual: 30</p>
                </div>

                <div className="bento-card p-8 bg-zinc-950 text-white border-none flex flex-col justify-center items-center text-center gap-4 relative overflow-hidden group">
                   <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--brand-color)_0%,_transparent_70%)] group-hover:opacity-20 transition-opacity" />
                   <QrCode size={40} className="text-brand mb-2" />
                   <div>
                     <p className="text-xs font-black uppercase italic tracking-tight">Registro de Visitas</p>
                     <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Escáner de Recepción Listo</p>
                   </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px]">
              {/* Schedule Tab */}
              {activeTab === 'schedule' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {GYM_INFO.hours.map((h, i) => (
                      <div key={i} className="bento-card p-6 bg-white flex items-center gap-4">
                        <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-900">
                          <Clock size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{h.label}</p>
                          <p className="text-lg font-black uppercase tracking-tight">{h.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bento-card bg-white overflow-hidden">
                    <div className="bg-black text-white p-6 flex justify-between items-center">
                      <h3 className="font-display text-2xl font-black italic uppercase tracking-tighter">Cronograma de Clases</h3>
                      <button className="brutalist-button py-2 px-6 text-[10px] bg-brand text-black">Añadir Clase</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-zinc-100">
                       {MOCK_SCHEDULES.map((s) => (
                         <div key={s.id} className="p-8 border-b border-r border-zinc-100 hover:bg-zinc-50 transition-colors group">
                           <div className="flex justify-between items-start mb-6">
                             <div className="p-3 bg-zinc-900 text-brand rounded-2xl group-hover:scale-110 transition-transform">
                               <Calendar size={20} />
                             </div>
                             <span className="text-[10px] font-black uppercase tracking-widest bg-zinc-100 px-3 py-1 rounded-full">{s.time}</span>
                           </div>
                           <h4 className="text-xl font-black uppercase tracking-tight mb-2">{s.class}</h4>
                           <div className="space-y-2 mb-6">
                             <p className="text-xs text-zinc-500 font-bold flex items-center gap-2 italic"><Users size={14} className="text-zinc-300" /> Coach: {s.instructor}</p>
                             <p className="text-xs text-zinc-500 font-bold flex items-center gap-2 italic"><Target size={14} className="text-zinc-300" /> {s.day}</p>
                           </div>
                           <div className="flex items-center justify-between pt-6 border-t border-zinc-100">
                             <div className="text-[10px] font-black uppercase text-zinc-400">Cupos: <span className="text-zinc-900">{s.booked}/{s.capacity}</span></div>
                             <div className="w-24 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                               <div className="h-full bg-brand" style={{ width: `${(s.booked / s.capacity) * 100}%` }} />
                             </div>
                           </div>
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
              )}
              {/* Clients Tab */}
              {activeTab === 'clients' && (
                <div className="bento-card overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-black text-white font-black uppercase text-[10px] tracking-[0.2em]">
                        <th className="px-6 py-4 border-r border-zinc-800">Nombre</th>
                        <th className="px-6 py-4 border-r border-zinc-800">Email</th>
                        <th className="px-6 py-4 border-r border-zinc-800">Plan</th>
                        <th className="px-6 py-4 border-r border-zinc-800">Estado</th>
                        <th className="px-6 py-4 border-r border-zinc-800">Último Pago</th>
                        <th className="px-6 py-4 border-r border-zinc-800 text-center">IMC / Meta</th>
                        <th className="px-6 py-4 text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs font-bold uppercase tracking-tighter">
                      {filteredClients.map((client) => {
                        const clientImc = client.weight && client.height ? (client.weight / ((client.height / 100) ** 2)).toFixed(1) : 'N/A';
                        return (
                          <tr key={client.id} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                            <td className="px-6 py-4 border-r border-zinc-100">
                               <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-zinc-900 text-brand rounded-lg flex items-center justify-center text-[10px] font-black italic">{client.avatar}</div>
                                  <div>
                                     <p className="font-black">{client.name}</p>
                                     <p className="text-[8px] text-zinc-400 tracking-widest">{client.membershipId}</p>
                                  </div>
                               </div>
                            </td>
                            <td className="px-6 py-4 border-r border-zinc-100 text-zinc-500 lowercase font-medium">{client.email}</td>
                            <td className="px-6 py-4 border-r border-zinc-100">
                              <span className="bg-zinc-100 px-2 py-1 rounded-md text-[9px] border border-zinc-200">{client.plan}</span>
                            </td>
                            <td className="px-6 py-4 border-r border-zinc-100">
                              <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[9px] border ${
                                client.status === 'Activo' ? 'bg-green-50 text-green-700 border-green-100' : 
                                client.status === 'Vencido' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-zinc-50 text-zinc-500 border-zinc-200'
                              }`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${
                                  client.status === 'Activo' ? 'bg-green-600' : 
                                  client.status === 'Vencido' ? 'bg-red-600' : 'bg-zinc-400'
                                }`} />
                                {client.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 border-r border-zinc-100 text-center">
                               <div className="inline-flex flex-col items-center">
                                  <span className={`text-[10px] font-black ${Number(clientImc) > 25 ? 'text-orange-500' : 'text-zinc-900'}`}>{clientImc}</span>
                                  <span className="text-[7px] text-zinc-400 leading-none">Masa Muscular</span>
                               </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <div className="flex justify-center gap-2">
                                <button className="p-2 bg-zinc-100 rounded-lg hover:bg-black hover:text-white transition-all" title="Ver Ficha Médica"><Activity size={14} /></button>
                                <button className="p-2 bg-zinc-100 rounded-lg hover:bg-brand hover:text-black transition-all" title="Editar Perfil"><Edit3 size={14} /></button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'payments' && (
                 <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 bento-card overflow-hidden bg-white">
                      <div className="bg-black text-white p-4 font-black uppercase text-[10px] tracking-[0.2em] italic border-b border-zinc-800">Transacciones Recientes</div>
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-zinc-200 text-[9px] font-black uppercase tracking-widest text-zinc-400">
                            <th className="px-6 py-4">Cliente</th>
                            <th className="px-6 py-4">Monto</th>
                            <th className="px-6 py-4">Método</th>
                            <th className="px-6 py-4">Fecha</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs font-black uppercase">
                          {payments.map(p => (
                            <tr key={p.id} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
                              <td className="px-6 py-4">{p.clientName}</td>
                              <td className="px-6 py-4 text-brand-dark">S/ {p.amount}</td>
                              <td className="px-6 py-4">
                                <span className="bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200 text-[9px]">{p.method}</span>
                              </td>
                              <td className="px-6 py-4 text-zinc-400 font-bold">{p.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="space-y-6">
                      <div className="p-6 bg-brand text-black bento-card border-none rounded-2xl">
                        <h4 className="font-black uppercase text-[10px] tracking-[0.2em] mb-4 text-black/60">Caja del Día</h4>
                        <div className="text-4xl font-black mb-2 italic font-display">S/ {payments.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)}</div>
                        <p className="text-[10px] font-bold text-black/40 italic uppercase tracking-widest">Corte realizado a las 14:00 PM</p>
                      </div>
                      <div className="p-6 bento-card bg-white rounded-2xl">
                        <h4 className="font-black uppercase text-[10px] tracking-[0.2em] mb-6 text-zinc-500">Métodos Populares</h4>
                        <div className="space-y-5">
                          {[
                            { name: 'Yape/Plus', value: 45, color: 'bg-brand' },
                            { name: 'Visa/Master', value: 35, color: 'bg-black' },
                            { name: 'Efectivo', value: 20, color: 'bg-zinc-200' }
                          ].map((m, i) => (
                            <div key={i} className="space-y-2">
                               <div className="flex justify-between items-center text-[10px] font-black uppercase italic">
                                <span>{m.name}</span>
                                <span>{m.value}%</span>
                              </div>
                              <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden">
                                <div className={`h-full ${m.color}`} style={{ width: `${m.value}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                 </div>
              )}

               {activeTab === 'marketing' && (
                <div className="max-w-7xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                   {/* Loyalty Program Header */}
                   <div className="bento-card p-10 bg-white shadow-sm border-zinc-100">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                           <div className="flex items-center gap-5">
                              <div className="p-4 bg-brand text-black rounded-3xl shadow-xl shadow-brand/20">
                                <Trophy size={28} />
                              </div>
                              <div>
                                <h4 className="font-display text-4xl font-black uppercase italic tracking-tighter">Programa de Fidelidad</h4>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-1">Configuración global de incentivos y retención</p>
                              </div>
                           </div>
                           <div className="flex gap-3">
                              <button onClick={() => handleAction("Backup guardado")} className="p-4 bg-zinc-50 text-zinc-400 rounded-2xl hover:text-black transition-colors"><Settings size={20} /></button>
                              <button onClick={() => handleAction("Publicado")} className="bg-black text-brand px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">Guardar Cambios</button>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                           <div className="p-8 bg-zinc-50 rounded-[2rem] border border-zinc-100 flex flex-col justify-between group hover:border-brand/30 transition-all">
                              <div className="space-y-6">
                                 <div className="flex justify-between items-center">
                                    <div className="p-3 bg-white rounded-xl shadow-sm text-zinc-400 group-hover:text-brand transition-colors"><CardIcon size={24} /></div>
                                    <button 
                                      onClick={() => onUpdateLoyalty({...loyaltyConfig, isLoyaltyCardEnabled: !loyaltyConfig.isLoyaltyCardEnabled})}
                                      className={`w-12 h-7 rounded-full transition-all relative ${loyaltyConfig.isLoyaltyCardEnabled ? 'bg-brand' : 'bg-zinc-300'}`}
                                    >
                                      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${loyaltyConfig.isLoyaltyCardEnabled ? 'left-6' : 'left-1'}`} />
                                    </button>
                                 </div>
                                 <div>
                                    <p className="text-sm font-black uppercase tracking-tight">Tarjeta Digital</p>
                                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Suma de puntos por visita</p>
                                 </div>
                              </div>
                           </div>

                           <div className="p-8 bg-zinc-50 rounded-[2rem] border border-zinc-100 flex flex-col justify-between group hover:border-brand/30 transition-all">
                              <div className="space-y-6">
                                 <div className="flex justify-between items-center">
                                    <div className="p-3 bg-white rounded-xl shadow-sm text-zinc-400 group-hover:text-brand transition-colors"><Gift size={24} /></div>
                                    <button 
                                      onClick={() => onUpdateLoyalty({...loyaltyConfig, referralBonusEnabled: !loyaltyConfig.referralBonusEnabled})}
                                      className={`w-12 h-7 rounded-full transition-all relative ${loyaltyConfig.referralBonusEnabled ? 'bg-brand' : 'bg-zinc-300'}`}
                                    >
                                      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${loyaltyConfig.referralBonusEnabled ? 'left-6' : 'left-1'}`} />
                                    </button>
                                 </div>
                                 <div>
                                    <p className="text-sm font-black uppercase tracking-tight">Bono Invitados</p>
                                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Doble puntuación</p>
                                 </div>
                              </div>
                           </div>

                           <div className="p-8 bg-zinc-50 rounded-[2rem] border border-zinc-100 flex flex-col justify-between group hover:border-brand/30 transition-all">
                              <div className="space-y-6">
                                 <div className="flex justify-between items-center">
                                    <div className="p-3 bg-white rounded-xl shadow-sm text-zinc-400 group-hover:text-brand transition-colors"><TrendingUp size={24} /></div>
                                    <button 
                                      onClick={() => onUpdateLoyalty({...loyaltyConfig, achievementSystemEnabled: !loyaltyConfig.achievementSystemEnabled})}
                                      className={`w-12 h-7 rounded-full transition-all relative ${loyaltyConfig.achievementSystemEnabled ? 'bg-brand' : 'bg-zinc-300'}`}
                                    >
                                      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${loyaltyConfig.achievementSystemEnabled ? 'left-6' : 'left-1'}`} />
                                    </button>
                                 </div>
                                 <div>
                                    <p className="text-sm font-black uppercase tracking-tight">Logros & Medallas</p>
                                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Gamificación activa</p>
                                 </div>
                              </div>
                           </div>

                           <div className="p-8 bg-brand/5 border border-brand/20 rounded-[2rem] flex flex-col justify-between">
                              <div className="space-y-4">
                                 <p className="text-[10px] font-black uppercase text-brand-dark tracking-widest leading-none">Sellos por visita</p>
                                 <div className="flex items-center justify-between bg-white rounded-2xl p-2 shadow-inner border border-brand/10">
                                    <button onClick={() => onUpdateLoyalty({...loyaltyConfig, stampsPerVisit: Math.max(1, loyaltyConfig.stampsPerVisit - 1)})} className="w-10 h-10 rounded-xl bg-zinc-50 hover:bg-zinc-100 flex items-center justify-center font-black text-black transition-colors">-</button>
                                    <span className="text-2xl font-black text-black">{loyaltyConfig.stampsPerVisit}</span>
                                    <button onClick={() => onUpdateLoyalty({...loyaltyConfig, stampsPerVisit: loyaltyConfig.stampsPerVisit + 1})} className="w-10 h-10 rounded-xl bg-zinc-50 hover:bg-zinc-100 flex items-center justify-center font-black text-black transition-colors">+</button>
                                 </div>
                              </div>
                           </div>
                        </div>
                   </div>

                   {/* Offers Management Section (Retention) */}
                   <div className="bento-card p-10 bg-zinc-950 text-white border-none overflow-hidden relative">
                      <div className="absolute top-0 right-0 p-10 text-white/5 -translate-y-10 translate-x-10"><Zap size={300} /></div>
                      <div className="relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                           <div>
                              <h4 className="font-display text-3xl font-black uppercase italic tracking-tighter text-brand">Gestor de Ofertas (Retención)</h4>
                              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-1">Ofertas exclusivas para ex-socios (Cliente 2)</p>
                           </div>
                           <button onClick={() => handleAction("Nueva oferta de retención creada")} className="bg-brand text-black px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand/20 active:scale-95 transition-all">Crear Nueva Oferta</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="p-8 bg-zinc-900 rounded-[2.5rem] border border-zinc-800 group hover:border-brand/40 transition-all">
                              <div className="flex justify-between items-start mb-8">
                                 <div className="w-14 h-14 bg-brand text-black rounded-2xl flex items-center justify-center shadow-lg"><Zap size={28} /></div>
                                 <div className="px-4 py-1 bg-green-500/10 text-green-500 rounded-full text-[8px] font-black uppercase tracking-widest border border-green-500/20">Activa</div>
                              </div>
                              <h5 className="text-xl font-black uppercase italic tracking-tight mb-2 text-white group-hover:text-brand transition-colors">50% DESCUENTO MATRÍCULA</h5>
                              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-8 leading-relaxed">Incentivo de retorno para socios inactivos por más de 30 días.</p>
                              <div className="flex gap-3 pt-6 border-t border-zinc-800">
                                 <button className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-[9px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"><Edit3 size={14} /> Editar</button>
                                 <button className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"><X size={16} /></button>
                              </div>
                           </div>

                           <div className="p-8 bg-zinc-900 rounded-[2.5rem] border border-zinc-800 group hover:border-brand/40 transition-all">
                              <div className="flex justify-between items-start mb-8">
                                 <div className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center shadow-lg"><Gift size={28} /></div>
                                 <div className="px-4 py-1 bg-green-500/10 text-green-500 rounded-full text-[8px] font-black uppercase tracking-widest border border-green-500/20">Activa</div>
                              </div>
                              <h5 className="text-xl font-black uppercase italic tracking-tight mb-2 text-white group-hover:text-brand transition-colors">KIT LIMA SMART VIP</h5>
                              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-8 leading-relaxed">Pack de bienvenida al reactivar cualquier plan Plus o VIP.</p>
                              <div className="flex gap-3 pt-6 border-t border-zinc-800">
                                 <button className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-[9px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"><Edit3 size={14} /> Editar</button>
                                 <button className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"><X size={16} /></button>
                              </div>
                           </div>
                        </div>
                      </div>
                   </div>

                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h3 className="font-display text-4xl font-black uppercase italic tracking-tighter">Crecimiento de Comunidad</h3>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Herramientas para expandir y fidelizar a nuestros socios</p>
                      </div>
                      <div className="flex gap-3">
                         <button onClick={() => handleAction("Nueva iniciativa de comunidad creada")} className="brutalist-button px-6 py-3 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                           <Plus size={14} /> Nueva Campaña
                         </button>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bento-card p-6 bg-white flex flex-col justify-between min-h-[140px] group hover:border-brand/40 transition-all">
                         <div className="flex justify-between items-start">
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Prospectos del Mes</span>
                            <div className="w-8 h-8 rounded-lg bg-brand/10 text-brand-dark flex items-center justify-center"><Users size={16} /></div>
                         </div>
                         <div>
                            <div className="flex items-baseline gap-2">
                              <p className="text-4xl font-black font-display italic">124</p>
                              <span className="text-[10px] font-black text-green-600">+15%</span>
                            </div>
                            <p className="text-[9px] text-zinc-400 font-bold uppercase mt-1 tracking-widest">Prospectos Calificados</p>
                         </div>
                      </div>

                      <div className="bento-card p-6 bg-white flex flex-col justify-between min-h-[140px] group hover:border-brand/40 transition-all">
                         <div className="flex justify-between items-start">
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Tasa de Conversión</span>
                            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-brand flex items-center justify-center"><TrendingUp size={16} /></div>
                         </div>
                         <div>
                            <p className="text-4xl font-black font-display italic">22.4%</p>
                            <p className="text-[9px] text-zinc-400 font-bold uppercase mt-1 tracking-widest">Meta mensual: 25%</p>
                         </div>
                      </div>

                      <div className="bento-card p-6 bg-zinc-900 text-white flex flex-col justify-between min-h-[140px] border-none shadow-xl shadow-black/20">
                         <div className="flex justify-between items-start">
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Referidos Exitosos</span>
                            <div className="w-8 h-8 rounded-lg bg-brand text-black flex items-center justify-center"><Gift size={16} /></div>
                         </div>
                         <div>
                            <p className="text-4xl font-black font-display text-brand italic">48</p>
                            <p className="text-[9px] text-zinc-500 font-bold uppercase mt-1 tracking-widest">S/ 2,400 en ingresos atribuidos</p>
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Leads Pipeline */}
                      <div className="lg:col-span-8 bento-card p-8 bg-white">
                         <div className="flex justify-between items-center mb-8 pb-4 border-b border-zinc-100">
                           <h4 className="font-black uppercase text-[10px] tracking-widest text-zinc-400">Seguimiento de Prospectos</h4>
                           <button className="text-[9px] font-black uppercase tracking-widest text-brand-dark bg-brand/10 px-3 py-1 rounded-full">Automático</button>
                         </div>
                         <div className="space-y-4">
                            {[
                              { name: 'Carla Mendoza', source: 'Instagram Ads', status: 'Nuevo', interest: 'Smart Plus', time: 'hace 2h' },
                              { name: 'Ricardo Santos', source: 'Web / Referido', status: 'Contactado', interest: 'Black VIP', time: 'hace 5h' },
                              { name: 'Elena Paz', source: 'Facebook', status: 'Interesado', interest: 'Básico', time: 'hace 1d' },
                              { name: 'Marco Polo', source: 'Landing Page', status: 'Nuevo', interest: 'Smart Plus', time: 'hace 1d' },
                            ].map((lead, i) => (
                              <div key={i} className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl hover:bg-zinc-100 transition-all group border border-transparent hover:border-zinc-200">
                                <div className="flex items-center gap-4">
                                   <div className="w-12 h-12 rounded-2xl bg-zinc-200 flex items-center justify-center text-zinc-500 font-black italic border border-white shadow-sm">{lead.name.split(' ').map(n => n[0]).join('')}</div>
                                   <div>
                                      <p className="text-xs font-black uppercase tracking-tight">{lead.name}</p>
                                      <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest border-l-2 border-brand pl-2 mt-0.5">{lead.source}</p>
                                   </div>
                                </div>
                                <div className="flex items-center gap-6">
                                   <div className="text-right">
                                      <p className="text-[10px] font-black uppercase mb-1">{lead.interest}</p>
                                      <div className="flex items-center justify-end gap-2 text-[8px] font-bold uppercase">
                                        <span className={`px-2 py-0.5 rounded-full ${lead.status === 'Nuevo' ? 'bg-brand text-black shadow-sm' : 'bg-zinc-200 text-zinc-600'}`}>{lead.status}</span>
                                        <span className="text-zinc-400 italic">{lead.time}</span>
                                      </div>
                                   </div>
                                   <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-xl shadow-sm border border-zinc-100"><MessageSquare size={16} className="text-zinc-500 hover:text-black" /></button>
                                </div>
                              </div>
                            ))}
                         </div>
                         <button className="w-full mt-8 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors py-4 border-t border-zinc-50">Gestionar base de datos completa</button>
                      </div>

                      {/* Marketing Automation & Loyalty */}
                      <div className="lg:col-span-4 space-y-6">
                         <div className="bento-card p-8 bg-zinc-950 text-white border-none shadow-2xl">
                            <h4 className="font-black uppercase text-[10px] tracking-widest text-zinc-500 mb-8">Acciones de Fidelidad</h4>
                            <div className="space-y-6">
                               <div className="flex gap-4 group cursor-pointer">
                                  <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0 border border-brand/20 group-hover:scale-110 transition-transform">
                                    <Gift size={20} />
                                  </div>
                                  <div>
                                    <p className="text-xs font-black uppercase tracking-tight italic group-hover:text-brand transition-colors">Bono Cumpleaños</p>
                                    <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1">SMS personal a las 09:00 AM</p>
                                  </div>
                               </div>
                               <div className="flex gap-4 opacity-40 group cursor-not-allowed">
                                  <div className="w-10 h-10 rounded-xl bg-zinc-800 text-zinc-500 flex items-center justify-center shrink-0 border border-zinc-700">
                                    <Bell size={20} />
                                  </div>
                                  <div>
                                    <p className="text-xs font-black uppercase tracking-tight italic">Rescate de Bajas</p>
                                    <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Desactivado temporalmente</p>
                                  </div>
                               </div>
                               <div className="flex gap-4 group cursor-pointer">
                                  <div className="w-10 h-10 rounded-xl bg-brand font-black text-black flex items-center justify-center shrink-0 shadow-lg shadow-brand/20 group-hover:scale-110 transition-transform">
                                    %
                                  </div>
                                  <div>
                                    <p className="text-xs font-black uppercase tracking-tight italic group-hover:text-brand transition-colors">Promo Referidos</p>
                                    <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Push Notif: 1 mes gratis</p>
                                  </div>
                               </div>
                            </div>
                            <button className="w-full mt-10 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all active:scale-95">Configurar Automatización</button>
                         </div>

                         <div className="bento-card p-8 bg-brand border-none text-black flex flex-col justify-between min-h-[250px] relative overflow-hidden group shadow-xl">
                            <div className="absolute -bottom-10 -right-10 opacity-30 group-hover:scale-110 transition-transform"><Share2 size={150} /></div>
                            <div className="relative z-10">
                               <div className="inline-block bg-black text-brand px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em] mb-6">Alta Probabilidad</div>
                                <h4 className="font-display text-4xl font-black uppercase italic leading-none tracking-tighter mb-4">Smart<br />Referidos</h4>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-black/60 max-w-[180px]">Hemos detectado que el 30% de tus socios están listos para referir.</p>
                            </div>
                            <button className="relative z-10 w-full mt-8 py-4 bg-black text-brand text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl active:scale-95 transition-all shadow-xl shadow-black/20">Lanzar Campaña Viral</button>
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'cms' && (
                <div className="max-w-5xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="flex flex-col md:flex-row gap-6 items-stretch">
                    {/* Main Form */}
                    <div className="flex-1 bento-card p-8 bg-white max-h-[80vh] overflow-y-auto custom-scrollbar">
                      <div className="flex items-center gap-4 mb-8">
                         <div className="p-3 bg-zinc-900 text-brand rounded-2xl">
                           <Edit3 size={24} />
                         </div>
                         <div>
                           <h3 className="font-display text-3xl font-black uppercase italic tracking-tighter">Gestor de Contenido</h3>
                           <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Configuración dinámina de la Landing Page</p>
                         </div>
                      </div>

                      <form onSubmit={handleCmsSave} className="space-y-6">
                        <section className="space-y-4">
                           <p className="text-[11px] font-black uppercase tracking-widest border-l-4 border-brand pl-4 py-1 bg-zinc-50">Identidad Digital</p>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Nombre del Logo</label>
                                <input type="text" value={cmsForm.gymName} onChange={(e) => setCmsForm({...cmsForm, gymName: e.target.value})} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl font-bold text-xs" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Título Stats</label>
                                <input type="text" value={cmsForm.statsSectionTitle} onChange={(e) => setCmsForm({...cmsForm, statsSectionTitle: e.target.value})} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl font-bold text-xs" />
                              </div>
                           </div>
                        </section>

                        <section className="space-y-4">
                           <p className="text-[11px] font-black uppercase tracking-widest border-l-4 border-zinc-400 pl-4 py-1 bg-zinc-50">Promociones para Socios</p>
                           <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Título Beneficio Especial</label>
                                <input type="text" value={cmsForm.referralTitle} onChange={(e) => setCmsForm({...cmsForm, referralTitle: e.target.value})} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl font-bold text-xs" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Descripción del Beneficio</label>
                                <textarea rows={2} value={cmsForm.referralSubtitle} onChange={(e) => setCmsForm({...cmsForm, referralSubtitle: e.target.value})} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl font-bold text-xs" />
                              </div>
                           </div>
                        </section>

                        <section className="space-y-4">
                           <p className="text-[11px] font-black uppercase tracking-widest border-l-4 border-red-500 pl-4 py-1 bg-zinc-50">Ofertas de Retención (Ex-Socios)</p>
                           <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Título Oferta Principal</label>
                                <input type="text" placeholder="Ej: ¡TE EXTRAÑAMOS!" className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl font-bold text-xs" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Mensaje Persuasivo</label>
                                <textarea rows={2} placeholder="Ej: Regresa hoy y obtén un beneficio exclusivo de reactivación." className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl font-bold text-xs" />
                              </div>
                           </div>
                        </section>

                        <section className="space-y-4">
                           <p className="text-[11px] font-black uppercase tracking-widest border-l-4 border-zinc-400 pl-4 py-1 bg-zinc-50">Testimonios (Social Proof)</p>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Autor</label>
                                <input type="text" value={cmsForm.testimonialAuthor} onChange={(e) => setCmsForm({...cmsForm, testimonialAuthor: e.target.value})} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl font-bold text-xs" />
                              </div>
                              <div className="space-y-2 text-zinc-400">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 opacity-50">Calificación</label>
                                <div className="p-4 bg-zinc-100 rounded-xl text-xs font-bold">5 Estrellas (Fijo)</div>
                              </div>
                           </div>
                           <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Cita del Testimonio</label>
                             <textarea rows={2} value={cmsForm.testimonialText} onChange={(e) => setCmsForm({...cmsForm, testimonialText: e.target.value})} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl font-bold text-xs italic" />
                           </div>
                        </section>

                        <section className="space-y-4">
                           <p className="text-[11px] font-black uppercase tracking-widest border-l-4 border-black pl-4 py-1 bg-zinc-50">Sección Hero (Encabezado)</p>
                           <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Título (Blanco)</label>
                                  <input type="text" value={cmsForm.heroTitle} onChange={(e) => setCmsForm({...cmsForm, heroTitle: e.target.value})} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl font-bold text-xs" />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Título (Marca)</label>
                                  <input type="text" value={cmsForm.heroAccent} onChange={(e) => setCmsForm({...cmsForm, heroAccent: e.target.value})} className="w-full p-4 bg-zinc-50 border border-brand rounded-xl font-bold text-xs text-brand-dark" />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Slogan / Bajada de texto</label>
                                <textarea rows={2} value={cmsForm.heroSubtitle} onChange={(e) => setCmsForm({...cmsForm, heroSubtitle: e.target.value})} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl font-bold text-xs" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Imagen de Fondo (URL)</label>
                                <input type="text" value={cmsForm.heroImg} onChange={(e) => setCmsForm({...cmsForm, heroImg: e.target.value})} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl font-bold text-[9px] text-zinc-400" />
                              </div>
                           </div>
                        </section>

                        <div className="pt-4">
                           <button type="submit" className="w-full brutalist-button py-5 bg-black text-white hover:bg-brand hover:text-black shadow-2xl shadow-brand/20 transition-all flex items-center justify-center gap-2 active:scale-95">
                             <Globe size={18} /> Publicar en Producción
                           </button>
                        </div>
                      </form>
                    </div>

                    {/* Preview Sidebar */}
                    <div className="w-full md:w-[320px] flex flex-col gap-6">
                      <div className="bento-card bg-zinc-900 border-none p-6 text-white overflow-hidden relative group">
                        <div className="absolute inset-0 opacity-40">
                          <img src={cmsForm.heroImg} alt="Preview" className="w-full h-full object-cover blur-sm group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                           <div className="flex justify-between items-center mb-10">
                              <span className="text-[8px] font-black uppercase tracking-widest bg-brand text-black px-2 py-0.5 rounded">PREVIEW LIVE</span>
                              <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center"><ImageIcon size={12} /></div>
                           </div>
                           <div>
                              <h5 className="font-display text-2xl font-black uppercase italic leading-none">{cmsForm.heroTitle} <span className="text-brand">{cmsForm.heroAccent}</span></h5>
                              <p className="text-[8px] text-zinc-400 font-bold uppercase mt-2 line-clamp-2">{cmsForm.heroSubtitle}</p>
                           </div>
                        </div>
                      </div>

                      <div className="bento-card p-6 bg-brand flex flex-col justify-center items-center text-center gap-4 border-none shadow-xl shadow-brand/10">
                        <div className="w-12 h-12 bg-black text-brand rounded-2xl flex items-center justify-center shadow-lg">
                           <Zap size={24} />
                        </div>
                        <div>
                           <h4 className="text-xs font-black uppercase text-black leading-tight italic">Optimización Activa</h4>
                           <p className="text-[9px] text-black/60 font-bold uppercase tracking-widest mt-1">Los cambios tardan &lt; 1s en propagarse a nivel mundial</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'loyalty_config' && (
                <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
                   <div className="flex items-center gap-4 mb-2">
                      <div className="p-3 bg-zinc-900 text-brand rounded-2xl">
                        <QrCode size={24} />
                      </div>
                      <div>
                        <h3 className="font-display text-3xl font-black uppercase italic tracking-tighter">Tarjeta de Sellos Digital</h3>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Configuración del programa de lealtad por visitas</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bento-card p-8 bg-white space-y-6">
                         <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 border-b border-zinc-100 pb-4">Reglas del Programa</p>
                         <div className="space-y-4">
                            <div className="space-y-2">
                               <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Cantidad Total de Sellos</label>
                               <select value={loyaltyConfig.totalStampsToReward} onChange={(e) => onUpdateLoyalty({...loyaltyConfig, totalStampsToReward: parseInt(e.target.value)})} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl font-bold text-xs">
                                  {[6, 8, 10, 12, 15, 20].map(n => <option key={n} value={n}>{n} Sellos</option>)}
                               </select>
                            </div>
                            <div className="space-y-2">
                               <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Recompensa al Completar</label>
                               <input type="text" value={loyaltyConfig.rewardDescription} onChange={(e) => onUpdateLoyalty({...loyaltyConfig, rewardDescription: e.target.value})} placeholder="Ej: 1 Proteína Gratis o 1 Mes 50% OFF" className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl font-bold text-xs" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Sellos por Visita</label>
                               <input type="number" value={loyaltyConfig.stampsPerVisit} onChange={(e) => onUpdateLoyalty({...loyaltyConfig, stampsPerVisit: parseInt(e.target.value)})} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl font-bold text-xs" />
                            </div>
                            <div className="pt-4 flex items-center justify-between p-4 bg-brand/5 rounded-2xl border border-brand/20">
                               <div className="flex flex-col">
                                  <span className="text-[10px] font-black uppercase tracking-widest">Validación por QR</span>
                                  <span className="text-[8px] text-zinc-500 uppercase font-bold">El socio escanea en recepción</span>
                               </div>
                               <div className="w-12 h-6 bg-brand rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                            </div>
                         </div>
                         <button onClick={() => handleAction("Configuración de sellos guardada")} className="w-full brutalist-button py-4 text-black text-[10px]">Guardar Cambios</button>
                      </div>

                      <div className="space-y-6">
                         <div className="bento-card p-8 bg-zinc-950 text-white relative overflow-hidden flex flex-col justify-between group">
                            <div className="absolute top-0 right-0 p-8 text-white/5 -translate-y-4 translate-x-4"><QrCode size={180} /></div>
                            <div className="relative z-10 space-y-4">
                               <div className="flex justify-between items-start">
                                  <div className="p-3 bg-brand text-black rounded-xl"><Shield size={20} /></div>
                                  <div className="text-right">
                                     <p className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-500">Vista Previa Socio</p>
                                     <p className="text-[10px] font-black uppercase text-brand">Tarjeta Digital</p>
                                  </div>
                               </div>
                               
                               <div className="grid grid-cols-5 gap-2 py-4">
                                  {Array.from({ length: loyaltyConfig.totalStampsToReward }).map((_, i) => (
                                     <div key={i} className={`aspect-square rounded-full border-2 flex items-center justify-center ${i < 3 ? 'bg-brand border-brand text-black' : 'border-zinc-800 text-zinc-800'}`}>
                                        {i < 3 ? <Check size={12} strokeWidth={4} /> : <span className="text-[8px] font-black">{i + 1}</span>}
                                     </div>
                                  ))}
                               </div>

                               <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
                                  <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">Recompensa</p>
                                  <p className="text-xs font-black uppercase text-white italic">{loyaltyConfig.rewardDescription || 'Configura un premio'}</p>
                               </div>
                            </div>
                            
                            <div className="relative z-10 flex items-center gap-4 mt-6 pt-6 border-t border-zinc-800">
                               <div className="bg-white p-2 rounded-lg">
                                  <QrCode size={40} className="text-black" />
                                </div>
                                <div>
                                   <p className="text-[9px] font-black uppercase tracking-tighter">Escanear para Sello</p>
                                   <p className="text-[7px] text-zinc-500 font-bold uppercase">Único por sesión/día</p>
                                </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'referral_config' && (
                <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
                   <div className="flex items-center gap-4 mb-2">
                      <div className="p-3 bg-zinc-900 text-brand rounded-2xl">
                        <Gift size={24} />
                      </div>
                      <div>
                        <h3 className="font-display text-3xl font-black uppercase italic tracking-tighter">Programa de Referidos</h3>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Reglas y beneficios por recomendación</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bento-card p-8 bg-zinc-950 text-white lg:col-span-2">
                         <h4 className="text-sm font-black uppercase tracking-widest mb-8 border-b border-zinc-800 pb-4 italic text-brand">Reglas de Campaña</h4>
                         <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                               <div className="space-y-2">
                                  <label className="text-[9px] font-black uppercase text-zinc-500">Premio para el Socio</label>
                                  <input type="text" defaultValue="+500 Puntos / 1 Mes" className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-bold text-white focus:border-brand outline-none" />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[9px] font-black uppercase text-zinc-500">Premio para el Amigo</label>
                                  <input type="text" defaultValue="Inscripción S/ 0" className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-bold text-white focus:border-brand outline-none" />
                               </div>
                            </div>
                            <div className="space-y-2 pt-4">
                               <label className="text-[9px] font-black uppercase text-zinc-500">Límite de referidos por mes</label>
                               <div className="flex gap-4 items-center">
                                  {[1,2,3,5,10].map(n => (
                                     <button key={n} className={`w-10 h-10 rounded-xl font-black text-[10px] transition-all ${n === 3 ? 'bg-brand text-black' : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'}`}>{n === 10 ? '∞' : n}</button>
                                  ))}
                               </div>
                            </div>
                         </div>
                         <button onClick={() => handleAction("Campaña de referidos actualizada")} className="w-full mt-10 bg-brand text-black py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand/20 active:scale-95 transition-all">Lanzar Actualización</button>
                      </div>

                      <div className="space-y-6">
                         <div className="bento-card p-6 bg-white flex flex-col justify-between min-h-[140px] border-zinc-200">
                            <span className="text-[9px] font-black uppercase text-zinc-400">Total Referidos</span>
                            <p className="text-4xl font-black font-display italic leading-none">42</p>
                            <div className="flex items-center gap-1 text-[8px] font-black text-green-600 mt-2">
                               <TrendingUp size={10} /> +12 % vs mes pasado
                            </div>
                         </div>
                         <div className="bento-card p-6 bg-white flex flex-col justify-between min-h-[140px] border-zinc-200">
                            <span className="text-[9px] font-black uppercase text-zinc-400">Conversión Web</span>
                            <p className="text-4xl font-black font-display italic leading-none">68%</p>
                            <p className="text-[8px] text-zinc-400 font-bold mt-2 uppercase tracking-tight">Alta efectividad en prospectos</p>
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'achievements_config' && (
                <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
                   <div className="flex items-center gap-4 mb-2">
                      <div className="p-3 bg-zinc-900 text-brand rounded-2xl">
                        <Award size={24} />
                      </div>
                      <div>
                        <h3 className="font-display text-3xl font-black uppercase italic tracking-tighter">Sistema de Medallas</h3>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Gamificación y retos para nuestra comunidad</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                         { name: 'Madrugador Elite', req: '5 check-ins antes 7am', icon: Clock, color: 'bg-orange-500/10 text-orange-500' },
                         { name: 'Guerrero Fundador', req: '12 meses ininterrumpidos', icon: Shield, color: 'bg-zinc-900 text-brand' },
                         { name: 'Social Star', req: '5 referidos exitosos', icon: Share2, color: 'bg-blue-500/10 text-blue-500' },
                         { name: 'Maestro Functional', req: '10 clases grupales', icon: Users, color: 'bg-purple-500/10 text-purple-500' },
                         { name: 'Power Lifter', req: 'Récord de peso personal', icon: Dumbbell, color: 'bg-brand/10 text-brand-dark' },
                      ].map((m, i) => (
                         <div key={i} className="bento-card p-8 bg-white border-zinc-100 flex flex-col items-center text-center gap-4 group hover:border-brand/30 transition-all">
                            <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center mb-2 shadow-inner ${m.color} group-hover:scale-110 transition-transform`}><m.icon size={28} /></div>
                            <div>
                               <h5 className="text-[11px] font-black uppercase tracking-tight mb-1">{m.name}</h5>
                               <p className="text-[9px] text-zinc-400 font-bold uppercase leading-tight">{m.req}</p>
                            </div>
                            <div className="flex gap-2 w-full mt-4">
                               <button className="flex-1 py-2 text-[8px] font-black uppercase bg-zinc-50 hover:bg-zinc-100 rounded-lg transition-colors">Editar</button>
                               <button className="px-3 py-2 text-[8px] font-black uppercase bg-red-50 text-red-500 rounded-lg">Borrar</button>
                            </div>
                         </div>
                      ))}
                      <div className="bento-card p-8 border-dashed border-zinc-200 flex flex-col justify-center items-center gap-4 bg-zinc-50/50 hover:bg-white hover:border-brand transition-all cursor-pointer group">
                         <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-zinc-300 group-hover:text-brand shadow-sm transition-colors">
                            <Plus size={20} />
                         </div>
                         <p className="text-[10px] font-black uppercase text-zinc-400 group-hover:text-black transition-colors tracking-widest">Nueva Medalla</p>
                      </div>
                   </div>
                </div>
              )}
              {activeTab === 'settings' && user.role === 'superadmin' && (
                <div className="max-w-4xl space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="bento-card p-10 bg-white">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 bg-brand/10 rounded-2xl text-brand">
                        <Palette size={24} />
                      </div>
                      <div>
                        <h3 className="font-display text-3xl font-black uppercase italic tracking-tight">Personalización de Marca</h3>
                        <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-[0.2em] mt-1">Configura la identidad visual de Gym Smart</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Color Primario (Neon Accent)</label>
                          <div className="flex flex-wrap gap-4">
                            {['#FF3B30', '#BFFF00', '#007AFF', '#5856D6', '#AF52DE', '#FF9500'].map((color) => (
                              <button
                                key={color}
                                onClick={() => setBrandColor(color)}
                                className={`w-12 h-12 rounded-xl transition-all duration-300 border-4 ${brandColor === color ? 'border-black scale-110 shadow-xl' : 'border-transparent hover:scale-105'}`}
                                style={{ backgroundColor: color }}
                              />
                            ))}
                            <div className="relative group">
                              <input 
                                type="color" 
                                value={brandColor} 
                                onChange={(e) => setBrandColor(e.target.value)}
                                className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border-2 border-zinc-100 p-1"
                              />
                              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase hidden group-hover:block transition-all whitespace-nowrap">Personalizado</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 bg-bg-muted rounded-2xl border border-zinc-100">
                          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Vista Previa de Botón</p>
                          <button 
                            className="w-full py-4 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-brand/20 transition-all font-display"
                            style={{ backgroundColor: brandColor, color: ['#BFFF00', '#00FF88', '#FFB800'].includes(brandColor.toUpperCase()) ? 'black' : 'white' }}
                          >
                            Ejemplo de Acción
                          </button>
                        </div>
                      </div>

                      <div className="bento-card bg-black p-8 text-white flex flex-col justify-center items-center text-center">
                        <div className="w-16 h-16 rounded-3xl mb-6 shadow-2xl flex items-center justify-center" style={{ backgroundColor: brandColor }}>
                          <Dumbbell className="text-black" size={32} />
                        </div>
                        <h4 className="font-display text-4xl font-black uppercase italic italic leading-none mb-2 tracking-tighter">
                          Gym<span style={{ color: brandColor }}>Smart</span>
                        </h4>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest max-w-[180px]">
                          Los cambios se aplican instantáneamente en toda la plataforma.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bento-card p-6 bg-white flex items-center justify-between">
                      <div className="flex gap-4 items-center">
                        <div className="p-3 bg-zinc-100 rounded-xl text-zinc-900">
                          <LayoutDashboard size={20} />
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase">Modo Oscuro Dashboard</p>
                          <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mt-0.5">En desarrollo v1.1.0</p>
                        </div>
                      </div>
                      <div className="w-12 h-6 bg-zinc-200 rounded-full relative cursor-not-allowed">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="bento-card p-6 bg-white flex items-center justify-between">
                      <div className="flex gap-4 items-center">
                        <div className="p-3 bg-zinc-100 rounded-xl text-zinc-900">
                          <CheckCircle2 size={20} />
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase">Auto-Guardado</p>
                          <p className="text-[9px] text-brand-dark font-bold uppercase tracking-widest mt-0.5">Activo en tiempo real</p>
                        </div>
                      </div>
                      <div className="w-12 h-6 bg-brand rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <BottomNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        tabs={dashboardTabs} 
      />
    </div>
  );
};

const Login = ({ onLogin }: { onLogin: (user: { name: string, role: 'admin' | 'superadmin' | 'client', data?: Client }) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Fake delay for realism
    setTimeout(() => {
      setIsLoading(false);
      if (username === 'admin' && password === '123456') {
        onLogin({ name: 'José Delgado', role: 'admin' });
      } else if (username === 'superadmin' && password === '123456') {
        onLogin({ name: 'Súper Admin', role: 'superadmin' });
      } else if (username === 'cliente1' && password === '123456') {
        const client = MOCK_CLIENTS[0]; // Juan Perez (Activo)
        onLogin({ name: client.name, role: 'client', data: client });
      } else if (username === 'cliente2' && password === '123456') {
        const client = MOCK_CLIENTS[1]; // Maria Garcia (Vencido)
        onLogin({ name: client.name, role: 'client', data: client });
      } else if (username.startsWith('SM-') && password === '123') {
        const client = MOCK_CLIENTS.find(c => c.membershipId === username);
        if (client) {
          onLogin({ name: client.name, role: 'client', data: client });
        } else {
          setError('Socio no encontrado.');
        }
      } else {
        setError('Credenciales incorrectas.');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-bg-muted flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white bento-card p-10">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="bg-black p-3 rounded-2xl mb-4">
            <Dumbbell className="text-brand w-8 h-8" />
          </div>
          <h2 className="font-display text-4xl font-black uppercase italic tracking-tighter">Bienvenido</h2>
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-2">Acceso Centralizado Gym Smart</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Usuario / Membresía</label>
            <input 
              type="text" 
              className="w-full px-4 py-4 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-brand outline-none font-bold uppercase text-xs transition-all" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="cliente o admin"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Contraseña</label>
            <input 
              type="password" 
              className="w-full px-4 py-4 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-brand outline-none font-bold text-xs transition-all" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="123456"
            />
          </div>
          
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center"
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full brutalist-button py-4 text-black flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-wait transition-all"
          >
            {isLoading ? (
              <>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Activity size={18} />
                </motion.div>
                Verificando...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-zinc-100 space-y-4">
          <p className="text-[9px] text-zinc-400 font-black uppercase tracking-widest text-center">Datos de Prueba (Demo)</p>
          <div className="grid grid-cols-2 gap-3">
             <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 flex flex-col justify-center gap-1 cursor-pointer hover:bg-zinc-100 transition-all" onClick={() => { setUsername('admin'); setPassword('123456'); }}>
                <p className="text-[8px] text-zinc-400 font-bold uppercase">Staff</p>
                <p className="text-[10px] font-black">admin / 123456</p>
             </div>
             <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 flex flex-col justify-center gap-1 cursor-pointer hover:bg-zinc-100 transition-all" onClick={() => { setUsername('cliente1'); setPassword('123456'); }}>
                <p className="text-[8px] text-brand-dark font-bold uppercase">Con Membresía</p>
                <p className="text-[10px] font-black">cliente1 / 123456</p>
             </div>
          </div>
          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 flex justify-between items-center group hover:bg-red-50 hover:border-red-100 transition-all cursor-pointer" onClick={() => { setUsername('cliente2'); setPassword('123456'); }}>
             <div>
                <p className="text-[8px] text-red-400 font-bold uppercase">Sin Membresía</p>
                <p className="text-[10px] font-black group-hover:text-red-600">cliente2 / 123456</p>
             </div>
             <Star size={14} className="text-red-300 group-hover:text-red-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomerPortal = ({ client, onLogout, loyaltyConfig }: { client: Client, onLogout: () => void, loyaltyConfig: LoyaltyConfig }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'classes' | 'profile' | 'loyalty' | 'community' | 'shop'>('home');
  const [toast, setToast] = useState<string | null>(null);
  const [reservedClasses, setReservedClasses] = useState<string[]>([]);
  const [fitnessGoal, setFitnessGoal] = useState<'Perder Peso' | 'Ganar Músculo' | 'Mantenimiento'>('Mantenimiento');

  const imc = (client.weight / ((client.height / 100) ** 2)).toFixed(1);
  const imcStatus = Number(imc) < 18.5 ? 'Bajo Peso' : Number(imc) < 25 ? 'Normal' : Number(imc) < 30 ? 'Sobrepeso' : 'Obesidad';

  const isMember = client.status === 'Activo';

  const clientTabs = [
    { id: 'home', icon: Home, label: 'Inicio' },
    { id: 'loyalty', icon: Trophy, label: loyaltyConfig.isLoyaltyCardEnabled ? (isMember ? 'Fidelidad' : 'Ofertas') : 'Ofertas' },
    { id: 'community', icon: MessageSquare, label: 'Comunidad' },
    { id: 'shop', icon: ShoppingBag, label: 'Tienda' },
    { id: 'classes', icon: Calendar, label: 'Clases', hidden: !isMember },
    { id: 'profile', icon: Users, label: 'Mi Perfil' },
  ].filter(tab => !tab.hidden);

  const toggleReservation = (id: string, name: string) => {
    if (reservedClasses.includes(id)) {
      setReservedClasses(prev => prev.filter(i => i !== id));
      setToast(`Reserva cancelada: ${name}`);
    } else {
      setReservedClasses(prev => [...prev, id]);
      setToast(`¡Clase reservada!: ${name}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans relative pb-20 lg:pb-0">
      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
      <nav className="bg-white border-b border-zinc-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Dumbbell className="text-brand w-5 h-5" />
          <span className="font-display text-xl font-black italic uppercase tracking-tighter">Gym<span className="text-brand-dark">Smart</span></span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {clientTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 font-black uppercase text-[10px] tracking-widest transition-all ${
                activeTab === tab.id ? 'text-brand-dark' : 'text-zinc-400 hover:text-zinc-600'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
             <p className="text-[10px] font-black uppercase text-zinc-900">{client.name}</p>
             <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest leading-none mt-1">Socio {client.membershipId}</p>
          </div>
          <button onClick={onLogout} className="p-2 text-zinc-400 hover:text-red-500 transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      <div className="p-6 max-w-lg lg:max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {activeTab === 'home' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              {!isMember ? (
                <section className="bg-red-500 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl border-4 border-white lg:h-full flex flex-col justify-center">
                  <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none transform translate-x-8 -translate-y-8"><Megaphone size={140} /></div>
                  <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/80 mb-2">Membresía Expirada</p>
                    <h3 className="font-display text-4xl font-black uppercase italic tracking-tighter mb-4">Reactiva Hoy</h3>
                    <p className="text-xs font-bold mb-6 max-w-[200px]">No pierdas tu racha. Tenemos una oferta especial para que vuelvas al ruedo.</p>
                    <button onClick={() => setActiveTab('loyalty')} className="px-6 py-3 bg-white text-red-500 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:scale-105 transition-transform">Ver Promociones</button>
                  </div>
                </section>
              ) : (
                <section className="bg-zinc-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl lg:h-full flex flex-col justify-center">
                  <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none transform translate-x-8 -translate-y-8"><Zap size={140} /></div>
                  <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand mb-2">Estado de Membresía</p>
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="font-display text-4xl font-black uppercase italic tracking-tighter">{client.plan}</h3>
                      {client.plan === 'VIP' && (
                        <span className="bg-brand text-black px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest shadow-lg shadow-brand/20">Elite VIP</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full inline-flex border border-white/5">
                       <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                       <span className="text-[9px] font-black uppercase tracking-widest">Activo hasta {client.expiryDate}</span>
                    </div>
                  </div>
                </section>
              )}
            </div>

            <div className="space-y-8">
              {isMember ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bento-card p-6 bg-white border-zinc-200">
                      <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-900 mb-4">
                        <Activity size={20} />
                      </div>
                      <p className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest">Nivel Actividad</p>
                      <p className="text-xl font-black italic font-display">ALTO</p>
                    </div>
                    <div className="bento-card p-6 bg-white border-zinc-200">
                      <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-900 mb-4">
                        <Flame size={20} />
                      </div>
                      <p className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest">Calorías Sem.</p>
                      <p className="text-xl font-black italic font-display">2,450</p>
                    </div>
                  </div>

                  <section className="bento-card p-8 bg-white border-zinc-200">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-xs font-black uppercase">Metas del Mes</h4>
                      <Target size={16} className="text-brand" />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-[8px] font-black uppercase mb-1">
                          <span>Asistencias</span>
                          <span>12/15</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                          <div className="h-full bg-brand w-[80%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[8px] font-black uppercase mb-1">
                          <span>Peso Meta (78kg)</span>
                          <span>82kg</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                          <div className="h-full bg-zinc-900 w-[40%]" />
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="bento-card p-8 bg-white border-zinc-200">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-xs font-black uppercase">Tu Rutina Sugerida</h4>
                      <div className="p-2 bg-brand/10 text-brand-dark rounded-lg"><Dumbbell size={16} /></div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                        <div className="w-10 h-10 bg-white rounded-xl border border-zinc-200 flex items-center justify-center font-black italic">01</div>
                        <div>
                          <p className="text-[10px] font-black uppercase">Pecho y Tríceps</p>
                          <p className="text-[8px] text-zinc-400 font-bold uppercase">4 Sets x 12 Reps</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                        <div className="w-10 h-10 bg-white rounded-xl border border-zinc-200 flex items-center justify-center font-black italic">02</div>
                        <div>
                          <p className="text-[10px] font-black uppercase">Cardio HIIT</p>
                          <p className="text-[8px] text-zinc-400 font-bold uppercase">20 Minutos</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              ) : (
                <>
                  <section className="bento-card p-8 bg-zinc-900 text-white border-none shadow-2xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-brand rounded-2xl text-black"><Target size={20} /></div>
                      <h4 className="text-sm font-black uppercase italic font-display">¿Por qué volver?</h4>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand mt-1" />
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight leading-relaxed">Acceso a las nuevas máquinas Matrix 2026.</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand mt-1" />
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight leading-relaxed">Nuevas clases de Functional Elite incluidas.</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand mt-1" />
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight leading-relaxed">Invitación especial al Open Day este Sábado.</p>
                      </li>
                    </ul>
                  </section>

                  <div className="bento-card p-8 bg-white border-brand/20 border-2">
                    <p className="text-[8px] text-brand-dark font-black uppercase tracking-widest mb-2">Exclusivo Ex-Socios</p>
                    <h4 className="font-display text-xl font-black italic uppercase leading-none mb-4 tracking-tighter">50% de Descuento en tu Matrícula</h4>
                    <p className="text-[10px] text-zinc-500 font-medium mb-6">Solo válido por las próximas 48 horas. No pierdas tu lugar.</p>
                    <button className="w-full brutalist-button text-black py-4">Reclamar Cupón</button>
                  </div>

                  <section className="bento-card p-6 bg-zinc-50 border-zinc-200 italic">
                    <p className="text-[10px] text-zinc-600 font-medium mb-4 leading-relaxed">"Volver fue la mejor decisión. El ambiente 2026 es otra cosa."</p>
                    <p className="text-[8px] font-black uppercase tracking-widest">— Roberto F., regresó hace 1 mes</p>
                  </section>
                </>
              )}
            </div>

            <div className="lg:col-span-2">
              {loyaltyConfig.isLoyaltyCardEnabled && (
              <section className="bento-card p-8 bg-zinc-950 text-white border-none shadow-2xl mb-8 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 text-white/5 -translate-y-4 translate-x-4"><Trophy size={140} /></div>
                 <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                       <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-brand rounded-2xl flex items-center justify-center text-black border border-brand-dark shadow-lg shadow-brand/20">
                            <QrCode size={24} />
                          </div>
                          <div>
                             <h4 className="text-sm font-black uppercase italic font-display italic tracking-[0.05em]">Socio Fundador <span className="text-brand">Digital Card</span></h4>
                             <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest leading-none mt-1">Acumula sellos por cada visita</p>
                          </div>
                       </div>
                       <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-right">
                          <p className="text-xl font-black font-display italic leading-none whitespace-nowrap">03 / {loyaltyConfig.totalStampsToReward}</p>
                          <p className="text-[7px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Sellos</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-5 xs:grid-cols-6 sm:grid-cols-10 gap-3 mb-8">
                       {Array.from({ length: loyaltyConfig.totalStampsToReward }).map((_, i) => (
                         <div key={i} className={`aspect-square rounded-2xl border-2 flex items-center justify-center transition-all ${i < 3 ? 'bg-brand border-brand-dark scale-105 shadow-xl shadow-brand/10 text-black' : 'bg-zinc-900 border-zinc-800 text-zinc-700 opacity-40'}`}>
                            {i < 3 ? <Check size={18} strokeWidth={4} /> : <span className="text-[10px] font-black">{i + 1}</span>}
                         </div>
                       ))}
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
                       <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/5 backdrop-blur-sm">
                          <div className="flex items-center gap-2 mb-1">
                             <Gift size={12} className="text-brand" />
                             <p className="text-[8px] font-black text-brand uppercase tracking-widest">Próxima Recompensa</p>
                          </div>
                          <p className="text-xs font-black uppercase italic text-white">{loyaltyConfig.rewardDescription}</p>
                       </div>
                       <button onClick={() => setToast("Muestra este QR al staff en recepción")} className="flex items-center gap-3 bg-white text-black px-6 py-4 rounded-2xl hover:bg-brand transition-all active:scale-95 group/qr">
                          <QrCode size={20} className="group-hover/qr:scale-110 transition-transform" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Escanear Sello</span>
                       </button>
                    </div>
                 </div>
              </section>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="bento-card p-8 bg-white border-zinc-200 relative overflow-hidden group hover:border-brand transition-colors">
                  <div className="absolute top-0 right-0 p-6 text-zinc-50 group-hover:text-brand/5 transition-colors -translate-y-4 translate-x-4"><Calendar size={120} /></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-zinc-900 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg"><Calendar size={24} /></div>
                    <p className="text-[10px] font-black uppercase text-zinc-400 mb-1 tracking-[0.2em]">Clases para hoy</p>
                    <p className="text-4xl font-black font-display italic leading-none mb-4">03</p>
                    <div className="flex -space-x-2">
                       <div className="w-6 h-6 rounded-full bg-brand border-2 border-white flex items-center justify-center text-[8px] font-bold">Y</div>
                       <div className="w-6 h-6 rounded-full bg-zinc-900 border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">F</div>
                       <div className="w-6 h-6 rounded-full bg-zinc-400 border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">Z</div>
                    </div>
                  </div>
               </div>
               <div className="bento-card p-8 bg-white border-zinc-200 relative overflow-hidden group hover:border-brand transition-colors">
                  <div className="absolute top-0 right-0 p-6 text-zinc-50 group-hover:text-brand/5 transition-colors -translate-y-4 translate-x-4"><Activity size={120} /></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-brand text-black rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-brand-dark"><Activity size={24} /></div>
                    <p className="text-[10px] font-black uppercase text-zinc-400 mb-1 tracking-[0.2em]">Tu Racha Actual</p>
                    <p className="text-4xl font-black font-display italic leading-none mb-4 uppercase">5 Días</p>
                    <div className="flex gap-1">
                       {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-3 bg-brand rounded-full" />)}
                       {[6,7].map(i => <div key={i} className="w-1 h-3 bg-zinc-100 rounded-full" />)}
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

        {activeTab === 'classes' && (
          <div className="space-y-6">
            <h3 className="font-display text-4xl font-black uppercase italic tracking-tighter">Reservar Clases</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {MOCK_SCHEDULES.map((clase) => (
                 <div key={clase.id} className="p-6 bg-white border border-zinc-100 rounded-[2rem] flex flex-col sm:flex-row items-center justify-between hover:border-brand transition-all shadow-sm gap-4">
                    <div>
                      <span className="text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 bg-zinc-100 rounded text-zinc-500 mb-2 inline-block">{clase.instructor}</span>
                      <p className="text-lg font-black uppercase italic tracking-tight leading-none">{clase.class}</p>
                      <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mt-2">{clase.day} • {clase.time}</p>
                    </div>
                    <button 
                      onClick={() => toggleReservation(clase.id, clase.class)}
                      className={`text-[10px] font-black uppercase px-6 py-3 rounded-2xl transition-all shadow-lg w-full sm:w-auto ${reservedClasses.includes(clase.id) ? 'bg-brand text-black shadow-brand/20' : 'bg-zinc-900 text-white shadow-black/20'}`}
                    >
                       {reservedClasses.includes(clase.id) ? 'Cancelar' : 'Reservar'}
                    </button>
                 </div>
               ))}
            </div>
          </div>
        )}

        {activeTab === 'loyalty' && (
          <div className="space-y-8 pb-12">
            <h3 className="font-display text-4xl font-black uppercase italic tracking-tighter">
              {isMember ? 'Tu Fidelidad' : 'Ofertas de Reactivación'}
            </h3>

            {!isMember && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="group relative bento-card p-10 bg-red-600 text-white border-none shadow-2xl overflow-hidden active:scale-95 transition-all cursor-pointer">
                    <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform"><Zap size={140} /></div>
                    <div className="flex justify-between items-start mb-10">
                       <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-xl border border-white/20"><Zap size={32} /></div>
                       <div className="bg-white text-red-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">50% OFF</div>
                    </div>
                    <h4 className="text-3xl font-black uppercase italic font-display leading-none mb-3">Retorno <br/>Imparable</h4>
                    <p className="text-[11px] text-white/70 font-bold mb-8 max-w-[200px] uppercase tracking-wide">Reactiva tu plan anual hoy y ahorra S/ 600 directo. Sin matrícula.</p>
                    <div className="flex items-center gap-2 group-hover:gap-4 transition-all">
                       <span className="text-[10px] font-black uppercase tracking-widest">Lo quiero ahora</span>
                       <ChevronRight size={16} />
                    </div>
                 </div>

                 <div className="group relative bento-card p-10 bg-zinc-950 text-white border-none shadow-2xl overflow-hidden active:scale-95 transition-all cursor-pointer">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform"><Gift size={140} className="text-brand" /></div>
                    <div className="flex justify-between items-start mb-10">
                       <div className="p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md"><Gift size={32} className="text-brand" /></div>
                    </div>
                    <h4 className="text-3xl font-black uppercase italic font-display leading-none mb-3 text-brand">Pack <br/>Bienvenida</h4>
                    <p className="text-[11px] text-zinc-400 font-bold mb-8 max-w-[200px] uppercase tracking-wide">Shaker oficial 2026 + Polo Dry-Fit al reactivar cualquier plan.</p>
                    <div className="flex items-center gap-2 text-brand group-hover:gap-4 transition-all">
                       <span className="text-[10px] font-black uppercase tracking-widest">Ver Beneficios</span>
                       <ChevronRight size={16} />
                    </div>
                 </div>
              </div>
            )}

            {loyaltyConfig.isLoyaltyCardEnabled && (
              <div className="space-y-6">
                <div className="bento-card p-10 bg-white border-zinc-100 shadow-xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-10 text-zinc-50 group-hover:text-brand/5 transition-colors -translate-y-6 translate-x-6"><Shield size={200} /></div>
                   <div className="relative z-10">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                         <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-zinc-950 text-brand rounded-[2rem] flex items-center justify-center shadow-2xl border border-zinc-800"><QrCode size={32} /></div>
                            <div>
                               <h4 className="text-2xl font-black uppercase italic font-display leading-none tracking-tight">Tarjeta de Sellos <span className="text-brand-dark">Digital</span></h4>
                               <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.3em] mt-2">Visitas verificadas: Septiembre 2026</p>
                            </div>
                         </div>
                         <div className="bg-zinc-50 px-8 py-4 rounded-[2rem] border border-zinc-100 text-center md:text-right">
                            <p className="text-4xl font-black font-display italic tracking-tight text-zinc-900">03 <span className="text-zinc-300">/</span> {loyaltyConfig.totalStampsToReward}</p>
                            <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Sigue acumulando</p>
                         </div>
                      </div>

                      <div className="grid grid-cols-5 sm:grid-cols-10 gap-3 mb-12">
                         {Array.from({ length: loyaltyConfig.totalStampsToReward }).map((_, i) => (
                           <div key={i} className={`aspect-square rounded-[1.5rem] border-2 flex items-center justify-center transition-all ${i < 3 ? 'bg-brand border-brand-dark scale-105 shadow-xl shadow-brand/10 text-black' : 'bg-bg-muted border-zinc-200 text-zinc-300'}`}>
                              {i < 3 ? <Check size={20} strokeWidth={4} /> : <span className="text-xs font-black">{i + 1}</span>}
                           </div>
                         ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="bg-brand/10 border border-brand/20 p-6 rounded-[2.5rem] flex items-center justify-between">
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-brand/20 text-brand-dark shadow-sm"><Trophy size={20} /></div>
                               <div>
                                  <p className="text-[9px] font-black uppercase tracking-widest text-brand-dark opacity-70">Tu Recompensa Actual</p>
                                  <p className="text-xs font-black uppercase italic tracking-tight">{loyaltyConfig.rewardDescription}</p>
                               </div>
                            </div>
                            <div className="bg-brand-dark text-white text-[9px] font-black px-4 py-2 rounded-xl uppercase tracking-widest">Al completar</div>
                         </div>
                         <button onClick={() => setToast("Código QR de socio generado. Muéstralo en recepción.")} className="brutalist-button py-6 bg-zinc-950 text-white hover:bg-zinc-800 transition-all flex items-center justify-center gap-4">
                            <QrCode size={24} className="text-brand" />
                            <span className="text-[11px] font-black uppercase tracking-[0.2em]">Generar QR de Visita</span>
                         </button>
                      </div>
                   </div>
                </div>

                {loyaltyConfig.achievementSystemEnabled && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pl-2">
                       <Award size={20} className="text-brand-dark" />
                       <h4 className="text-xs font-black uppercase tracking-widest">Cuadro de Honor Smart</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                       {[
                          { name: 'Madrugador Elite', desc: '5 Visitas antes 7AM', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
                          { name: 'Consistente', desc: '30 entrenos/mes', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-50' },
                          { name: 'Inmortal', desc: '1 año en el club', icon: Shield, color: 'text-zinc-900', bg: 'bg-zinc-100' },
                          { name: 'Embajador', desc: '5 Amigos invitados', icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
                       ].map((m, i) => (
                          <div key={i} className="bento-card p-6 bg-white border-zinc-100 flex flex-col items-center text-center gap-3 group hover:scale-105 transition-all cursor-pointer">
                             <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-1 group-hover:bg-brand group-hover:text-black transition-colors ${m.bg} ${m.color}`}><m.icon size={28} /></div>
                             <div>
                                <p className="text-[11px] font-black uppercase tracking-tight leading-none">{m.name}</p>
                                <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest mt-1.5">{m.desc}</p>
                             </div>
                          </div>
                       ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'community' && (
          <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="font-display text-4xl font-black uppercase italic tracking-tighter">Muro Social</h3>
            
            <div className="space-y-6">
              {[
                { author: 'Profe Alex', time: 'Hace 2 horas', content: '¡Felicitaciones a todos los que vinieron a la clase de las 6am! El cardio estuvo intenso. 🔥', likes: 24, type: 'Clase' },
                { author: 'Gym Smart', time: 'Hace 5 horas', content: 'Nuevo cargamento de Proteína Whey sabor Chocolate Suizo disponible en tienda. ¡Aprovechen el 10% de descuento!', likes: 42, type: 'Anuncio' },
                { author: 'Laura Fit', time: 'Ayer', content: '¡Hoy completé mi primer mes sin faltar un solo día! Vamos por más. 💪', likes: 128, type: 'Logro' },
              ].map((post, i) => (
                <div key={i} className="bento-card p-6 bg-white border-zinc-100 group hover:border-brand/30 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-900 rounded-2xl flex items-center justify-center text-brand font-black italic">{post.author[0]}</div>
                      <div>
                         <p className="text-xs font-black uppercase tracking-tight">{post.author}</p>
                         <p className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest">{post.time}</p>
                      </div>
                    </div>
                    <span className="text-[8px] font-black uppercase border border-zinc-200 px-2 py-0.5 rounded-full text-zinc-500 bg-zinc-50">{post.type}</span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed mb-6 font-medium">{post.content}</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-zinc-50">
                    <button className="flex items-center gap-2 text-zinc-400 hover:text-red-500 transition-colors">
                      <HeartPulse size={16} /> <span className="text-[10px] font-black">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-zinc-400 hover:text-brand-dark transition-colors">
                      <MessageSquare size={16} /> <span className="text-[10px] font-black">Comentar</span>
                    </button>
                    <button className="ml-auto text-zinc-300 hover:text-zinc-600 transition-colors">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'shop' && (
          <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h3 className="font-display text-4xl font-black uppercase italic tracking-tighter">Smart Store</h3>
              <div className="bg-brand text-black p-3 rounded-2xl shadow-lg shadow-brand/20 relative cursor-pointer active:scale-95 transition-all">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center border border-white">0</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Whey Protein ISO', brand: 'Optimum Nutrition', price: 'S/ 189', img: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80', tag: 'Top Ventas' },
                { name: 'Shaker Smart Pro', brand: 'Smart Gear', price: 'S/ 45', img: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&q=80', tag: 'Nuevo' },
                { name: 'Strap Pro Lifting', brand: 'Rogue', price: 'S/ 65', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80', tag: 'Accesorio' },
                { name: 'Creatina Monohidrato', brand: 'Muscletech', price: 'S/ 120', img: 'https://images.unsplash.com/photo-1579722820308-d74e5719853c?auto=format&fit=crop&q=80', tag: 'Básico' },
              ].map((item, i) => (
                <div key={i} className="bento-card bg-white border-zinc-100 overflow-hidden group">
                  <div className="aspect-video relative overflow-hidden bg-zinc-100">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 bg-black text-brand text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-xl">{item.tag}</div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                       <div>
                          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-none mb-1">{item.brand}</p>
                          <h4 className="text-base font-black uppercase italic tracking-tight">{item.name}</h4>
                       </div>
                       <p className="text-xl font-black text-zinc-900 italic leading-none">{item.price}</p>
                    </div>
                    <button onClick={() => setToast(`Añadido al carrito: ${item.name}`)} className="w-full mt-6 py-4 bg-zinc-950 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-brand hover:text-black transition-all active:scale-95 border border-transparent hover:border-brand/40">Agregar al Carrito</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'profile' && (
          <div className="space-y-6 pb-12">
            <h3 className="font-display text-4xl font-black uppercase italic tracking-tighter">Mi Perfil</h3>
            
            <div className="bento-card p-8 bg-white space-y-8">
              <div className="flex items-center gap-6">
                 <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center text-4xl font-black italic border-2 border-brand text-brand shadow-xl">
                   {client.avatar}
                 </div>
                 <div>
                    <p className="text-2xl font-black uppercase tracking-tight">{client.name}</p>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{client.membershipId}</p>
                 </div>
              </div>

              {/* Health Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-8 p-8 bg-zinc-50 rounded-3xl border border-zinc-100 relative group min-h-[300px]">
                   <div className="flex justify-between items-center mb-8">
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-widest">Evolución de Peso</h4>
                        <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Últimos 5 meses</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-brand"></div>
                        <span className="text-[9px] font-black uppercase tracking-widest">Peso (kg)</span>
                      </div>
                   </div>
                   <div className="h-[180px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[
                          { name: 'Ene', w: 82 },
                          { name: 'Feb', w: 80.5 },
                          { name: 'Mar', w: 79.2 },
                          { name: 'Abr', w: 78.5 },
                          { name: 'May', w: client.weight },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#9CA3AF'}} dy={10} />
                          <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 'bold' }}
                            itemStyle={{ color: '#000' }}
                          />
                          <Line type="monotone" dataKey="w" stroke="#7FFF00" strokeWidth={4} dot={{ r: 6, fill: '#000', strokeWidth: 2, stroke: '#7FFF00' }} activeDot={{ r: 8 }} />
                        </LineChart>
                     </ResponsiveContainer>
                   </div>
                </div>
                
                <div className="md:col-span-4 space-y-4 flex flex-col">
                  <div className="p-6 bg-white rounded-3xl border border-zinc-100 flex-1 relative group overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Activity size={40} /></div>
                     <div className="flex items-center gap-3 text-zinc-400 mb-4">
                        <div className="w-8 h-8 bg-zinc-50 rounded-lg flex items-center justify-center border border-zinc-200 group-hover:text-brand transition-colors"><Scale size={14} /></div>
                        <span className="text-[10px] font-black uppercase tracking-widest">Peso Actual</span>
                     </div>
                     <p className="text-3xl font-black italic">{client.weight} kg</p>
                     <p className="text-[8px] text-green-600 font-bold uppercase mt-2">▼ 3.5kg este mes</p>
                  </div>
                  <div className="p-6 bg-brand text-black rounded-3xl border border-brand-dark shadow-lg shadow-brand/20 relative group overflow-hidden flex-1">
                     <div className="absolute bottom-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Zap size={40} /></div>
                     <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-black text-brand rounded-lg flex items-center justify-center"><Zap size={14} /></div>
                        <span className="text-[10px] font-black uppercase tracking-widest">Tu IMC</span>
                     </div>
                     <div className="flex items-end gap-2">
                       <p className="text-3xl font-black italic">{imc}</p>
                       <p className="text-[9px] font-black uppercase italic mb-1">{imcStatus}</p>
                     </div>
                  </div>
                </div>
              </div>

              {/* Goal Selection */}
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <Target size={18} className="text-brand" />
                    <h4 className="text-xs font-black uppercase">¿Cuál es tu objetivo hoy?</h4>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {['Perder Peso', 'Ganar Músculo', 'Mantenimiento'].map((goal) => (
                      <button
                        key={goal}
                        onClick={() => {
                          setFitnessGoal(goal as any);
                          setToast(`Meta actualizada a: ${goal}`);
                        }}
                        className={`p-6 rounded-3xl border-2 transition-all text-left group overflow-hidden relative ${fitnessGoal === goal ? 'border-brand bg-brand/5 shadow-inner' : 'border-zinc-100 bg-white hover:border-zinc-300'}`}
                      >
                         {fitnessGoal === goal && <div className="absolute top-0 right-0 p-4 text-brand/20"><CheckCircle2 size={32} /></div>}
                         <p className={`text-[10px] font-black uppercase mb-1 ${fitnessGoal === goal ? 'text-brand-dark' : 'text-zinc-400'}`}>{goal}</p>
                         <p className="text-[9px] font-medium text-zinc-500 leading-tight">Optimiza tu rutina con esta meta definida en tu perfil.</p>
                      </button>
                    ))}
                 </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-zinc-50">
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Email</span>
                    <span className="text-[11px] font-bold">{client.email}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Plan</span>
                    <span className="text-[11px] font-bold uppercase text-brand-dark px-2 py-0.5 bg-brand/10 rounded">{client.plan}</span>
                 </div>
              </div>

              <button 
                onClick={onLogout}
                className="w-full py-4 bg-zinc-50 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-2xl border border-zinc-100 hover:bg-red-50 hover:border-red-100 transition-all"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 text-center text-[10px] text-zinc-400 font-bold uppercase tracking-widest pb-12">
        <p>¿Problemas con el acceso?</p>
        <p className="mt-1 text-zinc-900 underline">Contactar a Soporte</p>
      </div>

      <BottomNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        tabs={clientTabs} 
      />
    </div>
  );
};
const DEFAULT_LANDING_CONTENT: LandingContent = {
  heroTitle: "Entrena",
  heroAccent: "Smart",
  heroSubtitle: "La Red de Gimnasios más Premium de Perú.",
  heroImg: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80",
  statsSectionTitle: "Nuestra Comunidad en Números",
  featuredPlanName: "Smart Plus",
  gymName: "Gym Smart",
  referralTitle: "Trae a un Amigo y Gana",
  referralSubtitle: "Obtén un mes gratis por cada amigo que se inscriba. Sin límites.",
  testimonialText: "La mejor experiencia fitness que he tenido. Las máquinas son de otro nivel y las clases grupales son increíbles.",
  testimonialAuthor: "Mónica Rivas, Socia desde 2022",
};

const DEFAULT_LOYALTY_CONFIG: LoyaltyConfig = {
  isLoyaltyCardEnabled: true,
  stampsPerVisit: 1,
  totalStampsToReward: 10,
  rewardDescription: "1 Mes Gratis de Suscripción",
  referralBonusEnabled: true,
  achievementSystemEnabled: true,
};

const BottomNav = ({ activeTab, onTabChange, tabs }: { activeTab: string, onTabChange: (tab: any) => void, tabs: { id: string, icon: any, label: string }[] }) => (
  <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 px-2 py-3 flex justify-around items-center z-[60] safe-area-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
        className={`flex flex-col items-center gap-1 transition-all flex-1 ${activeTab === tab.id ? 'text-brand-dark' : 'text-zinc-400'}`}
      >
        <div className={`p-1 rounded-xl transition-all ${activeTab === tab.id ? 'bg-brand/10' : ''}`}>
          <tab.icon size={22} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
        </div>
        <span className="text-[8px] font-black uppercase tracking-tighter">{tab.label}</span>
      </button>
    ))}
  </div>
);

export default function App() {
  const [user, setUser] = useState<{ name: string, role: 'admin' | 'superadmin' | 'client', data?: Client } | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [landingContent, setLandingContent] = useState<LandingContent>(DEFAULT_LANDING_CONTENT);
  const [loyaltyConfig, setLoyaltyConfig] = useState<LoyaltyConfig>(DEFAULT_LOYALTY_CONFIG);

  return (
    <div className="min-h-screen">
      {!user && !showLogin && <Landing content={landingContent} onLogin={() => setShowLogin(true)} />}
      {!user && showLogin && <Login onLogin={setUser} />}
      {user && user.role === 'client' && (
        <CustomerPortal 
          client={user.data!} 
          onLogout={() => { setUser(null); setShowLogin(false); }} 
          loyaltyConfig={loyaltyConfig}
        />
      )}
      {user && (user.role === 'admin' || user.role === 'superadmin') && (
        <Dashboard 
          user={user as any} 
          onLogout={() => { setUser(null); setShowLogin(false); }} 
          landingContent={landingContent}
          onUpdateLanding={setLandingContent}
          loyaltyConfig={loyaltyConfig}
          onUpdateLoyalty={setLoyaltyConfig}
        />
      )}
    </div>
  );
}
