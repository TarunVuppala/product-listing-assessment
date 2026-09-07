import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

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
    // Phase 2: addToCart, increment, decrement, remove
  },
})

export default cartSlice.reducer

export const selectCartItems = (state: RootState) => state.cart.items

export const selectTotalItemCount = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
