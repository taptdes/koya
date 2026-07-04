export type Palette = 'pink' | 'yellow' | 'mint' | 'sky'

export interface Product {
  id: string
  title: string
  category: string
  categorySlug: string
  seller: string
  age: number
  price: number
  palette: Palette
  icon: string
  description: string
  rating: number
  reviews: number
}

export const CATEGORIES = [
  { label: 'Arts & Crafts', slug: 'arts-crafts', icon: '🧵', palette: 'pink' as Palette },
  { label: 'Baked Goods', slug: 'baked-goods', icon: '🍪', palette: 'yellow' as Palette },
  { label: 'Jewelry', slug: 'jewelry', icon: '📿', palette: 'sky' as Palette },
  { label: 'Art & Paintings', slug: 'art-paintings', icon: '🎨', palette: 'mint' as Palette },
]

export const PRODUCTS: Product[] = [
  {
    id: 'friendship-bracelets',
    title: 'Handmade Friendship Bracelets',
    category: 'Arts & Crafts',
    categorySlug: 'arts-crafts',
    seller: 'Emma',
    age: 11,
    price: 12.99,
    palette: 'pink',
    icon: '🧵',
    description:
      'A colorful set of six woven friendship bracelets, each one knotted by hand with cotton embroidery thread. Adjustable sliding knots fit any wrist.',
    rating: 4.9,
    reviews: 23,
  },
  {
    id: 'rainbow-cookies',
    title: 'Rainbow Sprinkle Cookies',
    category: 'Baked Goods',
    categorySlug: 'baked-goods',
    seller: 'Noah',
    age: 9,
    price: 8.5,
    palette: 'yellow',
    icon: '🍪',
    description:
      'A dozen soft-baked sugar cookies topped with rainbow sprinkles, baked fresh to order in small batches. Nut-free kitchen.',
    rating: 5.0,
    reviews: 41,
  },
  {
    id: 'ocean-necklace',
    title: 'Ocean Wave Beaded Necklace',
    category: 'Jewelry',
    categorySlug: 'jewelry',
    seller: 'Ava',
    age: 12,
    price: 15.0,
    palette: 'sky',
    icon: '📿',
    description:
      'Hand-strung glass and shell beads in blues and greens, inspired by ocean waves. Comes on an adjustable cord with a lobster clasp.',
    rating: 4.8,
    reviews: 17,
  },
  {
    id: 'splatter-canvas',
    title: 'Splatter Art Canvas Print',
    category: 'Art & Paintings',
    categorySlug: 'art-paintings',
    seller: 'Leo',
    age: 10,
    price: 20.0,
    palette: 'mint',
    icon: '🎨',
    description:
      'A one-of-a-kind acrylic splatter painting on an 8x10 stretched canvas. Ready to hang, signed by the artist on the back.',
    rating: 4.7,
    reviews: 9,
  },
  {
    id: 'polymer-earrings',
    title: 'Mini Polymer Clay Earrings',
    category: 'Jewelry',
    categorySlug: 'jewelry',
    seller: 'Maya',
    age: 13,
    price: 9.0,
    palette: 'pink',
    icon: '👂',
    description:
      'Lightweight polymer clay stud earrings shaped like tiny fruit slices. Hypoallergenic stainless steel posts.',
    rating: 4.9,
    reviews: 31,
  },
  {
    id: 'choc-chip-blondies',
    title: 'Chocolate Chip Blondies',
    category: 'Baked Goods',
    categorySlug: 'baked-goods',
    seller: 'Jonah',
    age: 8,
    price: 10.0,
    palette: 'yellow',
    icon: '🧈',
    description:
      'A tray of nine chewy blondies loaded with chocolate chips. Baked the morning of pickup for maximum freshness.',
    rating: 4.6,
    reviews: 12,
  },
  {
    id: 'watercolor-cards',
    title: 'Watercolor Greeting Cards (Set of 5)',
    category: 'Art & Paintings',
    categorySlug: 'art-paintings',
    seller: 'Sofia',
    age: 11,
    price: 14.0,
    palette: 'mint',
    icon: '🖌️',
    description:
      'Five blank greeting cards with original hand-painted watercolor florals, plus matching envelopes.',
    rating: 5.0,
    reviews: 6,
  },
  {
    id: 'macrame-keychain',
    title: 'Macrame Keychains',
    category: 'Arts & Crafts',
    categorySlug: 'arts-crafts',
    seller: 'Ruby',
    age: 12,
    price: 6.5,
    palette: 'pink',
    icon: '🔑',
    description:
      'Boho-style macrame keychains with a wooden bead accent. Great as a party favor or backpack charm.',
    rating: 4.8,
    reviews: 14,
  },
]

export function getProductById(id: string) {
  return PRODUCTS.find((p) => p.id === id)
}

export function getRelatedProducts(product: Product, limit = 4) {
  return PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id,
  ).slice(0, limit)
}
