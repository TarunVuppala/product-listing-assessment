import { Link, NavLink } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectTotalItemCount } from '../features/cart/cartSlice'

export function Header() {
  const totalItems = useAppSelector(selectTotalItemCount)

  return (
    <header className="flex items-center justify-between gap-4 bg-slate-900 px-5 py-3 text-white">
      <Link to="/" className="text-lg font-bold text-white no-underline">
        ShopLite
      </Link>
      <nav className="flex gap-4" aria-label="Main">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? 'font-semibold text-white' : 'text-slate-300'
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? 'font-semibold text-white' : 'text-slate-300'
          }
        >
          Cart{totalItems > 0 ? ` (${totalItems})` : ''}
        </NavLink>
      </nav>
    </header>
  )
}
