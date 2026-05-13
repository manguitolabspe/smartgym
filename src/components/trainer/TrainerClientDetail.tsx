import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Save, Plus, Trash2, Calendar, Target, Activity, FileText, Dumbbell } from 'lucide-react';
import { Client, MeasurementRecord, TrainingRoutine } from '../../types';
import { RoutineModal } from './RoutineModal';

interface TrainerClientDetailProps {
  client: Client;
  onBack: () => void;
  onUpdate: (client: Client) => void;
}

export const TrainerClientDetail: React.FC<TrainerClientDetailProps> = ({ client, onBack, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'progress' | 'routines'>('progress');
  const [notes, setNotes] = useState(client.trainerNotes || '');
  const [showRoutineModal, setShowRoutineModal] = useState(false);
  const [fitnessProfile, setFitnessProfile] = useState({
    fitnessGoal: client.fitnessGoal || 'Mantenimiento',
    fitnessLevel: client.fitnessLevel || 'Principiante',
    programFocus: client.programFocus || '',
    injuries: client.injuries || ''
  });
  const [newMeasurement, setNewMeasurement] = useState<Partial<MeasurementRecord>>({});
  
  // Create a handler for saving generic edits
  const handleSaveNotes = () => {
    onUpdate({ 
      ...client, 
      trainerNotes: notes,
      fitnessGoal: fitnessProfile.fitnessGoal as any,
      fitnessLevel: fitnessProfile.fitnessLevel as any,
      programFocus: fitnessProfile.programFocus,
      injuries: fitnessProfile.injuries
    });
  };

  const addMeasurement = () => {
    if (!newMeasurement.weight) return;
    const measurement: MeasurementRecord = {
      date: new Date().toISOString().split('T')[0],
      weight: Number(newMeasurement.weight),
      bodyFat: newMeasurement.bodyFat ? Number(newMeasurement.bodyFat) : undefined,
      muscleMass: newMeasurement.muscleMass ? Number(newMeasurement.muscleMass) : undefined,
      notes: newMeasurement.notes
    };
    
    onUpdate({
      ...client,
      weight: measurement.weight, // Update current weight globally
      bodyFat: measurement.bodyFat || client.bodyFat,
      muscleMass: measurement.muscleMass || client.muscleMass,
      measurementsHistory: [...(client.measurementsHistory || []), measurement]
    });
    setNewMeasurement({});
  };

  const addRoutine = (newRoutine: TrainingRoutine) => {
    onUpdate({
      ...client,
      routines: [...(client.routines || []), newRoutine]
    });
    setShowRoutineModal(false);
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
      <div className="flex items-center gap-6">
        <button onClick={onBack} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border-2 border-zinc-100 hover:border-zinc-900 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <div>
          <div className="flex items-center gap-3">
             <h2 className="font-display text-4xl font-black uppercase italic tracking-tighter text-zinc-900 leading-none">{client.name}</h2>
             <span className="px-3 py-1 bg-brand/20 text-brand-dark rounded-full text-[10px] font-black uppercase tracking-widest">{client.plan}</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-2">ID: {client.membershipId} • {client.email}</p>
        </div>
      </div>

      <div className="flex gap-4 border-b border-zinc-200">
        <button 
          onClick={() => setActiveTab('progress')}
          className={`pb-4 px-2 text-xs font-black uppercase tracking-widest transition-colors ${activeTab === 'progress' ? 'border-b-2 border-brand text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'}`}
        >
          Historial Médico & Físico
        </button>
        <button 
          onClick={() => setActiveTab('routines')}
          className={`pb-4 px-2 text-xs font-black uppercase tracking-widest transition-colors ${activeTab === 'routines' ? 'border-b-2 border-brand text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'}`}
        >
          Rutinas Asignadas
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'progress' && (
          <motion.div key="progress" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
               <div className="bento-card p-6 bg-white">
                  <div className="flex items-center justify-between mb-6">
                     <h3 className="text-sm font-black uppercase tracking-widest"><Activity className="inline mr-2 text-brand" size={18}/> Nuevo Registro de Medidas</h3>
                     <button onClick={addMeasurement} className="text-[10px] bg-zinc-900 text-white px-4 py-2 rounded-xl font-black uppercase tracking-widest hover:bg-brand hover:text-black transition-colors">Guardar</button>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                     <div className="space-y-1.5">
                       <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Peso (kg)</label>
                       <input type="number" value={newMeasurement.weight || ''} onChange={e => setNewMeasurement({...newMeasurement, weight: parseFloat(e.target.value)})} className="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl font-bold text-sm outline-none focus:border-brand" />
                     </div>
                     <div className="space-y-1.5">
                       <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400">% Grasa</label>
                       <input type="number" value={newMeasurement.bodyFat || ''} onChange={e => setNewMeasurement({...newMeasurement, bodyFat: parseFloat(e.target.value)})} className="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl font-bold text-sm outline-none focus:border-brand" />
                     </div>
                     <div className="space-y-1.5">
                       <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Masa Muscular</label>
                       <input type="number" value={newMeasurement.muscleMass || ''} onChange={e => setNewMeasurement({...newMeasurement, muscleMass: parseFloat(e.target.value)})} className="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl font-bold text-sm outline-none focus:border-brand" />
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400">Historial</h3>
                  {client.measurementsHistory?.map((m, idx) => (
                    <div key={idx} className="bento-card p-4 bg-white/50 border-zinc-100 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-400"><Calendar size={16} /></div>
                          <div>
                             <p className="font-bold text-sm">{m.date}</p>
                          </div>
                       </div>
                       <div className="flex gap-6">
                         <div className="text-right">
                           <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Peso</p>
                           <p className="font-bold">{m.weight}kg</p>
                         </div>
                         {m.bodyFat && (
                           <div className="text-right">
                             <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Grasa</p>
                             <p className="font-bold">{m.bodyFat}%</p>
                           </div>
                         )}
                         {m.muscleMass && (
                           <div className="text-right">
                             <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Músculo</p>
                             <p className="font-bold">{m.muscleMass}kg</p>
                           </div>
                         )}
                       </div>
                    </div>
                  )).reverse()}
                  {(!client.measurementsHistory || client.measurementsHistory.length === 0) && (
                     <p className="text-sm text-zinc-400 italic">No hay registros previos.</p>
                  )}
               </div>
            </div>

            <div className="space-y-6">
              <div className="bento-card p-6 bg-white border border-zinc-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400"><Target className="inline mr-2 text-brand" size={14}/> Perfil de Entrenamiento</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5">Objetivo</label>
                    <select 
                      value={fitnessProfile.fitnessGoal} 
                      onChange={e => setFitnessProfile({...fitnessProfile, fitnessGoal: e.target.value})}
                      className="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl font-bold text-sm outline-none focus:border-brand"
                    >
                      <option value="Perder Peso">Perder Peso</option>
                      <option value="Ganar Músculo">Ganar Músculo</option>
                      <option value="Mantenimiento">Mantenimiento</option>
                      <option value="Rehabilitación">Rehabilitación</option>
                      <option value="Rendimiento Deportivo">Rendimiento Deportivo</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5">Nivel</label>
                    <select 
                      value={fitnessProfile.fitnessLevel} 
                      onChange={e => setFitnessProfile({...fitnessProfile, fitnessLevel: e.target.value})}
                      className="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl font-bold text-sm outline-none focus:border-brand"
                    >
                      <option value="Principiante">Principiante</option>
                      <option value="Intermedio">Intermedio</option>
                      <option value="Avanzado">Avanzado</option>
                      <option value="Atleta">Atleta</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5">Enfoque Actual (Programa)</label>
                    <input 
                      type="text" 
                      value={fitnessProfile.programFocus} 
                      onChange={e => setFitnessProfile({...fitnessProfile, programFocus: e.target.value})}
                      placeholder="Ej. Hipertrofia, Fuerza Máxima..."
                      className="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl font-bold text-sm outline-none focus:border-brand"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5">Lesiones / Observaciones Médicas</label>
                    <input 
                      type="text" 
                      value={fitnessProfile.injuries} 
                      onChange={e => setFitnessProfile({...fitnessProfile, injuries: e.target.value})}
                      placeholder="Lesiones recientes, cirugías..."
                      className="w-full p-3 bg-red-50 border border-red-100 rounded-xl font-bold text-sm outline-none focus:border-red-400 text-red-900 placeholder-red-300"
                    />
                  </div>
                </div>
              </div>

              <div className="bento-card p-6 bg-zinc-900 text-white">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400"><FileText className="inline mr-2" size={14}/> Notas Privadas del Entrenador</h3>
                </div>
                <textarea 
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full bg-zinc-800 border-none rounded-xl p-4 text-sm font-medium text-zinc-300 outline-none focus:ring-2 focus:ring-brand h-32 mb-4"
                  placeholder="Detalles de desempeño, comportamiento..."
                />
                <button onClick={handleSaveNotes} className="w-full py-3 bg-brand text-black rounded-xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform"><Save className="inline mr-2" size={14}/> Guardar Perfil y Notas</button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'routines' && (
          <motion.div key="routines" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
             <div className="flex justify-end">
               <button onClick={() => setShowRoutineModal(true)} className="flex items-center gap-2 bg-brand text-black px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform"><Plus size={16}/> Nueva Rutina</button>
             </div>
             
             {client.routines?.map(routine => (
               <div key={routine.id} className="bento-card p-6 bg-white border-l-4 border-l-brand">
                  <div className="flex items-start justify-between mb-6">
                     <div>
                       <h3 className="font-display text-xl font-black uppercase italic tracking-tight">{routine.name}</h3>
                       <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-1">Asignada: {routine.assignedDate}</p>
                     </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-12 gap-4 px-4 pb-2 border-b border-zinc-100 text-[9px] font-black uppercase tracking-widest text-zinc-400">
                      <div className="col-span-6">Ejercicio</div>
                      <div className="col-span-2 text-center">Series x Reps</div>
                      <div className="col-span-4 text-right">Peso Rec.</div>
                    </div>
                    {routine.tasks.map(task => (
                      <div key={task.id} className="grid grid-cols-12 gap-4 px-4 py-2 items-center bg-zinc-50 rounded-lg">
                        <div className="col-span-6 font-bold text-sm text-zinc-900">{task.name}</div>
                        <div className="col-span-2 text-center font-bold text-zinc-500">{task.sets} x {task.reps}</div>
                        <div className="col-span-4 text-right font-black italic">{task.weightRecommended ? `${task.weightRecommended}kg` : '--'}</div>
                      </div>
                    ))}
                  </div>

                  {routine.notes && (
                    <div className="mt-6 p-4 bg-brand/5 rounded-xl border border-brand/20">
                      <p className="text-xs font-bold text-brand-dark flex items-center gap-2"><Target size={14}/> {routine.notes}</p>
                    </div>
                  )}
               </div>
             ))}
             {(!client.routines || client.routines.length === 0) && (
               <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-zinc-200">
                 <Dumbbell className="mx-auto text-zinc-200 mb-4" size={48} />
                 <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">El cliente no tiene rutinas asignadas</p>
               </div>
             )}
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showRoutineModal && (
          <RoutineModal 
            onClose={() => setShowRoutineModal(false)}
            onSave={addRoutine}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
