import Button from './Button'

export default function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="rounded-3xl bg-yellow-100 px-8 py-16 text-center sm:px-16">
        <span className="text-4xl" aria-hidden="true">
          🚀
        </span>
        <h2 className="font-display mt-4 text-3xl font-semibold text-ink-900 sm:text-4xl">
          Ready to start your journey?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-ink-600">
          Join hundreds of young entrepreneurs building their dreams. Set up
          your shop today and start selling in minutes.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button variant="secondary" to="/join">Create your shop</Button>
          <Button variant="outline" to="/branding">Learn more</Button>
        </div>
      </div>
    </section>
  )
}
