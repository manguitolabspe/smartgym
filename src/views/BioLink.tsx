import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Dumbbell, 
  MapPin, 
  Instagram, 
  MessageCircle, 
  Phone, 
  Calendar, 
  ShoppingBag,
  ArrowRight,
  Star,
  User
} from 'lucide-react';

interface BioLinkProps {
  gymName: string;
  onFreePass: () => void;
  onViewSedes: () => void;
  onViewPlanes: () => void;
  onLogin: () => void;
}

export const BioLink: React.FC<BioLinkProps> = ({ 
  gymName, 
  onFreePass, 
  onViewSedes, 
  onViewPlanes,
  onLogin
}) => {
  const links = [
    { 
      title: "Solicitar Pase Gratis 24h", 
      desc: "Prueba nuestras instalaciones sin costo", 
      icon: <Zap className="text-black" size={20} />, 
      action: onFreePass, 
      primary: true 
    },
    { 
      title: "Nuestras Sedes", 
      desc: "Lima • Cusco • Arequipa", 
      icon: <MapPin size={20} />, 
      action: onViewSedes 
    },
    { 
      title: "Planes y Membresías", 
      desc: "Desde S/ 69 al mes", 
      icon: <Dumbbell size={20} />, 
      action: onViewPlanes 
    },
    { 
      title: "Smart Store", 
      desc: "Suplementos y Accesorios", 
      icon: <ShoppingBag size={20} />, 
      action: () => window.open('#', '_blank') 
    },
    { 
      title: "Hablar con un asesor", 
      desc: "WhatsApp directo", 
      icon: <MessageCircle size={20} />, 
      action: () => window.open('https://wa.me/51999999999', '_blank') 
    },
    { 
      title: "Iniciar Sesión", 
      desc: "Acceso Socios y Staff", 
      icon: <User size={20} />, 
      action: onLogin
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center py-12 px-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md flex flex-col items-center gap-8"
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-brand rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-brand/20 border-4 border-zinc-900 overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-500">
             <Dumbbell size={40} className="text-black" />
          </div>
          <div className="text-center">
            <h1 className="font-display text-4xl font-black uppercase italic tracking-tighter leading-none">
              {gymName}
            </h1>
            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.4em] mt-2">
              The Premium Network
            </p>
          </div>
        </div>

        {/* Links Area */}
        <div className="w-full space-y-4">
          {links.map((link, i) => (
            <motion.button
              key={link.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={link.action}
              className={`w-full p-5 rounded-[2rem] flex items-center gap-4 transition-all active:scale-95 group ${
                link.primary 
                  ? 'bg-brand text-black shadow-xl shadow-brand/10 hover:bg-white' 
                  : 'bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                link.primary ? 'bg-black/5' : 'bg-zinc-800 group-hover:bg-zinc-700'
              }`}>
                {link.icon}
              </div>
              <div className="text-left flex-1">
                <p className="text-xs font-black uppercase tracking-tight">{link.title}</p>
                <p className={`text-[9px] font-bold uppercase tracking-widest ${
                  link.primary ? 'text-black/60' : 'text-zinc-500'
                }`}>{link.desc}</p>
              </div>
              <ArrowRight size={16} className={link.primary ? 'text-black/40' : 'text-zinc-700'} />
            </motion.button>
          ))}
        </div>

        {/* Footer / Socials */}
        <div className="mt-8 flex flex-col items-center gap-6">
           <div className="flex gap-4">
             {[Instagram, Phone, Calendar].map((Icon, i) => (
               <button key={i} className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-brand hover:border-brand/40 transition-all">
                 <Icon size={20} />
               </button>
             ))}
           </div>
           
           <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/40 rounded-full border border-zinc-800/10">
              <Star size={12} className="text-brand" fill="currentColor" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 italic">+12k Personas entrenando smart</span>
           </div>
        </div>

        <button className="mt-12 opacity-40 hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
            <p className="text-[8px] font-black uppercase tracking-[0.3em]">Powered by</p>
            <span className="font-display text-lg font-black italic tracking-tighter uppercase">{gymName} Web App</span>
        </button>
      </motion.div>
    </div>
  );
};
