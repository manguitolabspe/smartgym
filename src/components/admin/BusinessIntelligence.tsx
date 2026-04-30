import React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, Tooltip, Bar, Cell } from 'recharts';
import { Zap, ShoppingBag } from 'lucide-react';

export const BusinessIntelligence: React.FC<{ onMarketing: () => void }> = ({ onMarketing }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {/* Heatmap Section */}
      <div className="lg:col-span-3 bento-card p-8 bg-black text-white border-none shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none"><Zap size={200} /></div>
         <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
               <div>
                  <h4 className="text-xl font-black uppercase italic tracking-tighter text-brand">Heatmap de Afluencia</h4>
                  <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Horas pico vs Capacidad</p>
               </div>
               <div className="bg-zinc-800 px-3 py-1.5 rounded-xl border border-zinc-700 text-[8px] font-black uppercase">Última Semana</div>
            </div>
            
            <div className="flex-1 h-[140px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { h: '06AM', p: 40 },
                  { h: '08AM', p: 85 },
                  { h: '10AM', p: 60 },
                  { h: '12PM', p: 30 },
                  { h: '14PM', p: 45 },
                  { h: '16PM', p: 70 },
                  { h: '18PM', p: 115 },
                  { h: '20PM', p: 95 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1F2937" />
                  <XAxis dataKey="h" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 900, fill: '#6B7280'}} dy={10} />
                  <Tooltip 
                    cursor={{fill: '#27272A'}}
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #3F3F46', color: '#fff', fontSize: '10px' }}
                  />
                  <Bar dataKey="p" fill="#7FFF00" radius={[10, 10, 0, 0]}>
                    { [40, 85, 60, 30, 45, 70, 115, 95].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry > 100 ? '#F87171' : '#7FFF00'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8 flex justify-between items-center bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <span className="text-[9px] font-black uppercase text-zinc-400">Sobrecapacidad</span>
               </div>
               <p className="text-[10px] font-black uppercase italic">Mejor hora para limpieza: <span className="text-brand font-display">01:00 PM</span></p>
            </div>
         </div>
      </div>

      {/* Secondary Revenue Card */}
      <div className="lg:col-span-2 bento-card p-8 bg-white flex flex-col justify-between group overflow-hidden">
         <div className="absolute -bottom-10 -right-10 text-zinc-50 opacity-0 group-hover:opacity-100 transition-opacity"><ShoppingBag size={180} /></div>
         <div className="relative z-10">
            <div className="flex justify-between items-start mb-10">
               <div className="p-4 bg-zinc-100 rounded-2xl text-zinc-400 group-hover:text-brand-dark group-hover:bg-brand/10 transition-all"><ShoppingBag size={24} /></div>
               <div className="text-right">
                  <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Ingresos Secundarios</p>
                  <p className="text-[9px] font-black uppercase text-green-600 bg-green-50 px-2 py-0.5 rounded-full inline-block">S/ +2,450/mes</p>
               </div>
            </div>
            <h4 className="text-3xl font-black uppercase italic tracking-tighter leading-none mb-6">Smart<br />Store & Bar</h4>
            
            <div className="space-y-4">
              {[
                { name: 'Suplementos', val: 'S/ 1,200', pct: 60 },
                { name: 'Accesorios', val: 'S/ 850', pct: 30 },
                { name: 'Café/Snacks', val: 'S/ 400', pct: 10 },
              ].map((s, i) => (
                <div key={i} className="space-y-1.5">
                   <div className="flex justify-between text-[8px] font-black uppercase italic">
                      <span>{s.name}</span>
                      <span>{s.val}</span>
                   </div>
                   <div className="w-full h-1 bg-zinc-50 rounded-full overflow-hidden">
                      <div className="h-full bg-zinc-900 group-hover:bg-brand transition-colors" style={{ width: `${s.pct}%` }}></div>
                   </div>
                </div>
              ))}
            </div>
         </div>
         <button onClick={onMarketing} className="mt-8 relative z-10 w-full py-4 border border-zinc-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-950 hover:text-white transition-all">Ver Inventario Full</button>
      </div>
    </div>
  );
};
