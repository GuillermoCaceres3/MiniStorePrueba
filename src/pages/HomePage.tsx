import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { getAllCategories, getAllProducts } from '../services/productService'
import { useCategoriesStore } from '../store/categoriesStore'
import type { Product } from '../types/product'

const PRODUCTS_PER_PAGE = 8

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortOrder, setSortOrder] = useState('default')
  const [currentPage, setCurrentPage] = useState(1)

  const inactiveCategories = useCategoriesStore(
    (state) => state.inactiveCategories,
  )

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const data = await getAllProducts()
        setProducts(data)
      } catch {
        setError('No se pudieron cargar los productos.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories()
        setCategories(data)
      } catch (error) {
        console.error('Error loading categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim()

    let updatedProducts = products.filter((product) => {
      const isCategoryInactive = inactiveCategories.includes(product.category)

      if (isCategoryInactive) return false

      const matchesSearch =
        product.title.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch)

      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory

      return matchesSearch && matchesCategory
    })

    if (sortOrder === 'price-asc') {
      updatedProducts = [...updatedProducts].sort((a, b) => a.price - b.price)
    }

    if (sortOrder === 'price-desc') {
      updatedProducts = [...updatedProducts].sort((a, b) => b.price - a.price)
    }

    return updatedProducts
  }, [products, searchTerm, inactiveCategories, selectedCategory, sortOrder])

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE
    const end = start + PRODUCTS_PER_PAGE

    return filteredProducts.slice(start, end)
  }, [filteredProducts, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory, sortOrder])

  if (isLoading) {
    return <div className="p-6">Cargando productos...</div>
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>
  }

  return (
    <section className="p-6">
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold text-slate-900">Productos</h1>

          <input
            type="text"
            placeholder="Buscar por nombre o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-slate-500"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-slate-500"
          >
            <option value="all">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-slate-500"
          >
            <option value="default">Orden por defecto</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-slate-600">No se encontraron productos.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Anterior
            </button>

            <span className="text-sm text-slate-700">
              Página {currentPage} de {totalPages || 1}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </section>
  )
}

export default HomePage