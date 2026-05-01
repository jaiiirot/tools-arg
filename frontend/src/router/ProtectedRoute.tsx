import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { TerminalSpinner } from '@/atoms/Spinner'

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuthStore()
  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-terminal-bg">
      <TerminalSpinner label="Verifying session..." />
    </div>
  )
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
