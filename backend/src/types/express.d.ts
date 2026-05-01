import type { UserRole } from './roles.types'

declare global {
  namespace Express {
    interface Request {
      uid?:  string
      role?: UserRole
      user?: {
        uid:         string
        email:       string
        displayName: string
        role:        UserRole
        balance:     number
      }
    }
  }
}
