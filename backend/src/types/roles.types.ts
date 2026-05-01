export type UserRole = 'root' | 'affiliate' | 'partner' | 'client'

export const ROLES: Record<UserRole, number> = {
  root:      4,
  affiliate: 3,
  partner:   2,
  client:    1,
}

export const RATE_LIMITS: Record<UserRole, number> = {
  root:      1000,
  affiliate: 200,
  partner:   100,
  client:    60,
}
