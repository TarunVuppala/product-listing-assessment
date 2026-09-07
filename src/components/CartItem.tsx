import { Minus, Plus, Trash2 } from 'lucide-react'
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
      className="flex gap-4 border-b border-slate-200 py-4 last:border-b-0"
      data-testid={`cart-item-${item.id}`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="h-24 w-24 shrink-0 object-contain bg-[#f7f8fa]"
      />

      <div className="min-w-0 flex-1">
        <h2 className="m-0 text-base font-medium text-slate-900">{item.title}</h2>
        <p className="mt-1 m-0 text-lg font-bold">{formatPrice(item.price)}</p>
        <p className="m-0 text-sm text-slate-500">
          Line total: {formatPrice(item.price * item.quantity)}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <div className="inline-flex overflow-hidden rounded border border-slate-300">
            <button
              type="button"
              aria-label={`Decrease quantity of ${item.title}`}
              onClick={() => onDecrement(item.id)}
              disabled={item.quantity <= 1}
              className="flex h-8 w-8 items-center justify-center bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Minus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <span
              data-testid={`quantity-${item.id}`}
              className="flex h-8 min-w-10 items-center justify-center border-x border-slate-300 bg-white text-sm font-medium"
            >
              {item.quantity}
            </span>
            <button
              type="button"
              aria-label={`Increase quantity of ${item.title}`}
              onClick={() => onIncrement(item.id)}
              disabled={atMax}
              className="flex h-8 w-8 items-center justify-center bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            aria-label={`Remove ${item.title} from cart`}
            onClick={() => onRemove(item.id)}
            className="inline-flex items-center gap-1 text-sm text-[#2874f0] hover:underline"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            Remove
          </button>
        </div>

        {atMax && (
          <p className="mt-2 m-0 text-sm text-amber-700">Maximum stock reached</p>
        )}
      </div>
    </article>
  )
}
