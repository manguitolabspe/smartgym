import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-zinc-900 text-white px-8 py-4 rounded-[2rem] shadow-2xl border border-zinc-800 flex items-center gap-4 min-w-[280px]"
    >
      <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center text-black">
        <CheckCircle2 size={16} />
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.2em]">{message}</p>
    </motion.div>
  );
};
