import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface TerminalTextProps {
  text:        string
  speed?:      number
  prefix?:     string
  onComplete?: () => void
  className?:  string
  autoStart?:  boolean
}

export function TerminalText({ text, speed = 40, prefix = '$', onComplete, className, autoStart = true }: TerminalTextProps) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone]           = useState(false)

  useEffect(() => {
    if (!autoStart) return
    setDisplayed('')
    setDone(false)
    let i = 0
    const id = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) { clearInterval(id); setDone(true); onComplete?.() }
    }, speed)
    return () => clearInterval(id)
  }, [text, speed, autoStart])

  return (
    <span className={cn('font-mono text-terminal-text', className)}>
      {prefix && <span className="text-terminal-prompt mr-1">{prefix}</span>}
      {displayed}
      {!done && <span className="text-terminal-green animate-blink">█</span>}
    </span>
  )
}
