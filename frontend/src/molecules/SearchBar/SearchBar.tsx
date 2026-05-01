import { Search } from 'lucide-react'
import { Input } from '@/atoms/Input'

interface SearchBarProps { onSearch: (v: string) => void; placeholder?: string }

export function SearchBar({ onSearch, placeholder = 'search...' }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-terminal-muted" />
      <Input
        className="pl-8"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}
