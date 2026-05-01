import { create } from "zustand"

type Theme = "dark" | "matrix" | "amber"

interface UIState {
  sidebarOpen:       boolean
  sidebarCollapsed:  boolean
  activePane:        number
  terminalMode:      boolean
  theme:             Theme
  toggleSidebar:     () => void
  collapseSidebar:   (v: boolean) => void
  setTheme:          (t: Theme) => void
  setTerminalMode:   (v: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen:      true,
  sidebarCollapsed: false,
  activePane:       1,
  terminalMode:     false,
  theme:            "dark",
  toggleSidebar:   () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  collapseSidebar: (v) => set({ sidebarCollapsed: v }),
  setTheme:        (t) => set({ theme: t }),
  setTerminalMode: (v) => set({ terminalMode: v }),
}))
