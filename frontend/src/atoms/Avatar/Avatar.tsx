import { cn } from '@/lib/utils'

interface AvatarProps { src?: string; name?: string; size?: 'sm' | 'md' | 'lg'; className?: string }

const sizes = { sm: 'w-6 h-6 text-xs', md: 'w-9 h-9 text-sm', lg: 'w-12 h-12 text-base' }

export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  const initials = name?.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase() ?? '??'
  return (
    <div className={cn('flex items-center justify-center rounded-none border border-terminal-border bg-terminal-secondary text-terminal-green font-mono font-bold overflow-hidden', sizes[size], className)}>
      {src ? <img src={src} alt={name} className="w-full h-full object-cover" /> : initials}
    </div>
  )
}
