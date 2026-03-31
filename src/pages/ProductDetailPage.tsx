import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../services/productService'
import type { Product } from '../types/product'
import { useCartStore } from '../store/cartStore'

const ProductDetailPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const addToCart = useCartStore((state) => state.addToCart)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        setError(null)

        if (!id) {
          throw new Error('Product id is required')
        }

        const data = await getProductById(Number(id))
        setProduct(data)
      } catch {
        setError('Failed to load product.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (isLoading) {
    return <div className="p-6">Loading product...</div>
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>
  }

  if (!product) {
    return <div className="p-6">Product not found.</div>
  }

  return (
    <section className="p-6">
      <div className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
        <div className="flex items-center justify-center rounded-xl bg-slate-50 p-6">
          <img
            src={product.image}
            alt={product.title}
            className="h-80 w-full object-contain"
          />
        </div>

        <div>
          <p className="text-sm capitalize text-slate-500">{product.category}</p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            {product.title}
          </h1>

          <p className="mt-4 text-2xl font-bold text-slate-800">
            ${product.price}
          </p>

          <p className="mt-6 text-sm leading-6 text-slate-600">
            {product.description}
          </p>
          <button 
          onClick={() => addToCart(product)}
          className="mt-8 rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
            Add to cart
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductDetailPage