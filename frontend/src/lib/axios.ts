import axios from 'axios'
import { auth } from '@/lib/firebase'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
})

// Deduplication map
const pendingRequests = new Map<string, AbortController>()

apiClient.interceptors.request.use(async (config) => {
  // Attach Firebase token
  const user = auth.currentUser
  if (user) {
    const token = await user.getIdToken()
    config.headers.Authorization = `Bearer ${token}`
  }
  // Dedup
  const key = `${config.method}:${config.url}`
  if (pendingRequests.has(key)) pendingRequests.get(key)!.abort()
  const controller = new AbortController()
  config.signal = controller.signal
  pendingRequests.set(key, controller)
  return config
})

apiClient.interceptors.response.use(
  (res) => {
    const key = `${res.config.method}:${res.config.url}`
    pendingRequests.delete(key)
    return res
  },
  (error) => {
    if (error.response?.status === 401) {
      auth.signOut()
      window.location.href = '/login'
    }
    if (error.response?.status === 403) window.location.href = '/forbidden'
    return Promise.reject(error)
  }
)

export default apiClient
