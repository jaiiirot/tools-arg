import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import type { UserRole } from '@/types/user.types'

export function RoleRoute({ allowedRoles }: { allowedRoles: UserRole[] }) {
  const { role } = useAuthStore()
  if (!role || !allowedRoles.includes(role)) return <Navigate to="/forbidden" replace />
  return <Outlet />
}
