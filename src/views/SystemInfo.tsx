import React from 'react';
import { motion } from 'motion/react';
import { Check, Dumbbell, Smartphone, LogIn, ChevronRight, Zap, Target, CreditCard, Gift, Users, Mail, Phone, ExternalLink, MessageSquare, Shield, User } from 'lucide-react';

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

      {/* Hero Section */}
      <header className="pt-24 pb-16 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center justify-center p-4 bg-brand rounded-3xl shadow-xl shadow-brand/20 mb-8 transform -rotate-3">
           <Dumbbell size={48} className="text-black" />
        </div>
        <h1 className="font-display text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-6 text-zinc-900">
          Smart Gym <span className="text-brand">OS</span>
        </h1>
        <p className="text-xl md:text-2xl font-medium text-zinc-500 tracking-wide uppercase max-w-2xl mx-auto">
          El sistema All-In-One definitivo para administrar tu gimnasio y fidelizar a tus atletas.
        </p>
      </header>

      {/* Características Divididas */}
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

      {/* Credenciales de Demo */}
      <section className="py-24 px-6 bg-zinc-950 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-12">
           <div>
              <h2 className="font-display text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-4 text-brand">Prueba el Sistema Ahora</h2>
              <p className="text-zinc-400 text-sm font-medium">Usa estas credenciales creadas específicamente para verificar el funcionamiento de los distintos roles.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bento-card bg-zinc-900 border-zinc-800 p-8 text-left hover:border-brand transition-colors">
                <Shield className="text-brand mb-4" size={32} />
                <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">Modo Dueño/Recepción</h3>
                <div className="space-y-4">
                  <div><span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">Usuario</span><code className="text-lg font-mono font-bold bg-black px-3 py-1 rounded-lg">admin</code></div>
                  <div><span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">Pass</span><code className="text-lg font-mono font-bold bg-black px-3 py-1 rounded-lg">123456</code></div>
                </div>
              </div>

              <div className="bento-card bg-zinc-900 border-zinc-800 p-8 text-left hover:border-zinc-500 transition-colors">
                <User className="text-white mb-4" size={32} />
                <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">Socio con Membresía</h3>
                <div className="space-y-4">
                  <div><span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">Usuario</span><code className="text-lg font-mono font-bold bg-black px-3 py-1 rounded-lg text-brand">cliente1</code></div>
                  <div><span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">Pass</span><code className="text-lg font-mono font-bold bg-black px-3 py-1 rounded-lg">123456</code></div>
                </div>
              </div>

              <div className="bento-card bg-zinc-900 border-zinc-800 p-8 text-left hover:border-red-500 transition-colors">
                <div className="w-8 h-8 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500 mb-4 font-black">!</div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">Socio Membresía Vencida</h3>
                <div className="space-y-4">
                  <div><span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">Usuario</span><code className="text-lg font-mono font-bold bg-black px-3 py-1 rounded-lg text-red-400">cliente2</code></div>
                  <div><span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">Pass</span><code className="text-lg font-mono font-bold bg-black px-3 py-1 rounded-lg">123456</code></div>
                </div>
              </div>
           </div>

           <button onClick={onLogin} className="inline-flex items-center gap-3 bg-brand text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl shadow-brand/20">
             <LogIn size={18} /> Iniciar Sesión Demo
           </button>
        </div>
      </section>

      {/* Pricing y Venta */}
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
                     <li className="flex items-center gap-3 font-bold"><Check size={18} /> Dominio .com O .pe GRATIS</li>
                     <li className="flex items-center gap-3 font-bold"><Check size={18} /> Soporte Prioritario Técnico</li>
                  </ul>

                  <a href="https://wa.me/51930288404?text=Hola,%20estoy%20interesado%20en%20la%20promoción%20anual%20de%20S/800%20del%20sistema%20Smart%20Gym" target="_blank" rel="noopener noreferrer" className="block w-full py-5 text-center rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] bg-black text-brand shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                    Obtener Promo Anual <ExternalLink size={14} className="inline ml-1 -mt-0.5" />
                  </a>
               </div>

            </div>
         </div>
      </section>

    </div>
  );
};
