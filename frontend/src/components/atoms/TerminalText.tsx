import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface Props {
  text:        string
  speed?:      number
  prefix?:     "$" | ">" | "~" | ""
  className?:  string
  onComplete?: () => void
}

export function TerminalText({ text, speed = 40, prefix = "$", className, onComplete }: Props) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone]           = useState(false)

  useEffect(() => {
    setDisplayed(""); setDone(false)
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) { clearInterval(interval); setDone(true); onComplete?.() }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <span className={cn("font-mono", className)}>
      {prefix && <span className="text-terminal-green mr-2">{prefix}</span>}
      {displayed}
      {!done && <span className="animate-blink text-terminal-green">█</span>}
    </span>
  )
}
