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
          {username || 'Invitado'}
        </p>
      </div>

      <div className="mt-2 flex flex-col">
        {role === 'guest' && (
          <>
            <Link
              to="/login"
              className="rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/register"
              className="rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
            >
              Registrarse
            </Link>
          </>
        )}

        {role === 'user' && (
          <>
            <Link
              to="/orders"
              className="rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
            >
              Mis ordenes
            </Link>
            <button
              onClick={onLogout}
              className="rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
            >
              Cerrar sesión
            </button>
          </>
        )}

        {role === 'admin' && (
          <>
            <Link
              to="/admin"
              className="rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
            >
              Panel de administrador
            </Link>
            <button
              onClick={onLogout}
              className="rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default UserDropdown