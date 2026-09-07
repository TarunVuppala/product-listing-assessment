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
    <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
