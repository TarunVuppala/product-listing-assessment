import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import type { Product } from '../../types/product'

export interface CartItem {
  id: number
  title: string
  price: number
  image: string
  stock: number
  quantity: number
}

export interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload
      if (product.stock <= 0) return

      const existing = state.items.find((item) => item.id === product.id)
      if (existing) {
        if (existing.quantity < existing.stock) {
          existing.quantity += 1
        }
        return
      }

      state.items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        stock: product.stock,
        quantity: 1,
      })
    },
    incrementQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.id === action.payload)
      if (item && item.quantity < item.stock) {
        item.quantity += 1
      }
    },
    decrementQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.id === action.payload)
      if (item && item.quantity > 1) {
        item.quantity -= 1
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload)
    },
  },
})

export const { addToCart, incrementQuantity, decrementQuantity, removeItem } =
  cartSlice.actions

export default cartSlice.reducer

export const selectCartItems = (state: RootState) => state.cart.items

export const selectTotalItemCount = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0)

export const selectSubtotal = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
