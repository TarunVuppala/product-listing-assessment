import { Link } from 'react-router-dom'
import type { Product } from '../types/product'
import { formatPrice } from '../utils/formatPrice'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article
      className="flex flex-col gap-1 rounded-lg border border-slate-200 bg-white p-3"
      data-testid={`product-card-${product.id}`}
    >
      <Link to={`/product/${product.id}`} className="no-underline text-inherit">
        <img
          src={product.image}
          alt={product.title}
          className="h-36 w-full rounded object-contain bg-slate-100"
        />
        <h2 className="mt-2 text-base font-semibold text-slate-900">{product.title}</h2>
      </Link>
      <p className="m-0 text-sm text-slate-600">{product.category}</p>
      <p className="m-0 font-bold">{formatPrice(product.price)}</p>
      <p className="m-0 text-sm text-slate-600">Rating: {product.rating}</p>
      <p className="m-0 text-sm text-slate-600">
        {product.stock > 0 ? `In stock: ${product.stock}` : 'Out of stock'}
      </p>
    </article>
  )
}
