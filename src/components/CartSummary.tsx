import { formatPrice } from '../utils/formatPrice'

interface CartSummaryProps {
  totalItems: number
  subtotal: number
}

export function CartSummary({ totalItems, subtotal }: CartSummaryProps) {
  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-4" aria-live="polite">
      <h2 className="mt-0 text-lg font-semibold">Order summary</h2>
      <p>
        Total items: <strong>{totalItems}</strong>
      </p>
      <p>
        Subtotal: <strong>{formatPrice(subtotal)}</strong>
      </p>
    </aside>
  )
}
