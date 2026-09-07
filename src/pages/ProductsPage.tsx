import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  loadProducts,
  selectProducts,
  selectProductsError,
  selectProductsStatus,
} from '../features/products/productsSlice'
import { clearSimulateError } from '../services/productsApi'
import { ProductList } from '../components/ProductList'
import { LoadingState } from '../components/LoadingState'
import { ErrorState } from '../components/ErrorState'

export function ProductsPage() {
  const dispatch = useAppDispatch()
  const products = useAppSelector(selectProducts)
  const status = useAppSelector(selectProductsStatus)
  const error = useAppSelector(selectProductsError)

  useEffect(() => {
    void dispatch(loadProducts())
  }, [dispatch])

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

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold text-slate-900">Products</h1>
      <ProductList products={products} />
    </section>
  )
}
