import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import ProductCard from '../components/ProductCard'
import { CATEGORIES, PRODUCTS } from '../data/products'

export default function ShopAllPage() {
  const [params, setParams] = useSearchParams()
  const activeCategory = params.get('category')

  const results = useMemo(
    () =>
      activeCategory
        ? PRODUCTS.filter((p) => p.categorySlug === activeCategory)
        : PRODUCTS,
    [activeCategory],
  )

  const setCategory = (slug: string | null) => {
    setParams(slug ? { category: slug } : {})
  }

  return (
    <div>
      <PageBanner
        tone="yellow"
        eyebrow="The full catalog"
        title="Shop all"
        description="Everything on Koya, made by young entrepreneurs across the country."
      />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setCategory(null)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
              !activeCategory
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
                activeCategory === c.slug
                  ? 'bg-ink-900 text-cream'
                  : 'bg-white text-ink-600 ring-1 ring-ink-900/10 hover:bg-ink-900/5'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <p className="mb-6 text-center text-sm text-ink-600">
          {results.length} {results.length === 1 ? 'product' : 'products'}
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
