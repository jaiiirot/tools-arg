import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '@/lib/axios'
import { STALE } from '@/lib/queryClient'
import type { User, UserRole } from '@/types/user.types'

export const adminKeys = {
  users:   ['admin', 'users'] as const,
  metrics: ['admin', 'metrics'] as const,
}

export function useAdminUsers() {
  return useQuery({
    queryKey: adminKeys.users,
    queryFn:  () => apiClient.get<{ data: User[] }>('/admin/users').then((r) => r.data.data),
    staleTime: STALE.admin,
  })
}

export function useAdminMetrics() {
  return useQuery({
    queryKey: adminKeys.metrics,
    queryFn:  () => apiClient.get('/admin/metrics').then((r) => r.data.data),
    staleTime: STALE.admin,
  })
}

export function useUpdateUserRole() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: UserRole }) =>
      apiClient.patch(`/admin/users/${userId}/role`, { role }),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.users }),
  })
}

export function useAdjustBalance() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ userId, amount }: { userId: string; amount: number }) =>
      apiClient.patch(`/admin/users/${userId}/balance`, { amount }),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.users }),
  })
}
