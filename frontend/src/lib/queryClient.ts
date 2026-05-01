import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:           2 * 60 * 1000,
      gcTime:             10 * 60 * 1000,
      retry:              (failureCount, error: unknown) => {
        const status = (error as { response?: { status?: number } })?.response?.status
        if (status && status >= 400 && status < 500) return false
        return failureCount < 2
      },
      refetchOnWindowFocus: false,
    },
  },
})

// Typed stale times for each domain
export const STALE = {
  products:     5  * 60 * 1000,
  courses:      10 * 60 * 1000,
  marketplace:  2  * 60 * 1000,
  orders:       30 * 1000,
  profile:      1  * 60 * 1000,
  admin:        0,
} as const
