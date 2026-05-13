import React from 'react';
import { motion } from 'motion/react';
import { Users, CreditCard, Star, Bell } from 'lucide-react';
import { GymStats } from '../../types';
import { BusinessIntelligence } from './BusinessIntelligence';

interface AdminOverviewTabProps {
  stats: GymStats;
  onMarketing: () => void;
}

export const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({ stats, onMarketing }) => {
  return (
    <motion.div 
      key="overview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bento-card p-6 bg-white flex flex-col justify-between min-h-[160px] group hover:border-brand/40 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Socios Activos</span>
            <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center text-green-600"><Users size={16} /></div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
               <p className="text-4xl font-black font-display italic leading-none">{stats.activeMembers}</p>
               <span className="text-[10px] font-black text-green-600 uppercase">+12%</span>
            </div>
            <p className="text-[9px] font-bold text-zinc-400 mt-2 uppercase tracking-widest leading-none">Crecimiento en Lima</p>
          </div>
        </div>

        <div className="bento-card p-6 bg-white flex flex-col justify-between min-h-[160px] group hover:border-brand/40 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Ingresos Hoy</span>
            <div className="w-8 h-8 rounded-xl bg-brand/10 flex items-center justify-center text-brand-dark"><CreditCard size={16} /></div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
               <p className="text-4xl font-black font-display italic leading-none">S/ {stats.monthlyRevenue}</p>
               <span className="text-[10px] font-black text-brand-dark uppercase">En Línea</span>
            </div>
            <p className="text-[9px] font-bold text-zinc-400 mt-2 uppercase tracking-widest leading-none">Corte a las 14:00 PM</p>
          </div>
        </div>

        <div className="bento-card p-6 bg-white flex flex-col justify-between min-h-[160px] group hover:border-brand/40 transition-all border-l-4 border-l-brand">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Total Membresías</span>
            <div className="w-8 h-8 rounded-xl bg-zinc-900 flex items-center justify-center text-brand"><Star size={16} /></div>
          </div>
          <div>
            <p className="text-4xl font-black font-display italic leading-none">{stats.totalClients}</p>
            <p className="text-[9px] font-bold text-zinc-400 mt-2 uppercase tracking-widest leading-none">Inscritos este año</p>
          </div>
        </div>

        <div className="bento-card p-6 bg-zinc-900 text-white flex flex-col justify-between min-h-[160px] border-none shadow-xl shadow-black/20">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Alertas Sistema</span>
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-red-500"><Bell size={16} className="animate-pulse" /></div>
          </div>
          <div>
            <p className="text-4xl font-black font-display italic leading-none">{stats.expiringSoonEntries}</p>
            <p className="text-[9px] font-bold text-zinc-500 mt-2 uppercase tracking-widest leading-none text-red-400">Acción requerida</p>
          </div>
        </div>
      </div>

      <BusinessIntelligence onMarketing={onMarketing} />
    </motion.div>
  );
};
