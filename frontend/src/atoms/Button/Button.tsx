import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import type { ButtonProps } from './Button.types'

const variants = {
  primary: 'border border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-bg',
  danger:  'border border-terminal-red   text-terminal-red   hover:bg-terminal-red   hover:text-terminal-bg',
  ghost:   'border border-dashed border-terminal-border text-terminal-muted hover:border-terminal-green hover:text-terminal-green',
  command: 'border border-terminal-cyan text-terminal-cyan before:content-["$_"] hover:bg-terminal-cyan hover:text-terminal-bg',
}
const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-4 py-1.5 text-sm',
  lg: 'px-6 py-2   text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, prefix, children, className, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center gap-2 font-mono transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-terminal-green disabled:opacity-40 disabled:cursor-not-allowed',
        variants[variant], sizes[size], className
      )}
      {...props}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : prefix && <span>{prefix}</span>}
      {children}
    </button>
  )
)
Button.displayName = 'Button'
