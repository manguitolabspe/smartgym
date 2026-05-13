import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart } from 'lucide-react';

interface PortalShopViewProps {
  onAddToCart: (itemName: string) => void;
}

export const PortalShopView: React.FC<PortalShopViewProps> = ({ onAddToCart }) => {
  return (
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
              <button onClick={() => onAddToCart(item.name)} className="w-full mt-6 py-4 bg-zinc-950 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-brand hover:text-black transition-all active:scale-95 border border-transparent hover:border-brand/40">Agregar al Carrito</button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
