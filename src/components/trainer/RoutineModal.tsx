import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { TrainingRoutine, RoutineTask } from '../../types';
import { Modal } from '../common/Modal';

interface RoutineModalProps {
  onClose: () => void;
  onSave: (routine: TrainingRoutine) => void;
}

export const RoutineModal: React.FC<RoutineModalProps> = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [assignedDate, setAssignedDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [tasks, setTasks] = useState<RoutineTask[]>([
    { id: `t-1`, name: '', sets: 4, reps: 10, weightRecommended: 0 }
  ]);

  const handleAddTask = () => {
    setTasks([...tasks, { id: `t-${Date.now()}`, name: '', sets: 4, reps: 10, weightRecommended: 0 }]);
  };

  const handleRemoveTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleChangeTask = (id: string, field: keyof RoutineTask, value: any) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleSave = () => {
    if (!name.trim()) return;

    // Filter out empty tasks
    const validTasks = tasks.filter(t => t.name.trim() !== '');

    const newRoutine: TrainingRoutine = {
      id: `r-${Date.now()}`,
      name,
      assignedDate,
      tasks: validTasks,
      notes,
    };

    onSave(newRoutine);
  };

  return (
    <Modal title="Nueva Rutina" onClose={onClose}>
      <div className="space-y-6">
        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5">Nombre de la Rutina / Día</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Día 1: Pecho y Tríceps"
            className="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl font-bold text-sm outline-none focus:border-brand"
            required
          />
        </div>

        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5">Fecha Asignada</label>
          <input 
            type="date" 
            value={assignedDate}
            onChange={(e) => setAssignedDate(e.target.value)}
            className="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl font-bold text-sm outline-none focus:border-brand"
          />
        </div>

        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5">Ejercicios</label>
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <div key={task.id} className="flex gap-2 items-start bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={task.name}
                    onChange={(e) => handleChangeTask(task.id, 'name', e.target.value)}
                    placeholder={`Ejercicio ${index + 1} (Ej. Press Banca)`}
                    className="w-full p-2 bg-white border border-zinc-200 rounded-lg font-bold text-xs outline-none focus:border-brand"
                  />
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">Series</label>
                      <input type="number" value={task.sets} onChange={e => handleChangeTask(task.id, 'sets', Number(e.target.value))} className="w-full p-2 bg-white border border-zinc-200 rounded-lg font-bold text-xs outline-none focus:border-brand" />
                    </div>
                    <div className="flex-1">
                      <label className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">Reps</label>
                      <input type="number" value={task.reps} onChange={e => handleChangeTask(task.id, 'reps', Number(e.target.value))} className="w-full p-2 bg-white border border-zinc-200 rounded-lg font-bold text-xs outline-none focus:border-brand" />
                    </div>
                    <div className="flex-[1.5]">
                      <label className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">Peso Rec. (kg)</label>
                      <input type="number" value={task.weightRecommended} onChange={e => handleChangeTask(task.id, 'weightRecommended', Number(e.target.value))} className="w-full p-2 bg-white border border-zinc-200 rounded-lg font-bold text-xs outline-none focus:border-brand" />
                    </div>
                  </div>
                </div>
                <button onClick={() => handleRemoveTask(task.id)} className="text-zinc-400 hover:text-red-500 mt-2 p-2">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <button onClick={handleAddTask} className="mt-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-dark hover:text-brand transition-colors">
            <Plus size={14} /> Añadir Ejercicio
          </button>
        </div>

        <div>
           <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5">Notas / Recomendaciones</label>
           <textarea 
             value={notes}
             onChange={(e) => setNotes(e.target.value)}
             placeholder="Recomendaciones generales para esta rutina..."
             className="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl font-bold text-sm outline-none focus:border-brand h-24"
           />
        </div>
        
        <button 
          onClick={handleSave}
          disabled={!name.trim()}
          className="w-full py-4 bg-zinc-900 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-brand hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Guardar Rutina
        </button>
      </div>
    </Modal>
  );
};
