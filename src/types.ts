import { LucideIcon } from 'lucide-react';

export interface MeasurementRecord {
  date: string;
  weight: number;
  bodyFat?: number;
  muscleMass?: number;
  notes?: string;
}

export interface RoutineTask {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weightRecommended?: number;
}

export interface TrainingRoutine {
  id: string;
  name: string;
  assignedDate: string;
  tasks: RoutineTask[];
  notes?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  membershipId: string;
  plan: 'Basic' | 'Smart' | 'Black' | 'VIP';
  status: 'Activo' | 'Vencido' | 'Congelado';
  avatar: string;
  registrationDate: string;
  lastVisit: string;
  duesSoon?: boolean;
  height: number;
  weight: number;
  bodyFat?: number;
  muscleMass?: number;
  measurementsHistory?: MeasurementRecord[];
  routines?: TrainingRoutine[];
  trainerNotes?: string;
  fitnessGoal?: 'Perder Peso' | 'Ganar Músculo' | 'Mantenimiento' | 'Rehabilitación' | 'Rendimiento Deportivo';
  fitnessLevel?: 'Principiante' | 'Intermedio' | 'Avanzado' | 'Atleta';
  injuries?: string;
  programFocus?: string;
}

export interface Payment {
  id: string;
  clientId: string;
  clientName: string;
  amount: number;
  date: string;
  status: 'Completado' | 'Pendiente' | 'Fallido';
  method: 'VISA' | 'MasterCard' | 'Yape' | 'Efectivo';
}

export interface LandingContent {
  heroTitle: string;
  heroAccent: string;
  heroSubtitle: string;
  heroImg: string;
  statsSectionTitle: string;
  featuredPlanName: string;
  gymName: string;
  referralTitle: string;
  referralSubtitle: string;
  testimonialText: string;
  testimonialAuthor: string;
}

export interface LoyaltyConfig {
  isLoyaltyCardEnabled: boolean;
  stampsPerVisit: number;
  totalStampsToReward: number;
  rewardDescription: string;
  referralBonusEnabled: boolean;
  achievementSystemEnabled: boolean;
}

export interface GymStats {
  totalClients: number;
  activeMembers: number;
  monthlyRevenue: number;
  expiringSoonEntries: number;
}
