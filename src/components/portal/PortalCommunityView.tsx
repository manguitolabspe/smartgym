import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, HeartPulse, Share2 } from 'lucide-react';

export const PortalCommunityView: React.FC = () => {
  return (
    <motion.div 
      key="community"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8 pb-12"
    >
      <h3 className="font-display text-4xl font-black uppercase italic tracking-tighter text-zinc-900 leading-none">Muro Social</h3>
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
                   <p className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest leading-none mt-1">{post.time}</p>
                </div>
              </div>
              <span className="text-[8px] font-black uppercase border border-zinc-200 px-2 py-1 rounded-full text-zinc-500 bg-zinc-50 tracking-widest">{post.type}</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed mb-6 font-medium">{post.content}</p>
            <div className="flex items-center gap-4 pt-4 border-t border-zinc-50">
              <button className="flex items-center gap-2 text-zinc-400 hover:text-red-500 transition-colors">
                <HeartPulse size={16} /> <span className="text-[10px] font-black">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-zinc-400 hover:text-brand-dark transition-colors">
                <MessageSquare size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Comentar</span>
              </button>
              <button className="ml-auto text-zinc-300 hover:text-zinc-600 transition-colors">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
