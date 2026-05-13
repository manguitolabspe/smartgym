import React from 'react';
import { Target, CreditCard, Users, Gift, Smartphone, Zap, MessageSquare } from 'lucide-react';

export const SystemInfoFeatures: React.FC = () => {
  return (
    <section className="py-24 bg-white border-y border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Para el Admin */}
        <div className="space-y-8">
           <div className="flex items-center gap-4 border-b border-zinc-100 pb-6">
              <div className="p-4 bg-zinc-900 text-white rounded-2xl"><Target size={24} /></div>
              <div>
                 <h2 className="font-display text-3xl font-black italic uppercase tracking-tighter">Para el Dueño / Admin</h2>
                 <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Control Total del Negocio</p>
              </div>
           </div>
           
           <ul className="space-y-6">
             {[
               { icon: <CreditCard />, title: 'Dashboard MVP', desc: 'Métricas en tiempo real, ingresos, ocupación (Heatmap) y alertas de renovaciones.' },
               { icon: <Users />, title: 'Gestor de Socios Avanzado', desc: 'Base de datos completa, control de planes, congelamiento de membresías y registro de pagos.' },
               { icon: <Gift />, title: 'Loyalty & Referidos', desc: 'Configura campañas de sellos digitales y recompensas automatizadas (como 1 mes gratis).' },
               { icon: <Smartphone />, title: 'Smart Store (POS)', desc: 'Administración de ventas secundarias (suplementos, merchandising, agua) integrada al portal.' }
             ].map((feat, i) => (
               <li key={i} className="flex gap-4 items-start">
                 <div className="p-2 bg-zinc-50 rounded-xl text-brand">{feat.icon}</div>
                 <div>
                   <h4 className="text-sm font-black uppercase tracking-tight">{feat.title}</h4>
                   <p className="text-xs text-zinc-500 font-medium leading-relaxed mt-1">{feat.desc}</p>
                 </div>
               </li>
             ))}
           </ul>
        </div>

        {/* Para el Socio */}
        <div className="space-y-8">
           <div className="flex items-center gap-4 border-b border-zinc-100 pb-6">
              <div className="p-4 bg-brand text-black rounded-2xl"><Smartphone size={24} /></div>
              <div>
                 <h2 className="font-display text-3xl font-black italic uppercase tracking-tighter">Para los Socios</h2>
                 <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Progress PWA (Aplicación Web)</p>
              </div>
           </div>
           
           <ul className="space-y-6">
             {[
               { icon: <Zap />, title: 'Portal Personalizado', desc: 'Sin descargar nada de las App Stores. Control de su pase de entrada y días restantes.' },
               { icon: <Target />, title: 'Métricas de Salud', desc: 'Registro de Peso, cálculo dinámico de IMC e historial en gráficas interactivas.' },
               { icon: <Gift />, title: 'Tarjeta VIP Digital', desc: 'Sustituto de la vieja tarjeta de cartulina. Acumulan sellos por visitas o referidos.' },
               { icon: <MessageSquare />, title: 'Comunidad & E-Commerce', desc: 'Muro social integrado con anuncios del gym y tienda en línea para reservar suplementos.' }
             ].map((feat, i) => (
               <li key={i} className="flex gap-4 items-start">
                 <div className="p-2 bg-zinc-50 rounded-xl text-zinc-900">{feat.icon}</div>
                 <div>
                   <h4 className="text-sm font-black uppercase tracking-tight">{feat.title}</h4>
                   <p className="text-xs text-zinc-500 font-medium leading-relaxed mt-1">{feat.desc}</p>
                 </div>
               </li>
             ))}
           </ul>
        </div>
      </div>
    </section>
  );
};
