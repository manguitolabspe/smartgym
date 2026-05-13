import React from 'react';
import { MapPin, Globe } from 'lucide-react';

export const SedesSection: React.FC = () => {
  const sedes = [
    { name: 'Lima Central', city: 'Miraflores', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80' },
    { name: 'Cusco Imperial', city: 'Wanchaq', img: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80' },
    { name: 'Arequipa Volcán', city: 'Yanahuara', img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80' },
    { name: 'Trujillo Spring', city: 'El Golf', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80' },
  ];

  return (
    <section id="sedes" className="py-12 md:py-32 px-4 md:px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 mb-12 md:mb-24">
           <div className="max-w-xl">
              <h2 className="font-display text-4xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-4 md:mb-8">Nuestras <br className="hidden md:block"/><span className="text-brand">Sedes</span></h2>
              <p className="text-sm md:text-xl text-zinc-500 font-medium tracking-wide uppercase">Estamos presentes en las ciudades principales de Perú, con instalaciones de primer nivel.</p>
           </div>
           <div className="flex gap-4 w-full md:w-auto">
              <div className="flex-1 md:flex-none flex flex-col items-center p-4 md:p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                 <span className="text-2xl md:text-3xl font-black italic">15</span>
                 <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Locales</span>
              </div>
              <div className="flex-1 md:flex-none flex flex-col items-center p-4 md:p-6 bg-brand rounded-3xl border border-brand-dark shadow-xl">
                 <Globe size={24} className="text-black mb-1 md:mb-2" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-black">Nacional</span>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sedes.map((sede, i) => (
            <div key={i} className="group bento-card aspect-[4/5] bg-zinc-100 overflow-hidden relative border-none">
              <img src={sede.img} alt={sede.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-10 flex flex-col justify-end">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                    <MapPin size={14} /> {sede.city}
                  </div>
                  <h4 className="text-white text-3xl font-black uppercase italic tracking-tighter mb-6">{sede.name}</h4>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black py-4 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95">Ver Horarios</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
