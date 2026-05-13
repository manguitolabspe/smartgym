import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dumbbell, Target, CheckCircle, Activity } from 'lucide-react';
import { Client } from '../../types';

interface PortalTrainingViewProps {
  client: Client;
}

export const PortalTrainingView: React.FC<PortalTrainingViewProps> = ({ client }) => {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => {
      const next = new Set(prev);
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }
      return next;
    });
  };

  return (
    <motion.div 
      key="training" 
      initial={{ opacity: 0, x: -20 }} 
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-sm font-black uppercase tracking-widest text-zinc-400 mb-1">Entrenamiento</h2>
        <h3 className="font-display text-4xl font-black italic uppercase tracking-tighter">Mi Rutina</h3>
        
        {/* Fitness Profile Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-4 rounded-2xl border border-zinc-100">
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Objetivo</span>
            <p className="font-bold text-sm text-zinc-900 mt-1">{client.fitnessGoal || 'No definido'}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-zinc-100">
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Nivel</span>
            <p className="font-bold text-sm text-zinc-900 mt-1">{client.fitnessLevel || 'No definido'}</p>
          </div>
          <div className="bg-brand p-4 rounded-2xl md:col-span-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-brand-dark">Programa Actual</span>
            <p className="font-bold text-sm text-black mt-1">{client.programFocus || 'Consulta a tu entrenador'}</p>
          </div>
        </div>

        {client.injuries && (
           <div className="mt-4 p-4 bg-red-50 rounded-2xl border border-red-100">
              <p className="text-[9px] font-black uppercase tracking-widest text-red-500 mb-1">⚠ Observación Médica</p>
              <p className="font-bold text-sm text-red-900">{client.injuries}</p>
           </div>
        )}

        {client.trainerNotes && (
           <div className="mt-4 p-4 bg-zinc-900 rounded-2xl border border-zinc-800 text-brand">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Mensaje de tu entrenador</p>
              <p className="font-medium text-sm italic">"{client.trainerNotes}"</p>
           </div>
        )}
      </div>

      <div className="space-y-6">
        {client.routines && client.routines.length > 0 ? (
          client.routines.map((routine) => (
            <div key={routine.id} className="bento-card bg-white p-6 opacity-100 hover:border-brand transition-colors">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h4 className="font-display text-2xl font-black italic uppercase tracking-tight">{routine.name}</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-1">Asignada: {routine.assignedDate}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {routine.tasks.map((task) => {
                  const isCompleted = completedTasks.has(task.id);
                  return (
                  <div key={task.id} className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl group transition-all hover:bg-zinc-100">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => toggleTask(task.id)}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all group-active:scale-90 ${
                          isCompleted 
                            ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/20' 
                            : 'border-zinc-200 text-white hover:border-green-500'
                        }`}
                      >
                        <CheckCircle size={16} className={isCompleted ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 text-green-500'} />
                      </button>
                      <div className={isCompleted ? 'opacity-50' : ''}>
                        <p className={`font-bold transition-colors ${isCompleted ? 'text-zinc-500 line-through' : 'text-zinc-900 group-hover:text-brand-dark'}`}>{task.name}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{task.sets} series × {task.reps} reps</p>
                      </div>
                    </div>
                    {task.weightRecommended && (
                      <div className={`text-right ${isCompleted ? 'opacity-50' : ''}`}>
                         <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">Peso Rec.</span>
                         <span className="font-black italic bg-zinc-900 text-brand px-3 py-1.5 rounded-lg text-sm">{task.weightRecommended}kg</span>
                      </div>
                    )}
                  </div>
                )})}
              </div>
              
              {routine.notes && (
                <div className="mt-6 flex items-start gap-3 bg-brand/10 p-4 rounded-2xl">
                  <Target size={16} className="text-brand-dark mt-1 flex-shrink-0" />
                  <p className="text-xs font-bold text-brand-dark">{routine.notes}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bento-card p-12 bg-white text-center border-dashed border-2 flex flex-col items-center">
            <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-300 mb-4">
               <Activity size={32} />
            </div>
            <h4 className="font-black uppercase tracking-tight text-lg mb-2">Aún no hay rutinas</h4>
            <p className="text-xs font-medium text-zinc-400 max-w-[250px]">Pide a tu entrenador en recepción que te asigne una rutina personalizada.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
