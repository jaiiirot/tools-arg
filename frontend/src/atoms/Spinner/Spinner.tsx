import { cn } from '@/lib/utils'

const frames = ['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏']

export function Spinner({ className }: { className?: string }) {
  return (
    <span className={cn('inline-block text-terminal-green animate-spin', className)}
      style={{ display: 'inline-block', animation: 'spin 0.8s linear infinite' }}>
      ⠋
    </span>
  )
}

export function TerminalSpinner({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 text-terminal-green font-mono text-sm">
      <Spinner />
      <span>{label}</span>
    </div>
  )
}
