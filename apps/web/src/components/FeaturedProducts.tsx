import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import ProductCard from './ProductCard'

export default function FeaturedProducts() {
  const featured = PRODUCTS.slice(0, 4)

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="font-display text-3xl font-semibold text-ink-900">
            Featured products
          </h2>
          <p className="mt-1 text-ink-600">
            Discover amazing creations from young entrepreneurs
          </p>
        </div>
        <Link
          to="/shop"
          className="hidden items-center gap-1 text-sm font-semibold text-ink-900 hover:underline sm:flex"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
