import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
  selectCartItems,
  selectSubtotal,
  selectTotalItemCount,
} from '../features/cart/cartSlice'
import { CartItem } from '../components/CartItem'
import { CartSummary } from '../components/CartSummary'
import { EmptyState } from '../components/EmptyState'

export function CartPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const totalItems = useAppSelector(selectTotalItemCount)
  const subtotal = useAppSelector(selectSubtotal)

  if (items.length === 0) {
    return (
      <section>
        <h1 className="text-2xl font-bold text-slate-900">Cart</h1>
        <div className="mt-3">
          <EmptyState message="Your cart is empty." />
        </div>
        <p className="mt-3">
          <Link to="/">Browse products</Link>
        </p>
      </section>
    )
  }

  return (
    <section className="grid gap-4 md:grid-cols-[1fr_260px]">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Cart</h1>
        <ul className="mt-3 grid list-none gap-3 p-0">
          {items.map((item) => (
            <li key={item.id}>
              <CartItem
                item={item}
                onIncrement={(id) => dispatch(incrementQuantity(id))}
                onDecrement={(id) => dispatch(decrementQuantity(id))}
                onRemove={(id) => dispatch(removeItem(id))}
              />
            </li>
          ))}
        </ul>
      </div>
      <CartSummary totalItems={totalItems} subtotal={subtotal} />
    </section>
  )
}
