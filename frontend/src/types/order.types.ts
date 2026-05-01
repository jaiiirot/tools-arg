export type OrderStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'

export interface Order {
  id: string
  userId: string
  productId: string
  productName: string
  price: number
  status: OrderStatus
  serviceData: Record<string, string>
  result?: string
  createdAt: string
  updatedAt: string
}
