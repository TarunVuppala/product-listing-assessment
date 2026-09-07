import type { Product } from '../types/product'
import {
  toProducts,
  type DummyJsonProductsResponse,
} from './productAdapter'

export const PRODUCTS_API_URL = 'https://dummyjson.com/products?limit=50'
export const SIMULATE_ERROR_KEY = 'simulate-products-error'

let shouldFailNextFetch = false

export function failNextFetch(): void {
  shouldFailNextFetch = true
}

export function resetFetchFailure(): void {
  shouldFailNextFetch = false
}

function shouldSimulateError(): boolean {
  try {
    return sessionStorage.getItem(SIMULATE_ERROR_KEY) === '1'
  } catch {
    return false
  }
}

export function clearSimulateError(): void {
  try {
    sessionStorage.removeItem(SIMULATE_ERROR_KEY)
  } catch {
    // ignore
  }
}

/** Fetch DummyJSON products and keep the fields we need as-is. */
export async function fetchProducts(): Promise<Product[]> {
  if (shouldFailNextFetch) {
    shouldFailNextFetch = false
    throw new Error('Failed to fetch products. Please try again.')
  }

  if (shouldSimulateError()) {
    throw new Error('Failed to fetch products. Please try again.')
  }

  const response = await fetch(PRODUCTS_API_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch products. Please try again.')
  }

  const data = (await response.json()) as DummyJsonProductsResponse
  return toProducts(data.products ?? [])
}
