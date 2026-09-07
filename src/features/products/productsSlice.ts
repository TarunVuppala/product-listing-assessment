import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchProducts } from '../../services/productsApi'
import type { Product } from '../../types/product'
import type { RootState } from '../../app/store'

export const CACHE_TTL_MS = 5 * 60 * 1000

export type FetchStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface ProductsState {
  items: Product[]
  status: FetchStatus
  error: string | null
  lastFetchedAt: number | null
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  lastFetchedAt: null,
}

export function shouldFetchProducts(
  state: ProductsState,
  options?: { force?: boolean; now?: number },
): boolean {
  if (options?.force) return true
  if (state.status === 'loading') return false
  if (state.status !== 'succeeded' || state.lastFetchedAt == null) return true

  const now = options?.now ?? Date.now()
  return now - state.lastFetchedAt >= CACHE_TTL_MS
}

export const loadProducts = createAsyncThunk<
  Product[],
  { force?: boolean } | undefined,
  { state: RootState; rejectValue: string }
>(
  'products/loadProducts',
  async (_arg, { rejectWithValue }) => {
    try {
      return await fetchProducts()
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to fetch products.'
      return rejectWithValue(message)
    }
  },
  {
    condition: (arg, { getState }) => {
      const { products } = getState()
      return shouldFetchProducts(products, { force: arg?.force })
    },
  },
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
        state.error = null
        state.lastFetchedAt = Date.now()
      })
      .addCase(loadProducts.rejected, (state, action) => {
        if (action.meta.condition || action.meta.aborted) return
        state.status = 'failed'
        state.error =
          action.payload ?? action.error.message ?? 'Request failed'
      })
  },
})

export default productsSlice.reducer

export const selectProducts = (state: RootState) => state.products.items
export const selectProductsStatus = (state: RootState) => state.products.status
export const selectProductsError = (state: RootState) => state.products.error
