import { Client, Payment, GymStats } from '../types';

export const MOCK_CLIENTS: Client[] = [
  { id: '1', name: 'Juan Perez', email: 'juan@email.com', plan: 'Plus', status: 'Activo', membershipId: 'cliente1', avatar: 'JP', height: 175, weight: 82 },
  { id: '2', name: 'Maria Garcia', email: 'maria@email.com', plan: 'Básico', status: 'Vencido', membershipId: 'cliente2', avatar: 'MG', height: 162, weight: 58 },
  { id: '3', name: 'Carlos Rodriguez', email: 'carlos@email.com', plan: 'VIP', status: 'Activo', membershipId: 'SM-9901', avatar: 'CR', height: 180, weight: 95 },
  { id: '4', name: 'Ana Martinez', email: 'ana@email.com', plan: 'Plus', status: 'Activo', membershipId: 'SM-4452', avatar: 'AM', height: 168, weight: 64 },
  { id: '5', name: 'Luis Torres', email: 'luis@email.com', plan: 'Básico', status: 'Congelado', membershipId: 'SM-2231', avatar: 'LT', height: 172, weight: 78 },
  { id: '6', name: 'Sofia Vega', email: 'sofia@email.com', plan: 'VIP', status: 'Activo', membershipId: 'SM-7761', avatar: 'SV', height: 165, weight: 55 },
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
