import React from 'react';
import { Check, Star, Zap } from 'lucide-react';

export const PlanesSection: React.FC<{ onJoin: () => void }> = ({ onJoin }) => {
  const planes = [
    {
      name: 'Smart Basic',
      price: '69',
      features: ['Acceso Sede Elegida', 'Área de Musculación', 'Duchas y Lockers', 'App de Entrenamiento'],
      accent: false,
    },
    {
      name: 'Smart Plus',
      price: '99',
      features: ['Multisede (Lima)', 'Clases Grupales', 'Smart Store Discount', '1 Amigo Gratis(S-D)', 'Sorteos Exclusivos'],
      accent: true,
    },
    {
      name: 'Smart Black',
      price: '149',
      features: ['Multisede Nacional', 'Zona VIP & Relax', 'Entrenador Personal (1h)', 'Suplemento Semanal', 'Acceso Comunidad Pro'],
      accent: false,
    }
  ];

  return (
    <section id="planes" className="py-12 md:py-32 px-4 md:px-6 bg-zinc-50 overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-24">
          <h2 className="font-display text-4xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-4 md:mb-6">Membresías <span className="text-brand">Smart</span></h2>
          <p className="text-zinc-500 font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[8px] md:text-[10px]">Sin Cláusulas Ocultas • Sin Permanencia</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {planes.map((plan, i) => (
            <div 
              key={i} 
              className={`relative bento-card p-6 md:p-10 flex flex-col h-full group transition-all duration-500 ${
                plan.accent 
                  ? 'bg-zinc-950 text-white border-zinc-900 shadow-2xl md:scale-105 z-10' 
                  : 'bg-white text-zinc-900 border-zinc-100 md:hover:scale-[1.02]'
              }`}
            >
              {plan.accent && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">Recomendado</div>
              )}
              
              <div className="mb-12">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                   <span className="text-[10px] font-black uppercase tracking-widest opacity-40">S/</span>
                   <span className="text-6xl font-black font-display tracking-tight">{plan.price}</span>
                   <span className="text-[10px] font-black uppercase tracking-widest opacity-40">/mes</span>
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-12">
                {plan.features.map((feat, j) => (
                  <div key={j} className="flex items-start gap-4">
                    <div className={`mt-1 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${plan.accent ? 'bg-brand text-black' : 'bg-zinc-900 text-brand'}`}>
                      <Check size={10} strokeWidth={4} />
                    </div>
                    <span className={`text-xs font-black uppercase tracking-wide leading-tight ${plan.accent ? 'text-zinc-300' : 'text-zinc-500'}`}>{feat}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={onJoin}
                className={`w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all active:scale-95 border ${
                  plan.accent 
                    ? 'bg-brand text-black border-brand hover:bg-white hover:border-white' 
                    : 'bg-zinc-900 text-white border-zinc-900 hover:bg-black'
                }`}
              >
                Elegir Plan
              </button>
            </div>
          ))}
        </div>

        <div className="mt-24 p-10 bento-card bg-white border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-8 group">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-brand rounded-2xl flex items-center justify-center text-black shadow-xl group-hover:scale-110 transition-transform"><Zap size={32} /></div>
              <div>
                 <h4 className="text-2xl font-black uppercase italic tracking-tighter italic">¿No sabes qué plan elegir?</h4>
                 <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mt-1">Escríbenos y un asesor te ayudará a decidir.</p>
              </div>
           </div>
           <button className="brutalist-button text-xs px-12 py-5 bg-white border-zinc-200 hover:border-brand hover:text-brand transition-all">Chat en Vivo</button>
        </div>
      </div>
    </section>
  );
};
