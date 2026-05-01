import { useMutation } from '@tanstack/react-query'
import apiClient from '@/lib/axios'
import type { User } from '@/types/user.types'

export function useCreateProfile() {
  return useMutation({
    mutationFn: (payload: { uid: string; email: string; displayName: string; affiliateCode?: string }) =>
      apiClient.post<{ data: User }>('/auth/register', payload).then((r) => r.data.data),
  })
}

export function useSyncProfile() {
  return useMutation({
    mutationFn: () =>
      apiClient.post<{ data: User }>('/auth/sync').then((r) => r.data.data),
  })
}
