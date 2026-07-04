import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CATEGORIES, PRODUCTS } from '../data/products'

const PALETTE_BG: Record<string, string> = {
  pink: 'bg-pink-100',
  yellow: 'bg-yellow-100',
  sky: 'bg-sky-100',
  mint: 'bg-mint-100',
}

export default function ShopByCategory() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10">
        <h2 className="font-display text-3xl font-semibold text-ink-900">
          Shop by category
        </h2>
        <p className="mt-1 text-ink-600">Find exactly what you're looking for</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((category) => {
          const count = PRODUCTS.filter((p) => p.categorySlug === category.slug).length
          return (
            <Link
              key={category.slug}
              to={`/shop?category=${category.slug}`}
              className={`group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl p-5 transition-transform hover:-translate-y-1 ${PALETTE_BG[category.palette]}`}
            >
              <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-ink-900 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-4 w-4" />
              </span>
              <span className="text-5xl" aria-hidden="true">
                {category.icon}
              </span>
              <h3 className="font-display mt-4 text-lg font-semibold text-ink-900">
                {category.label}
              </h3>
              <p className="text-xs font-medium text-ink-600">{count} products</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
