interface Props { children: React.ReactNode }

export function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-terminal-bg flex items-center justify-center p-4 scanline-effect">
      <div className="w-full max-w-lg">{children}</div>
    </div>
  )
}
