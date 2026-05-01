import { PanelLeft, Bell, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import { Avatar } from '@/atoms/Avatar'
import { Button } from '@/atoms/Button'
import { BalanceDisplay } from '@/molecules/BalanceDisplay'

export function Header() {
  const { user, logout }          = useAuthStore()
  const { toggleSidebar, toggleNotifications } = useUIStore()
  const navigate                  = useNavigate()

  const handleLogout = async () => {
    await signOut(auth)
    logout()
    navigate('/login')
  }

  const now = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })

  return (
    <header className="bg-tmux-statusbar border-b border-terminal-border flex items-center justify-between px-3 py-1.5 text-xs font-mono">
      <div className="flex items-center gap-3">
        <button onClick={toggleSidebar} className="text-terminal-muted hover:text-terminal-green transition-colors" aria-label="Toggle sidebar">
          <PanelLeft className="w-4 h-4" />
        </button>
        <span className="text-terminal-green">session: gsm-tools</span>
        <span className="text-terminal-border">│</span>
        <span className="text-terminal-muted">{user?.role ?? 'guest'}</span>
      </div>

      <div className="flex items-center gap-3">
        {user && <BalanceDisplay amount={user.balance} />}
        <button onClick={toggleNotifications} className="text-terminal-muted hover:text-terminal-yellow transition-colors" aria-label="Notifications">
          <Bell className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2">
          <Avatar name={user?.displayName} size="sm" />
          {user && <span className="text-terminal-text hidden sm:inline">{user.displayName}</span>}
        </div>
        <span className="text-terminal-muted">{now}</span>
        <Button size="sm" variant="ghost" onClick={handleLogout} aria-label="Logout">
          <LogOut className="w-3 h-3" />
        </Button>
      </div>
    </header>
  )
}
