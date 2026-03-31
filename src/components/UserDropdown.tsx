import { Link } from 'react-router-dom'
import type { Role } from '../types/role'

type UserDropdownProps = {
  role: Role | 'guest'
  username?: string
  isOpen: boolean
  onLogout?: () => void
}

const UserDropdown = ({
  role,
  username,
  isOpen,
  onLogout,
}: UserDropdownProps) => {
  if (!isOpen) return null

 return (
    <div className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
      <div className="border-b border-slate-100 px-3 py-2">
        <p className="text-sm font-semibold text-slate-800">
          {username || 'Guest'}
        </p>
      </div>

      <div className="mt-2 flex flex-col">
        {role === 'guest' && (
          <>
            <Link
              to="/login"
              className="rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
            >
              Sign Up
            </Link>
          </>
        )}

        {role === 'user' && (
          <>
            <Link
              to="/orders"
              className="rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
            >
              My Orders
            </Link>
            <button
              onClick={onLogout}
              className="rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
            >
              Logout
            </button>
          </>
        )}

        {role === 'admin' && (
          <>
            <Link
              to="/admin"
              className="rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
            >
              Admin Dashboard
            </Link>
            <button
              onClick={onLogout}
              className="rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default UserDropdown