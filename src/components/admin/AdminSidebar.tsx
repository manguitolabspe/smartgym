import React from 'react';
import { LogOut, Zap } from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  tabs: { id: string; icon: React.ElementType; label: string }[];
  onLogout: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab, tabs, onLogout }) => {
  return (
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
  );
};
