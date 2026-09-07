import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import type { Product } from '../types/product'
import { formatPrice } from '../utils/formatPrice'

interface ProductCardProps {
  product: Product
  atMaxStock: boolean
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, atMaxStock, onAddToCart }: ProductCardProps) {
  const disabled = product.stock <= 0 || atMaxStock

  return (
    <article
      className="flex h-full flex-col bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
      data-testid={`product-card-${product.id}`}
    >
      <Link to={`/product/${product.id}`} className="text-inherit no-underline">
        <div className="mb-3 flex h-40 items-center justify-center bg-[#f7f8fa]">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-36 max-w-full object-contain"
          />
        </div>
        <h2 className="line-clamp-2 min-h-10 text-sm font-medium leading-snug text-slate-800">
          {product.title}
        </h2>
      </Link>

      <p className="mt-2 text-lg font-bold text-slate-900">{formatPrice(product.price)}</p>

      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600">
        <span className="inline-flex items-center gap-0.5 rounded bg-[#388e3c] px-1.5 py-0.5 font-semibold text-white">
          {product.rating.toFixed(1)}
          <Star className="h-3 w-3 fill-white" aria-hidden="true" />
        </span>
        <span>{product.category}</span>
      </div>

      <p className="mt-1 text-xs text-slate-500">
        {product.stock > 0 ? `In stock: ${product.stock}` : 'Out of stock'}
      </p>

      <button
        type="button"
        disabled={disabled}
        onClick={() => onAddToCart(product)}
        aria-label={`Add ${product.title} to cart`}
        className="mt-auto pt-3"
      >
        <span
          className={`block w-full rounded-full px-3 py-2 text-sm font-semibold ${
            disabled
              ? 'cursor-not-allowed bg-slate-200 text-slate-500'
              : 'bg-[#ffd814] text-slate-900 hover:bg-[#f7ca00]'
          }`}
        >
          {product.stock <= 0 ? 'Out of stock' : atMaxStock ? 'Max in cart' : 'Add to Cart'}
        </span>
      </button>
    </article>
  )
}
