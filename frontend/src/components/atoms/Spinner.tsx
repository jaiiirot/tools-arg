export function Spinner({ size = "md" }: { size?: "sm"|"md"|"lg" }) {
  const cls = { sm:"text-sm", md:"text-xl", lg:"text-4xl" }[size]
  return (
    <div className="flex flex-col items-center gap-2 text-terminal-green font-mono">
      <span className={`animate-spin ${cls}`}>◌</span>
      {size !== "sm" && <span className="text-xs text-terminal-muted animate-pulse">loading...</span>}
    </div>
  )
}
