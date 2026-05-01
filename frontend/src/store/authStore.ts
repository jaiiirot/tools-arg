import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, UserRole } from "@/types/api"

interface AuthState {
  user:            User | null
  token:           string | null
  role:            UserRole | null
  isLoading:       boolean
  isAuthenticated: boolean
  setUser:  (user: User) => void
  setToken: (token: string) => void
  setLoading: (v: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user:            null,
      token:           null,
      role:            null,
      isLoading:       true,
      isAuthenticated: false,
      setUser:    (user)  => set({ user, role: user.role, isAuthenticated: true }),
      setToken:   (token) => set({ token }),
      setLoading: (v)     => set({ isLoading: v }),
      logout: () => set({ user: null, token: null, role: null, isAuthenticated: false }),
    }),
    { name: "gsm-auth", partialize: (s) => ({ token: s.token }) }
  )
)
