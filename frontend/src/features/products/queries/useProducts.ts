import { useQuery, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/axios"
import { queryKeys, staleTimes } from "@/lib/queryClient"
import type { PaginatedResponse, Product } from "@/types/api"

interface Filters { search?: string; category?: string; page?: number }

export function useProducts(filters: Filters = {}) {
  return useQuery<PaginatedResponse<Product>>({
    queryKey: queryKeys.products.list(filters),
    queryFn: async () => {
      // api/products
      const { data } = await api.get("/products", { params: filters })
      return data.data
    },
    staleTime: staleTimes.products,
  })
}

export function usePrefetchProduct() {
  const qc = useQueryClient()
  return (id: string) =>
    qc.prefetchQuery({
      queryKey: queryKeys.products.detail(id),
      queryFn: async () => {
        // api/products/:id
        const { data } = await api.get(`/products/${id}`)
        return data.data
      },
      staleTime: staleTimes.products,
    })
}
