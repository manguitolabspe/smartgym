import React from 'react';
import { Dumbbell, Zap, Star } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
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
  );
};
