import { cn } from "@/lib/utils"

type Status = "active" | "pending" | "failed" | "processing" | "refunded" | "default"

const styles: Record<Status, string> = {
  active:     "border-terminal-green text-terminal-green",
  pending:    "border-terminal-yellow text-terminal-yellow animate-pulse2",
  failed:     "border-terminal-red   text-terminal-red",
  processing: "border-terminal-cyan  text-terminal-cyan",
  refunded:   "border-terminal-purple text-terminal-purple",
  default:    "border-terminal-border text-terminal-muted",
}

interface Props { status?: Status; label: string; className?: string }

export function Badge({ status = "default", label, className }: Props) {
  return (
    <span className={cn("font-mono text-xs border rounded px-2 py-0.5 uppercase tracking-wider", styles[status], className)}>
      {status === "processing" && <span className="animate-spin inline-block mr-1">◌</span>}
      {label}
    </span>
  )
}
