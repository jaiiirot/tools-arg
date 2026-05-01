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
