import { Sidebar } from "@/components/organisms/Sidebar"
import { Header }  from "@/components/organisms/Header"
import { useUIStore } from "@/store/uiStore"
import { cn } from "@/lib/utils"

interface Props { children: React.ReactNode; title?: string }

export function TmuxLayout({ children, title }: Props) {
  const { sidebarOpen } = useUIStore()
  const now = new Date()
  const timeStr = now.toLocaleTimeString("es-AR",{hour:"2-digit",minute:"2-digit",second:"2-digit"})

  return (
    <div className="h-screen flex flex-col bg-terminal-bg overflow-hidden scanline-effect">
      {/* tmux top bar */}
      <div className="h-5 bg-tmux-bar border-b border-terminal-border flex items-center px-3 shrink-0">
        <span className="text-[10px] font-mono text-terminal-green">[gsm-arg]</span>
        <span className="text-[10px] font-mono text-terminal-muted ml-2">0:main*</span>
      </div>

      <div className="flex flex-1 min-h-0">
        {sidebarOpen && <Sidebar />}
        <main className={cn("flex-1 flex flex-col min-w-0")}>
          <Header title={title} />
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
        </main>
      </div>

      {/* tmux bottom bar */}
      <div className="h-5 bg-tmux-bar border-t border-terminal-border flex items-center justify-between px-3 shrink-0">
        <span className="text-[10px] font-mono text-terminal-muted">GSM Tools Platform</span>
        <span className="text-[10px] font-mono text-terminal-green">{timeStr}</span>
      </div>
    </div>
  )
}
