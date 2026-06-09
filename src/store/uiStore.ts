import { create } from 'zustand';

interface UserState {
  walletBalance: number;
  isEncryptedSession: boolean;
  setBalance: (amount: number) => void;
  toggleEncryption: () => void;
}

export const useUIStore = create<UserState>((set) => ({
  walletBalance: 0,
  isEncryptedSession: true,
  setBalance: (amount) => set({ walletBalance: amount }),
  toggleEncryption: () => set((state) => ({ isEncryptedSession: !state.isEncryptedSession })),
}));