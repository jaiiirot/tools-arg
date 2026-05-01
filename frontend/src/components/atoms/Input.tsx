import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:  string
  error?:  string
  prefix?: string
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, prefix, className, ...rest }, ref) => (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-xs text-terminal-muted font-mono uppercase tracking-wider">{label}</label>}
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-terminal-green font-mono text-sm select-none">{prefix}</span>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-terminal-bg-sec border border-terminal-border text-terminal-text font-mono text-sm",
            "rounded px-3 py-2 outline-none transition-all duration-150",
            "placeholder:text-terminal-muted",
            "focus:border-terminal-green focus:terminal-glow",
            error && "border-terminal-red focus:border-terminal-red",
            prefix && "pl-8",
            className
          )}
          {...rest}
        />
      </div>
      {error && <span className="text-xs text-terminal-red font-mono">! {error}</span>}
    </div>
  )
)
Input.displayName = "Input"
