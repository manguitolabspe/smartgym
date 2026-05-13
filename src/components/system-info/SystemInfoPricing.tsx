import React from 'react';
import { Check, ExternalLink } from 'lucide-react';

export const SystemInfoPricing: React.FC = () => {
  return (
    <section className="py-32 px-6">
       <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="font-display text-5xl md:text-6xl font-black uppercase italic tracking-tighter mb-4 text-zinc-900">Planes de Implementación</h2>
             <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Toma el control de tu gimnasio hoy</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
             
             {/* Modalidad Mensual */}
             <div className="bento-card bg-white border-zinc-200 p-10 h-max">
                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Modalidad Mensual (SaaS)</div>
                <div className="flex items-baseline gap-2 mb-8">
                   <span className="text-4xl font-display font-black italic tracking-tighter">S/ 100</span>
                   <span className="text-xs font-bold text-zinc-400 uppercase">/ mes</span>
                </div>
                <ul className="space-y-4 mb-8">
                   <li className="flex items-center gap-3 text-sm font-medium"><Check size={16} className="text-brand" /> Instalación Inicial: S/ 150</li>
                   <li className="flex items-center gap-3 text-sm font-medium"><Check size={16} className="text-brand" /> Mantenimiento Incluido</li>
                   <li className="flex items-center gap-3 text-sm font-medium text-zinc-500"><Check size={16} className="text-zinc-300" /> Sin dominio propio</li>
                </ul>
                <a href="https://wa.me/51930288404?text=Hola,%20estoy%20interesado%20en%20el%20sistema%20Smart%20Gym%20en%20modalidad%20mensual" target="_blank" rel="noopener noreferrer" className="block w-full py-4 text-center rounded-2xl text-[10px] font-black uppercase tracking-widest bg-zinc-100 text-zinc-900 hover:bg-zinc-200 transition-colors">
                  Consultar Mensual
                </a>
             </div>

             {/* Promoción Anual LIFETIME */}
             <div className="bento-card bg-brand text-black border-none p-12 shadow-2xl scale-105 relative z-10 overflow-hidden group">
                <div className="absolute top-0 right-0 bg-black text-white text-[8px] font-black uppercase tracking-widest px-4 py-2 rounded-bl-2xl shadow-xl">Válido solo para los 3 primeros</div>
                <div className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-60">Paga una vez, úsalo todo el año</div>
                
                <div className="space-y-1 mb-8">
                  <p className="text-xs font-bold uppercase line-through opacity-80">Precio Regular: S/ 1200</p>
                  <div className="flex items-baseline gap-2">
                     <span className="text-6xl font-display font-black italic tracking-tighter">S/ 800</span>
                     <span className="text-xs font-bold uppercase">/ anual</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-10 border-t border-black/10 pt-8">
                   <li className="flex items-center gap-3 font-bold"><Check size={18} /> Sin pagos mensuales</li>
                   <li className="flex items-center gap-3 font-bold"><Check size={18} /> Incluye Hosting Superior</li>
                   <li className="flex items-center gap-3 font-bold"><Check size={18} /> Dominio .com GRATIS</li>
                   <li className="flex items-center gap-3 font-bold"><Check size={18} /> Soporte Prioritario Técnico</li>
                </ul>

                <a href="https://wa.me/51930288404?text=Hola,%20estoy%20interesado%20en%20la%20promoción%20anual%20de%20S/800%20del%20sistema%20Smart%20Gym" target="_blank" rel="noopener noreferrer" className="block w-full py-5 text-center rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] bg-black text-brand shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                  Obtener Promo Anual <ExternalLink size={14} className="inline ml-1 -mt-0.5" />
                </a>
             </div>

          </div>
       </div>
    </section>
  );
};
