import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ShoppingBag, BookOpen, Store, Users, Settings, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/store/uiStore'
import { useAuthStore } from '@/store/authStore'

const navItems = [
  { to: '/dashboard',   icon: LayoutDashboard, label: 'Dashboard',   roles: ['root','affiliate','partner','client'] },
  { to: '/products',    icon: ShoppingBag,     label: 'Services',    roles: ['root','affiliate','partner','client'] },
  { to: '/courses',     icon: BookOpen,        label: 'Courses',     roles: ['root','affiliate','partner','client'] },
  { to: '/marketplace', icon: Store,           label: 'Marketplace', roles: ['root','affiliate','partner','client'] },
  { to: '/affiliate',   icon: Users,           label: 'Affiliate',   roles: ['root','affiliate'] },
  { to: '/admin',       icon: Settings,        label: 'Admin',       roles: ['root'] },
]

export function Sidebar() {
  const { sidebarCollapsed } = useUIStore()
  const { role } = useAuthStore()

  return (
    <aside className={cn(
      'flex flex-col bg-tmux-inactive border-r border-terminal-border transition-all duration-200',
      sidebarCollapsed ? 'w-12' : 'w-48'
    )}>
      <div className="pane-title flex items-center justify-between">
        {!sidebarCollapsed && <span>pane: nav</span>}
        <ChevronRight className={cn('w-3 h-3 text-terminal-muted transition-transform', sidebarCollapsed && 'rotate-180')} />
      </div>
      <nav className="flex flex-col py-2 gap-0.5 flex-1" aria-label="Main navigation">
        {navItems
          .filter((item) => role && item.roles.includes(role))
          .map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => cn(
                'flex items-center gap-2 px-3 py-1.5 text-sm font-mono transition-colors',
                isActive
                  ? 'text-terminal-green bg-terminal-bg border-l-2 border-terminal-green'
                  : 'text-terminal-muted hover:text-terminal-text hover:bg-terminal-bg'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!sidebarCollapsed && <span>{label}</span>}
            </NavLink>
          ))
        }
      </nav>
    </aside>
  )
}
