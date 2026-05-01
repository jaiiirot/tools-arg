import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/axios"
import { queryKeys, staleTimes } from "@/lib/queryClient"
import type { Order } from "@/types/api"

export function useMyOrders() {
  return useQuery<Order[]>({
    queryKey: queryKeys.orders.mine(),
    queryFn: async () => {
      // api/orders/mine
      const { data } = await api.get("/orders/mine")
      return data.data
    },
    staleTime: staleTimes.orders,
  })
}

export function useCreateOrder() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (body: { productId: string; serviceData: Record<string,string> }) => {
      // api/orders
      const { data } = await api.post("/orders", body)
      return data.data as Order
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: queryKeys.orders.mine() }) },
  })
}
