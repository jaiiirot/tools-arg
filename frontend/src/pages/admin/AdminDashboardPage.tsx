import { AdminLayout } from '@/templates/AdminLayout'
import { useAdminMetrics } from '@/features/admin/hooks/useAdmin'
import { TerminalSpinner } from '@/atoms/Spinner'

export default function AdminDashboardPage() {
  const { data: metrics, isLoading } = useAdminMetrics()
  return (
    <AdminLayout>
      {isLoading ? <TerminalSpinner label="Loading metrics..." /> : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(metrics ?? {}).map(([k, v]) => (
            <div key={k} className="bg-terminal-secondary border border-terminal-border p-4">
              <p className="text-terminal-muted text-xs capitalize">{k.replace(/_/g,' ')}</p>
              <p className="text-terminal-green font-bold text-2xl mt-1">{String(v)}</p>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
