import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:           2 * 60 * 1000,
      gcTime:              10 * 60 * 1000,
      retry:               2,
      refetchOnWindowFocus: false,
    },
  },
})

// Query key factories
export const queryKeys = {
  products:      { all: ["products"] as const, list: (f?: object) => ["products","list",f] as const, detail: (id:string) => ["products",id] as const },
  courses:       { all: ["courses"] as const,  list: (f?: object) => ["courses","list",f] as const,  detail: (id:string) => ["courses",id] as const  },
  marketplace:   { all: ["marketplace"] as const, list: (f?: object) => ["marketplace","list",f] as const, detail: (id:string) => ["marketplace",id] as const },
  orders:        { all: ["orders"] as const,   mine: () => ["orders","mine"] as const, detail: (id:string) => ["orders",id] as const },
  profile:       { me: () => ["profile","me"] as const },
  notifications: { mine: () => ["notifications","mine"] as const },
  admin:         { users: (f?: object) => ["admin","users",f] as const, orders: (f?: object) => ["admin","orders",f] as const },
  affiliates:    { codes: () => ["affiliates","codes"] as const, commissions: () => ["affiliates","commissions"] as const },
}

// staleTime overrides por feature (usar en useQuery individualmente)
export const staleTimes = {
  products:      5  * 60 * 1000,
  courses:       10 * 60 * 1000,
  marketplace:   2  * 60 * 1000,
  orders:        30 * 1000,
  profile:       1  * 60 * 1000,
  adminLists:    0,
}
