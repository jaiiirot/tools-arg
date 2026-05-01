import { Bell, Menu } from "lucide-react"
import { useUIStore } from "@/store/uiStore"
import { useNotificationStore } from "@/store/notificationStore"

interface Props { title?: string }

export function Header({ title = "" }: Props) {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)
  const unreadCount   = useNotificationStore((s) => s.unreadCount)

  return (
    <header className="h-9 border-b border-terminal-border bg-tmux-bar flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <button onClick={toggleSidebar} className="text-terminal-muted hover:text-terminal-text transition-colors" aria-label="toggle sidebar">
          <Menu className="w-3.5 h-3.5" />
        </button>
        <span className="text-xs font-mono text-terminal-muted">
          <span className="text-terminal-green">~</span>/{title}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative text-terminal-muted hover:text-terminal-text transition-colors" aria-label="notifications">
          <Bell className="w-3.5 h-3.5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-terminal-red text-white text-[9px] font-mono rounded-full w-3.5 h-3.5 flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
        <span className="text-xs font-mono text-terminal-muted">{new Date().toLocaleTimeString("es-AR",{hour:"2-digit",minute:"2-digit"})}</span>
      </div>
    </header>
  )
}
