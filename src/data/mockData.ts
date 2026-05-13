import { Client, Payment, GymStats } from '../types';

export const MOCK_CLIENTS: Client[] = [
  { 
    id: '1', name: 'Juan Perez', email: 'juan@email.com', plan: 'Smart', status: 'Activo', membershipId: 'cliente1', avatar: 'JP', registrationDate: '2023-01-15', lastVisit: '2026-05-05', height: 175, weight: 82, bodyFat: 18, muscleMass: 40,
    measurementsHistory: [
      { date: '2025-10-01', weight: 85, bodyFat: 22, muscleMass: 38 },
      { date: '2026-01-01', weight: 83, bodyFat: 20, muscleMass: 39 },
      { date: '2026-05-01', weight: 82, bodyFat: 18, muscleMass: 40 }
    ],
    routines: [
      {
        id: 'r1',
        name: 'Día 1: Hipertrofia Pecho y Tríceps',
        assignedDate: '2026-05-01',
        tasks: [
          { id: 't1', name: 'Press de Banca Plano', sets: 4, reps: 10, weightRecommended: 60 },
          { id: 't2', name: 'Press Inclinado con Mancuernas', sets: 4, reps: 12, weightRecommended: 20 },
          { id: 't3', name: 'Extensiones de Tríceps Polea', sets: 3, reps: 15, weightRecommended: 15 }
        ],
        notes: 'Enfocarse en la fase excéntrica del press de banca.'
      }
    ],
    trainerNotes: 'Cliente disciplinado, buscando reducir % de grasa al 15% para fin de año.',
    fitnessGoal: 'Perder Peso',
    fitnessLevel: 'Intermedio',
    programFocus: 'Hipertrofia y Resistencia',
    injuries: 'Ligera molestia en rodilla derecha al correr'
  },
  { id: '2', name: 'Maria Garcia', email: 'maria@email.com', plan: 'Basic', status: 'Vencido', membershipId: 'cliente2', avatar: 'MG', registrationDate: '2025-05-01', lastVisit: '2026-04-10', height: 162, weight: 58 },
  { id: '3', name: 'Carlos Rodriguez', email: 'carlos@email.com', plan: 'VIP', status: 'Activo', membershipId: 'SM-9901', avatar: 'CR', registrationDate: '2024-02-12', lastVisit: '2026-05-06', height: 180, weight: 95 },
  { id: '4', name: 'Ana Martinez', email: 'ana@email.com', plan: 'Smart', status: 'Activo', membershipId: 'SM-4452', avatar: 'AM', registrationDate: '2025-11-20', lastVisit: '2026-05-04', height: 168, weight: 64 },
  { id: '5', name: 'Luis Torres', email: 'luis@email.com', plan: 'Basic', status: 'Congelado', membershipId: 'SM-2231', avatar: 'LT', registrationDate: '2025-08-05', lastVisit: '2026-02-28', height: 172, weight: 78 },
  { id: '6', name: 'Sofia Vega', email: 'sofia@email.com', plan: 'VIP', status: 'Activo', membershipId: 'SM-7761', avatar: 'SV', registrationDate: '2026-01-10', lastVisit: '2026-05-06', height: 165, weight: 55 },
];

export const MOCK_PAYMENTS: Payment[] = [
  { id: 'p1', clientId: '1', clientName: 'Juan Perez', amount: 120, date: '2026-03-15', method: 'VISA', status: 'Completado' },
  { id: 'p2', clientId: '3', clientName: 'Carlos Rodriguez', amount: 250, date: '2026-04-01', method: 'MasterCard', status: 'Completado' },
  { id: 'p3', clientId: '4', clientName: 'Ana Martinez', amount: 120, date: '2026-03-20', method: 'Yape', status: 'Completado' },
];

export const GYM_INFO = {
  address: "Av. Javier Prado Este 1234, Lima",
  phone: "(01) 456-7890",
  hours: [
    { label: 'Lunes - Viernes', time: '06:00 - 23:00' },
    { label: 'Sábados', time: '08:00 - 20:00' },
    { label: 'Domingos', time: '09:00 - 15:00' },
  ]
};

export const INITIAL_STATS: GymStats = {
  totalClients: 1240,
  activeMembers: 1102,
  monthlyRevenue: 24500,
  expiringSoonEntries: 8
};
