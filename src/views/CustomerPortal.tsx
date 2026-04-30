import React, { useState } from 'react';
import { 
  Home, 
  Trophy, 
  MessageSquare, 
  ShoppingBag, 
  User, 
  LogOut,
  Bell,
  HeartPulse,
  Scale,
  Activity,
  Zap,
  Target,
  CheckCircle2,
  ShoppingCart,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Client, LoyaltyConfig } from '../types';
import { LoyaltyView } from '../components/portal/LoyaltyView';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  const [activeTab, setActiveTab] = useState<'home' | 'loyalty' | 'community' | 'shop' | 'profile'>(isExpired ? 'loyalty' : 'home');
  const [fitnessGoal, setFitnessGoal] = useState<'Perder Peso' | 'Ganar Músculo' | 'Mantenimiento'>('Mantenimiento');

  const tabs = [
    { id: 'home', icon: Home, label: 'Inicio' },
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
      <header className="bg-white px-6 py-6 border-b border-zinc-200 sticky top-0 z-50 flex justify-between items-center">
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
            <motion.div 
              key="home" 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-zinc-400 mb-1">¡Hola de nuevo!</h2>
                <h3 className="font-display text-4xl font-black italic uppercase tracking-tighter">{client.name.split(' ')[0]}</h3>
              </div>
              
              {/* Daily Tip / Announcement / Renewal CTA */}
              {isExpired ? (
                <div className="bento-card p-8 bg-brand text-black border-none shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-8 text-black/10 pointer-events-none group-hover:scale-110 transition-transform"><Zap size={140} /></div>
                   <p className="text-[10px] font-black uppercase text-black/60 tracking-widest mb-4">Aviso de Cuenta</p>
                   <h4 className="text-2xl font-black uppercase italic tracking-tighter leading-tight mb-6 mt-2">Tu acceso ha terminado.<br />¿Listo para volver?</h4>
                   <button onClick={() => setActiveTab('shop')} className="bg-black text-brand px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">Renovar Membresía</button>
                   <div className="mt-6 flex items-center gap-2 text-[9px] font-bold text-black/40 uppercase tracking-widest">
                      <Activity size={12} /> Aprovecha 15% de descuento hoy
                   </div>
                </div>
              ) : (
                <div className="bento-card p-8 bg-zinc-900 text-white border-none shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none group-hover:scale-110 transition-transform"><Zap size={140} /></div>
                   <p className="text-[10px] font-black uppercase text-brand tracking-widest mb-4">Consejo del día</p>
                   <h4 className="text-2xl font-black uppercase italic tracking-tighter leading-tight mb-4 group-hover:translate-x-2 transition-transform">No pares cuando estés cansado,<br />para cuando termines.</h4>
                   <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                      <Activity size={12} className="text-brand" /> Clase de Yoga • 18:00 PM • Hoy
                   </div>
                </div>
              )}

              {/* Progress Summary */}
              <div className={`grid grid-cols-2 gap-4 ${isExpired ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                <div className="bento-card p-6 bg-white border-zinc-100">
                  <div className="flex items-center gap-3 mb-4 text-zinc-400">
                    <Activity size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Asistencias</span>
                  </div>
                  <p className="text-3xl font-black italic">14<span className="text-sm text-zinc-400 ml-1">v/mes</span></p>
                </div>
                <div className="bento-card p-6 bg-white border-zinc-100">
                  <div className="flex items-center gap-3 mb-4 text-zinc-400">
                    <HeartPulse size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Calorías</span>
                  </div>
                  <p className="text-3xl font-black italic">8.4k<span className="text-sm text-zinc-400 ml-1">kcal</span></p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'loyalty' && (
            <LoyaltyView loyaltyConfig={loyaltyConfig} userStamps={4} />
          )}

          {activeTab === 'community' && (
            <motion.div 
              key="community"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8 pb-12"
            >
              <h3 className="font-display text-4xl font-black uppercase italic tracking-tighter text-zinc-900 leading-none">Muro Social</h3>
              <div className="space-y-6">
                {[
                  { author: 'Profe Alex', time: 'Hace 2 horas', content: '¡Felicitaciones a todos los que vinieron a la clase de las 6am! El cardio estuvo intenso. 🔥', likes: 24, type: 'Clase' },
                  { author: 'Gym Smart', time: 'Hace 5 horas', content: 'Nuevo cargamento de Proteína Whey sabor Chocolate Suizo disponible en tienda. ¡Aprovechen el 10% de descuento!', likes: 42, type: 'Anuncio' },
                  { author: 'Laura Fit', time: 'Ayer', content: '¡Hoy completé mi primer mes sin faltar un solo día! Vamos por más. 💪', likes: 128, type: 'Logro' },
                ].map((post, i) => (
                  <div key={i} className="bento-card p-6 bg-white border-zinc-100 group hover:border-brand/30 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-zinc-900 rounded-2xl flex items-center justify-center text-brand font-black italic">{post.author[0]}</div>
                        <div>
                           <p className="text-xs font-black uppercase tracking-tight">{post.author}</p>
                           <p className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest leading-none mt-1">{post.time}</p>
                        </div>
                      </div>
                      <span className="text-[8px] font-black uppercase border border-zinc-200 px-2 py-1 rounded-full text-zinc-500 bg-zinc-50 tracking-widest">{post.type}</span>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed mb-6 font-medium">{post.content}</p>
                    <div className="flex items-center gap-4 pt-4 border-t border-zinc-50">
                      <button className="flex items-center gap-2 text-zinc-400 hover:text-red-500 transition-colors">
                        <HeartPulse size={16} /> <span className="text-[10px] font-black">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-zinc-400 hover:text-brand-dark transition-colors">
                        <MessageSquare size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Comentar</span>
                      </button>
                      <button className="ml-auto text-zinc-300 hover:text-zinc-600 transition-colors">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'shop' && (
            <motion.div 
              key="shop"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8 pb-12"
            >
              <div className="flex justify-between items-center gap-4">
                <h3 className="font-display text-4xl font-black uppercase italic tracking-tighter text-zinc-900 leading-none">Smart Store</h3>
                <div className="bg-brand text-black p-3 rounded-2xl shadow-lg shadow-brand/20 relative cursor-pointer active:scale-95 transition-all">
                  <ShoppingCart size={20} />
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center border border-white font-black">0</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {[
                  { name: 'Whey Protein ISO', brand: 'Optimum Nutrition', price: 'S/ 189', img: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80', tag: 'Top Ventas' },
                  { name: 'Shaker Smart Pro', brand: 'Smart Gear', price: 'S/ 45', img: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&q=80', tag: 'Nuevo' },
                ].map((item, i) => (
                  <div key={i} className="bento-card bg-white border-zinc-100 overflow-hidden group">
                    <div className="aspect-video relative overflow-hidden bg-zinc-100">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 bg-black text-brand text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-xl">{item.tag}</div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                         <div>
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-none mb-1">{item.brand}</p>
                            <h4 className="text-base font-black uppercase italic tracking-tight">{item.name}</h4>
                         </div>
                         <p className="text-xl font-black text-zinc-900 italic leading-none">{item.price}</p>
                      </div>
                      <button onClick={() => setToast(`Añadido al carrito: ${item.name}`)} className="w-full mt-6 py-4 bg-zinc-950 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-brand hover:text-black transition-all active:scale-95 border border-transparent hover:border-brand/40">Agregar al Carrito</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div 
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 pb-12"
            >
              <h3 className="font-display text-4xl font-black uppercase italic tracking-tighter text-zinc-900 leading-none">Mi Perfil</h3>
              
              <div className="bento-card p-8 bg-white space-y-8">
                 <div className="flex items-center gap-6">
                   <div className="w-20 h-20 bg-zinc-900 rounded-[2rem] flex items-center justify-center text-4xl font-black italic border-2 border-brand text-brand shadow-xl">
                     {client.avatar}
                   </div>
                   <div>
                      <p className="text-2xl font-black uppercase tracking-tight italic leading-none mb-1">{client.name}</p>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{client.membershipId}</p>
                   </div>
                 </div>

                 {/* Health Stats Section */}
                 <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${isExpired ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                    <div className="p-6 bg-zinc-50 rounded-3xl border border-zinc-100 group">
                       <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-zinc-200 group-hover:text-brand transition-colors"><Scale size={14} /></div>
                          <span className="text-[10px] font-black uppercase tracking-widest">Peso Actual</span>
                       </div>
                       <p className="text-3xl font-black italic">{client.weight} kg</p>
                       <p className="text-[8px] text-green-600 font-bold uppercase mt-2">▼ 3.5kg este mes</p>
                    </div>
                    <div className="p-6 bg-brand text-black rounded-3xl border border-brand-dark shadow-lg shadow-brand/20 relative group overflow-hidden">
                       <div className="absolute bottom-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Zap size={40} /></div>
                       <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-black text-brand rounded-lg flex items-center justify-center"><Zap size={14} /></div>
                          <span className="text-[10px] font-black uppercase tracking-widest">Tu IMC</span>
                       </div>
                       <div className="flex items-end gap-2">
                         <p className="text-3xl font-black italic">{imc}</p>
                         <p className="text-[9px] font-black uppercase italic mb-1">{imcStatus}</p>
                       </div>
                    </div>
                 </div>

                 <div className={`grid grid-cols-1 gap-6 ${isExpired ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                    <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 flex flex-col min-h-[240px]">
                       <div className="flex justify-between items-center mb-8">
                          <div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Evolución de Peso</h4>
                          </div>
                       </div>
                       <div className="h-[120px] w-full">
                         <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[
                              { name: 'Ene', w: 82 },
                              { name: 'Feb', w: 80.5 },
                              { name: 'Mar', w: 79.2 },
                              { name: 'Abr', w: 78.5 },
                              { name: 'May', w: client.weight },
                            ]}>
                              <Line type="monotone" dataKey="w" stroke="#7FFF00" strokeWidth={4} dot={{ r: 6, fill: '#000', strokeWidth: 2, stroke: '#7FFF00' }} />
                            </LineChart>
                         </ResponsiveContainer>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <Target size={18} className="text-brand" />
                       <h4 className="text-[10px] font-black uppercase tracking-widest">¿Cuál es tu objetivo hoy?</h4>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                       {['Perder Peso', 'Ganar Músculo', 'Mantenimiento'].map((goal) => (
                         <button
                           key={goal}
                           onClick={() => setFitnessGoal(goal as any)}
                           className={`p-4 rounded-2xl border-2 transition-all text-left flex justify-between items-center ${fitnessGoal === goal ? 'border-brand bg-brand/5' : 'border-zinc-50'}`}
                         >
                            <span className="text-[10px] font-black uppercase tracking-widest">{goal}</span>
                            {fitnessGoal === goal && <CheckCircle2 size={16} className="text-brand" />}
                         </button>
                       ))}
                    </div>
                 </div>

                 <button 
                  onClick={onLogout} 
                  className="w-full py-5 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-red-100 transition-all border border-red-100"
                 >
                   Cerrar Sesión
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Nav Mobile */}
      <nav className="fixed bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl border border-zinc-200 p-3 rounded-[2.5rem] flex justify-around items-center shadow-2xl z-50">
        {visibleTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`p-4 rounded-2xl transition-all ${
              activeTab === tab.id ? 'bg-brand text-black shadow-lg shadow-brand/20' : 'text-zinc-400 hover:text-zinc-600'
            }`}
          >
            <tab.icon size={20} strokeWidth={activeTab === tab.id ? 3 : 2} />
          </button>
        ))}
      </nav>
    </div>
  );
};
