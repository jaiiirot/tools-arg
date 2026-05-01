import { useState, useCallback } from 'react'
import { debounce } from '@/lib/utils'
import type { ProductFilters } from '@/types/product.types'

export function useProductFilters() {
  const [filters, setFilters] = useState<ProductFilters>({})

  const setSearch = useCallback(
    debounce((search: string) => setFilters((f) => ({ ...f, search })), 300),
    []
  )

  const setCategory = (category: string) => setFilters((f) => ({ ...f, category }))
  const setUserType  = (userType: ProductFilters['userType']) => setFilters((f) => ({ ...f, userType }))
  const setPriceRange = (min: number, max: number) => setFilters((f) => ({ ...f, minPrice: min, maxPrice: max }))
  const reset = () => setFilters({})

  return { filters, setSearch, setCategory, setUserType, setPriceRange, reset }
}
