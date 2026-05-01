import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

export type BadgeStatus = 'active' | 'pending' | 'failed' | 'processing' | 'default'

const styles: Record<BadgeStatus, string> = {
  active:     'border-terminal-green  text-terminal-green',
  pending:    'border-terminal-yellow text-terminal-yellow animate-pulse',
  failed:     'border-terminal-red    text-terminal-red',
  processing: 'border-terminal-cyan   text-terminal-cyan',
  default:    'border-terminal-border text-terminal-muted',
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status?: BadgeStatus
}

export function Badge({ status = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn('inline-flex items-center gap-1 border px-2 py-0.5 text-xs font-mono', styles[status], className)}
      {...props}
    >
      {children}
    </span>
  )
}
