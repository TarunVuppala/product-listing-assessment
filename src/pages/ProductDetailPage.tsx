import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  loadProducts,
  selectProducts,
  selectProductsStatus,
} from '../features/products/productsSlice'
import { LoadingState } from '../components/LoadingState'
import { formatPrice } from '../utils/formatPrice'

export function ProductDetailPage() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const products = useAppSelector(selectProducts)
  const status = useAppSelector(selectProductsStatus)
  const product = products.find((p) => p.id === Number(id))

  useEffect(() => {
    void dispatch(loadProducts())
  }, [dispatch])

  if (status === 'loading' || status === 'idle') {
    return <LoadingState />
  }

  if (!product) {
    return (
      <section>
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/">Back to products</Link>
      </section>
    )
  }

  return (
    <section className="grid gap-2 rounded-lg border border-slate-200 bg-white p-5">
      <Link to="/">← Back to products</Link>
      <img
        src={product.image}
        alt={product.title}
        className="h-48 w-48 object-contain bg-slate-100"
      />
      <h1 className="text-2xl font-bold text-slate-900">{product.title}</h1>
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <p>Rating: {product.rating}</p>
      <p>Price: {formatPrice(product.price)}</p>
      <p>Available stock: {product.stock}</p>
    </section>
  )
}
