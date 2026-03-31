import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = () => {
    const currentUser = useAuthStore((state) => state.currentUser)

    if (!currentUser) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default ProtectedRoute