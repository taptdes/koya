import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search as SearchIcon } from 'lucide-react'
import PageBanner from '../components/PageBanner'
import ProductCard from '../components/ProductCard'
import { CATEGORIES, PRODUCTS } from '../data/products'

export default function SearchPage() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [category, setCategory] = useState<string | null>(null)

  useEffect(() => {
    setQuery(params.get('q') ?? '')
  }, [params])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PRODUCTS.filter((product) => {
      const matchesQuery =
        q === '' ||
        product.title.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.seller.toLowerCase().includes(q)
      const matchesCategory = !category || product.categorySlug === category
      return matchesQuery && matchesCategory
    })
  }, [query, category])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setParams(query ? { q: query } : {})
  }

  return (
    <div>
      <PageBanner tone="pink" eyebrow="Search" title="Find something you'll love">
        <form onSubmit={handleSubmit} className="mx-auto mt-6 max-w-lg">
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-ink-900/10">
            <SearchIcon className="h-4 w-4 flex-shrink-0 text-ink-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, categories, sellers..."
              className="w-full bg-transparent text-sm text-ink-900 outline-none placeholder:text-ink-400"
              autoFocus
            />
          </div>
        </form>
      </PageBanner>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setCategory(null)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
              category === null
                ? 'bg-ink-900 text-cream'
                : 'bg-white text-ink-600 ring-1 ring-ink-900/10 hover:bg-ink-900/5'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setCategory(c.slug)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                category === c.slug
                  ? 'bg-ink-900 text-cream'
                  : 'bg-white text-ink-600 ring-1 ring-ink-900/10 hover:bg-ink-900/5'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <p className="mb-6 text-center text-sm text-ink-600">
          {results.length} {results.length === 1 ? 'result' : 'results'}
          {query && (
            <>
              {' '}
              for <span className="font-semibold text-ink-900">"{query}"</span>
            </>
          )}
        </p>

        {results.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <span className="text-4xl">🍋</span>
            <p className="font-display text-lg font-semibold text-ink-900">
              No matches yet
            </p>
            <p className="text-sm text-ink-600">Try a different search term or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
