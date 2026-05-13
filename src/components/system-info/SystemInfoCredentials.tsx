import React from 'react';
import { Shield, User, LogIn } from 'lucide-react';

interface SystemInfoCredentialsProps {
  onLogin: () => void;
}

export const SystemInfoCredentials: React.FC<SystemInfoCredentialsProps> = ({ onLogin }) => {
  return (
    <section className="py-24 px-6 bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto text-center space-y-12">
         <div>
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-4 text-brand">Prueba el Sistema Ahora</h2>
            <p className="text-zinc-400 text-sm font-medium">Usa estas credenciales creadas específicamente para verificar el funcionamiento de los distintos roles.</p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bento-card bg-zinc-900 border-zinc-800 p-8 text-left hover:border-brand transition-colors">
              <Shield className="text-brand mb-4" size={32} />
              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">Modo Dueño/Recepción</h3>
              <div className="space-y-4">
                <div><span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">Usuario</span><code className="text-lg font-mono font-bold bg-black px-3 py-1 rounded-lg">admin</code></div>
                <div><span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">Pass</span><code className="text-lg font-mono font-bold bg-black px-3 py-1 rounded-lg">123456</code></div>
              </div>
            </div>

            <div className="bento-card bg-zinc-900 border-zinc-800 p-8 text-left hover:border-blue-400 transition-colors">
              <User className="text-blue-400 mb-4" size={32} />
              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">Modo Entrenador</h3>
              <div className="space-y-4">
                <div><span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">Usuario</span><code className="text-lg font-mono font-bold bg-black px-3 py-1 rounded-lg text-blue-400">entrenador</code></div>
                <div><span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">Pass</span><code className="text-lg font-mono font-bold bg-black px-3 py-1 rounded-lg">123456</code></div>
              </div>
            </div>

            <div className="bento-card bg-zinc-900 border-zinc-800 p-8 text-left hover:border-zinc-500 transition-colors">
              <User className="text-white mb-4" size={32} />
              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">Socio (Activo)</h3>
              <div className="space-y-4">
                <div><span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">Usuario</span><code className="text-lg font-mono font-bold bg-black px-3 py-1 rounded-lg text-brand">cliente1</code></div>
                <div><span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">Pass</span><code className="text-lg font-mono font-bold bg-black px-3 py-1 rounded-lg">123456</code></div>
              </div>
            </div>

            <div className="bento-card bg-zinc-900 border-zinc-800 p-8 text-left hover:border-red-500 transition-colors">
              <div className="w-8 h-8 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500 mb-4 font-black">!</div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">Socio (Vencido)</h3>
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
  );
};
