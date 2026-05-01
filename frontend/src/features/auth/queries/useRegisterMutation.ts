import { useMutation } from "@tanstack/react-query"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "@/lib/firebase"
import api from "@/lib/axios"
import { useAuthStore } from "@/store/authStore"
import type { RegisterForm } from "../types"

export function useRegisterMutation() {
  const { setUser, setToken } = useAuthStore()
  return useMutation({
    mutationFn: async ({ email, password, displayName, affiliateCode }: RegisterForm) => {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(cred.user, { displayName })
      const token = await cred.user.getIdToken()
      // api/auth/register
      const { data } = await api.post("/auth/register", { displayName, affiliateCode })
      return { user: data.data, token }
    },
    onSuccess: ({ user, token }) => { setUser(user); setToken(token) },
  })
}
