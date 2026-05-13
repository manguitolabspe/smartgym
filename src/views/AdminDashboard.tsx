import React, { useState } from 'react';
import { 
  Users, 
  CreditCard, 
  LayoutDashboard, 
  LogOut, 
  Zap,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Client, Payment, GymStats, LoyaltyConfig } from '../types';
import { AdminOverviewTab } from '../components/admin/AdminOverviewTab';
import { ClientsList } from '../components/admin/ClientsList';
import { AdminSidebar } from '../components/admin/AdminSidebar';

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
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} onLogout={onLogout} />

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
            <AdminOverviewTab stats={stats} onMarketing={() => setActiveTab('marketing')} />
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
