import { AdminLayout } from '@/templates/AdminLayout'
import { useOrders } from '@/features/orders/hooks/useOrders'
import { OrderStatusBadge } from '@/molecules/OrderStatusBadge'
import { TerminalSpinner } from '@/atoms/Spinner'
import { formatPrice, formatDate } from '@/lib/utils'

export default function OrderManagerPage() {
  const { data, isLoading } = useOrders()
  const orders = data?.data ?? []
  return (
    <AdminLayout>
      {isLoading ? <TerminalSpinner label="Loading orders..." /> : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono border border-terminal-border">
            <thead className="bg-tmux-statusbar">
              <tr>{['ID','product','price','status','date'].map((h) => (
                <th key={h} className="text-left px-3 py-2 text-terminal-muted capitalize">{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t border-terminal-border hover:bg-terminal-secondary">
                  <td className="px-3 py-2 text-terminal-muted">{o.id.slice(0, 8)}</td>
                  <td className="px-3 py-2">{o.productName}</td>
                  <td className="px-3 py-2 text-terminal-green">{formatPrice(o.price)}</td>
                  <td className="px-3 py-2"><OrderStatusBadge status={o.status} /></td>
                  <td className="px-3 py-2 text-terminal-muted">{formatDate(o.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  )
}
