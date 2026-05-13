import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Shield, Zap, ArrowRight, Lock, Mail, ChevronLeft, Dumbbell } from 'lucide-react';
import { Modal } from './Modal';

interface LoginModalProps {
  onLogin: (type: 'client' | 'admin' | 'trainer', username: string, pass: string) => void;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose }) => {
  const [step, setStep] = useState<'select' | 'form'>('select');
  const [userType, setUserType] = useState<'client' | 'admin' | 'trainer' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userType) {
      onLogin(userType, username, password);
    }
  };

  return (
    <Modal title={step === 'select' ? "Acceso al Sistema" : (userType === 'admin' ? "Staff Login" : userType === 'trainer' ? "Trainer Login" : "Socio Login")} onClose={onClose}>
      <AnimatePresence mode="wait">
        {step === 'select' ? (
          <motion.div 
            key="select"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em] text-center mb-8">
              Selecciona tu tipo de cuenta para continuar
            </p>

            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={() => { setUserType('client'); setStep('form'); }}
                className="w-full p-6 bg-brand text-black rounded-[2rem] flex items-center gap-5 transition-all active:scale-95 group hover:bg-zinc-900 hover:text-white shadow-xl shadow-brand/10 border-2 border-transparent hover:border-zinc-800"
              >
                <div className="w-14 h-14 bg-black/5 group-hover:bg-brand/10 rounded-2xl flex items-center justify-center transition-colors">
                  <User size={24} />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-black uppercase tracking-tight">Soy Socio</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest opacity-60">Portal de Entrenamiento</p>
                </div>
                <ArrowRight size={18} className="opacity-40 group-hover:opacity-100" />
              </button>

              <button 
                onClick={() => { setUserType('trainer'); setStep('form'); }}
                className="w-full p-6 bg-zinc-50 border-2 border-zinc-100 rounded-[2rem] flex items-center gap-5 transition-all active:scale-95 group hover:border-brand/40"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-zinc-200 group-hover:bg-brand/20 group-hover:text-brand-dark transition-all">
                  <Dumbbell size={24} />
                </div>
                <div className="text-left flex-1 text-zinc-900">
                  <p className="text-sm font-black uppercase tracking-tight">Soy Entrenador</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Seguimiento de Clientes</p>
                </div>
                <ArrowRight size={18} className="text-zinc-200 group-hover:text-brand" />
              </button>

              <button 
                onClick={() => { setUserType('admin'); setStep('form'); }}
                className="w-full p-6 bg-zinc-50 border-2 border-zinc-100 rounded-[2rem] flex items-center gap-5 transition-all active:scale-95 group hover:border-zinc-900"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-zinc-200 group-hover:bg-zinc-900 group-hover:text-brand transition-all">
                  <Shield size={24} />
                </div>
                <div className="text-left flex-1 text-zinc-900">
                  <p className="text-sm font-black uppercase tracking-tight">Soy Staff</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Dashboard Administrativo</p>
                </div>
                <ArrowRight size={18} className="text-zinc-200 group-hover:text-zinc-900" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <button 
              onClick={() => setStep('select')}
              className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors text-[10px] font-black uppercase tracking-widest mb-4"
            >
              <ChevronLeft size={14} /> Volver
            </button>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Usuario</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={userType === 'admin' ? "admin" : userType === 'trainer' ? "entrenador" : "cliente1 / cliente2"} 
                    className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-brand font-bold text-xs"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="123456" 
                    className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-brand font-bold text-xs"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-black text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-black/10 active:scale-95 transition-all mt-6"
              >
                Ingresar al Sistema
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-6 border-t border-zinc-100 flex flex-col items-center gap-4">
         <div className="flex items-center gap-2">
            <Zap size={12} className="text-zinc-300" />
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 italic">Acceso Seguro • Gestión Smart</span>
         </div>
         <button className="text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-brand transition-colors">¿Problemas para entrar?</button>
      </div>
    </Modal>
  );
};
