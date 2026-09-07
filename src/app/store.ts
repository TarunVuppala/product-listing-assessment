import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../features/products/productsSlice'
import cartReducer from '../features/cart/cartSlice'
import { loadCart, saveCart } from '../features/cart/cartPersistence'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
  preloadedState: {
    cart: {
      items: loadCart(),
    },
  },
})

store.subscribe(() => {
  saveCart(store.getState().cart.items)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
