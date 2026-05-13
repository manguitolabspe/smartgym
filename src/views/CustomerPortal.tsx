import React, { useState } from 'react';
import { 
  Home, 
  Trophy, 
  MessageSquare, 
  ShoppingBag, 
  User, 
  Bell,
  Zap,
  Dumbbell
} from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { Client, LoyaltyConfig } from '../types';
import { LoyaltyView } from '../components/portal/LoyaltyView';
import { PortalHomeView } from '../components/portal/PortalHomeView';
import { PortalCommunityView } from '../components/portal/PortalCommunityView';
import { PortalShopView } from '../components/portal/PortalShopView';
import { PortalProfileView } from '../components/portal/PortalProfileView';
import { PortalTrainingView } from '../components/portal/PortalTrainingView';

interface CustomerPortalProps {
  client: Client;
  loyaltyConfig: LoyaltyConfig;
  onLogout: () => void;
  setToast: (msg: string | null) => void;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({
  client,
  loyaltyConfig,
  onLogout,
  setToast
}) => {
  const isExpired = client.status === 'Vencido' || client.status === 'Inactivo';
  const [activeTab, setActiveTab] = useState<'home' | 'training' | 'loyalty' | 'community' | 'shop' | 'profile'>(isExpired ? 'loyalty' : 'home');
  const [fitnessGoal, setFitnessGoal] = useState<'Perder Peso' | 'Ganar Músculo' | 'Mantenimiento'>('Mantenimiento');

  const tabs = [
    { id: 'home', icon: Home, label: 'Inicio' },
    { id: 'training', icon: Dumbbell, label: 'Entrenar' },
    { id: 'loyalty', icon: Trophy, label: 'Premios' },
    { id: 'community', icon: MessageSquare, label: 'Muro' },
    { id: 'shop', icon: ShoppingBag, label: 'Tienda' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  // Solo mostrar la pestaña de "Premios" (loyalty) si el cliente tiene la membresía vencida o inactiva
  const visibleTabs = isExpired ? tabs : tabs.filter(t => t.id !== 'loyalty');

  const imc = client.height && client.weight ? (client.weight / Math.pow(client.height / 100, 2)).toFixed(1) : '0';
  const imcStatus = Number(imc) < 18.5 ? 'Bajo Peso' : Number(imc) < 25 ? 'Normal' : Number(imc) < 30 ? 'Sobrepeso' : 'Obesidad';

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col font-sans">
      <header className="bg-white px-6 py-4 border-b border-zinc-200 sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-brand shadow-lg">
            <Zap size={20} />
          </div>
          <span className="font-display text-2xl font-black italic uppercase tracking-tighter">Smart Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-3 bg-zinc-50 rounded-xl relative hover:bg-zinc-100 transition-colors">
            <Bell size={20} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-brand rounded-full border border-white" />
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-lg mx-auto w-full pb-32">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <PortalHomeView 
              client={client} 
              isExpired={isExpired} 
              onRenew={() => setActiveTab('shop')} 
            />
          )}

          {activeTab === 'training' && (
            <PortalTrainingView client={client} />
          )}

          {activeTab === 'loyalty' && (
            <LoyaltyView loyaltyConfig={loyaltyConfig} userStamps={4} />
          )}

          {activeTab === 'community' && (
            <PortalCommunityView />
          )}

          {activeTab === 'shop' && (
            <PortalShopView onAddToCart={(name) => setToast(`Añadido al carrito: ${name}`)} />
          )}

          {activeTab === 'profile' && (
            <PortalProfileView 
              client={client} 
              isExpired={isExpired}
              imc={imc}
              imcStatus={imcStatus}
              fitnessGoal={fitnessGoal}
              setFitnessGoal={setFitnessGoal}
              onLogout={onLogout}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Nav Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 pb-2 pt-2 px-2 flex justify-around items-center z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        {visibleTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 min-w-0 py-2 flex flex-col items-center gap-1 transition-colors ${
              activeTab === tab.id ? 'text-brand-dark' : 'text-zinc-400 hover:text-zinc-600'
            }`}
          >
            <div className={`p-1.5 rounded-xl transition-all ${activeTab === tab.id ? 'bg-brand/20' : ''}`}>
               <tab.icon size={22} strokeWidth={activeTab === tab.id ? 2.5 : 2} className={activeTab === tab.id ? 'text-brand-dark' : ''} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest truncate w-full text-center">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

