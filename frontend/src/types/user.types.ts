export type UserRole = 'root' | 'affiliate' | 'partner' | 'client'

export interface User {
  id: string
  uid: string
  email: string
  displayName: string
  role: UserRole
  balance: number
  affiliateCode?: string
  referredBy?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}
