import { NavLink } from "react-router-dom"
import { LayoutDashboard, Package, BookOpen, ShoppingBag, Users, Settings, LogOut, Link2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/store/authStore"
import { Avatar } from "@/components/atoms/Avatar"
import { auth } from "@/lib/firebase"

const navItems = [
  { to: "/dashboard",    icon: LayoutDashboard, label: "dashboard",   roles: ["root","admin","affiliate","user"] },
  { to: "/products",     icon: Package,          label: "services",    roles: ["root","admin","affiliate","user"] },
  { to: "/courses",      icon: BookOpen,         label: "courses",     roles: ["root","admin","affiliate","user"] },
  { to: "/marketplace",  icon: ShoppingBag,      label: "marketplace", roles: ["root","admin","affiliate","user"] },
  { to: "/affiliates",   icon: Link2,            label: "affiliate",   roles: ["root","admin","affiliate"] },
  { to: "/admin",        icon: Users,            label: "admin",       roles: ["root","admin"] },
  { to: "/settings",     icon: Settings,         label: "settings",    roles: ["root","admin","affiliate","user"] },
]

export function Sidebar() {
  const { user, role, logout } = useAuthStore()

  const handleLogout = async () => {
    await auth.signOut()
    logout()
  }

  return (
    <aside className="w-52 border-r border-terminal-border bg-tmux-inactive flex flex-col h-full">
      <div className="p-3 border-b border-terminal-border">
        <div className="text-terminal-green font-mono text-xs font-bold tracking-wider">
          ┌─ GSM-ARG ─┐
        </div>
      </div>

      <nav className="flex-1 p-2 flex flex-col gap-0.5 overflow-y-auto">
        {navItems
          .filter((i) => role && i.roles.includes(role))
          .map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 px-3 py-2 rounded text-xs font-mono transition-all duration-150",
                isActive
                  ? "text-terminal-green border-l-2 border-terminal-green bg-terminal-bg pl-2.5"
                  : "text-terminal-muted hover:text-terminal-text hover:bg-terminal-bg"
              )
            }
          >
            {({ isActive }) => (
              <>
                <span className="text-terminal-muted">{isActive ? "▶" : " "}</span>
                <Icon className="w-3 h-3" />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-terminal-border flex items-center gap-2">
        {user && <Avatar name={user.displayName} />}
        <div className="flex-1 min-w-0">
          <div className="text-xs text-terminal-text font-mono truncate">{user?.displayName}</div>
          <div className="text-xs text-terminal-muted font-mono">{role}</div>
        </div>
        <button onClick={handleLogout} className="text-terminal-muted hover:text-terminal-red transition-colors" aria-label="logout">
          <LogOut className="w-3 h-3" />
        </button>
      </div>
    </aside>
  )
}
