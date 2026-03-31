import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useCartStore } from '../store/cartStore'
import UserDropdown from './UserDropdown'

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const location = useLocation()

  const currentUser = useAuthStore((state) => state.currentUser)
  const logout = useAuthStore((state) => state.logout)

  const cartItemsCount = useCartStore((state) => state.getTotalItems())
  const clearCart = useCartStore((state) => state.clearCart)

  const role = currentUser?.role ?? 'guest'
  const username = currentUser?.username ?? 'Account'

  const handleLogout = () => {
    logout()
    clearCart()
    setIsDropdownOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setIsDropdownOpen(false)
  }, [location.pathname])

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

          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              {username}
            </button>

            <UserDropdown
              role={role}
              username={currentUser?.username}
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