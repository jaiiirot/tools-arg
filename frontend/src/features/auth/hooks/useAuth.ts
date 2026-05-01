import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuthStore } from '@/store/authStore'
import { useSyncProfile } from '@/features/auth/queries/authQueries'

export function useAuthInit() {
  const { setFirebaseUser, setToken, setLoading, logout } = useAuthStore()
  const sync = useSyncProfile()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fu) => {
      if (fu) {
        const token = await fu.getIdToken()
        setFirebaseUser(fu)
        setToken(token)
        sync.mutate()
      } else {
        logout()
        setLoading(false)
      }
    })
    return unsub
  }, [])
}

export { useAuthStore }
