import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import Button from './Button'
import ProductImage from './ProductImage'

export default function CartDrawer() {
  const { lines, isOpen, closeCart, subtotal, changeQuantity, removeFromCart } = useCart()

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-ink-900/30 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-sm flex-col bg-cream shadow-xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-ink-900/10 px-6 py-5">
          <h2 className="font-display text-lg font-semibold text-ink-900">Your cart</h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="rounded-full p-2 text-ink-600 transition-colors hover:bg-ink-900/5 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-ink-400" strokeWidth={1.5} />
            <p className="font-display text-base font-semibold text-ink-900">
              Your cart is empty
            </p>
            <p className="text-sm text-ink-600">
              Add something handmade from a young entrepreneur.
            </p>
            <Button variant="primary" onClick={closeCart} className="mt-2">
              Keep shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              <ul className="divide-y divide-ink-900/10">
                {lines.map((line) => (
                  <li key={line.product.id} className="flex gap-3 py-4">
                    <div className="w-20 flex-shrink-0">
                      <ProductImage palette={line.product.palette} icon={line.product.icon} />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold leading-snug text-ink-900">
                          {line.product.title}
                        </p>
                        <button
                          type="button"
                          aria-label="Remove item"
                          onClick={() => removeFromCart(line.product.id)}
                          className="flex-shrink-0 text-ink-400 transition-colors hover:text-ink-900 cursor-pointer"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-0.5 text-xs text-ink-400">by {line.product.seller}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full border border-ink-900/10 px-1">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => changeQuantity(line.product.id, -1)}
                            className="rounded-full p-1 text-ink-600 hover:bg-ink-900/5 cursor-pointer"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-4 text-center text-xs font-semibold text-ink-900">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => changeQuantity(line.product.id, 1)}
                            className="rounded-full p-1 text-ink-600 hover:bg-ink-900/5 cursor-pointer"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-display text-sm font-semibold text-ink-900">
                          ${(line.product.price * line.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-ink-900/10 px-6 py-5">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-ink-600">Subtotal</span>
                <span className="font-display text-lg font-semibold text-ink-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <Button variant="primary" className="w-full justify-center">
                Checkout
              </Button>
              <button
                type="button"
                onClick={closeCart}
                className="mt-3 w-full text-center text-sm font-medium text-ink-600 hover:text-ink-900 cursor-pointer"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
