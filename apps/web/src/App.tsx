import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import HomePage from './pages/HomePage'
import BrandingPage from './pages/BrandingPage'
import JoinPage from './pages/JoinPage'
import ProfilePage from './pages/ProfilePage'
import SearchPage from './pages/SearchPage'
import ShopAllPage from './pages/ShopAllPage'
import YouthStandsPage from './pages/YouthStandsPage'
import ProductPage from './pages/ProductPage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <div className="min-h-svh bg-cream">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/branding" element={<BrandingPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/shop" element={<ShopAllPage />} />
          <Route path="/youth-stands" element={<YouthStandsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}

export default App
