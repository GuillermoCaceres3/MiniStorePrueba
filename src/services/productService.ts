import { api } from "./api";
import type { Product } from "../types/product";

type PlatziCategory = {
  id: number
  name: string
  slug: string
  image: string
}

type PlatziProduct = {
  id: number
  title: string
  price: number
  description: string
  images: string[]
  category: PlatziCategory
}

const mapPlatziProductToProduct = (product: PlatziProduct): Product => {
  const validImage =
    product.images?.find(
      (img) => typeof img === 'string' && img.startsWith('http'),
    ) ?? ''

  return {
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category?.name ?? 'Uncategorized',
    image: validImage,
  }
}

export const getAllProducts = async (): Promise<Product[]> => {
    const response = await api.get<PlatziProduct[]>('/products')
    return response.data.map(mapPlatziProductToProduct)
}

export const getProductById = async (id: number): Promise<Product> => {
    const response = await api.get<PlatziProduct>(`/products/${id}`)
    return mapPlatziProductToProduct(response.data)
}

type PlatziCategoryResponse = {
  id: number
  name: string
  image: string
  slug: string
}

export const getAllCategories = async (): Promise<string[]> => {
  const response = await api.get<PlatziCategoryResponse[]>('/categories')
  return response.data.map((category) => category.name)
}