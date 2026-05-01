import { DollarSign } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export function BalanceDisplay({ amount }: { amount: number }) {
  return (
    <div className="flex items-center gap-1 text-terminal-green font-mono">
      <DollarSign className="w-4 h-4" />
      <span className="text-lg font-bold">{formatPrice(amount)}</span>
    </div>
  )
}
