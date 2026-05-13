import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dumbbell, Users, Activity, LogOut, ChevronRight, User, Weight, ClipboardList } from 'lucide-react';
import { Client } from '../types';
import { TrainerClientList } from '../components/trainer/TrainerClientList';
import { TrainerClientDetail } from '../components/trainer/TrainerClientDetail';

interface TrainerDashboardProps {
  clients: Client[];
  onLogout: () => void;
  onUpdateClient: (client: Client) => void;
}

export const TrainerDashboard: React.FC<TrainerDashboardProps> = ({ clients, onLogout, onUpdateClient }) => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col lg:flex-row font-sans pb-20 lg:pb-0">
      {/* Mobile Header */}
      <header className="lg:hidden bg-zinc-950 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-brand p-1.5 rounded-xl shadow-lg shadow-brand/20">
            <Dumbbell className="text-black w-5 h-5" />
          </div>
          <span className="font-display text-xl font-black italic uppercase tracking-tighter">Entrenador</span>
        </div>
        {!selectedClient && (
          <button onClick={onLogout} className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
            <LogOut size={18} />
          </button>
        )}
      </header>

      <aside className="hidden lg:flex w-72 bg-zinc-950 text-white flex-col sticky top-0 h-screen p-8 border-r border-zinc-800">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-brand p-2 rounded-2xl shadow-lg shadow-brand/20">
            <Dumbbell className="text-black w-6 h-6" />
          </div>
          <span className="font-display text-2xl font-black italic uppercase tracking-tighter">Entrenador</span>
        </div>
        
        <nav className="flex-1 space-y-4">
          <button
            onClick={() => setSelectedClient(null)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-black uppercase text-[10px] tracking-widest ${
              !selectedClient ? 'bg-brand text-black shadow-xl shadow-brand/10 translate-x-2' : 'text-zinc-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users size={18} strokeWidth={!selectedClient ? 3 : 2} /> Mis Atletas
          </button>
        </nav>

        <button 
          onClick={onLogout}
          className="mt-8 flex items-center gap-4 p-4 text-zinc-500 hover:text-red-400 transition-all font-black uppercase text-[10px] tracking-widest"
        >
          <LogOut size={18} /> Cerrar Sesión
        </button>
      </aside>

      <main className="flex-1 p-6 lg:p-12 max-w-6xl mx-auto w-full">
        {!selectedClient ? (
          <TrainerClientList clients={clients} onSelectClient={setSelectedClient} />
        ) : (
          <TrainerClientDetail 
            client={selectedClient} 
            onBack={() => setSelectedClient(null)} 
            onUpdate={onUpdateClient} 
          />
        )}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 pb-2 pt-2 px-2 flex justify-around items-center z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => setSelectedClient(null)}
          className={`flex-1 min-w-0 py-2 flex flex-col items-center gap-1 transition-colors ${
            !selectedClient ? 'text-brand-dark' : 'text-zinc-400 hover:text-zinc-600'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-all ${!selectedClient ? 'bg-brand/20' : ''}`}>
             <Users size={22} strokeWidth={!selectedClient ? 2.5 : 2} className={!selectedClient ? 'text-brand-dark' : ''} />
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest truncate w-full text-center">Mis Atletas</span>
        </button>
        {selectedClient && (
          <button
            className={`flex-1 min-w-0 py-2 flex flex-col items-center gap-1 transition-colors text-brand-dark`}
          >
            <div className={`p-1.5 rounded-xl transition-all bg-brand/20`}>
               <ClipboardList size={22} strokeWidth={2.5} className="text-brand-dark" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest truncate w-full text-center">Ficha del Atleta</span>
          </button>
        )}
      </nav>
    </div>
  );
};
