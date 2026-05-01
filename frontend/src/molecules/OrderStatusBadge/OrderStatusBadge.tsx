import { Badge } from '@/atoms/Badge'
import type { OrderStatus } from '@/types/order.types'
import type { BadgeStatus } from '@/atoms/Badge'

const map: Record<OrderStatus, BadgeStatus> = {
  pending:    'pending',
  processing: 'processing',
  completed:  'active',
  failed:     'failed',
  refunded:   'default',
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return <Badge status={map[status]}>{status.toUpperCase()}</Badge>
}
