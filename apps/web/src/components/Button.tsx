import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'outline'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
  to?: string
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-yellow-400 text-ink-900 hover:bg-lemon-500 shadow-sm shadow-yellow-400/40',
  secondary: 'bg-ink-900 text-cream hover:bg-ink-900/90',
  outline:
    'bg-white/70 text-ink-900 border border-ink-900/10 hover:bg-white',
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors cursor-pointer'

export default function Button({
  variant = 'primary',
  className = '',
  children,
  to,
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
