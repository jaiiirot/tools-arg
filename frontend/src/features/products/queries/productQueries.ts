import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '@/lib/axios'
import { STALE, queryClient as qc } from '@/lib/queryClient'
import type { Product, ProductFilters } from '@/types/product.types'
import type { PaginatedResponse, ApiResponse } from '@/types/api.types'

export const productKeys = {
  all:        ['products'] as const,
  lists:      () => [...productKeys.all, 'list'] as const,
  list:       (f: ProductFilters) => [...productKeys.lists(), f] as const,
  details:    () => [...productKeys.all, 'detail'] as const,
  detail:     (id: string) => [...productKeys.details(), id] as const,
  categories: () => [...productKeys.all, 'categories'] as const,
}

export function useProducts(filters: ProductFilters = {}) {
  return useInfiniteQuery({
    queryKey:        productKeys.list(filters),
    queryFn:         ({ pageParam = 1 }) =>
      apiClient.get<PaginatedResponse<Product>>('/products', { params: { ...filters, page: pageParam, limit: 20 } })
        .then((r) => r.data),
    getNextPageParam: (last) => last.hasMore ? last.page + 1 : undefined,
    initialPageParam: 1,
    staleTime:       STALE.products,
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn:  () => apiClient.get<ApiResponse<Product>>(`/products/${id}`).then((r) => r.data.data),
    staleTime: STALE.products,
  })
}

export function usePrefetchProduct() {
  return (id: string) =>
    qc.prefetchQuery({ queryKey: productKeys.detail(id), queryFn: () =>
      apiClient.get<ApiResponse<Product>>(`/products/${id}`).then((r) => r.data.data) })
}

export function useDeleteProduct() {
  const qClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/products/${id}`),
    onSuccess:  () => qClient.invalidateQueries({ queryKey: productKeys.lists() }),
  })
}
