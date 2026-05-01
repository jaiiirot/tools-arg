import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

export function Tag({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-xs font-mono px-1.5 py-0.5 bg-terminal-secondary border border-terminal-border text-terminal-cyan', className)} {...props}>
      {children}
    </span>
  )
}
