export default function LemonadeStandIllustration() {
  return (
    <svg
      viewBox="0 0 420 400"
      className="h-auto w-full max-w-md"
      role="img"
      aria-label="Illustration of a lemonade stand"
    >
      {/* soft ground shadow */}
      <ellipse cx="210" cy="372" rx="150" ry="16" fill="#2B2333" opacity="0.06" />

      {/* posts */}
      <rect x="96" y="150" width="14" height="180" rx="7" fill="#F3D9A4" />
      <rect x="310" y="150" width="14" height="180" rx="7" fill="#F3D9A4" />

      {/* awning */}
      <path d="M70 90 L350 90 L332 150 L88 150 Z" fill="#FFFFFF" />
      <path
        d="M70 90 L350 90 L332 150 L88 150 Z"
        fill="none"
        stroke="#FFE1E8"
        strokeWidth="1"
      />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`M${88 + i * 44} 150 L${100 + i * 44} 90 L${132 + i * 44} 90 L${
            118 + i * 44
          } 150 Z`}
          fill={i % 2 === 0 ? '#FFA8BD' : '#FFFFFF'}
        />
      ))}
      <path
        d="M70 90 Q210 70 350 90 L350 100 Q210 82 70 100 Z"
        fill="#FFA8BD"
      />

      {/* counter */}
      <rect x="80" y="260" width="260" height="70" rx="18" fill="#FCEFDB" />
      <rect x="80" y="260" width="260" height="16" rx="8" fill="#FFFFFF" />

      {/* sign */}
      <rect x="164" y="196" width="92" height="46" rx="10" fill="#FBC94C" />
      <text
        x="210"
        y="226"
        textAnchor="middle"
        fontFamily="Fredoka, system-ui, sans-serif"
        fontWeight="600"
        fontSize="22"
        fill="#2B2333"
      >
        $1
      </text>

      {/* pitcher */}
      <path
        d="M150 235 h34 l-4 45 a15 15 0 0 1 -13 12 h-0 a15 15 0 0 1 -13 -12 Z"
        fill="#FDE68A"
        opacity="0.9"
      />
      <rect x="146" y="228" width="42" height="10" rx="5" fill="#F5B73D" />

      {/* cups */}
      <path d="M240 250 h20 l-3 32 a8 8 0 0 1 -7 6 a8 8 0 0 1 -7 -6 Z" fill="#A9D8F2" />
      <path d="M268 254 h20 l-3 28 a8 8 0 0 1 -7 6 a8 8 0 0 1 -7 -6 Z" fill="#A9E6C4" />

      {/* lemons scattered */}
      <g>
        <circle cx="60" cy="330" r="16" fill="#FBC94C" />
        <circle cx="95" cy="352" r="11" fill="#FDE08A" />
        <circle cx="345" cy="340" r="14" fill="#FBC94C" />
        <circle cx="372" cy="318" r="9" fill="#FDE08A" />
      </g>

      {/* leaves */}
      <path d="M40 320 q10 -14 24 -6 q-8 14 -24 6 Z" fill="#A9E6C4" />
      <path d="M390 330 q-10 -14 -24 -6 q8 14 24 6 Z" fill="#A9E6C4" />
    </svg>
  )
}
