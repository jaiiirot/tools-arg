export type UserType = 'new' | 'existing' | 'any'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  brand?: string
  chipset?: string
  userType: UserType
  deliveryTime: string
  isActive: boolean
  createdAt: string
}

export interface ProductFilters {
  category?: string
  brand?: string
  userType?: UserType
  minPrice?: number
  maxPrice?: number
  search?: string
}
