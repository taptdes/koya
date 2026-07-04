import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Product } from '../data/products'

export interface CartLine {
  product: Product
  quantity: number
}

interface CartContextValue {
  lines: CartLine[]
  isOpen: boolean
  count: number
  subtotal: number
  openCart: () => void
  closeCart: () => void
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  changeQuantity: (productId: string, delta: number) => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addToCart = (product: Product, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((line) => line.product.id === product.id)
      if (existing) {
        return prev.map((line) =>
          line.product.id === product.id
            ? { ...line, quantity: line.quantity + quantity }
            : line,
        )
      }
      return [...prev, { product, quantity }]
    })
    setIsOpen(true)
  }

  const removeFromCart = (productId: string) => {
    setLines((prev) => prev.filter((line) => line.product.id !== productId))
  }

  const changeQuantity = (productId: string, delta: number) => {
    setLines((prev) =>
      prev
        .map((line) =>
          line.product.id === productId
            ? { ...line, quantity: line.quantity + delta }
            : line,
        )
        .filter((line) => line.quantity > 0),
    )
  }

  const count = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines],
  )
  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity * line.product.price, 0),
    [lines],
  )

  return (
    <CartContext.Provider
      value={{
        lines,
        isOpen,
        count,
        subtotal,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addToCart,
        removeFromCart,
        changeQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
