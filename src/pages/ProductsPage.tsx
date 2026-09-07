import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  loadProducts,
  selectProducts,
  selectProductsError,
  selectProductsStatus,
} from '../features/products/productsSlice'
import { filterAndSortProducts } from '../features/products/filterSort'
import { addToCart, selectCartItems } from '../features/cart/cartSlice'
import { clearSimulateError } from '../services/productsApi'
import type { Product, ProductCategory, SortOption } from '../types/product'
import { ProductList } from '../components/ProductList'
import { LoadingState } from '../components/LoadingState'
import { ErrorState } from '../components/ErrorState'
import { SearchBar } from '../components/SearchBar'
import { CategoryFilter } from '../components/CategoryFilter'
import { SortControl } from '../components/SortControl'

export function ProductsPage() {
  const dispatch = useAppDispatch()
  const products = useAppSelector(selectProducts)
  const status = useAppSelector(selectProductsStatus)
  const error = useAppSelector(selectProductsError)
  const cartItems = useAppSelector(selectCartItems)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<ProductCategory>('All')
  const [sort, setSort] = useState<SortOption>('default')

  useEffect(() => {
    void dispatch(loadProducts())
  }, [dispatch])

  const visibleProducts = useMemo(
    () => filterAndSortProducts(products, search, category, sort),
    [products, search, category, sort],
  )

  if (status === 'loading' || status === 'idle') {
    return <LoadingState />
  }

  if (status === 'failed') {
    return (
      <ErrorState
        message={error ?? 'Something went wrong.'}
        onRetry={() => {
          clearSimulateError()
          void dispatch(loadProducts({ force: true }))
        }}
      />
    )
  }

  function getAtMaxStock(product: Product) {
    const qty = cartItems.find((i) => i.id === product.id)?.quantity ?? 0
    return product.stock <= 0 || qty >= product.stock
  }

  return (
    <section>
      <div className="mb-4 flex flex-col gap-3 rounded bg-white p-3 shadow-sm sm:flex-row sm:items-center">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter value={category} onChange={setCategory} />
        <SortControl value={sort} onChange={setSort} />
      </div>

      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h1 className="m-0 text-xl font-semibold text-slate-900">Products</h1>
        <p className="m-0 text-sm text-slate-500">{visibleProducts.length} results</p>
      </div>

      <ProductList
        products={visibleProducts}
        getAtMaxStock={getAtMaxStock}
        onAddToCart={(product) => dispatch(addToCart(product))}
      />
    </section>
  )
}
