import React from 'react';
import { motion } from 'motion/react';
import { Scale, Zap, Target, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Client } from '../../types';

interface PortalProfileViewProps {
  client: Client;
  isExpired: boolean;
  imc: string;
  imcStatus: string;
  fitnessGoal: string;
  setFitnessGoal: (val: any) => void;
  onLogout: () => void;
}

export const PortalProfileView: React.FC<PortalProfileViewProps> = ({ 
  client, isExpired, imc, imcStatus, fitnessGoal, setFitnessGoal, onLogout 
}) => {
  return (
    <motion.div 
      key="profile"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      <h3 className="font-display text-4xl font-black uppercase italic tracking-tighter text-zinc-900 leading-none">Mi Perfil</h3>
      
      <div className="bento-card p-8 bg-white space-y-8">
         <div className="flex items-center gap-6">
           <div className="w-20 h-20 bg-zinc-900 rounded-[2rem] flex items-center justify-center text-4xl font-black italic border-2 border-brand text-brand shadow-xl">
             {client.avatar}
           </div>
           <div>
              <p className="text-2xl font-black uppercase tracking-tight italic leading-none mb-1">{client.name}</p>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{client.membershipId}</p>
           </div>
         </div>

         {/* Health Stats Section */}
         <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${isExpired ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
            <div className="p-6 bg-zinc-50 rounded-3xl border border-zinc-100 group">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-zinc-200 group-hover:text-brand transition-colors"><Scale size={14} /></div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Peso Actual</span>
               </div>
               <p className="text-3xl font-black italic">{client.weight} kg</p>
               <p className="text-[8px] text-green-600 font-bold uppercase mt-2">▼ 3.5kg este mes</p>
            </div>
            <div className="p-6 bg-brand text-black rounded-3xl border border-brand-dark shadow-lg shadow-brand/20 relative group overflow-hidden">
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

         <div className={`grid grid-cols-1 gap-6 ${isExpired ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
            <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 flex flex-col min-h-[240px]">
               <div className="flex justify-between items-center mb-8">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Evolución de Peso</h4>
                  </div>
               </div>
               <div className="h-[120px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { name: 'Ene', w: 82 },
                      { name: 'Feb', w: 80.5 },
                      { name: 'Mar', w: 79.2 },
                      { name: 'Abr', w: 78.5 },
                      { name: 'May', w: client.weight },
                    ]}>
                      <Line type="monotone" dataKey="w" stroke="#7FFF00" strokeWidth={4} dot={{ r: 6, fill: '#000', strokeWidth: 2, stroke: '#7FFF00' }} />
                    </LineChart>
                 </ResponsiveContainer>
               </div>
            </div>
         </div>

         <div className="space-y-4">
            <div className="flex items-center gap-3">
               <Target size={18} className="text-brand" />
               <h4 className="text-[10px] font-black uppercase tracking-widest">¿Cuál es tu objetivo hoy?</h4>
            </div>
            <div className="grid grid-cols-1 gap-2">
               {['Perder Peso', 'Ganar Músculo', 'Mantenimiento'].map((goal) => (
                 <button
                   key={goal}
                   onClick={() => setFitnessGoal(goal)}
                   className={`p-4 rounded-2xl border-2 transition-all text-left flex justify-between items-center ${fitnessGoal === goal ? 'border-brand bg-brand/5' : 'border-zinc-50'}`}
                 >
                    <span className="text-[10px] font-black uppercase tracking-widest">{goal}</span>
                    {fitnessGoal === goal && <CheckCircle2 size={16} className="text-brand" />}
                 </button>
               ))}
            </div>
         </div>

         <button 
          onClick={onLogout} 
          className="w-full py-5 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-red-100 transition-all border border-red-100"
         >
           Cerrar Sesión
         </button>
      </div>
    </motion.div>
  );
};
