export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export type UserRole = "root" | "admin" | "affiliate" | "user"

export interface User {
  id: string
  email: string
  displayName: string
  role: UserRole
  balance: number
  affiliateCode?: string
  createdAt: string
  suspended: boolean
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  estimatedTime: string
  category: string
  type: "unlock" | "repair" | "flash" | "other"
  active: boolean
  createdAt: string
}

export interface Course {
  id: string
  title: string
  description: string
  price: number
  level: "beginner" | "intermediate" | "advanced"
  category: string
  instructor: string
  thumbnail: string
  lessons: Lesson[]
  enrolled: boolean
  rating: number
  reviewCount: number
  createdAt: string
}

export interface Lesson {
  id: string
  title: string
  videoUrl: string
  duration: number
  order: number
  completed?: boolean
}

export interface Order {
  id: string
  userId: string
  productId: string
  product: Product
  status: "pending" | "processing" | "completed" | "failed" | "refunded"
  serviceData: Record<string, string>
  result?: string
  createdAt: string
  updatedAt: string
}

export interface MarketplaceItem {
  id: string
  sellerId: string
  seller: Pick<User, "id" | "displayName">
  title: string
  description: string
  price: number
  category: string
  condition: "new" | "used" | "refurbished"
  images: string[]
  location: string
  active: boolean
  createdAt: string
}

export interface Notification {
  id: string
  userId: string
  type: "order" | "payment" | "system" | "affiliate"
  title: string
  message: string
  read: boolean
  createdAt: string
}

export interface AffiliateCode {
  id: string
  code: string
  ownerId: string
  usageCount: number
  commission: number
  active: boolean
  createdAt: string
}
