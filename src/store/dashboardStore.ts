import { create } from 'zustand';

interface DashboardState {
  totalTasks: number;
  completedTasks: number;
  totalEarnings: number;
  dailyEarnings: number;
  commissions: number;
  setTotalTasks: (count: number) => void;
  setCompletedTasks: (count: number) => void;
  updateEarnings: (amount: number) => void;
  updateDailyEarnings: (amount: number) => void;
  updateCommissions: (amount: number) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  totalTasks: 60,
  completedTasks: 18,
  totalEarnings: 30.81,
  dailyEarnings: 5.25,
  commissions: 2.50,
  
  setTotalTasks: (count) => set({ totalTasks: count }),
  setCompletedTasks: (count) => set({ completedTasks: count }),
  updateEarnings: (amount) => set((state) => ({ totalEarnings: state.totalEarnings + amount })),
  updateDailyEarnings: (amount) => set((state) => ({ dailyEarnings: state.dailyEarnings + amount })),
  updateCommissions: (amount) => set((state) => ({ commissions: state.commissions + amount })),
}));