import { cn } from "@/lib/utils"

interface Props { name: string; className?: string }

export function Avatar({ name, className }: Props) {
  const initials = name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
  return (
    <div className={cn("w-8 h-8 rounded border border-terminal-green bg-terminal-bg-sec flex items-center justify-center text-terminal-green font-mono text-xs font-bold", className)}>
      {initials}
    </div>
  )
}
