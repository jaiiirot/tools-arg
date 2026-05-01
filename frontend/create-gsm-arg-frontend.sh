#!/usr/bin/env bash
set -e

# ── tailwind.config.js ──────────────────────────────────────────────────────
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg:          "var(--terminal-bg)",
          "bg-sec":    "var(--terminal-bg-secondary)",
          border:      "var(--terminal-border)",
          green:       "var(--terminal-green)",
          cyan:        "var(--terminal-cyan)",
          yellow:      "var(--terminal-yellow)",
          red:         "var(--terminal-red)",
          purple:      "var(--terminal-purple)",
          text:        "var(--terminal-text)",
          muted:       "var(--terminal-text-muted)",
          prompt:      "var(--terminal-prompt)",
        },
        tmux: {
          bar:         "var(--tmux-statusbar)",
          active:      "var(--tmux-active-pane)",
          inactive:    "var(--tmux-inactive-pane)",
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "'Fira Code'", "Consolas", "monospace"],
      },
      animation: {
        blink:   "blink 1s step-end infinite",
        pulse2:  "pulse 2s cubic-bezier(.4,0,.6,1) infinite",
        scanline:"scanline 8s linear infinite",
      },
      keyframes: {
        blink: { "0%,100%": { opacity: 1 }, "50%": { opacity: 0 } },
        scanline: {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
    },
  },
  plugins: [],
}
EOF

# ── vite.config.ts ───────────────────────────────────────────────────────────
cat > vite.config.ts << 'EOF'
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor:   ["react","react-dom","react-router-dom"],
          query:    ["@tanstack/react-query"],
          firebase: ["firebase/app","firebase/auth"],
          charts:   ["recharts"],
          motion:   ["framer-motion"],
        },
      },
    },
  },
})
EOF

# ── vercel.json ──────────────────────────────────────────────────────────────
cat > vercel.json << 'EOF'
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
EOF

# ── .env.example ─────────────────────────────────────────────────────────────
cat > .env.example << 'EOF'
VITE_API_URL=https://tu-backend.vercel.app/api
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
VITE_CLOUDINARY_CLOUD_NAME=
VITE_APP_NAME=GSM Tools Platform
EOF

cp .env.example .env

# ── index.html (Google Fonts) ────────────────────────────────────────────────
cat > index.html << 'EOF'
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GSM Tools Platform</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

# ═══════════════════════════════════════════════════════════════════════════════
# ESTRUCTURA DE CARPETAS
# ═══════════════════════════════════════════════════════════════════════════════
mkdir -p src/{assets,data,context,hooks,lib,store,router,types,pages}
mkdir -p src/styles
mkdir -p src/components/{atoms,molecules,organisms,templates,ui}
mkdir -p src/features/{auth,products,courses,orders,marketplace,affiliates,admin,landing}

for f in auth products courses orders marketplace affiliates admin landing; do
  mkdir -p src/features/$f/{hooks,stores,queries,types,components}
done

mkdir -p src/pages/{auth,dashboard,products,courses,marketplace,affiliates,admin}

# ── STYLES ───────────────────────────────────────────────────────────────────
cat > src/styles/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap');

:root {
  --terminal-bg:           #0d1117;
  --terminal-bg-secondary: #161b22;
  --terminal-border:       #30363d;
  --terminal-green:        #39d353;
  --terminal-cyan:         #56d8f5;
  --terminal-yellow:       #d8b151;
  --terminal-red:          #f85149;
  --terminal-purple:       #bc8cff;
  --terminal-text:         #c9d1d9;
  --terminal-text-muted:   #8b949e;
  --terminal-prompt:       #39d353;
  --tmux-statusbar:        #1c2128;
  --tmux-active-pane:      #0d1117;
  --tmux-inactive-pane:    #161b22;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background-color: var(--terminal-bg);
  color: var(--terminal-text);
  font-family: 'JetBrains Mono', monospace;
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar       { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: var(--terminal-bg-secondary); }
::-webkit-scrollbar-thumb { background: var(--terminal-border); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--terminal-green); }

::selection { background: var(--terminal-green); color: var(--terminal-bg); }

@keyframes blink    { 0%,100% { opacity:1 } 50% { opacity:0 } }
@keyframes scanline { 0% { transform:translateY(-100%) } 100% { transform:translateY(100vh) } }
@keyframes glitch   {
  0%,100% { transform:translate(0) }
  20%     { transform:translate(-2px,2px) }
  40%     { transform:translate(2px,-2px) }
  60%     { transform:translate(-1px,1px) }
  80%     { transform:translate(1px,-1px) }
}

.cursor-blink::after {
  content: '█';
  color: var(--terminal-green);
  animation: blink 1s step-end infinite;
}

.terminal-glow  { box-shadow: 0 0 10px rgba(57,211,83,.2), 0 0 20px rgba(57,211,83,.1); }
.cyan-glow      { box-shadow: 0 0 10px rgba(86,216,245,.2); }
.scanline-effect::after {
  content:'';
  position:fixed; top:0; left:0;
  width:100%; height:2px;
  background:rgba(57,211,83,.05);
  animation:scanline 8s linear infinite;
  pointer-events:none; z-index:9999;
}
EOF

# ── TIPOS GLOBALES ────────────────────────────────────────────────────────────
cat > src/types/api.ts << 'EOF'
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export type UserRole = "root" | "admin" | "affiliate" | "user"

export interface User {
  id: string
  email: string
  displayName: string
  role: UserRole
  balance: number
  affiliateCode?: string
  createdAt: string
  suspended: boolean
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  estimatedTime: string
  category: string
  type: "unlock" | "repair" | "flash" | "other"
  active: boolean
  createdAt: string
}

export interface Course {
  id: string
  title: string
  description: string
  price: number
  level: "beginner" | "intermediate" | "advanced"
  category: string
  instructor: string
  thumbnail: string
  lessons: Lesson[]
  enrolled: boolean
  rating: number
  reviewCount: number
  createdAt: string
}

export interface Lesson {
  id: string
  title: string
  videoUrl: string
  duration: number
  order: number
  completed?: boolean
}

export interface Order {
  id: string
  userId: string
  productId: string
  product: Product
  status: "pending" | "processing" | "completed" | "failed" | "refunded"
  serviceData: Record<string, string>
  result?: string
  createdAt: string
  updatedAt: string
}

export interface MarketplaceItem {
  id: string
  sellerId: string
  seller: Pick<User, "id" | "displayName">
  title: string
  description: string
  price: number
  category: string
  condition: "new" | "used" | "refurbished"
  images: string[]
  location: string
  active: boolean
  createdAt: string
}

export interface Notification {
  id: string
  userId: string
  type: "order" | "payment" | "system" | "affiliate"
  title: string
  message: string
  read: boolean
  createdAt: string
}

export interface AffiliateCode {
  id: string
  code: string
  ownerId: string
  usageCount: number
  commission: number
  active: boolean
  createdAt: string
}
EOF

# ── LIB ──────────────────────────────────────────────────────────────────────
cat > src/lib/firebase.ts << 'EOF'
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey:     import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:  import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId:      import.meta.env.VITE_FIREBASE_APP_ID,
}

const app  = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export default app
EOF

cat > src/lib/axios.ts << 'EOF'
import axios from "axios"
import { auth } from "./firebase"

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser
  if (user) {
    const token = await user.getIdToken()
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error.response?.status
    if (status === 401) {
      await auth.signOut()
      window.location.href = "/login"
    } else if (status === 403) {
      window.location.href = "/forbidden"
    } else if (status >= 500) {
      console.error("Server error:", error.response?.data?.message)
    }
    return Promise.reject(error)
  }
)

export default api
EOF

cat > src/lib/queryClient.ts << 'EOF'
import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:           2 * 60 * 1000,
      gcTime:              10 * 60 * 1000,
      retry:               2,
      refetchOnWindowFocus: false,
    },
  },
})

// Query key factories
export const queryKeys = {
  products:      { all: ["products"] as const, list: (f?: object) => ["products","list",f] as const, detail: (id:string) => ["products",id] as const },
  courses:       { all: ["courses"] as const,  list: (f?: object) => ["courses","list",f] as const,  detail: (id:string) => ["courses",id] as const  },
  marketplace:   { all: ["marketplace"] as const, list: (f?: object) => ["marketplace","list",f] as const, detail: (id:string) => ["marketplace",id] as const },
  orders:        { all: ["orders"] as const,   mine: () => ["orders","mine"] as const, detail: (id:string) => ["orders",id] as const },
  profile:       { me: () => ["profile","me"] as const },
  notifications: { mine: () => ["notifications","mine"] as const },
  admin:         { users: (f?: object) => ["admin","users",f] as const, orders: (f?: object) => ["admin","orders",f] as const },
  affiliates:    { codes: () => ["affiliates","codes"] as const, commissions: () => ["affiliates","commissions"] as const },
}

// staleTime overrides por feature (usar en useQuery individualmente)
export const staleTimes = {
  products:      5  * 60 * 1000,
  courses:       10 * 60 * 1000,
  marketplace:   2  * 60 * 1000,
  orders:        30 * 1000,
  profile:       1  * 60 * 1000,
  adminLists:    0,
}
EOF

cat > src/lib/utils.ts << 'EOF'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency }).format(amount)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("es-AR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(date))
}

export function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}
EOF

# ── STORES ───────────────────────────────────────────────────────────────────
cat > src/store/authStore.ts << 'EOF'
import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, UserRole } from "@/types/api"

interface AuthState {
  user:            User | null
  token:           string | null
  role:            UserRole | null
  isLoading:       boolean
  isAuthenticated: boolean
  setUser:  (user: User) => void
  setToken: (token: string) => void
  setLoading: (v: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user:            null,
      token:           null,
      role:            null,
      isLoading:       true,
      isAuthenticated: false,
      setUser:    (user)  => set({ user, role: user.role, isAuthenticated: true }),
      setToken:   (token) => set({ token }),
      setLoading: (v)     => set({ isLoading: v }),
      logout: () => set({ user: null, token: null, role: null, isAuthenticated: false }),
    }),
    { name: "gsm-auth", partialize: (s) => ({ token: s.token }) }
  )
)
EOF

cat > src/store/uiStore.ts << 'EOF'
import { create } from "zustand"

type Theme = "dark" | "matrix" | "amber"

interface UIState {
  sidebarOpen:       boolean
  sidebarCollapsed:  boolean
  activePane:        number
  terminalMode:      boolean
  theme:             Theme
  toggleSidebar:     () => void
  collapseSidebar:   (v: boolean) => void
  setTheme:          (t: Theme) => void
  setTerminalMode:   (v: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen:      true,
  sidebarCollapsed: false,
  activePane:       1,
  terminalMode:     false,
  theme:            "dark",
  toggleSidebar:   () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  collapseSidebar: (v) => set({ sidebarCollapsed: v }),
  setTheme:        (t) => set({ theme: t }),
  setTerminalMode: (v) => set({ terminalMode: v }),
}))
EOF

cat > src/store/notificationStore.ts << 'EOF'
import { create } from "zustand"
import type { Notification } from "@/types/api"

interface NotificationState {
  notifications: Notification[]
  unreadCount:   number
  setNotifications: (n: Notification[]) => void
  markRead:         (id: string) => void
  markAllRead:      () => void
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount:   0,
  setNotifications: (n) =>
    set({ notifications: n, unreadCount: n.filter((x) => !x.read).length }),
  markRead: (id) =>
    set((s) => {
      const notifications = s.notifications.map((n) => n.id === id ? { ...n, read: true } : n)
      return { notifications, unreadCount: notifications.filter((x) => !x.read).length }
    }),
  markAllRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
}))
EOF

# ── HOOKS GLOBALES ────────────────────────────────────────────────────────────
cat > src/hooks/useDebounce.ts << 'EOF'
import { useState, useEffect } from "react"
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}
EOF

cat > src/hooks/usePageTitle.ts << 'EOF'
import { useEffect } from "react"
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} — ${import.meta.env.VITE_APP_NAME ?? "GSM Tools"}`
  }, [title])
}
EOF

cat > src/hooks/useLocalStorage.ts << 'EOF'
import { useState } from "react"
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try { return JSON.parse(localStorage.getItem(key) ?? "") } catch { return initial }
  })
  const set = (v: T) => { setValue(v); localStorage.setItem(key, JSON.stringify(v)) }
  return [value, set] as const
}
EOF

cat > src/hooks/useScrollToTop.ts << 'EOF'
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
export function useScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
}
EOF

# ── ATOMS ─────────────────────────────────────────────────────────────────────
cat > src/components/atoms/TerminalText.tsx << 'EOF'
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
EOF

cat > src/components/atoms/Button.tsx << 'EOF'
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

type Variant = "primary" | "danger" | "ghost" | "command" | "cyan"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  Variant
  loading?:  boolean
  children:  React.ReactNode
}

const variants: Record<Variant, string> = {
  primary: "bg-transparent border border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-bg active:scale-95 terminal-glow",
  danger:  "bg-transparent border border-terminal-red   text-terminal-red   hover:bg-terminal-red   hover:text-terminal-bg active:scale-95",
  ghost:   "bg-transparent border border-terminal-border text-terminal-muted hover:border-terminal-text hover:text-terminal-text",
  command: "bg-terminal-bg-sec border border-terminal-border text-terminal-cyan hover:border-terminal-cyan hover:terminal-glow",
  cyan:    "bg-transparent border border-terminal-cyan text-terminal-cyan hover:bg-terminal-cyan hover:text-terminal-bg active:scale-95 cyan-glow",
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "primary", loading, children, className, disabled, ...rest }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "font-mono text-sm px-4 py-2 rounded transition-all duration-150 flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
      {...rest}
    >
      {loading && <span className="animate-spin text-xs">◌</span>}
      {children}
    </button>
  )
)
Button.displayName = "Button"
EOF

cat > src/components/atoms/Input.tsx << 'EOF'
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:  string
  error?:  string
  prefix?: string
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, prefix, className, ...rest }, ref) => (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-xs text-terminal-muted font-mono uppercase tracking-wider">{label}</label>}
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-terminal-green font-mono text-sm select-none">{prefix}</span>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-terminal-bg-sec border border-terminal-border text-terminal-text font-mono text-sm",
            "rounded px-3 py-2 outline-none transition-all duration-150",
            "placeholder:text-terminal-muted",
            "focus:border-terminal-green focus:terminal-glow",
            error && "border-terminal-red focus:border-terminal-red",
            prefix && "pl-8",
            className
          )}
          {...rest}
        />
      </div>
      {error && <span className="text-xs text-terminal-red font-mono">! {error}</span>}
    </div>
  )
)
Input.displayName = "Input"
EOF

cat > src/components/atoms/Badge.tsx << 'EOF'
import { cn } from "@/lib/utils"

type Status = "active" | "pending" | "failed" | "processing" | "refunded" | "default"

const styles: Record<Status, string> = {
  active:     "border-terminal-green text-terminal-green",
  pending:    "border-terminal-yellow text-terminal-yellow animate-pulse2",
  failed:     "border-terminal-red   text-terminal-red",
  processing: "border-terminal-cyan  text-terminal-cyan",
  refunded:   "border-terminal-purple text-terminal-purple",
  default:    "border-terminal-border text-terminal-muted",
}

interface Props { status?: Status; label: string; className?: string }

export function Badge({ status = "default", label, className }: Props) {
  return (
    <span className={cn("font-mono text-xs border rounded px-2 py-0.5 uppercase tracking-wider", styles[status], className)}>
      {status === "processing" && <span className="animate-spin inline-block mr-1">◌</span>}
      {label}
    </span>
  )
}
EOF

cat > src/components/atoms/Spinner.tsx << 'EOF'
export function Spinner({ size = "md" }: { size?: "sm"|"md"|"lg" }) {
  const cls = { sm:"text-sm", md:"text-xl", lg:"text-4xl" }[size]
  return (
    <div className="flex flex-col items-center gap-2 text-terminal-green font-mono">
      <span className={`animate-spin ${cls}`}>◌</span>
      {size !== "sm" && <span className="text-xs text-terminal-muted animate-pulse">loading...</span>}
    </div>
  )
}
EOF

cat > src/components/atoms/Avatar.tsx << 'EOF'
import { cn } from "@/lib/utils"

interface Props { name: string; className?: string }

export function Avatar({ name, className }: Props) {
  const initials = name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
  return (
    <div className={cn("w-8 h-8 rounded border border-terminal-green bg-terminal-bg-sec flex items-center justify-center text-terminal-green font-mono text-xs font-bold", className)}>
      {initials}
    </div>
  )
}
EOF

# ── MOLECULES ────────────────────────────────────────────────────────────────
cat > src/components/molecules/ServiceCard.tsx << 'EOF'
import { memo } from "react"
import { Badge } from "@/components/atoms/Badge"
import { Button } from "@/components/atoms/Button"
import { formatCurrency } from "@/lib/utils"
import type { Product } from "@/types/api"

interface Props { product: Product; onBuy?: (p: Product) => void; onHover?: (id: string) => void }

export const ServiceCard = memo(({ product, onBuy, onHover }: Props) => (
  <div
    className="border border-terminal-border bg-terminal-bg-sec rounded p-4 flex flex-col gap-3 hover:border-terminal-green transition-all duration-200 hover:terminal-glow cursor-default"
    onMouseEnter={() => onHover?.(product.id)}
  >
    <div className="flex items-start justify-between gap-2">
      <span className="font-mono text-sm text-terminal-text font-medium leading-snug">{product.name}</span>
      <Badge status={product.active ? "active" : "failed"} label={product.active ? "ON" : "OFF"} />
    </div>
    <p className="text-xs text-terminal-muted font-mono leading-relaxed line-clamp-2">{product.description}</p>
    <div className="flex items-center justify-between mt-auto pt-2 border-t border-terminal-border">
      <div className="flex flex-col">
        <span className="text-terminal-green font-mono text-lg font-bold">{formatCurrency(product.price)}</span>
        <span className="text-terminal-muted text-xs font-mono">~ {product.estimatedTime}</span>
      </div>
      <Button variant="primary" className="text-xs px-3 py-1.5" onClick={() => onBuy?.(product)} disabled={!product.active}>
        $ buy
      </Button>
    </div>
  </div>
))
ServiceCard.displayName = "ServiceCard"
EOF

cat > src/components/molecules/CourseCard.tsx << 'EOF'
import { memo } from "react"
import { Badge } from "@/components/atoms/Badge"
import { Button } from "@/components/atoms/Button"
import { formatCurrency } from "@/lib/utils"
import type { Course } from "@/types/api"

interface Props { course: Course; onOpen?: (c: Course) => void; onHover?: (id: string) => void }

export const CourseCard = memo(({ course, onOpen, onHover }: Props) => {
  const levelMap: Record<string, string> = { beginner:"active", intermediate:"pending", advanced:"failed" }
  return (
    <div
      className="border border-terminal-border bg-terminal-bg-sec rounded p-4 flex flex-col gap-3 hover:border-terminal-cyan transition-all duration-200 hover:cyan-glow"
      onMouseEnter={() => onHover?.(course.id)}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-sm text-terminal-text font-medium">{course.title}</span>
        <Badge status={levelMap[course.level] as any} label={course.level} />
      </div>
      <p className="text-xs text-terminal-muted font-mono line-clamp-2">{course.description}</p>
      <div className="text-xs text-terminal-muted font-mono">by {course.instructor}</div>
      <div className="flex items-center gap-2 text-xs font-mono">
        <span className="text-terminal-yellow">★ {course.rating.toFixed(1)}</span>
        <span className="text-terminal-border">|</span>
        <span className="text-terminal-muted">{course.lessons.length} lecciones</span>
      </div>
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-terminal-border">
        <span className="text-terminal-cyan font-mono text-lg font-bold">
          {course.price === 0 ? "FREE" : formatCurrency(course.price)}
        </span>
        <Button variant="cyan" className="text-xs px-3 py-1.5" onClick={() => onOpen?.(course)}>
          {course.enrolled ? "> continuar" : "> inscribirse"}
        </Button>
      </div>
    </div>
  )
})
CourseCard.displayName = "CourseCard"
EOF

cat > src/components/molecules/SearchBar.tsx << 'EOF'
import { Search } from "lucide-react"
import { Input } from "@/components/atoms/Input"

interface Props { value: string; onChange: (v: string) => void; placeholder?: string }

export function SearchBar({ value, onChange, placeholder = "buscar..." }: Props) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-terminal-muted" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-8 text-xs"
      />
    </div>
  )
}
EOF

# ── ORGANISMS ────────────────────────────────────────────────────────────────
cat > src/components/organisms/Sidebar.tsx << 'EOF'
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
EOF

cat > src/components/organisms/Header.tsx << 'EOF'
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
EOF

# ── TEMPLATES ────────────────────────────────────────────────────────────────
cat > src/components/templates/TmuxLayout.tsx << 'EOF'
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
EOF

cat > src/components/templates/AuthLayout.tsx << 'EOF'
interface Props { children: React.ReactNode }

export function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-terminal-bg flex items-center justify-center p-4 scanline-effect">
      <div className="w-full max-w-lg">{children}</div>
    </div>
  )
}
EOF

# ── ROUTER ────────────────────────────────────────────────────────────────────
cat > src/router/ProtectedRoute.tsx << 'EOF'
import { Navigate } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { Spinner } from "@/components/atoms/Spinner"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore()
  if (isLoading) return <div className="h-screen flex items-center justify-center"><Spinner size="lg" /></div>
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}
EOF

cat > src/router/RoleRoute.tsx << 'EOF'
import { Navigate } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import type { UserRole } from "@/types/api"

export function RoleRoute({ children, roles }: { children: React.ReactNode; roles: UserRole[] }) {
  const role = useAuthStore((s) => s.role)
  if (!role || !roles.includes(role)) return <Navigate to="/forbidden" replace />
  return <>{children}</>
}
EOF

cat > src/router/index.tsx << 'EOF'
import { lazy, Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedRoute"
import { RoleRoute }      from "./RoleRoute"
import { Spinner }        from "@/components/atoms/Spinner"

const Landing    = lazy(() => import("@/pages/Landing"))
const Login      = lazy(() => import("@/pages/auth/Login"))
const Register   = lazy(() => import("@/pages/auth/Register"))
const Dashboard  = lazy(() => import("@/pages/dashboard/Dashboard"))
const Products   = lazy(() => import("@/pages/products/Products"))
const Courses    = lazy(() => import("@/pages/courses/Courses"))
const Marketplace = lazy(() => import("@/pages/marketplace/Marketplace"))
const Affiliates = lazy(() => import("@/pages/affiliates/Affiliates"))
const Admin      = lazy(() => import("@/pages/admin/Admin"))
const Forbidden  = lazy(() => import("@/pages/Forbidden"))
const NotFound   = lazy(() => import("@/pages/NotFound"))

const fallback = <div className="h-screen flex items-center justify-center"><Spinner size="lg" /></div>

const router = createBrowserRouter([
  { path: "/",           element: <Suspense fallback={fallback}><Landing /></Suspense> },
  { path: "/login",      element: <Suspense fallback={fallback}><Login /></Suspense> },
  { path: "/register",   element: <Suspense fallback={fallback}><Register /></Suspense> },
  { path: "/forbidden",  element: <Suspense fallback={fallback}><Forbidden /></Suspense> },
  {
    path: "/dashboard",
    element: <ProtectedRoute><Suspense fallback={fallback}><Dashboard /></Suspense></ProtectedRoute>,
  },
  {
    path: "/products",
    element: <ProtectedRoute><Suspense fallback={fallback}><Products /></Suspense></ProtectedRoute>,
  },
  {
    path: "/courses",
    element: <ProtectedRoute><Suspense fallback={fallback}><Courses /></Suspense></ProtectedRoute>,
  },
  {
    path: "/marketplace",
    element: <ProtectedRoute><Suspense fallback={fallback}><Marketplace /></Suspense></ProtectedRoute>,
  },
  {
    path: "/affiliates",
    element: <ProtectedRoute><RoleRoute roles={["root","admin","affiliate"]}><Suspense fallback={fallback}><Affiliates /></Suspense></RoleRoute></ProtectedRoute>,
  },
  {
    path: "/admin",
    element: <ProtectedRoute><RoleRoute roles={["root","admin"]}><Suspense fallback={fallback}><Admin /></Suspense></RoleRoute></ProtectedRoute>,
  },
  { path: "*", element: <Suspense fallback={fallback}><NotFound /></Suspense> },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
EOF

# ── FEATURES: AUTH ────────────────────────────────────────────────────────────
cat > src/features/auth/types/index.ts << 'EOF'
export interface LoginForm    { email: string; password: string }
export interface RegisterForm { email: string; password: string; displayName: string; affiliateCode?: string }
EOF

cat > src/features/auth/queries/useLoginMutation.ts << 'EOF'
import { useMutation } from "@tanstack/react-query"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import api from "@/lib/axios"
import { useAuthStore } from "@/store/authStore"
import type { LoginForm } from "../types"

export function useLoginMutation() {
  const { setUser, setToken } = useAuthStore()
  return useMutation({
    mutationFn: async ({ email, password }: LoginForm) => {
      const cred  = await signInWithEmailAndPassword(auth, email, password)
      const token = await cred.user.getIdToken()
      // api/auth/me
      const { data } = await api.get("/auth/me")
      return { user: data.data, token }
    },
    onSuccess: ({ user, token }) => { setUser(user); setToken(token) },
  })
}
EOF

cat > src/features/auth/queries/useRegisterMutation.ts << 'EOF'
import { useMutation } from "@tanstack/react-query"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "@/lib/firebase"
import api from "@/lib/axios"
import { useAuthStore } from "@/store/authStore"
import type { RegisterForm } from "../types"

export function useRegisterMutation() {
  const { setUser, setToken } = useAuthStore()
  return useMutation({
    mutationFn: async ({ email, password, displayName, affiliateCode }: RegisterForm) => {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(cred.user, { displayName })
      const token = await cred.user.getIdToken()
      // api/auth/register
      const { data } = await api.post("/auth/register", { displayName, affiliateCode })
      return { user: data.data, token }
    },
    onSuccess: ({ user, token }) => { setUser(user); setToken(token) },
  })
}
EOF

# ── FEATURES: PRODUCTS ────────────────────────────────────────────────────────
cat > src/features/products/queries/useProducts.ts << 'EOF'
import { useQuery, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/axios"
import { queryKeys, staleTimes } from "@/lib/queryClient"
import type { PaginatedResponse, Product } from "@/types/api"

interface Filters { search?: string; category?: string; page?: number }

export function useProducts(filters: Filters = {}) {
  return useQuery<PaginatedResponse<Product>>({
    queryKey: queryKeys.products.list(filters),
    queryFn: async () => {
      // api/products
      const { data } = await api.get("/products", { params: filters })
      return data.data
    },
    staleTime: staleTimes.products,
  })
}

export function usePrefetchProduct() {
  const qc = useQueryClient()
  return (id: string) =>
    qc.prefetchQuery({
      queryKey: queryKeys.products.detail(id),
      queryFn: async () => {
        // api/products/:id
        const { data } = await api.get(`/products/${id}`)
        return data.data
      },
      staleTime: staleTimes.products,
    })
}
EOF

# ── FEATURES: COURSES ─────────────────────────────────────────────────────────
cat > src/features/courses/queries/useCourses.ts << 'EOF'
import { useQuery } from "@tanstack/react-query"
import api from "@/lib/axios"
import { queryKeys, staleTimes } from "@/lib/queryClient"
import type { PaginatedResponse, Course } from "@/types/api"

interface Filters { search?: string; level?: string; category?: string; page?: number }

export function useCourses(filters: Filters = {}) {
  return useQuery<PaginatedResponse<Course>>({
    queryKey: queryKeys.courses.list(filters),
    queryFn: async () => {
      // api/courses
      const { data } = await api.get("/courses", { params: filters })
      return data.data
    },
    staleTime: staleTimes.courses,
  })
}
EOF

# ── FEATURES: ORDERS ──────────────────────────────────────────────────────────
cat > src/features/orders/queries/useOrders.ts << 'EOF'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/axios"
import { queryKeys, staleTimes } from "@/lib/queryClient"
import type { Order } from "@/types/api"

export function useMyOrders() {
  return useQuery<Order[]>({
    queryKey: queryKeys.orders.mine(),
    queryFn: async () => {
      // api/orders/mine
      const { data } = await api.get("/orders/mine")
      return data.data
    },
    staleTime: staleTimes.orders,
  })
}

export function useCreateOrder() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (body: { productId: string; serviceData: Record<string,string> }) => {
      // api/orders
      const { data } = await api.post("/orders", body)
      return data.data as Order
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: queryKeys.orders.mine() }) },
  })
}
EOF

# ── FEATURES: NOTIFICATIONS ───────────────────────────────────────────────────
cat > src/features/notifications/queries/useNotifications.ts << 'EOF'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/axios"
import { queryKeys } from "@/lib/queryClient"
import { useNotificationStore } from "@/store/notificationStore"
import type { Notification } from "@/types/api"

export function useNotifications() {
  const setNotifications = useNotificationStore((s) => s.setNotifications)
  return useQuery<Notification[]>({
    queryKey: queryKeys.notifications.mine(),
    queryFn: async () => {
      // api/notifications
      const { data } = await api.get("/notifications")
      setNotifications(data.data)
      return data.data
    },
    refetchInterval: 30_000,
  })
}

export function useMarkRead() {
  const { markRead }    = useNotificationStore()
  const qc              = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      // api/notifications/:id/read
      await api.patch(`/notifications/${id}/read`)
      return id
    },
    onMutate: (id) => markRead(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.notifications.mine() }),
  })
}
EOF

# ── FEATURES: MARKETPLACE ─────────────────────────────────────────────────────
cat > src/features/marketplace/queries/useMarketplace.ts << 'EOF'
import { useQuery } from "@tanstack/react-query"
import api from "@/lib/axios"
import { queryKeys, staleTimes } from "@/lib/queryClient"
import type { PaginatedResponse, MarketplaceItem } from "@/types/api"

interface Filters { search?:string; category?:string; condition?:string; page?:number }

export function useMarketplace(filters: Filters = {}) {
  return useQuery<PaginatedResponse<MarketplaceItem>>({
    queryKey: queryKeys.marketplace.list(filters),
    queryFn: async () => {
      // api/marketplace
      const { data } = await api.get("/marketplace", { params: filters })
      return data.data
    },
    staleTime: staleTimes.marketplace,
  })
}
EOF

# ── FEATURES: AFFILIATES ──────────────────────────────────────────────────────
cat > src/features/affiliates/queries/useAffiliates.ts << 'EOF'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/axios"
import { queryKeys } from "@/lib/queryClient"
import type { AffiliateCode } from "@/types/api"

export function useAffiliateCodes() {
  return useQuery<AffiliateCode[]>({
    queryKey: queryKeys.affiliates.codes(),
    queryFn: async () => {
      // api/affiliates/codes
      const { data } = await api.get("/affiliates/codes")
      return data.data
    },
  })
}

export function useCreateAffiliateCode() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      // api/affiliates/codes
      const { data } = await api.post("/affiliates/codes")
      return data.data as AffiliateCode
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.affiliates.codes() }),
  })
}
EOF

# ── FEATURES: ADMIN ───────────────────────────────────────────────────────────
cat > src/features/admin/queries/useAdminUsers.ts << 'EOF'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/axios"
import { queryKeys, staleTimes } from "@/lib/queryClient"
import type { PaginatedResponse, User, UserRole } from "@/types/api"

export function useAdminUsers(filters?: object) {
  return useQuery<PaginatedResponse<User>>({
    queryKey: queryKeys.admin.users(filters),
    queryFn: async () => {
      // api/admin/users
      const { data } = await api.get("/admin/users", { params: filters })
      return data.data
    },
    staleTime: staleTimes.adminLists,
  })
}

export function useUpdateUserRole() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, role }: { id: string; role: UserRole }) => {
      // api/admin/users/:id/role
      const { data } = await api.patch(`/admin/users/${id}/role`, { role })
      return data.data
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin","users"] }),
  })
}
EOF

# ── PÁGINAS ────────────────────────────────────────────────────────────────────
cat > src/pages/Landing.tsx << 'EOF'
import { Link } from "react-router-dom"
import { TerminalText } from "@/components/atoms/TerminalText"
import { Button } from "@/components/atoms/Button"
import { usePageTitle } from "@/hooks/usePageTitle"

export default function Landing() {
  usePageTitle("Inicio")
  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text font-mono scanline-effect">
      {/* Header */}
      <header className="border-b border-terminal-border h-12 flex items-center justify-between px-6">
        <span className="text-terminal-green font-bold tracking-widest">GSM-ARG</span>
        <nav className="flex gap-4 text-xs text-terminal-muted">
          <a href="#servicios" className="hover:text-terminal-green transition-colors">servicios</a>
          <a href="#precios"   className="hover:text-terminal-green transition-colors">precios</a>
          <a href="#nosotros"  className="hover:text-terminal-green transition-colors">nosotros</a>
          <Link to="/login"    className="hover:text-terminal-green transition-colors">login</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-[80vh] gap-8 px-4 text-center">
        <div className="text-terminal-muted text-xs mb-2">$ ./gsm-tools --init</div>
        <h1 className="text-4xl md:text-6xl font-bold text-terminal-green leading-tight">
          GSM Tools<br />
          <span className="text-terminal-cyan">Platform</span>
        </h1>
        <div className="max-w-lg">
          <TerminalText
            text="Servicios profesionales de unlock, repair y flash para técnicos y afiliados."
            prefix=">"
            speed={25}
            className="text-sm text-terminal-muted"
          />
        </div>
        <div className="flex gap-4 mt-4">
          <Link to="/register"><Button variant="primary">$ registrarse</Button></Link>
          <Link to="/login"><Button variant="ghost">$ login</Button></Link>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-20 px-6 border-t border-terminal-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-terminal-green text-xs mb-8">$ ls ./servicios</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon:"🔓", title:"Unlock GSM",    desc:"Liberación de equipos de todas las marcas y operadores." },
              { icon:"🛠️", title:"Repair Tools",  desc:"Soluciones de software para reparación de IMEI y baseband." },
              { icon:"📱", title:"Flash Service", desc:"Flasheo y actualización de firmware para equipos bloqueados." },
            ].map((s) => (
              <div key={s.title} className="border border-terminal-border rounded p-5 hover:border-terminal-green transition-all hover:terminal-glow">
                <div className="text-2xl mb-3">{s.icon}</div>
                <div className="text-terminal-text font-bold text-sm mb-2">{s.title}</div>
                <div className="text-terminal-muted text-xs">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-terminal-border py-6 px-6 text-center text-xs text-terminal-muted">
        © 2025 GSM-ARG — Todos los derechos reservados
      </footer>
    </div>
  )
}
EOF

cat > src/pages/auth/Login.tsx << 'EOF'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
import { AuthLayout } from "@/components/templates/AuthLayout"
import { TerminalText } from "@/components/atoms/TerminalText"
import { Input }  from "@/components/atoms/Input"
import { Button } from "@/components/atoms/Button"
import { useLoginMutation } from "@/features/auth/queries/useLoginMutation"
import { usePageTitle } from "@/hooks/usePageTitle"

const schema = z.object({
  email:    z.string().email("email inválido"),
  password: z.string().min(6, "mínimo 6 caracteres"),
})
type FormData = z.infer<typeof schema>

const COMMANDS: Record<string, string> = {
  help:   "> comandos: login, help, whoami, clear",
  whoami: "> usuario no autenticado",
  clear:  "__clear__",
}

export default function Login() {
  usePageTitle("Login")
  const navigate      = useNavigate()
  const loginMutation = useLoginMutation()
  const [log, setLog] = useState<string[]>(["> sistema listo. escribe 'help' para ver comandos."])
  const [cmd, setCmd] = useState("")

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter" || !cmd.trim()) return
    const out = COMMANDS[cmd.trim().toLowerCase()]
    if (out === "__clear__") { setLog([]); setCmd(""); return }
    setLog((p) => [...p, `$ ${cmd}`, out ?? `> comando '${cmd}' no encontrado`])
    setCmd("")
  }

  const onSubmit = async (data: FormData) => {
    setLog((p) => [...p, "> Authenticating..."])
    try {
      await loginMutation.mutateAsync(data)
      setLog((p) => [...p, "> Access granted ✓"])
      setTimeout(() => navigate("/dashboard"), 600)
    } catch {
      setLog((p) => [...p, "> ERROR: credenciales inválidas"])
    }
  }

  return (
    <AuthLayout>
      <div className="border border-terminal-border rounded bg-terminal-bg-sec overflow-hidden">
        {/* terminal title bar */}
        <div className="h-7 bg-tmux-bar border-b border-terminal-border flex items-center px-3 gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-terminal-red"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-terminal-yellow"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-terminal-green"></span>
          <span className="text-[10px] font-mono text-terminal-muted ml-2">gsm-arg — login</span>
        </div>

        <div className="p-6 flex flex-col gap-5">
          <TerminalText text="GSM-ARG Authentication System v2.0" prefix="$" speed={30} />

          {/* console log */}
          <div className="bg-terminal-bg border border-terminal-border rounded p-3 h-28 overflow-y-auto text-xs font-mono text-terminal-muted flex flex-col gap-1">
            {log.map((l, i) => (
              <span key={i} className={l.startsWith(">") ? "text-terminal-cyan" : "text-terminal-green"}>{l}</span>
            ))}
          </div>

          {/* command input */}
          <div className="flex items-center gap-2">
            <span className="text-terminal-green text-xs font-mono">$</span>
            <input
              value={cmd}
              onChange={(e) => setCmd(e.target.value)}
              onKeyDown={handleCommand}
              placeholder="escribe un comando..."
              className="flex-1 bg-transparent border-none outline-none text-xs font-mono text-terminal-text placeholder:text-terminal-border"
            />
          </div>

          <div className="border-t border-terminal-border pt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <Input label="email" prefix="$" placeholder="user@example.com" type="email" error={errors.email?.message} {...register("email")} />
              <Input label="password" prefix="$" placeholder="••••••••" type="password" error={errors.password?.message} {...register("password")} />
              <Button type="submit" variant="primary" loading={loginMutation.isPending} className="w-full justify-center">
                $ login
              </Button>
            </form>
            <p className="text-xs text-terminal-muted font-mono mt-4 text-center">
              sin cuenta?{" "}
              <Link to="/register" className="text-terminal-cyan hover:underline">$ register</Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
EOF

cat > src/pages/auth/Register.tsx << 'EOF'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
import { AuthLayout }        from "@/components/templates/AuthLayout"
import { Input }   from "@/components/atoms/Input"
import { Button }  from "@/components/atoms/Button"
import { useRegisterMutation } from "@/features/auth/queries/useRegisterMutation"
import { usePageTitle } from "@/hooks/usePageTitle"

const schema = z.object({
  displayName:   z.string().min(2, "mínimo 2 caracteres"),
  email:         z.string().email("email inválido"),
  password:      z.string().min(6, "mínimo 6 caracteres"),
  affiliateCode: z.string().optional(),
})
type FormData = z.infer<typeof schema>

export default function Register() {
  usePageTitle("Registro")
  const navigate  = useNavigate()
  const mutation  = useRegisterMutation()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    await mutation.mutateAsync(data)
    navigate("/dashboard")
  }

  return (
    <AuthLayout>
      <div className="border border-terminal-border rounded bg-terminal-bg-sec overflow-hidden">
        <div className="h-7 bg-tmux-bar border-b border-terminal-border flex items-center px-3 gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-terminal-red"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-terminal-yellow"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-terminal-green"></span>
          <span className="text-[10px] font-mono text-terminal-muted ml-2">gsm-arg — register</span>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div className="text-terminal-green font-mono text-sm">$ ./register --new-user</div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input label="nombre" prefix="$" placeholder="Tu nombre" error={errors.displayName?.message} {...register("displayName")} />
            <Input label="email" prefix="$" type="email" placeholder="user@example.com" error={errors.email?.message} {...register("email")} />
            <Input label="password" prefix="$" type="password" placeholder="••••••••" error={errors.password?.message} {...register("password")} />
            <Input label="código afiliado (opcional)" prefix="$" placeholder="AF-XXXX" {...register("affiliateCode")} />
            {mutation.isError && <p className="text-xs text-terminal-red font-mono">! error al registrar</p>}
            <Button type="submit" variant="primary" loading={mutation.isPending} className="w-full justify-center">$ register</Button>
          </form>
          <p className="text-xs text-terminal-muted font-mono text-center">
            ya tenés cuenta?{" "}
            <Link to="/login" className="text-terminal-cyan hover:underline">$ login</Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
EOF

cat > src/pages/dashboard/Dashboard.tsx << 'EOF'
import { TmuxLayout } from "@/components/templates/TmuxLayout"
import { useAuthStore } from "@/store/authStore"
import { useMyOrders }  from "@/features/orders/queries/useOrders"
import { usePageTitle } from "@/hooks/usePageTitle"
import { Badge }  from "@/components/atoms/Badge"
import { Spinner } from "@/components/atoms/Spinner"
import { formatCurrency } from "@/lib/utils"

export default function Dashboard() {
  usePageTitle("Dashboard")
  const user             = useAuthStore((s) => s.user)
  const { data: orders, isLoading } = useMyOrders()

  const activeOrders = orders?.filter((o) => o.status === "processing" || o.status === "pending").length ?? 0

  return (
    <TmuxLayout title="dashboard">
      <div className="flex flex-col gap-6">
        <div>
          <div className="text-terminal-green font-mono text-xs mb-1">$ whoami</div>
          <h1 className="text-2xl font-bold text-terminal-text font-mono">
            hola, <span className="text-terminal-green">{user?.displayName}</span>
          </h1>
          <span className="text-xs text-terminal-muted font-mono">[{user?.role}]</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label:"balance",        value: formatCurrency(user?.balance ?? 0), color:"text-terminal-green" },
            { label:"órdenes activas",value: String(activeOrders),               color:"text-terminal-yellow" },
            { label:"cursos",         value: "0 en progreso",                    color:"text-terminal-cyan" },
          ].map((s) => (
            <div key={s.label} className="border border-terminal-border bg-terminal-bg-sec rounded p-4">
              <div className="text-xs text-terminal-muted font-mono mb-1">{s.label}</div>
              <div className={`text-xl font-bold font-mono ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div>
          <div className="text-terminal-green font-mono text-xs mb-3">$ cat ./orders/recent</div>
          {isLoading ? <Spinner /> : (
            <div className="border border-terminal-border rounded overflow-hidden">
              <table className="w-full text-xs font-mono">
                <thead className="bg-tmux-bar">
                  <tr>
                    {["ID","Servicio","Estado","Fecha"].map((h) => (
                      <th key={h} className="px-4 py-2 text-left text-terminal-muted">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders?.slice(0, 5).map((o) => (
                    <tr key={o.id} className="border-t border-terminal-border hover:bg-terminal-bg-sec">
                      <td className="px-4 py-2 text-terminal-muted">{o.id.slice(0,8)}…</td>
                      <td className="px-4 py-2 text-terminal-text">{o.product.name}</td>
                      <td className="px-4 py-2"><Badge status={o.status as any} label={o.status} /></td>
                      <td className="px-4 py-2 text-terminal-muted">{new Date(o.createdAt).toLocaleDateString("es-AR")}</td>
                    </tr>
                  ))}
                  {(!orders || orders.length === 0) && (
                    <tr><td colSpan={4} className="px-4 py-6 text-center text-terminal-muted">sin órdenes aún</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </TmuxLayout>
  )
}
EOF

cat > src/pages/products/Products.tsx << 'EOF'
import { useState } from "react"
import { TmuxLayout }    from "@/components/templates/TmuxLayout"
import { ServiceCard }   from "@/components/molecules/ServiceCard"
import { SearchBar }     from "@/components/molecules/SearchBar"
import { Spinner }       from "@/components/atoms/Spinner"
import { useProducts, usePrefetchProduct } from "@/features/products/queries/useProducts"
import { useDebounce }   from "@/hooks/useDebounce"
import { usePageTitle }  from "@/hooks/usePageTitle"
import type { Product }  from "@/types/api"

export default function Products() {
  usePageTitle("Servicios")
  const [search,  setSearch]  = useState("")
  const [category, setCategory] = useState("")
  const debouncedSearch        = useDebounce(search)
  const prefetch               = usePrefetchProduct()

  const { data, isLoading } = useProducts({ search: debouncedSearch, category })

  const handleBuy = (p: Product) => {
    console.log("buy", p)
  }

  return (
    <TmuxLayout title="products">
      <div className="flex flex-col gap-4">
        <div className="text-terminal-green font-mono text-xs">$ ls ./services</div>

        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-48">
            <SearchBar value={search} onChange={setSearch} placeholder="buscar servicio..." />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-terminal-bg-sec border border-terminal-border text-terminal-text font-mono text-xs rounded px-3 py-2 focus:border-terminal-green outline-none"
          >
            <option value="">todas las categorías</option>
            <option value="unlock">unlock</option>
            <option value="repair">repair</option>
            <option value="flash">flash</option>
          </select>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Spinner size="lg" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data?.data.map((p) => (
              <ServiceCard key={p.id} product={p} onBuy={handleBuy} onHover={prefetch} />
            ))}
            {data?.data.length === 0 && (
              <div className="col-span-full text-center py-20 text-terminal-muted font-mono text-sm">
                {'> no se encontraron servicios'}
              </div>
            )}
          </div>
        )}
      </div>
    </TmuxLayout>
  )
}
EOF

cat > src/pages/courses/Courses.tsx << 'EOF'
import { useState }        from "react"
import { TmuxLayout }      from "@/components/templates/TmuxLayout"
import { CourseCard }      from "@/components/molecules/CourseCard"
import { SearchBar }       from "@/components/molecules/SearchBar"
import { Spinner }         from "@/components/atoms/Spinner"
import { useCourses }      from "@/features/courses/queries/useCourses"
import { useDebounce }     from "@/hooks/useDebounce"
import { usePageTitle }    from "@/hooks/usePageTitle"
import type { Course }     from "@/types/api"

export default function Courses() {
  usePageTitle("Cursos")
  const [search, setSearch] = useState("")
  const [level, setLevel]   = useState("")
  const debounced           = useDebounce(search)

  const { data, isLoading } = useCourses({ search: debounced, level })
  const handleOpen = (c: Course) => console.log("open course", c)

  return (
    <TmuxLayout title="courses">
      <div className="flex flex-col gap-4">
        <div className="text-terminal-cyan font-mono text-xs">$ ls ./courses</div>
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-48">
            <SearchBar value={search} onChange={setSearch} placeholder="buscar curso..." />
          </div>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="bg-terminal-bg-sec border border-terminal-border text-terminal-text font-mono text-xs rounded px-3 py-2 focus:border-terminal-cyan outline-none"
          >
            <option value="">todos los niveles</option>
            <option value="beginner">beginner</option>
            <option value="intermediate">intermediate</option>
            <option value="advanced">advanced</option>
          </select>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-20"><Spinner size="lg" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.data.map((c) => <CourseCard key={c.id} course={c} onOpen={handleOpen} />)}
            {data?.data.length === 0 && (
              <div className="col-span-full text-center py-20 text-terminal-muted font-mono text-sm">
                {'> no se encontraron cursos'}
              </div>
            )}
          </div>
        )}
      </div>
    </TmuxLayout>
  )
}
EOF

cat > src/pages/marketplace/Marketplace.tsx << 'EOF'
import { useState }        from "react"
import { TmuxLayout }      from "@/components/templates/TmuxLayout"
import { SearchBar }       from "@/components/molecules/SearchBar"
import { Spinner }         from "@/components/atoms/Spinner"
import { Button }          from "@/components/atoms/Button"
import { Badge }           from "@/components/atoms/Badge"
import { useMarketplace }  from "@/features/marketplace/queries/useMarketplace"
import { useDebounce }     from "@/hooks/useDebounce"
import { usePageTitle }    from "@/hooks/usePageTitle"
import { formatCurrency }  from "@/lib/utils"

export default function Marketplace() {
  usePageTitle("Marketplace")
  const [search, setSearch] = useState("")
  const debounced           = useDebounce(search)
  const { data, isLoading } = useMarketplace({ search: debounced })

  return (
    <TmuxLayout title="marketplace">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="text-terminal-purple font-mono text-xs">$ ls ./marketplace</div>
          <Button variant="command" className="text-xs">+ publicar item</Button>
        </div>
        <SearchBar value={search} onChange={setSearch} placeholder="buscar en marketplace..." />
        {isLoading ? (
          <div className="flex justify-center py-20"><Spinner size="lg" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.data.map((item) => (
              <div key={item.id} className="border border-terminal-border bg-terminal-bg-sec rounded p-4 flex flex-col gap-3 hover:border-terminal-purple transition-all">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-sm text-terminal-text font-medium">{item.title}</span>
                  <Badge status="default" label={item.condition} />
                </div>
                <p className="text-xs text-terminal-muted font-mono line-clamp-2">{item.description}</p>
                <div className="text-xs text-terminal-muted font-mono">📍 {item.location}</div>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-terminal-border">
                  <span className="text-terminal-purple font-mono text-lg font-bold">{formatCurrency(item.price)}</span>
                  <Button variant="ghost" className="text-xs px-3 py-1.5">contactar</Button>
                </div>
              </div>
            ))}
            {data?.data.length === 0 && (
              <div className="col-span-full text-center py-20 text-terminal-muted font-mono text-sm">
                {'> marketplace vacío'}
              </div>
            )}
          </div>
        )}
      </div>
    </TmuxLayout>
  )
}
EOF

cat > src/pages/affiliates/Affiliates.tsx << 'EOF'
import { TmuxLayout }         from "@/components/templates/TmuxLayout"
import { Button }             from "@/components/atoms/Button"
import { Badge }              from "@/components/atoms/Badge"
import { Spinner }            from "@/components/atoms/Spinner"
import { useAffiliateCodes, useCreateAffiliateCode } from "@/features/affiliates/queries/useAffiliates"
import { usePageTitle }       from "@/hooks/usePageTitle"

export default function Affiliates() {
  usePageTitle("Afiliados")
  const { data: codes, isLoading } = useAffiliateCodes()
  const createCode                 = useCreateAffiliateCode()

  return (
    <TmuxLayout title="affiliates">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="text-terminal-yellow font-mono text-xs">$ cat ./affiliate/codes</div>
          <Button variant="primary" className="text-xs" loading={createCode.isPending} onClick={() => createCode.mutate()}>
            + nuevo código
          </Button>
        </div>

        {isLoading ? <Spinner /> : (
          <div className="border border-terminal-border rounded overflow-hidden">
            <table className="w-full text-xs font-mono">
              <thead className="bg-tmux-bar">
                <tr>
                  {["Código","Usos","Comisión","Estado"].map((h) => (
                    <th key={h} className="px-4 py-2 text-left text-terminal-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {codes?.map((c) => (
                  <tr key={c.id} className="border-t border-terminal-border hover:bg-terminal-bg-sec">
                    <td className="px-4 py-2 text-terminal-yellow font-bold">{c.code}</td>
                    <td className="px-4 py-2 text-terminal-text">{c.usageCount}</td>
                    <td className="px-4 py-2 text-terminal-green">{c.commission}%</td>
                    <td className="px-4 py-2"><Badge status={c.active ? "active" : "failed"} label={c.active ? "activo" : "inactivo"} /></td>
                  </tr>
                ))}
                {(!codes || codes.length === 0) && (
                  <tr><td colSpan={4} className="px-4 py-6 text-center text-terminal-muted">sin códigos</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </TmuxLayout>
  )
}
EOF

cat > src/pages/admin/Admin.tsx << 'EOF'
import { TmuxLayout }      from "@/components/templates/TmuxLayout"
import { Spinner }         from "@/components/atoms/Spinner"
import { Badge }           from "@/components/atoms/Badge"
import { useAdminUsers }   from "@/features/admin/queries/useAdminUsers"
import { usePageTitle }    from "@/hooks/usePageTitle"

export default function Admin() {
  usePageTitle("Admin")
  const { data, isLoading } = useAdminUsers()

  return (
    <TmuxLayout title="admin">
      <div className="flex flex-col gap-6">
        <div className="text-terminal-red font-mono text-xs">$ sudo ./admin --panel</div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label:"usuarios totales",  value: data?.total ?? "—", color:"text-terminal-green" },
            { label:"órdenes hoy",       value: "—",                color:"text-terminal-cyan"  },
            { label:"revenue mensual",   value: "—",                color:"text-terminal-yellow"},
          ].map((s) => (
            <div key={s.label} className="border border-terminal-border bg-terminal-bg-sec rounded p-4">
              <div className="text-xs text-terminal-muted font-mono mb-1">{s.label}</div>
              <div className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>

        <div>
          <div className="text-terminal-muted font-mono text-xs mb-3">$ cat ./users</div>
          {isLoading ? <Spinner /> : (
            <div className="border border-terminal-border rounded overflow-hidden">
              <table className="w-full text-xs font-mono">
                <thead className="bg-tmux-bar">
                  <tr>
                    {["Nombre","Email","Rol","Estado"].map((h) => (
                      <th key={h} className="px-4 py-2 text-left text-terminal-muted">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data?.data.map((u) => (
                    <tr key={u.id} className="border-t border-terminal-border hover:bg-terminal-bg-sec">
                      <td className="px-4 py-2 text-terminal-text">{u.displayName}</td>
                      <td className="px-4 py-2 text-terminal-muted">{u.email}</td>
                      <td className="px-4 py-2"><Badge status="default" label={u.role} /></td>
                      <td className="px-4 py-2"><Badge status={u.suspended ? "failed" : "active"} label={u.suspended ? "suspendido" : "activo"} /></td>
                    </tr>
                  ))}
                  {(!data?.data || data.data.length === 0) && (
                    <tr><td colSpan={4} className="px-4 py-6 text-center text-terminal-muted">sin usuarios</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </TmuxLayout>
  )
}
EOF

cat > src/pages/Forbidden.tsx << 'EOF'
import { Link } from "react-router-dom"
import { Button } from "@/components/atoms/Button"

export default function Forbidden() {
  return (
    <div className="min-h-screen bg-terminal-bg flex items-center justify-center font-mono">
      <div className="text-center flex flex-col items-center gap-4">
        <div className="text-terminal-red text-6xl font-bold">403</div>
        <div className="text-terminal-text text-sm">{">"} acceso denegado</div>
        <div className="text-terminal-muted text-xs">no tenés permisos para esta sección</div>
        <Link to="/dashboard"><Button variant="ghost">$ volver al dashboard</Button></Link>
      </div>
    </div>
  )
}
EOF

cat > src/pages/NotFound.tsx << 'EOF'
import { Link } from "react-router-dom"
import { Button } from "@/components/atoms/Button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-terminal-bg flex items-center justify-center font-mono">
      <div className="text-center flex flex-col items-center gap-4">
        <div className="text-terminal-muted text-6xl font-bold">404</div>
        <div className="text-terminal-text text-sm">{">"} ruta no encontrada</div>
        <div className="text-terminal-muted text-xs">$ cd /dashboard</div>
        <Link to="/"><Button variant="ghost">$ ir al inicio</Button></Link>
      </div>
    </div>
  )
}
EOF

# ── MAIN ──────────────────────────────────────────────────────────────────────
cat > src/main.tsx << 'EOF'
import { StrictMode }        from "react"
import { createRoot }        from "react-dom/client"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient }       from "@/lib/queryClient"
import { AppRouter }         from "@/router"
import "@/styles/globals.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  </StrictMode>
)
EOF

# ── tsconfig paths ────────────────────────────────────────────────────────────
node -e "
const fs = require('fs');
const tsconfig = JSON.parse(fs.readFileSync('tsconfig.app.json','utf8'));
tsconfig.compilerOptions = tsconfig.compilerOptions || {};
tsconfig.compilerOptions.baseUrl = '.';
tsconfig.compilerOptions.paths   = { '@/*': ['src/*'] };
fs.writeFileSync('tsconfig.app.json', JSON.stringify(tsconfig, null, 2));
console.log('tsconfig.app.json actualizado');
"

echo ""
echo "✓ GSM-ARG frontend creado en ./$PROJECT"
echo ""
echo "  Próximos pasos:"
echo "    cd $PROJECT"
echo "    cp .env.example .env   # completar con tus credenciales"
echo "    npm run dev"
echo ""
