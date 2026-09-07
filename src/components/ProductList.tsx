import type { Product } from '../types/product'
import { ProductCard } from './ProductCard'
import { EmptyState } from './EmptyState'

interface ProductListProps {
  products: Product[]
  getAtMaxStock: (product: Product) => boolean
  onAddToCart: (product: Product) => void
}

export function ProductList({ products, getAtMaxStock, onAddToCart }: ProductListProps) {
  if (products.length === 0) {
    return <EmptyState message="No products found" />
  }

  return (
    <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 p-0">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard
            product={product}
            atMaxStock={getAtMaxStock(product)}
            onAddToCart={onAddToCart}
          />
        </li>
      ))}
    </ul>
  )
}
