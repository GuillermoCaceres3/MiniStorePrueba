import {Routes, Route} from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import CartPage from '../pages/CartPage'
import AdminDashboardPage from '../pages/AdminDashboardPage'
import OrdersPage from '../pages/OrdersPage'
import ProtectedRoute from './ProtectedRoute'
import AdminRoute from './AdminRoute'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/orders" element={<OrdersPage />} />
            </Route>
            <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminDashboardPage />} />
            </Route>
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
    )
}

export default AppRouter