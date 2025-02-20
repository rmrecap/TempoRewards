import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  referralCount: number;
  referralRewards: number;
}

interface UserStore {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  generateReferralCode: () => string;
  addReferralReward: (amount: number) => void;
  getReferralLink: () => string;
}

export const useUserStore = create<UserStore>(
  persist(
    (set, get) => ({
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      generateReferralCode: () => {
        // Generate a unique 8-character referral code
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 8; i++) {
          code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
      },
      addReferralReward: (amount) => {
        const user = get().currentUser;
        if (user) {
          set({
            currentUser: {
              ...user,
              referralRewards: (user.referralRewards || 0) + amount,
              referralCount: (user.referralCount || 0) + 1
            }
          });
        }
      },
      getReferralLink: () => {
        const user = get().currentUser;
        if (!user?.referralCode) return '';
        return `${window.location.origin}/auth/register?ref=${user.referralCode}`;
      }
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage
    }
  )
);