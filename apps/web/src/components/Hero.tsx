import Button from './Button'
import LemonadeStandIllustration from './LemonadeStandIllustration'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-pink-100 to-pink-50"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-20 pt-32 md:grid-cols-2 md:pb-28 md:pt-40">
        <div>
          <span className="font-display inline-block rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-pink-300">
            Koya Lemonade Stands
          </span>
          <h1 className="font-display mt-5 text-5xl font-semibold leading-[1.05] tracking-tight text-ink-900 sm:text-6xl">
            Dream it.
            <br />
            Make it.
            <br />
            Sell it.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink-600">
            Because every big dream starts with a little stand. Koya helps
            young entrepreneurs build their first shop, share what they make,
            and learn to sell it with confidence.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button variant="primary" to="/shop">Shop now</Button>
            <Button variant="outline" to="/join">Join us</Button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm md:max-w-none">
          <LemonadeStandIllustration />
        </div>
      </div>

      {/* scalloped divider */}
      <svg
        className="block w-full text-cream"
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 40 V20 Q30 0 60 20 Q90 40 120 20 Q150 0 180 20 Q210 40 240 20 Q270 0 300 20 Q330 40 360 20 Q390 0 420 20 Q450 40 480 20 Q510 0 540 20 Q570 40 600 20 Q630 0 660 20 Q690 40 720 20 Q750 0 780 20 Q810 40 840 20 Q870 0 900 20 Q930 40 960 20 Q990 0 1020 20 Q1050 40 1080 20 Q1110 0 1140 20 Q1170 40 1200 20 V40 Z"
          fill="currentColor"
        />
      </svg>
    </section>
  )
}
