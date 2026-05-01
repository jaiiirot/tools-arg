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
