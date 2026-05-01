import axios from "axios"
import { auth } from "./firebase"

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser
  if (user) {
    const token = await user.getIdToken()
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error.response?.status
    if (status === 401) {
      await auth.signOut()
      window.location.href = "/login"
    } else if (status === 403) {
      window.location.href = "/forbidden"
    } else if (status >= 500) {
      console.error("Server error:", error.response?.data?.message)
    }
    return Promise.reject(error)
  }
)

export default api
