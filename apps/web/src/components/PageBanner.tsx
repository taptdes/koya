import type { ReactNode } from 'react'

const TONE_BG: Record<string, string> = {
  pink: 'bg-gradient-to-b from-pink-100 to-pink-50',
  yellow: 'bg-gradient-to-b from-yellow-100 to-yellow-50',
  mint: 'bg-gradient-to-b from-mint-100 to-cream',
  sky: 'bg-gradient-to-b from-sky-100 to-cream',
}

const TONE_TAG: Record<string, string> = {
  pink: 'bg-white/70 text-pink-300',
  yellow: 'bg-white/70 text-lemon-500',
  mint: 'bg-white/70 text-mint-300',
  sky: 'bg-white/70 text-sky-300',
}

interface PageBannerProps {
  tone: 'pink' | 'yellow' | 'mint' | 'sky'
  eyebrow: string
  title: string
  description?: string
  children?: ReactNode
}

export default function PageBanner({
  tone,
  eyebrow,
  title,
  description,
  children,
}: PageBannerProps) {
  return (
    <section className={`${TONE_BG[tone]} px-6 pb-16 pt-32 md:pt-40`}>
      <div className="mx-auto max-w-4xl text-center">
        <span
          className={`font-display inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide ${TONE_TAG[tone]}`}
        >
          {eyebrow}
        </span>
        <h1 className="font-display mt-5 text-4xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-600">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
