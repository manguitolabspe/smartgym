import { LucideIcon } from 'lucide-react';

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
