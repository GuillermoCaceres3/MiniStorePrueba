import { useState } from 'react'
import AdminUsersSection from '../components/admin/AdminUsersSection'
import AdminOrdersSection from '../components/admin/AdminOrdersSection'
import AdminCategoriesSection from '../components/admin/AdminCategoriesSection'

type AdminSection = 'users' | 'orders' | 'categories'

const AdminDashboardPage = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>('users')

  const renderSection = () => {
    switch (activeSection) {
      case 'users':
        return (
        <AdminUsersSection />
        )

      case 'orders':
        return (
          <AdminOrdersSection />
        )

      case 'categories':
        return (
          <AdminCategoriesSection />
        )

      default:
        return null
    }
  }

  return (
    <section className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">
          Manage users, orders, and categories from one place.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={() => setActiveSection('users')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            activeSection === 'users'
              ? 'bg-slate-900 text-white'
              : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          Users
        </button>

        <button
          onClick={() => setActiveSection('orders')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            activeSection === 'orders'
              ? 'bg-slate-900 text-white'
              : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          Orders
        </button>

        <button
          onClick={() => setActiveSection('categories')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            activeSection === 'categories'
              ? 'bg-slate-900 text-white'
              : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          Categories
        </button>
      </div>

      {renderSection()}
    </section>
  )
}

export default AdminDashboardPage