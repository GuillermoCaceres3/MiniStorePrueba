import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

const AdminRoute = () => {
  const currentUser = useAuthStore((state) => state.currentUser)

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  if (currentUser.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default AdminRoute