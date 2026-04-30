import { create } from 'zustand';

interface SystemState {
  logs: string[];
  addLog: (message: string) => void;
  clearLogs: () => void;
}

export const useSystemStore = create<SystemState>((set) => ({
  logs: ['> Sistema inicializado...', '> Esperando input de usuario...'],
  addLog: (message) => set((state) => ({ logs: [...state.logs, message] })),
  clearLogs: () => set({ logs: [] })
}));