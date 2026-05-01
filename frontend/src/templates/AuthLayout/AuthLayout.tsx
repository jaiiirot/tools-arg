import type { ReactNode } from 'react'

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-terminal-bg flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <pre className="text-terminal-green text-xs leading-none select-none">
{`  ██████╗ ███████╗███╗   ███╗
 ██╔════╝ ██╔════╝████╗ ████║
 ██║  ███╗███████╗██╔████╔██║
 ██║   ██║╚════██║██║╚██╔╝██║
 ╚██████╔╝███████║██║ ╚═╝ ██║
  ╚═════╝ ╚══════╝╚═╝     ╚═╝`}
          </pre>
          <p className="text-terminal-muted text-xs mt-2">GSM Tools Platform</p>
        </div>
        {children}
      </div>
    </div>
  )
}
