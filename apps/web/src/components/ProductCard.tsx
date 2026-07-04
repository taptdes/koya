import { useState } from 'react'
import { Heart, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductImage from './ProductImage'

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [justAdded, setJustAdded] = useState(false)

  const handleAdd = () => {
    addToCart(product, 1)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <div className="group rounded-2xl bg-white p-3 shadow-sm ring-1 ring-ink-900/5 transition-shadow hover:shadow-md">
      <div className="relative">
        <Link to={`/product/${product.id}`} className="block">
          <ProductImage palette={product.palette} icon={product.icon} />
        </Link>
        <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-ink-600">
          {product.category}
        </span>
        <button
          type="button"
          aria-label="Save to favorites"
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink-600 transition-colors hover:text-pink-300 cursor-pointer"
        >
          <Heart className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>

      <div className="p-2 pt-3">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold leading-snug text-ink-900 hover:underline">
            {product.title}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-300 text-[10px] font-bold text-ink-900">
            {product.seller[0]}
          </span>
          <span className="text-xs text-ink-400">
            {product.seller}, {product.age} years old
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-display text-lg font-semibold text-ink-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-xs font-semibold transition-colors cursor-pointer ${
              justAdded
                ? 'bg-mint-300 text-ink-900'
                : 'bg-yellow-400 text-ink-900 hover:bg-lemon-500'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Added
              </>
            ) : (
              'Add to cart'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
