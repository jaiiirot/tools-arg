import { create } from 'zustand';

interface SystemState {
  logs: string[];
  balance: number;
  clientTab: 'catalog' | 'history';
  dolarRate: number;
  setClientTab: (tab: 'catalog' | 'history') => void;
  addLog: (message: string) => void;
  clearLogs: () => void;
  updateBalance: (amount: number) => void;
  fetchDolarRate: () => Promise<void>;
}

export const useSystemStore = create<SystemState>((set, get) => ({
  logs: ['> Iniciando sesión segura...', '> Conexión establecida.'],
  balance: 0.00,
  clientTab: 'catalog',
  dolarRate: 1000, // Valor fallback
  setClientTab: (tab) => set({ clientTab: tab }),
  addLog: (msg) => set((state) => ({ logs: [...state.logs.slice(-49), msg] })),
  clearLogs: () => set({ logs: [] }),
  updateBalance: (amount) => set((state) => ({ balance: state.balance + amount })),
  fetchDolarRate: async () => {
    try {
      const res = await fetch('https://dolarapi.com/v1/dolares/cripto');
      const data = await res.json();
      set({ dolarRate: data.venta }); // Usamos precio de Venta USDT
      get().addLog(`[ECONOMÍA] Tasa USDT/ARS actualizada: $${data.venta}`);
    } catch (e) {
      get().addLog('[AVISO] Usando tasa USDT/ARS offline.');
    }
  }
}));