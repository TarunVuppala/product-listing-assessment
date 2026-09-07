import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, Store } from 'lucide-react'
import { useAppSelector } from '../app/hooks'
import { selectTotalItemCount } from '../features/cart/cartSlice'

export function Header() {
  const totalItems = useAppSelector(selectTotalItemCount)

  return (
    <header className="bg-[#131921] text-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight text-white no-underline hover:opacity-90"
        >
          <Store className="h-5 w-5" aria-hidden="true" />
          E-Commerce Store
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rounded px-3 py-2 text-sm no-underline ${
                isActive
                  ? 'bg-white/10 font-semibold text-white'
                  : 'text-slate-200 hover:bg-white/5'
              }`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/cart"
            aria-label={totalItems > 0 ? `Cart (${totalItems})` : 'Cart'}
            className={({ isActive }) =>
              `relative flex items-center gap-1.5 rounded px-3 py-2 text-sm no-underline ${
                isActive
                  ? 'bg-white/10 font-semibold text-white'
                  : 'text-slate-200 hover:bg-white/5'
              }`
            }
          >
            <ShoppingCart className="h-4 w-4" aria-hidden="true" />
            Cart
            {totalItems > 0 && (
              <span
                aria-hidden="true"
                className="inline-flex min-w-5 items-center justify-center rounded-full bg-[#f08804] px-1.5 py-0.5 text-xs font-bold text-[#131921]"
              >
                {totalItems}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
