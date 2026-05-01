import { useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/axios'

export function useAffiliateStats() {
  return useQuery({
    queryKey: ['affiliates', 'stats'],
    queryFn:  () => apiClient.get('/affiliates/stats').then((r) => r.data.data),
  })
}

export function useAffiliateCodes() {
  return useQuery({
    queryKey: ['affiliates', 'codes'],
    queryFn:  () => apiClient.get('/affiliates/codes').then((r) => r.data.data),
  })
}
