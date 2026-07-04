import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight, Minus, Plus, Star, Check } from 'lucide-react'
import { getProductById, getRelatedProducts } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductImage from '../components/ProductImage'
import ProductCard from '../components/ProductCard'
import Button from '../components/Button'

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const product = id ? getProductById(id) : undefined
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  if (!product) {
    return (
      <div className="mx-auto max-w-xl px-6 py-32 pt-40 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink-900">
          We couldn't find that product
        </h1>
        <p className="mt-2 text-ink-600">It may have sold out or been removed.</p>
        <Link to="/shop" className="mt-6 inline-block">
          <Button variant="primary">Back to shop</Button>
        </Link>
      </div>
    )
  }

  const related = getRelatedProducts(product)

  const handleAdd = () => {
    addToCart(product, quantity)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pb-20 pt-32 md:pt-40">
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-ink-400">
        <Link to="/shop" className="hover:text-ink-900">
          Shop
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={`/shop?category=${product.categorySlug}`} className="hover:text-ink-900">
          {product.category}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-ink-600">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="mx-auto w-full max-w-md">
          <ProductImage palette={product.palette} icon={product.icon} />
        </div>

        <div>
          <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-300">
            {product.category}
          </span>
          <h1 className="font-display mt-3 text-3xl font-semibold text-ink-900">
            {product.title}
          </h1>

          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-lemon-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4"
                  fill={i < Math.round(product.rating) ? 'currentColor' : 'none'}
                  strokeWidth={1.5}
                />
              ))}
            </div>
            <span className="text-sm text-ink-600">
              {product.rating.toFixed(1)} ({product.reviews} reviews)
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-300 text-xs font-bold text-ink-900">
              {product.seller[0]}
            </span>
            <span className="text-sm text-ink-600">
              Made by {product.seller}, {product.age} years old
            </span>
          </div>

          <p className="font-display mt-6 text-3xl font-semibold text-ink-900">
            ${product.price.toFixed(2)}
          </p>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-600">
            {product.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 rounded-full border border-ink-900/10 px-2 py-1.5">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="rounded-full p-1.5 text-ink-600 hover:bg-ink-900/5 cursor-pointer"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-5 text-center text-sm font-semibold text-ink-900">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => q + 1)}
                className="rounded-full p-1.5 text-ink-600 hover:bg-ink-900/5 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            <Button variant="primary" onClick={handleAdd} className="gap-2">
              {justAdded ? (
                <>
                  <Check className="h-4 w-4" />
                  Added to cart
                </>
              ) : (
                'Add to cart'
              )}
            </Button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display mb-6 text-2xl font-semibold text-ink-900">
            You might also like
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
