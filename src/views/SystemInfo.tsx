import React from 'react';
import { ChevronRight } from 'lucide-react';
import { SystemInfoHero } from '../components/system-info/SystemInfoHero';
import { SystemInfoFeatures } from '../components/system-info/SystemInfoFeatures';
import { SystemInfoCredentials } from '../components/system-info/SystemInfoCredentials';
import { SystemInfoPricing } from '../components/system-info/SystemInfoPricing';

interface SystemInfoProps {
  onBack: () => void;
  onLogin: () => void;
}

export const SystemInfo: React.FC<SystemInfoProps> = ({ onBack, onLogin }) => {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans selection:bg-brand selection:text-black">
      {/* Navbar Minimalista */}
      <nav className="bg-white border-b border-zinc-200 sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-black transition-colors">
          <ChevronRight className="rotate-180" size={16} /> Volver a la plantilla
        </button>
        <button onClick={onLogin} className="brutalist-button text-[10px] px-6 py-2.5">
          Probar Demo (Login)
        </button>
      </nav>

      <SystemInfoHero />
      <SystemInfoFeatures />
      <SystemInfoCredentials onLogin={onLogin} />
      <SystemInfoPricing />
    </div>
  );
};
