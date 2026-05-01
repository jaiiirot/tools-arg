import { forwardRef } from "react"
import { cn } from "@/lib/utils"

type Variant = "primary" | "danger" | "ghost" | "command" | "cyan"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  Variant
  loading?:  boolean
  children:  React.ReactNode
}

const variants: Record<Variant, string> = {
  primary: "bg-transparent border border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-bg active:scale-95 terminal-glow",
  danger:  "bg-transparent border border-terminal-red   text-terminal-red   hover:bg-terminal-red   hover:text-terminal-bg active:scale-95",
  ghost:   "bg-transparent border border-terminal-border text-terminal-muted hover:border-terminal-text hover:text-terminal-text",
  command: "bg-terminal-bg-sec border border-terminal-border text-terminal-cyan hover:border-terminal-cyan hover:terminal-glow",
  cyan:    "bg-transparent border border-terminal-cyan text-terminal-cyan hover:bg-terminal-cyan hover:text-terminal-bg active:scale-95 cyan-glow",
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "primary", loading, children, className, disabled, ...rest }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "font-mono text-sm px-4 py-2 rounded transition-all duration-150 flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
      {...rest}
    >
      {loading && <span className="animate-spin text-xs">◌</span>}
      {children}
    </button>
  )
)
Button.displayName = "Button"
