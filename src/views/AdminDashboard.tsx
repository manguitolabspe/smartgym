import React, { useState } from 'react';
import { 
  Users, 
  CreditCard, 
  LayoutDashboard, 
  LogOut, 
  Search,
  Plus,
  ArrowRight,
  Settings,
  Zap,
  Bell,
  Star,
  Trophy,
  Activity,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Award,
  ChevronRight,
  UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Client, Payment, GymStats, LoyaltyConfig } from '../types';
import { BusinessIntelligence } from '../components/admin/BusinessIntelligence';
import { ClientsList } from '../components/admin/ClientsList';

interface AdminDashboardProps {
  clients: Client[];
  payments: Payment[];
  stats: GymStats;
  loyaltyConfig: LoyaltyConfig;
  onLogout: () => void;
  onUpdateLoyalty: (config: LoyaltyConfig) => void;
  onAction: (msg: string) => void;
  onAddClient: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  clients,
  payments,
  stats,
  loyaltyConfig,
  onLogout,
  onUpdateLoyalty,
  onAction,
  onAddClient
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'clients' | 'payments' | 'marketing'>('overview');

  const tabs = [
    { id: 'overview', icon: LayoutDashboard, label: 'Resumen' },
    { id: 'clients', icon: Users, label: 'Socios' },
    { id: 'payments', icon: CreditCard, label: 'Finanzas' },
    { id: 'marketing', icon: Zap, label: 'Marketing' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col lg:flex-row font-sans">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-72 bg-zinc-950 text-white flex-col sticky top-0 h-screen p-8 border-r border-zinc-800">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-brand p-2 rounded-2xl shadow-lg shadow-brand/20">
            <Zap className="text-black w-6 h-6" />
          </div>
          <span className="font-display text-2xl font-black italic uppercase tracking-tighter">Smart Admin</span>
        </div>
        
        <nav className="flex-1 space-y-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-black uppercase text-[10px] tracking-widest ${
                activeTab === tab.id ? 'bg-brand text-black shadow-xl shadow-brand/10 translate-x-2' : 'text-zinc-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon size={18} strokeWidth={activeTab === tab.id ? 3 : 2} />
              {tab.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={onLogout}
          className="mt-8 flex items-center gap-4 p-4 text-zinc-500 hover:text-red-400 transition-all font-black uppercase text-[10px] tracking-widest"
        >
          <LogOut size={18} /> Cerrar Sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 pb-32 lg:pb-12 max-w-7xl mx-auto w-full">
        <header className="flex justify-between items-center mb-12">
          <div>
            <p className="text-[10px] text-zinc-400 font-black uppercase tracking-[0.4em] mb-2">Dashboard Administrativo</p>
            <h2 className="font-display text-4xl lg:text-6xl font-black italic uppercase tracking-tighter">
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
          </div>
          <button className="relative p-4 bg-white border border-zinc-200 rounded-2xl hidden md:block group hover:border-brand transition-colors shadow-sm">
            <Bell size={20} className="text-zinc-400 group-hover:text-black transition-colors" />
            <span className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full border-2 border-white ring-4 ring-transparent animate-pulse" />
          </button>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
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

              <BusinessIntelligence onMarketing={() => setActiveTab('marketing')} />
            </motion.div>
          )}

          {activeTab === 'clients' && (
            <motion.div 
              key="clients"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ClientsList clients={clients} onAddClient={onAddClient} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Nav Mobile */}
      <nav className="lg:hidden fixed bottom-6 left-6 right-6 bg-zinc-950 text-white p-3 rounded-[2.5rem] flex justify-around items-center border border-zinc-800 shadow-2xl z-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`p-4 rounded-2xl transition-all ${
              activeTab === tab.id ? 'bg-brand text-black shadow-lg shadow-brand/20' : 'text-zinc-500'
            }`}
          >
            <tab.icon size={20} />
          </button>
        ))}
        <button onClick={onLogout} className="p-4 text-red-500"><LogOut size={20} /></button>
      </nav>
    </div>
  );
};
