import { TmuxLayout } from '@/templates/TmuxLayout'
import { useAffiliateStats, useAffiliateCodes } from '@/features/affiliates/hooks/useAffiliates'
import { TerminalSpinner } from '@/atoms/Spinner'
import { Badge } from '@/atoms/Badge'

export default function AffiliateDashboardPage() {
  const { data: stats, isLoading: loadingStats } = useAffiliateStats()
  const { data: codes, isLoading: loadingCodes } = useAffiliateCodes()

  return (
    <TmuxLayout paneTitle="affiliate">
      <div className="space-y-6">
        {loadingStats ? <TerminalSpinner label="Loading stats..." /> : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(stats ?? {}).map(([k, v]) => (
              <div key={k} className="bg-terminal-secondary border border-terminal-border p-3">
                <p className="text-terminal-muted text-xs">{k}</p>
                <p className="text-terminal-green font-bold text-lg">{String(v)}</p>
              </div>
            ))}
          </div>
        )}
        <div>
          <p className="text-terminal-muted text-xs mb-2">affiliate codes</p>
          {loadingCodes ? <TerminalSpinner /> : (
            <table className="w-full text-xs font-mono border border-terminal-border">
              <thead className="bg-tmux-statusbar">
                <tr>{['code','uses','discount','status'].map((h) => <th key={h} className="text-left px-3 py-1.5 text-terminal-muted">{h}</th>)}</tr>
              </thead>
              <tbody>
                {(codes ?? []).map((c: Record<string, unknown>, i: number) => (
                  <tr key={i} className="border-t border-terminal-border hover:bg-terminal-secondary">
                    <td className="px-3 py-1.5 text-terminal-cyan">{String(c.code)}</td>
                    <td className="px-3 py-1.5">{String(c.uses)}</td>
                    <td className="px-3 py-1.5">{String(c.discount)}%</td>
                    <td className="px-3 py-1.5"><Badge status="active">{String(c.status)}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </TmuxLayout>
  )
}
