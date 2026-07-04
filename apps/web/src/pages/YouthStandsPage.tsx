import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import ProductImage from '../components/ProductImage'
import { PRODUCTS } from '../data/products'

function getStands() {
  const sellerNames = [...new Set(PRODUCTS.map((p) => p.seller))]
  return sellerNames.map((seller) => {
    const items = PRODUCTS.filter((p) => p.seller === seller)
    const [first] = items
    return {
      name: seller,
      age: first.age,
      category: first.category,
      categorySlug: first.categorySlug,
      palette: first.palette,
      icon: first.icon,
      productCount: items.length,
    }
  })
}

const STANDS = getStands()

export default function YouthStandsPage() {
  return (
    <div>
      <PageBanner
        tone="pink"
        eyebrow="Meet the sellers"
        title="Youth stands"
        description="Every shop on Koya is run by a young entrepreneur learning the ropes of running a business — one sale at a time."
      />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STANDS.map((stand) => (
            <Link
              key={stand.name}
              to={`/shop?category=${stand.categorySlug}`}
              className="group rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink-900/5 transition-shadow hover:shadow-md"
            >
              <ProductImage palette={stand.palette} icon={stand.icon} />
              <div className="pt-4">
                <h3 className="font-display text-base font-semibold text-ink-900">
                  {stand.name}'s Stand
                </h3>
                <p className="mt-0.5 text-xs text-ink-400">
                  {stand.age} years old &middot; {stand.category}
                </p>
                <p className="mt-2 text-xs font-semibold text-ink-600">
                  {stand.productCount} {stand.productCount === 1 ? 'product' : 'products'} listed
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
