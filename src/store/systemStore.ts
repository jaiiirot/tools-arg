import { create } from 'zustand';

interface SystemState {
  logs: string[];
  balance: number;
  clientTab: 'catalog' | 'history';
  setClientTab: (tab: 'catalog' | 'history') => void; 
  addLog: (message: string) => void;
  clearLogs: () => void;
  updateBalance: (amount: number) => void;
}

export const useSystemStore = create<SystemState>((set) => ({
  logs: ['> Iniciando sesión segura...', '> Conexión establecida.', '> Esperando comandos...'],
  balance: 0.00,
  clientTab: 'catalog',
  setClientTab: (tab) => set({ clientTab: tab }),
  addLog: (message) => set((state) => ({ logs: [...state.logs, message] })),
  clearLogs: () => set({ logs: [] }),
  updateBalance: (amount) => set((state) => ({ balance: state.balance + amount }))
}));