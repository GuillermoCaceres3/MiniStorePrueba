import { useEffect, useState } from 'react'
import { getAllCategories } from '../../services/productService'
import { useCategoriesStore } from '../../store/categoriesStore'

const AdminCategoriesSection = () => {
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const inactiveCategories = useCategoriesStore(
    (state) => state.inactiveCategories,
  )
  const toggleCategoryStatus = useCategoriesStore(
    (state) => state.toggleCategoryStatus,
  )

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const data = await getAllCategories()
        setCategories(data)
      } catch {
        setError('Failed to load categories.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Categories</h2>
        <p className="mt-4 text-sm text-slate-600">Loading categories...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Categories</h2>
        <p className="mt-4 text-sm text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900">Categories</h2>
        <p className="mt-2 text-sm text-slate-600">
          Activate or deactivate product categories.
        </p>
      </div>

      {categories.length === 0 ? (
        <p className="text-sm text-slate-500">No categories found.</p>
      ) : (
        <div className="space-y-3">
          {categories.map((category) => {
            const isInactive = inactiveCategories.includes(category)

            return (
              <div
                key={category}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4"
              >
                <div>
                  <p className="text-sm font-medium capitalize text-slate-900">
                    {category}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Status: {isInactive ? 'Inactive' : 'Active'}
                  </p>
                </div>

                <button
                  onClick={() => toggleCategoryStatus(category)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    isInactive
                      ? 'border border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
                      : 'border border-red-200 bg-red-50 text-red-600 hover:bg-red-100'
                  }`}
                >
                  {isInactive ? 'Activate' : 'Deactivate'}
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default AdminCategoriesSection