import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '@/lib/axios'
import { STALE } from '@/lib/queryClient'
import type { Order, OrderStatus } from '@/types/order.types'
import type { ApiResponse, PaginatedResponse } from '@/types/api.types'

export const orderKeys = {
  all:    ['orders'] as const,
  lists:  () => [...orderKeys.all, 'list'] as const,
  detail: (id: string) => [...orderKeys.all, 'detail', id] as const,
}

export function useOrders() {
  return useQuery({
    queryKey: orderKeys.lists(),
    queryFn:  () => apiClient.get<PaginatedResponse<Order>>('/orders').then((r) => r.data),
    staleTime: STALE.orders,
    refetchInterval: STALE.orders,
  })
}

export function useCreateOrder() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: { productId: string; serviceData: Record<string, string> }) =>
      apiClient.post<ApiResponse<Order>>('/orders', payload).then((r) => r.data.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: orderKeys.lists() }),
  })
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      apiClient.patch(`/orders/${id}/status`, { status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: orderKeys.all }),
  })
}
