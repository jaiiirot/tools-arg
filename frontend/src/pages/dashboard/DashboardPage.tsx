import { TmuxLayout } from '@/templates/TmuxLayout'
import { useAuthStore } from '@/store/authStore'
import { BalanceDisplay } from '@/molecules/BalanceDisplay'
import { TerminalText } from '@/atoms/TerminalText'

export default function DashboardPage() {
  const { user } = useAuthStore()
  return (
    <TmuxLayout paneTitle="dashboard">
      <div className="space-y-6">
        <div>
          <TerminalText text={`Welcome back, ${user?.displayName ?? 'operator'}`} speed={30} prefix=">" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Balance',        value: <BalanceDisplay amount={user?.balance ?? 0} /> },
            { label: 'Active Orders',  value: <span className="text-terminal-cyan font-bold text-lg">—</span> },
            { label: 'Courses',        value: <span className="text-terminal-purple font-bold text-lg">—</span> },
          ].map(({ label, value }) => (
            <div key={label} className="bg-terminal-secondary border border-terminal-border p-4">
              <p className="text-terminal-muted text-xs mb-2">{label}</p>
              {value}
            </div>
          ))}
        </div>
      </div>
    </TmuxLayout>
  )
}
