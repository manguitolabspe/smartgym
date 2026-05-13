import React, { useState, useEffect } from 'react';
import { QrCode, MapPin, Calendar, MessageCircle, Share2, Dumbbell, Instagram, Facebook, Clock, Activity, Users } from 'lucide-react';
import { Modal } from '../common/Modal';
import { motion, AnimatePresence } from 'motion/react';

interface MobileHomeAppProps {
  gymName: string;
  heroImg?: string;
}

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop"
];

export const MobileHomeApp: React.FC<MobileHomeAppProps> = ({ gymName, heroImg }) => {
  const [showSchedule, setShowSchedule] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = heroImg ? [heroImg, ...DEFAULT_IMAGES.slice(1)] : DEFAULT_IMAGES;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleShare = () => {
    const text = encodeURIComponent(`¡Únete conmigo a ${gymName} y entrena al máximo!`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="md:hidden pb-24 font-sans px-4 pt-6 space-y-6">
      
      {/* Banner / Hero Card */}
      <div className="bg-zinc-950 text-white rounded-[2rem] p-6 relative overflow-hidden shadow-2xl min-h-[300px] flex flex-col justify-end">
        <div className="absolute inset-0">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt="Gym"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.5, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="absolute top-0 right-0 w-32 h-32 bg-brand/20 blur-3xl rounded-full" />
        
        <div className="relative z-10 flex flex-col items-start mt-auto">
          <div className="bg-brand text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            Tu Gym App
          </div>
          <h2 className="font-display text-4xl font-black uppercase italic tracking-tighter leading-none mb-2 drop-shadow-lg">
            Bienvenido a<br /><span className="text-brand drop-shadow-md">{gymName}</span>
          </h2>
          <p className="text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6 mt-2 drop-shadow-md">¿Listo para entrenar?</p>
          <button className="bg-brand text-black px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest w-full text-center hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(204,255,0,0.3)]">
            Ver Mi Progreso
          </button>
        </div>
      </div>

      {/* Action Grid (Horario, Ubicacion, WhatsApp) */}
      <div className="grid grid-cols-3 gap-3">
        <button onClick={() => setShowSchedule(true)} className="bg-white border border-zinc-100 p-4 rounded-[1.5rem] flex flex-col items-center gap-2 justify-center shadow-sm hover:border-brand transition-colors">
          <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-900">
            <Calendar size={20} />
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-900">Horario</span>
        </button>
        <button onClick={() => setShowLocation(true)} className="bg-white border border-zinc-100 p-4 rounded-[1.5rem] flex flex-col items-center gap-2 justify-center shadow-sm hover:border-brand transition-colors">
           <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-900">
            <MapPin size={20} />
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-900">Ubicación</span>
        </button>
        <button onClick={() => setShowWhatsapp(true)} className="bg-white border border-zinc-100 p-4 rounded-[1.5rem] flex flex-col items-center gap-2 justify-center shadow-sm hover:border-green-500 transition-colors">
           <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-green-600">
            <MessageCircle size={20} />
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-900">Chat</span>
        </button>
      </div>

      {/* About Us Card */}
      <div className="bg-white border border-zinc-100 rounded-[2rem] p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-zinc-100 p-2 rounded-xl text-zinc-900">
            <Activity size={20} />
          </div>
          <h3 className="font-bold text-sm uppercase tracking-widest text-zinc-900">Nuestra Filosofía</h3>
        </div>
        <p className="text-xs text-zinc-500 leading-relaxed font-medium">
          En <span className="font-bold text-brand-dark">{gymName}</span> nos dedicamos a transformar vidas a través del movimiento, fuerza y disciplina. Contamos con equipamiento de primer nivel, zonas de entrenamiento funcional y un equipo de entrenadores dispuestos a sacar tu mejor versión. No somos solo un gimnasio, somos una comunidad.
        </p>
      </div>

      {/* Quick Classes Overview */}
      <div className="bg-white border border-zinc-100 rounded-[2rem] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
             <div className="bg-zinc-100 p-2 rounded-xl text-zinc-900">
                <Users size={20} />
             </div>
             <h3 className="font-bold text-sm uppercase tracking-widest text-zinc-900">Top Clases</h3>
          </div>
          <span className="text-[9px] font-black uppercase text-brand-dark">Ver todas</span>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-zinc-50 p-3 rounded-xl">
             <div className="flex flex-col">
               <span className="text-xs font-bold uppercase text-zinc-900">CrossFit & Funcional</span>
               <span className="text-[10px] text-zinc-500 font-medium">Alta Intensidad</span>
             </div>
             <div className="bg-white border border-zinc-200 px-2 py-1 rounded-lg flex items-center gap-1">
               <Clock size={12} className="text-brand-dark" />
               <span className="text-[9px] font-black text-zinc-900">45 MIN</span>
             </div>
          </div>
          <div className="flex justify-between items-center bg-zinc-50 p-3 rounded-xl">
             <div className="flex flex-col">
               <span className="text-xs font-bold uppercase text-zinc-900">Powerlifting</span>
               <span className="text-[10px] text-zinc-500 font-medium">Fuerza & Técnica</span>
             </div>
             <div className="bg-white border border-zinc-200 px-2 py-1 rounded-lg flex items-center gap-1">
               <Clock size={12} className="text-brand-dark" />
               <span className="text-[9px] font-black text-zinc-900">60 MIN</span>
             </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="flex items-center justify-center gap-4 py-2">
         <button className="w-12 h-12 bg-white border border-zinc-100 rounded-full flex items-center justify-center text-zinc-800 hover:bg-zinc-50 hover:text-[#E1306C] transition-colors shadow-sm">
            <Instagram size={20} />
         </button>
         <button className="w-12 h-12 bg-white border border-zinc-100 rounded-full flex items-center justify-center text-zinc-800 hover:bg-zinc-50 hover:text-[#1877F2] transition-colors shadow-sm">
            <Facebook size={20} />
         </button>
         <button className="w-12 h-12 bg-white border border-zinc-100 rounded-full flex items-center justify-center text-zinc-800 hover:bg-zinc-50 transition-colors shadow-sm">
            {/* TikTok Icon representation */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
         </button>
      </div>

      {/* QR & Share Section */}
      <div className="bg-white border border-zinc-100 rounded-[2rem] p-6 text-center shadow-sm">
        <div className="flex justify-center mb-4">
          <div className="w-48 h-48 bg-zinc-50 rounded-3xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center relative overflow-hidden group">
             <QrCode size={100} className="text-zinc-300" />
             <div className="absolute inset-0 bg-brand/5 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark bg-white px-4 py-2 rounded-xl shadow-lg">Escanear</span>
             </div>
          </div>
        </div>
        <h3 className="font-bold text-sm uppercase tracking-widest text-zinc-900 mb-1">Pase de Invitado</h3>
        <p className="text-[10px] font-bold text-zinc-400 uppercase mb-6">Comparte con un amigo, ganen 1 mes gratis</p>
        <button onClick={handleShare} className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1fbd58] transition-colors shadow-lg shadow-[#25D366]/20">
          <Share2 size={16} /> Compartir a WhatsApp
        </button>
      </div>

      {/* Modals */}
      {showSchedule && (
        <Modal title="Horario de Atención" onClose={() => setShowSchedule(false)}>
           <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <span className="text-xs font-black uppercase text-zinc-500">Lunes - Viernes</span>
                <span className="text-sm font-black text-zinc-900">6:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <span className="text-xs font-black uppercase text-zinc-500">Sábados</span>
                <span className="text-sm font-black text-zinc-900">8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl border border-red-100">
                <span className="text-xs font-black uppercase text-red-500">Domingos</span>
                <span className="text-sm font-black text-red-900">Cerrado</span>
              </div>
           </div>
        </Modal>
      )}

      {showLocation && (
        <Modal title="Ubicación" onClose={() => setShowLocation(false)}>
           <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto text-zinc-900 mb-2">
                 <MapPin size={32} />
              </div>
              <p className="text-sm font-bold text-zinc-900 uppercase">Av. Principal 123, Centro Ciudad</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Frente al parque central</p>
              <button onClick={() => window.open('https://maps.google.com', '_blank')} className="w-full mt-4 bg-zinc-900 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-colors">
                Abrir en Google Maps
              </button>
           </div>
        </Modal>
      )}

      {showWhatsapp && (
        <Modal title="Chat de Soporte" onClose={() => setShowWhatsapp(false)}>
           <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto text-[#25D366] mb-2">
                 <MessageCircle size={32} />
              </div>
              <p className="text-sm font-bold text-zinc-900 uppercase">¿Tienes alguna duda?</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-6">Escríbenos y te responderemos de inmediato.</p>
              <button 
                onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent('Hola, tengo una consulta sobre ' + gymName)}`, '_blank')} 
                className="w-full mt-4 bg-[#25D366] text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1fbd58] transition-colors shadow-lg shadow-[#25D366]/20"
              >
                Ir a WhatsApp
              </button>
           </div>
        </Modal>
      )}

    </div>
  );
};

