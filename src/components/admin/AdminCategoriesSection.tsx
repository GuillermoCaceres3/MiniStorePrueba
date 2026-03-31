import { useEffect, useState } from 'react'
import ConfirmModal from '../ui/ConfirmModal'
import { getAllCategories } from '../../services/productService'
import { useCategoriesStore } from '../../store/categoriesStore'

const AdminCategoriesSection = () => {
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

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
        setError('No se pudieron cargar las categorías.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const closeModal = () => {
    setSelectedCategory(null)
  }

  const handleConfirm = () => {
    if (!selectedCategory) return
    toggleCategoryStatus(selectedCategory)
    closeModal()
  }

  const isInactive = selectedCategory
    ? inactiveCategories.includes(selectedCategory)
    : false

  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Categorías</h2>
        <p className="mt-4 text-sm text-slate-600">
          Cargando categorías...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Categorías</h2>
        <p className="mt-4 text-sm text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900">Categorías</h2>
          <p className="mt-2 text-sm text-slate-600">
            Activa o desactiva categorías de productos.
          </p>
        </div>

        {categories.length === 0 ? (
          <p className="text-sm text-slate-500">
            No se encontraron categorías.
          </p>
        ) : (
          <div className="space-y-3">
            {categories.map((category) => {
              const categoryIsInactive = inactiveCategories.includes(category)

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
                      Estado: {categoryIsInactive ? 'Inactiva' : 'Activa'}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                      categoryIsInactive
                        ? 'border border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
                        : 'border border-red-200 bg-red-50 text-red-600 hover:bg-red-100'
                    }`}
                  >
                    {categoryIsInactive ? 'Activar' : 'Desactivar'}
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!selectedCategory}
        title={isInactive ? 'Activar categoría' : 'Desactivar categoría'}
        message={
          selectedCategory
            ? isInactive
              ? `¿Estás seguro de que deseas activar la categoría ${selectedCategory}?`
              : `¿Estás seguro de que deseas desactivar la categoría ${selectedCategory}? Sus productos dejarán de aparecer en la tienda.`
            : ''
        }
        confirmText={isInactive ? 'Activar' : 'Desactivar'}
        cancelText="Cancelar"
        onConfirm={handleConfirm}
        onClose={closeModal}
      />
    </>
  )
}

export default AdminCategoriesSection