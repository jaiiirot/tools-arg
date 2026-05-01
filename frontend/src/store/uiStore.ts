import { create } from 'zustand'

type Theme = 'dark' | 'matrix' | 'amber'

interface UIStore {
  sidebarOpen:       boolean
  sidebarCollapsed:  boolean
  activePane:        string
  terminalMode:      boolean
  theme:             Theme
  notifications:     { show: boolean }
  toggleSidebar:     () => void
  setSidebarCollapsed:(v: boolean) => void
  setActivePane:     (pane: string) => void
  toggleTerminalMode:() => void
  setTheme:          (theme: Theme) => void
  toggleNotifications:() => void
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen:        true,
  sidebarCollapsed:   false,
  activePane:         'main',
  terminalMode:       true,
  theme:              'dark',
  notifications:      { show: false },
  toggleSidebar:      () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarCollapsed:(v) => set({ sidebarCollapsed: v }),
  setActivePane:      (pane) => set({ activePane: pane }),
  toggleTerminalMode: () => set((s) => ({ terminalMode: !s.terminalMode })),
  setTheme:           (theme) => set({ theme }),
  toggleNotifications:() => set((s) => ({ notifications: { show: !s.notifications.show } })),
}))
