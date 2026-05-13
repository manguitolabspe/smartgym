import React from 'react';
import { motion } from 'motion/react';
import { Zap, Activity, HeartPulse } from 'lucide-react';
import { Client } from '../../types';

interface PortalHomeViewProps {
  client: Client;
  isExpired: boolean;
  onRenew: () => void;
}

export const PortalHomeView: React.FC<PortalHomeViewProps> = ({ client, isExpired, onRenew }) => {
  return (
    <motion.div 
      key="home" 
      initial={{ opacity: 0, x: -20 }} 
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-sm font-black uppercase tracking-widest text-zinc-400 mb-1">¡Hola de nuevo!</h2>
        <h3 className="font-display text-4xl font-black italic uppercase tracking-tighter">{client.name.split(' ')[0]}</h3>
      </div>
      
      {/* Daily Tip / Announcement / Renewal CTA */}
      {isExpired ? (
        <div className="bento-card p-8 bg-brand text-black border-none shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 text-black/10 pointer-events-none group-hover:scale-110 transition-transform"><Zap size={140} /></div>
           <p className="text-[10px] font-black uppercase text-black/60 tracking-widest mb-4">Aviso de Cuenta</p>
           <h4 className="text-2xl font-black uppercase italic tracking-tighter leading-tight mb-6 mt-2">Tu acceso ha terminado.<br />¿Listo para volver?</h4>
           <button onClick={onRenew} className="bg-black text-brand px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">Renovar Membresía</button>
           <div className="mt-6 flex items-center gap-2 text-[9px] font-bold text-black/40 uppercase tracking-widest">
              <Activity size={12} /> Aprovecha 15% de descuento hoy
           </div>
        </div>
      ) : (
        <div className="bento-card p-8 bg-zinc-900 text-white border-none shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none group-hover:scale-110 transition-transform"><Zap size={140} /></div>
           <p className="text-[10px] font-black uppercase text-brand tracking-widest mb-4">Consejo del día</p>
           <h4 className="text-2xl font-black uppercase italic tracking-tighter leading-tight mb-4 group-hover:translate-x-2 transition-transform">No pares cuando estés cansado,<br />para cuando termines.</h4>
           <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
              <Activity size={12} className="text-brand" /> Clase de Yoga • 18:00 PM • Hoy
           </div>
        </div>
      )}

      {/* Progress Summary */}
      <div className={`grid grid-cols-2 gap-4 ${isExpired ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
        <div className="bento-card p-6 bg-white border-zinc-100">
          <div className="flex items-center gap-3 mb-4 text-zinc-400">
            <Activity size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Asistencias</span>
          </div>
          <p className="text-3xl font-black italic">14<span className="text-sm text-zinc-400 ml-1">v/mes</span></p>
        </div>
        <div className="bento-card p-6 bg-white border-zinc-100">
          <div className="flex items-center gap-3 mb-4 text-zinc-400">
            <HeartPulse size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Calorías</span>
          </div>
          <p className="text-3xl font-black italic">8.4k<span className="text-sm text-zinc-400 ml-1">kcal</span></p>
        </div>
      </div>
    </motion.div>
  );
};
