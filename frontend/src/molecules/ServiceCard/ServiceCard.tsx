import { memo } from 'react'
import { ShoppingCart, Clock } from 'lucide-react'
import { Button } from '@/atoms/Button'
import { Tag } from '@/atoms/Tag'
import { Badge } from '@/atoms/Badge'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types/product.types'

interface ServiceCardProps { product: Product; onOrder?: (p: Product) => void; onHover?: (id: string) => void }

export const ServiceCard = memo(function ServiceCard({ product, onOrder, onHover }: ServiceCardProps) {
  return (
    <div
      className="bg-terminal-secondary border border-terminal-border hover:border-terminal-green transition-colors p-3 flex flex-col gap-2 cursor-default group"
      onMouseEnter={() => onHover?.(product.id)}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-terminal-text text-sm font-medium leading-tight line-clamp-2">{product.name}</p>
        <Badge status={product.isActive ? 'active' : 'failed'}>
          {product.isActive ? 'ON' : 'OFF'}
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <Tag>{product.category}</Tag>
        {product.brand && <Tag>{product.brand}</Tag>}
        <Tag>{product.userType}</Tag>
      </div>
      <div className="flex items-center justify-between mt-auto pt-1 border-t border-terminal-border">
        <div>
          <span className="text-terminal-green font-bold">{formatPrice(product.price)}</span>
          <div className="flex items-center gap-1 text-terminal-muted text-xs mt-0.5">
            <Clock className="w-3 h-3" />
            <span>{product.deliveryTime}</span>
          </div>
        </div>
        <Button
          size="sm"
          variant="primary"
          onClick={() => onOrder?.(product)}
          aria-label={`Ordenar ${product.name}`}
        >
          <ShoppingCart className="w-3 h-3" />
          ORDER
        </Button>
      </div>
    </div>
  )
})
