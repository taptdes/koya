import { Link } from 'react-router-dom'
import Logo from './Logo'

const FOOTER_LINKS = [
  { label: 'Shop All', to: '/shop' },
  { label: 'Youth Stands', to: '/youth-stands' },
  { label: 'Branding', to: '/branding' },
  { label: 'Join Koya', to: '/join' },
]

export default function Footer() {
  return (
    <footer className="border-t border-ink-900/5 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <Link to="/" className="flex items-center">
          <Logo className="h-7 w-auto text-logo-gold" />
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-ink-600">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-ink-900">
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-sm text-ink-400">
          &copy; {new Date().getFullYear()} Koya. Made for young entrepreneurs.
        </p>
      </div>
    </footer>
  )
}
