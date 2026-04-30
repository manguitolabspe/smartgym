import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, QrCode, Star, CheckCircle2 } from 'lucide-react';
import { LoyaltyConfig } from '../../types';

interface LoyaltyViewProps {
  loyaltyConfig: LoyaltyConfig;
  userStamps: number;
}

export const LoyaltyView: React.FC<LoyaltyViewProps> = ({ loyaltyConfig, userStamps }) => {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="font-display text-4xl font-black uppercase italic tracking-tighter leading-none mb-2">Smart Loyalty</h3>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em]">Entrena. Acumula. Gana.</p>
        </div>
        <div className="bg-brand text-black px-6 py-3 rounded-2xl shadow-xl shadow-brand/20 flex items-center gap-3">
          <Gift size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest leading-none mt-1">Beneficio Nivel Black</span>
        </div>
      </div>

      {/* Stamp Card */}
      <div className="bento-card p-10 bg-white border-zinc-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 text-zinc-50 pointer-events-none group-hover:scale-110 transition-transform duration-700">
          <QrCode size={180} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-5 mb-12">
            <div className="w-2 relative">
               <div className="w-14 h-14 bg-zinc-900 rounded-[1.5rem] flex items-center justify-center text-brand border-2 border-brand shadow-xl">
                 <QrCode size={24} />
               </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Tu Tarjeta Digital</p>
              <h4 className="text-xl font-black uppercase italic tracking-tighter">Smart Pass Premium</h4>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4 lg:gap-8 mb-12">
            {Array.from({ length: loyaltyConfig.totalStampsToReward }).map((_, i) => (
              <div 
                key={i} 
                className={`aspect-square rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
                  i < userStamps 
                    ? 'bg-brand border-brand-dark text-black shadow-lg scale-110' 
                    : 'bg-zinc-50 border-zinc-100 text-zinc-200'
                }`}
              >
                {i < userStamps ? <CheckCircle2 size={24} strokeWidth={3} /> : <Star size={20} />}
              </div>
            ))}
          </div>

          <div className="p-8 bg-zinc-950 text-white rounded-[2rem] border border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="text-center md:text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Próxima Recompensa</p>
                <div className="text-2xl font-black italic text-brand font-display uppercase tracking-tighter">{loyaltyConfig.rewardDescription}</div>
             </div>
             <div className="w-full md:w-auto">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3">
                  <span>Progreso</span>
                  <span>{userStamps}/{loyaltyConfig.totalStampsToReward} Sellos</span>
                </div>
                <div className="w-48 h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(userStamps / loyaltyConfig.totalStampsToReward) * 100}%` }}
                    className="h-full bg-brand"
                  />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
