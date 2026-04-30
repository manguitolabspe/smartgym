import React from 'react';
import { Activity, Edit3, Search, UserPlus } from 'lucide-react';
import { Client } from '../../types';

interface ClientsListProps {
  clients: Client[];
  onAddClient: () => void;
}

export const ClientsList: React.FC<ClientsListProps> = ({ clients, onAddClient }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nombre, DNI o membresía..." 
            className="w-full pl-12 pr-4 py-4 bg-white border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-brand font-bold text-xs"
          />
        </div>
        <button 
          onClick={onAddClient}
          className="bg-black text-white px-8 py-4 rounded-2xl flex items-center gap-3 hover:bg-zinc-800 transition-all font-black uppercase text-[10px] tracking-widest active:scale-95 shadow-xl"
        >
          <UserPlus size={18} /> Nuevo Socio
        </button>
      </div>

      <div className="bento-card overflow-hidden bg-white border-zinc-100">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-100 text-[10px] font-black uppercase tracking-widest text-zinc-400">
              <th className="px-6 py-5">Socio</th>
              <th className="px-6 py-5">Sede / Plan</th>
              <th className="px-6 py-5">Estado</th>
              <th className="px-6 py-5 text-center">Ficha Médica</th>
              <th className="px-6 py-5 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {clients.map((client) => {
              const imc = client.height && client.weight ? (client.weight / Math.pow(client.height / 100, 2)).toFixed(1) : 'N/A';
              
              return (
                <tr key={client.id} className="group hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-brand font-black italic shadow-lg group-hover:scale-110 transition-transform">
                        {client.avatar || client.name[0]}
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-tight">{client.name}</p>
                        <p className="text-[9px] text-zinc-400 font-bold tracking-widest uppercase">{client.membershipId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-[10px] font-black uppercase mb-1">Cede Central</p>
                    <span className="px-2 py-0.5 bg-brand/10 text-brand-dark rounded text-[8px] font-black uppercase">{client.plan}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      client.status === 'Activo' ? 'bg-green-100 text-green-700' : 
                      client.status === 'Vencido' ? 'bg-red-100 text-red-700' : 'bg-zinc-100 text-zinc-600'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col items-center">
                       <span className={`text-[11px] font-black italic ${Number(imc) > 25 ? 'text-orange-500' : 'text-zinc-900'}`}>{imc} IMC</span>
                       <span className="text-[7px] text-zinc-400 leading-none">Masa Muscular</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button className="p-2 bg-zinc-100 rounded-lg hover:bg-black hover:text-white transition-all" title="Ver Ficha Médica"><Activity size={14} /></button>
                      <button className="p-2 bg-zinc-100 rounded-lg hover:bg-brand hover:text-black transition-all" title="Editar Perfil"><Edit3 size={14} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
