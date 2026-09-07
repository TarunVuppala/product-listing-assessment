import { formatPrice } from '../utils/formatPrice'

interface CartSummaryProps {
  totalItems: number
  subtotal: number
}

export function CartSummary({ totalItems, subtotal }: CartSummaryProps) {
  return (
    <aside
      className="rounded bg-white p-4 shadow-sm md:sticky md:top-4"
      aria-live="polite"
    >
      <h2 className="mt-0 mb-3 text-lg font-semibold text-slate-900">Order summary</h2>
      <div className="flex items-center justify-between border-b border-slate-100 py-2 text-sm">
        <span className="text-slate-600">Total items</span>
        <strong>{totalItems}</strong>
      </div>
      <div className="flex items-center justify-between py-3">
        <span className="text-slate-800">Subtotal</span>
        <strong className="text-xl">{formatPrice(subtotal)}</strong>
      </div>
    </aside>
  )
}
