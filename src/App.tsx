import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { ProductsPage } from './pages/ProductsPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { CartPage } from './pages/CartPage'

export default function App() {
  return (
    <div className="min-h-screen bg-[#f1f3f6] text-slate-900">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
    </div>
  )
}
