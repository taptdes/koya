import { useEffect, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, ShoppingBag, CircleUser, X } from 'lucide-react'
import Logo from './Logo'
import { useCart } from '../context/CartContext'

const NAV_LINKS = [
  { label: 'Featured', to: '/' },
  { label: 'Shop All', to: '/shop' },
  { label: 'Youth Stands', to: '/youth-stands' },
  { label: 'Branding', to: '/branding' },
]

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { count, openCart } = useCart()
  const isHome = location.pathname === '/'

  const [scrolledPastHero, setScrolledPastHero] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolledPastHero(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setSearchOpen(false)
  }, [location.pathname])

  const solid = !isHome || scrolledPastHero

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate(searchValue ? `/search?q=${encodeURIComponent(searchValue)}` : '/search')
    setSearchOpen(false)
    setSearchValue('')
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid
          ? 'border-ink-900/5 bg-cream/80 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link to="/" className="flex items-center">
          <Logo className={`h-8 w-auto transition-colors duration-300 ${solid ? 'text-logo-gold' : 'text-ink-600'}`} />
        </Link>

        <nav
          className={`hidden items-center gap-8 text-sm font-medium transition-colors duration-300 md:flex ${
            solid ? 'text-ink-600' : 'text-black/90'
          }`}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`transition-colors ${solid ? 'hover:text-ink-900' : 'hover:text-ink-700'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/join"
            className={`hidden text-sm font-semibold underline-offset-4 transition-colors duration-300 hover:underline sm:inline ${
              solid ? 'text-ink-900' : 'text-ink-700'
            }`}
          >
            Become a seller
          </Link>
          <div
            className={`flex items-center gap-1 transition-colors duration-300 ${
              solid ? 'text-ink-600' : 'text-ink-700'
            }`}
          >
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen((open) => !open)}
              className="rounded-full p-2 transition-colors hover:bg-black/5 cursor-pointer"
            >
              {searchOpen ? (
                <X className="h-4.5 w-4.5" strokeWidth={1.75} />
              ) : (
                <Search className="h-4.5 w-4.5" strokeWidth={1.75} />
              )}
            </button>
            <button
              type="button"
              aria-label="Cart"
              onClick={openCart}
              className="relative rounded-full p-2 transition-colors hover:bg-black/5 cursor-pointer"
            >
              <ShoppingBag className="h-4.5 w-4.5" strokeWidth={1.75} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
            <Link
              to="/profile"
              aria-label="Account"
              className="rounded-full p-2 transition-colors hover:bg-black/5 cursor-pointer"
            >
              <CircleUser className="h-4.5 w-4.5" strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-ink-900/10 bg-cream px-6 py-4">
          <form onSubmit={handleSearchSubmit} className="mx-auto max-w-lg">
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-ink-900/10">
              <Search className="h-4 w-4 flex-shrink-0 text-ink-400" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search products, categories, sellers..."
                className="w-full bg-transparent text-sm text-ink-900 outline-none placeholder:text-ink-400"
                autoFocus
              />
            </div>
          </form>
        </div>
      )}
    </header>
  )
}
