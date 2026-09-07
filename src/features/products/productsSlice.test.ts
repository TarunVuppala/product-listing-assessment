import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import productsReducer, {
  loadProducts,
  shouldFetchProducts,
  CACHE_TTL_MS,
  type ProductsState,
} from './productsSlice'
import { failNextFetch, resetFetchFailure } from '../../services/productsApi'
import cartReducer from '../cart/cartSlice'

const sampleApiPayload = {
  products: [
    {
      id: 1,
      title: 'iPhone 15',
      description: 'A phone',
      category: 'smartphones',
      price: 999,
      rating: 4.5,
      stock: 12,
      thumbnail: 'https://example.com/1.png',
      images: ['https://example.com/1.png'],
    },
  ],
  total: 1,
  skip: 0,
  limit: 50,
}

function makeStore(preloaded?: { products?: Partial<ProductsState> }) {
  return configureStore({
    reducer: {
      products: productsReducer,
      cart: cartReducer,
    },
    preloadedState: preloaded
      ? {
          products: {
            items: [],
            status: 'idle' as const,
            error: null,
            lastFetchedAt: null,
            ...preloaded.products,
          },
        }
      : undefined,
  })
}

describe('shouldFetchProducts', () => {
  it('fetches when idle', () => {
    expect(
      shouldFetchProducts({
        items: [],
        status: 'idle',
        error: null,
        lastFetchedAt: null,
      }),
    ).toBe(true)
  })

  it('skips when cache is fresh', () => {
    const now = 1_000_000
    expect(
      shouldFetchProducts(
        {
          items: [],
          status: 'succeeded',
          error: null,
          lastFetchedAt: now - 1000,
        },
        { now },
      ),
    ).toBe(false)
  })

  it('fetches when stale or forced', () => {
    const now = 1_000_000
    expect(
      shouldFetchProducts(
        {
          items: [],
          status: 'succeeded',
          error: null,
          lastFetchedAt: now - CACHE_TTL_MS - 1,
        },
        { now },
      ),
    ).toBe(true)
    expect(
      shouldFetchProducts(
        {
          items: [],
          status: 'succeeded',
          error: null,
          lastFetchedAt: now,
        },
        { force: true, now },
      ),
    ).toBe(true)
  })
})

describe('loadProducts thunk', () => {
  beforeEach(() => {
    resetFetchFailure()
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => sampleApiPayload,
      }),
    )
  })

  afterEach(() => {
    resetFetchFailure()
    vi.unstubAllGlobals()
  })

  it('stores DummyJSON products (needed fields) in Redux', async () => {
    const store = makeStore()
    await store.dispatch(loadProducts())

    const state = store.getState().products
    expect(state.status).toBe('succeeded')
    expect(state.items).toHaveLength(1)
    expect(state.items[0]).toEqual({
      id: 1,
      title: 'iPhone 15',
      price: 999,
      category: 'Electronics',
      description: 'A phone',
      rating: 4.5,
      stock: 12,
      image: 'https://example.com/1.png',
    })
    expect(fetch).toHaveBeenCalledWith(
      'https://dummyjson.com/products?limit=100',
    )
  })

  it('skips redundant fetch when cache is fresh', async () => {
    const store = makeStore({
      products: {
        items: [
          {
            id: 1,
            title: 'Cached',
            price: 1,
            category: 'smartphones',
            description: 'x',
            rating: 5,
            stock: 1,
            image: '',
          },
        ],
        status: 'succeeded',
        error: null,
        lastFetchedAt: Date.now(),
      },
    })

    await store.dispatch(loadProducts())
    expect(fetch).not.toHaveBeenCalled()
    expect(store.getState().products.items[0]?.title).toBe('Cached')
  })

  it('sets error state on failure', async () => {
    failNextFetch()
    const store = makeStore()
    await store.dispatch(loadProducts({ force: true }))
    expect(store.getState().products.status).toBe('failed')
    expect(fetch).not.toHaveBeenCalled()
  })
})
