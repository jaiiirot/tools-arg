import { useState, useRef, useEffect } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { TerminalText } from '@/atoms/TerminalText'
import { cn } from '@/lib/utils'

interface Line { text: string; type: 'input' | 'output' | 'error' | 'success' }

const HELP = [
  '  login     — authenticate to the platform',
  '  help      — show available commands',
  '  whoami    — display current session',
  '  clear     — clear terminal',
]

export function AuthTerminal({ onSuccess }: { onSuccess?: () => void }) {
  const [lines, setLines]     = useState<Line[]>([
    { text: 'GSM Tools Platform v2.0 — type "help" for commands', type: 'output' },
  ])
  const [input, setInput]     = useState('')
  const [step, setStep]       = useState<'idle' | 'email' | 'password'>('idle')
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef              = useRef<HTMLInputElement>(null)
  const bottomRef             = useRef<HTMLDivElement>(null)

  useEffect(() => { inputRef.current?.focus() }, [step, loading])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [lines])

  const push = (text: string, type: Line['type'] = 'output') =>
    setLines((l) => [...l, { text, type }])

  const handleCommand = async (cmd: string) => {
    push(`${step === 'password' ? '$ password: ' : '$ '} ${step === 'password' ? '•'.repeat(cmd.length) : cmd}`, 'input')
    setInput('')

    if (step === 'idle') {
      switch (cmd.trim().toLowerCase()) {
        case 'login':  push('Enter email:'); setStep('email'); break
        case 'help':   HELP.forEach((h) => push(h)); break
        case 'whoami': push('> Not authenticated. Use "login"'); break
        case 'clear':  setLines([]); break
        default:       push(`command not found: ${cmd}`, 'error')
      }
    } else if (step === 'email') {
      setEmail(cmd.trim())
      push('Enter password:')
      setStep('password')
    } else if (step === 'password') {
      setLoading(true)
      push('> Authenticating...')
      try {
        await signInWithEmailAndPassword(auth, email, cmd)
        push('> Access granted ✓', 'success')
        setTimeout(() => onSuccess?.(), 800)
      } catch {
        push('> Authentication failed. Try again.', 'error')
        setStep('idle')
      } finally { setLoading(false) }
    }
  }

  const typeColor = (t: Line['type']) => ({
    input:   'text-terminal-text',
    output:  'text-terminal-muted',
    error:   'text-terminal-red',
    success: 'text-terminal-green',
  }[t])

  return (
    <div
      className="bg-terminal-bg border border-terminal-green w-full max-w-lg p-0 font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="bg-tmux-statusbar border-b border-terminal-border px-3 py-1 text-terminal-muted text-xs flex items-center gap-2">
        <span className="text-terminal-green">●</span>
        <span className="text-terminal-yellow">●</span>
        <span className="text-terminal-red">●</span>
        <span className="ml-2">gsm-tools ~ login</span>
      </div>

      {/* Output */}
      <div className="h-64 overflow-y-auto p-3 space-y-1">
        {lines.map((l, i) => (
          <div key={i} className={typeColor(l.type)}>
            {l.type === 'output' || l.type === 'error' || l.type === 'success'
              ? <TerminalText text={l.text} speed={12} prefix={l.type === 'success' ? '>' : l.type === 'error' ? '!' : '>'} />
              : <span>{l.text}</span>
            }
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input line */}
      <div className="border-t border-terminal-border px-3 py-2 flex items-center gap-2">
        <span className="text-terminal-green">
          {step === 'password' ? '$ password:' : '$ '}
        </span>
        <input
          ref={inputRef}
          type={step === 'password' ? 'password' : 'text'}
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && input.trim()) handleCommand(input) }}
          className="bg-transparent border-none outline-none text-terminal-text flex-1 caret-terminal-green"
          autoComplete="off"
          spellCheck={false}
        />
        {loading && <span className="text-terminal-green animate-pulse">⠋</span>}
      </div>
    </div>
  )
}
