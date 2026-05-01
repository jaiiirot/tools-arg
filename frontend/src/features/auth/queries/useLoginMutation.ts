import { useMutation } from "@tanstack/react-query"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import api from "@/lib/axios"
import { useAuthStore } from "@/store/authStore"
import type { LoginForm } from "../types"

export function useLoginMutation() {
  const { setUser, setToken } = useAuthStore()
  return useMutation({
    mutationFn: async ({ email, password }: LoginForm) => {
      const cred  = await signInWithEmailAndPassword(auth, email, password)
      const token = await cred.user.getIdToken()
      // api/auth/me
      const { data } = await api.get("/auth/me")
      return { user: data.data, token }
    },
    onSuccess: ({ user, token }) => { setUser(user); setToken(token) },
  })
}
