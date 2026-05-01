import { TmuxLayout } from '@/templates/TmuxLayout'
import { SearchBar } from '@/molecules/SearchBar'
import { ServiceCard } from '@/molecules/ServiceCard'
import { useProducts } from '@/features/products/hooks/useProducts'
import { usePrefetchProduct } from '@/features/products/queries/productQueries'
import { useProductFilters } from '@/features/products/filters/useProductFilters'
import { TerminalSpinner } from '@/atoms/Spinner'

export default function ProductsPage() {
  const { filters, setSearch } = useProductFilters()
  const { data, isLoading, fetchNextPage, hasNextPage } = useProducts(filters)
  const prefetch = usePrefetchProduct()

  const products = data?.pages.flatMap((p) => p.data) ?? []

  return (
    <TmuxLayout paneTitle="services">
      <div className="space-y-4">
        <SearchBar onSearch={setSearch} placeholder="search services..." />
        {isLoading ? (
          <TerminalSpinner label="Fetching services..." />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {products.map((p) => (
                <ServiceCard key={p.id} product={p} onHover={() => prefetch(p.id)} />
              ))}
            </div>
            {hasNextPage && (
              <button
                onClick={() => fetchNextPage()}
                className="text-terminal-cyan text-xs font-mono hover:underline"
              >
                load more...
              </button>
            )}
          </>
        )}
      </div>
    </TmuxLayout>
  )
}
