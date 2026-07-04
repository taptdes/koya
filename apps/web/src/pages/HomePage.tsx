import Hero from '../components/Hero'
import FeaturedProducts from '../components/FeaturedProducts'
import ShopByCategory from '../components/ShopByCategory'
import HowItWorks from '../components/HowItWorks'
import CtaBanner from '../components/CtaBanner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <ShopByCategory />
      <HowItWorks />
      <CtaBanner />
    </>
  )
}
