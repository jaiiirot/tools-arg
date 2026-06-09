import { create } from 'zustand';

interface AdminState {
  activeTab: 'services' | 'orders' | 'users';
  setActiveTab: (tab: 'services' | 'orders' | 'users') => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  activeTab: 'services',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));