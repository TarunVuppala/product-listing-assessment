import type { CartItem as CartItemType } from '../features/cart/cartSlice'
import { formatPrice } from '../utils/formatPrice'

interface CartItemProps {
  item: CartItemType
  onIncrement: (id: number) => void
  onDecrement: (id: number) => void
  onRemove: (id: number) => void
}

export function CartItem({ item, onIncrement, onDecrement, onRemove }: CartItemProps) {
  const atMax = item.quantity >= item.stock

  return (
    <article
      className="flex gap-3 rounded-lg border border-slate-200 bg-white p-3"
      data-testid={`cart-item-${item.id}`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="h-20 w-20 rounded object-contain bg-slate-100"
      />
      <div className="grid gap-1">
        <h2 className="m-0 text-base font-semibold">{item.title}</h2>
        <p className="m-0 text-sm">{formatPrice(item.price)} each</p>
        <p className="m-0 text-sm">Line total: {formatPrice(item.price * item.quantity)}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <button
            type="button"
            aria-label={`Decrease quantity of ${item.title}`}
            onClick={() => onDecrement(item.id)}
            disabled={item.quantity <= 1}
            className="rounded border border-slate-300 bg-white px-2 py-1 disabled:opacity-50"
          >
            −
          </button>
          <span data-testid={`quantity-${item.id}`}>{item.quantity}</span>
          <button
            type="button"
            aria-label={`Increase quantity of ${item.title}`}
            onClick={() => onIncrement(item.id)}
            disabled={atMax}
            className="rounded border border-slate-300 bg-white px-2 py-1 disabled:opacity-50"
          >
            +
          </button>
          <button
            type="button"
            aria-label={`Remove ${item.title} from cart`}
            onClick={() => onRemove(item.id)}
            className="rounded border border-slate-300 bg-white px-2 py-1"
          >
            Remove
          </button>
        </div>
        {atMax && <p className="m-0 text-sm text-amber-700">Maximum stock reached</p>}
      </div>
    </article>
  )
}
