import type { Product } from '../types/product'
import { ProductCard } from './ProductCard'

interface ProductListProps {
  products: Product[]
}

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6" role="status">
        <p>No products found</p>
      </div>
    )
  }

  return (
    <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 p-0">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}
