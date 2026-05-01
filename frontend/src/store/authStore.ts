import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, UserRole } from '@/types/user.types'
import type { User as FirebaseUser } from 'firebase/auth'

interface AuthStore {
  user:            User | null
  firebaseUser:    FirebaseUser | null
  token:           string | null
  isLoading:       boolean
  isAuthenticated: boolean
  role:            UserRole | null
  setUser:         (user: User) => void
  setFirebaseUser: (fu: FirebaseUser | null) => void
  setToken:        (token: string) => void
  setLoading:      (v: boolean) => void
  logout:          () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user:            null,
      firebaseUser:    null,
      token:           null,
      isLoading:       true,
      isAuthenticated: false,
      role:            null,
      setUser:         (user) => set({ user, role: user.role, isAuthenticated: true, isLoading: false }),
      setFirebaseUser: (firebaseUser) => set({ firebaseUser }),
      setToken:        (token) => set({ token }),
      setLoading:      (isLoading) => set({ isLoading }),
      logout:          () => set({ user: null, firebaseUser: null, token: null, isAuthenticated: false, role: null }),
    }),
    { name: 'gsm-auth', partialize: (s) => ({ token: s.token, user: s.user }) }
  )
)
