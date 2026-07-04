const STEPS = [
  {
    icon: '🏠',
    title: 'Create your shop',
    description:
      'Set up your digital lemonade stand in minutes. Add your profile and tell your story.',
  },
  {
    icon: '📦',
    title: 'List your products',
    description:
      'Upload photos, write descriptions, and set your prices. Easy as 1-2-3!',
  },
  {
    icon: '💵',
    title: 'Start selling',
    description: 'Share your shop with friends and family. Watch your sales grow.',
  },
  {
    icon: '✨',
    title: 'Grow & learn',
    description:
      'Track earnings, get feedback, and become a young entrepreneur superstar.',
  },
]

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 text-center">
      <span className="font-display inline-block rounded-full bg-pink-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-pink-300">
        Simple &amp; fun
      </span>
      <h2 className="font-display mt-4 text-3xl font-semibold text-ink-900">
        How it works
      </h2>
      <p className="mt-2 text-ink-600">
        Starting your entrepreneurial journey is easier than making lemonade
      </p>

      <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <div key={step.title} className="relative">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 text-3xl">
              {step.icon}
            </div>
            <span className="font-display mt-4 block text-xs font-semibold text-ink-400">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="font-display mt-1 text-lg font-semibold text-ink-900">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
