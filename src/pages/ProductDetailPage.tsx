import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { ArrowLeft, Star } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  loadProducts,
  selectProducts,
  selectProductsStatus,
} from '../features/products/productsSlice'
import { addToCart, selectCartItems } from '../features/cart/cartSlice'
import { LoadingState } from '../components/LoadingState'
import { formatPrice } from '../utils/formatPrice'

export function ProductDetailPage() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const products = useAppSelector(selectProducts)
  const status = useAppSelector(selectProductsStatus)
  const cartItems = useAppSelector(selectCartItems)
  const product = products.find((p) => p.id === Number(id))

  useEffect(() => {
    void dispatch(loadProducts())
  }, [dispatch])

  if (status === 'loading' || status === 'idle') {
    return <LoadingState />
  }

  if (!product) {
    return (
      <section className="rounded bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold">Product not found</h1>
        <Link to="/" className="mt-2 inline-block text-[#2874f0]">
          Back to products
        </Link>
      </section>
    )
  }

  const qtyInCart = cartItems.find((i) => i.id === product.id)?.quantity ?? 0
  const atMax = product.stock <= 0 || qtyInCart >= product.stock

  return (
    <section className="rounded bg-white p-4 shadow-sm sm:p-6">
      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-1 text-sm text-[#2874f0] no-underline hover:underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to products
      </Link>

      <div className="grid gap-6 md:grid-cols-[280px_1fr] md:items-start">
        <div className="flex items-center justify-center bg-[#f7f8fa] p-6">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-64 max-w-full object-contain"
          />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="m-0 text-2xl font-semibold leading-snug text-slate-900">
            {product.title}
          </h1>

          <p className="m-0 text-3xl font-bold text-slate-900">
            {formatPrice(product.price)}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <span className="inline-flex items-center gap-0.5 rounded bg-[#388e3c] px-1.5 py-0.5 text-xs font-semibold text-white">
              {product.rating.toFixed(1)}
              <Star className="h-3 w-3 fill-white" aria-hidden="true" />
            </span>
            <span>{product.category}</span>
          </div>

          <p className="m-0 leading-relaxed text-slate-700">{product.description}</p>

          <p className="m-0 text-sm text-slate-600">
            {product.stock > 0
              ? `Available stock: ${product.stock}`
              : 'Currently out of stock'}
          </p>

          <button
            type="button"
            disabled={atMax}
            onClick={() => dispatch(addToCart(product))}
            aria-label={`Add ${product.title} to cart`}
            className={`mt-2 w-full max-w-xs rounded-full px-4 py-2.5 text-sm font-semibold sm:w-auto ${
              atMax
                ? 'cursor-not-allowed bg-slate-200 text-slate-500'
                : 'bg-[#ffd814] text-slate-900 hover:bg-[#f7ca00]'
            }`}
          >
            {product.stock <= 0
              ? 'Out of stock'
              : atMax
                ? 'Max in cart'
                : 'Add to Cart'}
          </button>
        </div>
      </div>
    </section>
  )
}
