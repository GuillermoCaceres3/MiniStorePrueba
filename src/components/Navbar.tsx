import { useState } from 'react'
import { Link } from 'react-router-dom'
import UserDropdown from './UserDropdown'
import { useCartStore } from '../store/cartStore'

type Role = 'guest' | 'user' | 'admin'

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Mock data temporal
  const [role] = useState<Role>('user')
  const username = 'Guille'
  const cartItemsCount = useCartStore((state) => state.getTotalItems())

  const handleLogout = () => {
    console.log('Logging out...')
  }

  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="flex w-full items-center justify-between px-6 py-4">
        <div className="flex w-48 items-center">
          <Link to="/" className="text-xl font-bold text-slate-900">
            Mini Store
          </Link>
        </div>

        <div className="flex w-48 items-center justify-end gap-3">
          {role === 'user' && (
            <Link
              to="/cart"
              className="relative rounded-lg p-2 transition hover:bg-slate-100"
            >
              <span className="text-xl">🛒</span>
              {cartItemsCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-1 text-xs font-semibold text-white">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          )}

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              {role === 'guest' ? 'Account' : username}
            </button>

            <UserDropdown
              role={role}
              username={role === 'guest' ? 'Account' : username}
              isOpen={isDropdownOpen}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar