const PALETTES: Record<string, [string, string]> = {
  pink: ['#FFE1E8', '#FFC9D6'],
  yellow: ['#FEF3C7', '#FDE08A'],
  mint: ['#DCF5E8', '#A9E6C4'],
  sky: ['#E0F0FB', '#A9D8F2'],
}

interface ProductImageProps {
  palette: keyof typeof PALETTES
  icon: string
}

export default function ProductImage({ palette, icon }: ProductImageProps) {
  const [from, to] = PALETTES[palette]
  return (
    <div
      className="flex aspect-square w-full items-center justify-center rounded-2xl text-5xl"
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      aria-hidden="true"
    >
      {icon}
    </div>
  )
}
