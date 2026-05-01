import { useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/axios'
import { STALE } from '@/lib/queryClient'

export const marketplaceKeys = {
  all:    ['marketplace'] as const,
  lists:  () => [...marketplaceKeys.all, 'list'] as const,
  detail: (id: string) => [...marketplaceKeys.all, 'detail', id] as const,
}

export function useMarketplaceItems() {
  return useQuery({
    queryKey: marketplaceKeys.lists(),
    queryFn:  () => apiClient.get('/marketplace').then((r) => r.data),
    staleTime: STALE.marketplace,
  })
}
