import type { CartItem } from './cartSlice'

export const CART_STORAGE_KEY = 'shopping-cart'

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) return false
  const item = value as Record<string, unknown>
  return (
    typeof item.id === 'number' &&
    typeof item.title === 'string' &&
    typeof item.price === 'number' &&
    typeof item.image === 'string' &&
    typeof item.stock === 'number' &&
    typeof item.quantity === 'number' &&
    item.quantity > 0 &&
    item.stock >= 0 &&
    item.quantity <= item.stock
  )
}

export function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isCartItem)
  } catch {
    return []
  }
}

export function saveCart(items: CartItem[]): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch {
    // ignore write failures (private mode / quota)
  }
}
