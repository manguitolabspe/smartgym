import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SystemSalesCTAProps {
  onViewInfo?: () => void;
}

export const SystemSalesCTA: React.FC<SystemSalesCTAProps> = ({ onViewInfo }) => {
  return (
    <section className="py-24 bg-brand text-black text-center px-6">
      <div className="max-w-4xl mx-auto space-y-8">
         <h2 className="font-display text-4xl md:text-6xl font-black uppercase italic tracking-tighter">¿Buscas un sistema como este para tu gimnasio?</h2>
         <p className="text-lg font-bold text-black/70 max-w-2xl mx-auto">Descubre cómo Smart Gym OS puede transformar la administración de tu negocio, fidelizar a tus clientes y aumentar tus ingresos.</p>
         <button 
           onClick={onViewInfo} 
           className="bg-black text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-3 mx-auto"
         >
           Ver información del Sistema <ArrowRight size={18} />
         </button>
      </div>
    </section>
  );
};
