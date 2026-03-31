import { api } from "./api";
import type { Product } from "../types/product";

export const getAllProducts = async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products')
    return response.data
}

export const getProductById = async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`)
    return response.data
}

export const getAllCategories = async (): Promise<string[]> => {
  const response = await api.get<string[]>('/products/categories')
  return response.data
}