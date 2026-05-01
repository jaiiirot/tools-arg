import type { ReactNode } from 'react'
import { Header } from '@/organisms/Header'
import { Sidebar } from '@/organisms/Sidebar'
import { useUIStore } from '@/store/uiStore'

interface TmuxLayoutProps { children: ReactNode; paneTitle?: string }

export function TmuxLayout({ children, paneTitle = 'main' }: TmuxLayoutProps) {
  const { sidebarOpen } = useUIStore()
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-terminal-bg">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && <Sidebar />}
        <main className="flex flex-col flex-1 overflow-hidden">
          <div className="pane-title">pane: {paneTitle}</div>
          <div className="flex-1 overflow-y-auto p-4">
            {children}
          </div>
        </main>
      </div>
      {/* Status bar bottom */}
      <div className="bg-tmux-statusbar border-t border-terminal-border px-3 py-0.5 text-xs text-terminal-muted font-mono flex gap-4">
        <span className="text-terminal-green">gsm-tools</span>
        <span>│</span>
        <span>React 18 + TanStack Query</span>
      </div>
    </div>
  )
}
