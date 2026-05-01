import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?:    string
  error?:    string
  prefix?:   string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, prefix, className, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs text-terminal-muted">{label}</label>}
      <div className="relative flex items-center">
        {prefix && <span className="absolute left-2 text-terminal-green text-sm select-none">{prefix}</span>}
        <input
          ref={ref}
          className={cn(
            'w-full bg-terminal-secondary border text-terminal-text placeholder:text-terminal-muted font-mono text-sm px-3 py-1.5 focus:outline-none focus:ring-1 transition-colors',
            prefix ? 'pl-7' : '',
            error
              ? 'border-terminal-red focus:ring-terminal-red'
              : 'border-terminal-border focus:border-terminal-green focus:ring-terminal-green',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-terminal-red">{error}</p>}
    </div>
  )
)
Input.displayName = 'Input'
