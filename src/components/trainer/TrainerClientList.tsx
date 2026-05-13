import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, ChevronRight, Activity, Calendar } from 'lucide-react';
import { Client } from '../../types';

interface TrainerClientListProps {
  clients: Client[];
  onSelectClient: (client: Client) => void;
}

export const TrainerClientList: React.FC<TrainerClientListProps> = ({ clients, onSelectClient }) => {
  const [search, setSearch] = useState('');

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.membershipId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div>
        <h2 className="font-display text-4xl font-black uppercase italic tracking-tighter text-zinc-900 leading-none">Mis Atletas</h2>
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-2">Seguimiento y Rutinas</p>
      </div>

      <div className="relative">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
        <input
          type="text"
          placeholder="Buscar por nombre o ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-16 pr-6 py-5 bg-white border-2 border-zinc-100 rounded-3xl outline-none focus:border-brand font-bold uppercase tracking-wide text-xs"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map(client => (
          <div 
            key={client.id} 
            onClick={() => onSelectClient(client)}
            className="bento-card p-6 bg-white cursor-pointer group hover:border-brand transition-all flex flex-col justify-between"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-zinc-900 text-brand rounded-xl flex items-center justify-center font-black italic text-xl shadow-lg shadow-brand/10 group-hover:scale-110 transition-transform">
                   {client.avatar}
                 </div>
                 <div>
                   <h3 className="font-black uppercase tracking-tight leading-none mb-1 text-zinc-900">{client.name}</h3>
                   <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{client.membershipId}</p>
                 </div>
              </div>
              <ChevronRight className="text-zinc-200 group-hover:text-brand transition-colors" size={20} />
            </div>

             <div className="grid grid-cols-2 gap-4 border-t border-zinc-50 pt-4 mb-4">
               <div>
                  <div className="flex items-center gap-2 mb-1">
                     <Activity size={12} className="text-zinc-400" />
                     <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Peso / Grasa</span>
                  </div>
                  <p className="text-sm font-black italic">{client.weight}kg <span className="text-zinc-400 font-medium ml-1 text-xs">{client.bodyFat ? `${client.bodyFat}%` : '--'}</span></p>
               </div>
               <div>
                  <div className="flex items-center gap-2 mb-1">
                     <Calendar size={12} className="text-zinc-400" />
                     <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Récord</span>
                  </div>
                  <p className="text-sm font-black italic text-zinc-600">{client.routines?.length ? `${client.routines.length} Rutinas` : 'Sin rutina'}</p>
               </div>
            </div>
            
            <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100 flex items-center justify-between">
              <span className="text-[9px] font-black text-brand-dark uppercase tracking-widest">{client.fitnessGoal || 'Sin Objetivo'}</span>
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{client.fitnessLevel || 'No Definido'}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
