import { useEffect, useMemo, useState } from 'react'
import { ArrowDownWideNarrow, Sparkles } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import Filter from '../components/Filter'
import LoadingState from '../components/LoadingState'
import ProductList from '../components/ProductList'
import SearchBar from '../components/SearchBar'
import { useProducts } from '../hooks/useProducts'
import type { Product } from '../types/product'

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating'
const PAGE_SIZE = 12

function ProductsPage() {
  const { products, loading, error, retry } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState<SortOption>('featured')
  const search = searchParams.get('search') ?? ''
  const category = searchParams.get('category') ?? ''
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  const filterKey = `${search}\u0000${category}\u0000${sort}`
  const [pageState, setPageState] = useState({ key: '', visibleCount: PAGE_SIZE })
  const visibleCount = pageState.key === filterKey ? pageState.visibleCount : PAGE_SIZE

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)
    return () => window.clearTimeout(timeout)
  }, [search])

  const categories = useMemo(() => [...new Set(products.map((product) => product.category))].sort(), [products])
  const suggestions = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return []
    return products.filter((product) => product.title.toLowerCase().includes(query)).slice(0, 5)
  }, [products, search])
  const filteredProducts = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase()
    const result = products.filter((product) => product.title.toLowerCase().includes(normalizedSearch) && (!category || product.category === category))
    const sorters: Record<SortOption, (left: Product, right: Product) => number> = {
      featured: (left, right) => left.id - right.id,
      'price-asc': (left, right) => left.price - right.price,
      'price-desc': (left, right) => right.price - left.price,
      rating: (left, right) => right.rating - left.rating,
    }
    return result.toSorted(sorters[sort])
  }, [products, debouncedSearch, category, sort])

  function updateSearch(value: string) {
    const next = new URLSearchParams(searchParams)
    if (value.trim()) next.set('search', value)
    else next.delete('search')
    setSearchParams(next, { replace: true })
  }

  function updateCategory(value: string) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set('category', value)
    else next.delete('category')
    setSearchParams(next)
  }

  function resetFilters() {
    setSearchParams({}, { replace: true })
  }

  return (
    <main className="page-enter">
      <section className="hero-band"><div className="content-width"><span className="eyebrow"><Sparkles size={14} /> Good things, gathered</span><h1 className="font-display hero-title">Find your next<br />favorite bite.</h1><p className="hero-copy">A little inspiration for your pantry, your plate, and everything delicious in between.</p></div></section>
      <section className="content-width pb-14" aria-label="Browse products">
        <div className="controls-row">
          <SearchBar value={search} onChange={updateSearch} suggestions={suggestions} />
          <Filter categories={categories} value={category} onChange={updateCategory} />
          <label><span className="sr-only">Sort products</span><select className="select-control" value={sort} onChange={(event) => setSort(event.target.value as SortOption)} aria-label="Sort products"><option value="featured">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="rating">Top rated</option></select></label>
          <div className="hidden items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 text-xs font-semibold text-[var(--muted)] sm:flex" aria-hidden="true"><ArrowDownWideNarrow size={15} /> Curated finds</div>
        </div>
        {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={retry} /> : filteredProducts.length === 0 ? <EmptyState onReset={resetFilters} /> : (
          <><div className="results-line"><span>{filteredProducts.length} products to explore</span><span className="capitalize">{category ? category.replaceAll('-', ' ') : 'The full collection'}</span></div><ProductList products={filteredProducts.slice(0, visibleCount)} />{visibleCount < filteredProducts.length && <div className="load-more-wrap"><button className="secondary-button load-more" onClick={() => setPageState({ key: filterKey, visibleCount: visibleCount + PAGE_SIZE })} type="button">Load more products</button></div>}</>
        )}
      </section>
    </main>
  )
}

export default ProductsPage