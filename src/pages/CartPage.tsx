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
      <section className="rounded bg-white p-6 shadow-sm">
        <h1 className="m-0 text-xl font-semibold text-slate-900">Cart</h1>
        <div className="mt-4">
          <EmptyState message="Your cart is empty." />
        </div>
        <p className="mt-4">
          <Link to="/" className="text-[#2874f0] hover:underline">
            Browse products
          </Link>
        </p>
      </section>
    )
  }

  return (
    <section>
      <h1 className="mb-4 text-xl font-semibold text-slate-900">Cart</h1>
      <div className="grid gap-4 md:grid-cols-[1fr_280px] md:items-start">
        <div className="rounded bg-white px-4 shadow-sm">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrement={(id) => dispatch(incrementQuantity(id))}
              onDecrement={(id) => dispatch(decrementQuantity(id))}
              onRemove={(id) => dispatch(removeItem(id))}
            />
          ))}
        </div>
        <CartSummary totalItems={totalItems} subtotal={subtotal} />
      </div>
    </section>
  )
}
