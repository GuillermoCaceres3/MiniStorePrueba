import { create } from 'zustand'
import type { Product } from '../types/product'
import type { CartItem } from '../types/cart'

type CartStore = {
    items: CartItem[]
    addToCart: (product: Product) => void
    removeFromCart: (productId: number) => void
    clearCart: () => void
    increaseQuantity: (productId: number) => void
    decreaseQuantity: (productId: number) => void
    getTotalItems: () => number
    getTotalPrice: () => number
}


export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addToCart: (product) =>
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.productId === product.id,
      )

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }
      }

      const newItem: CartItem = {
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      }

      return {
        items: [...state.items, newItem],
      }
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.productId !== productId),
    })),

  clearCart: () => set({ items: [] }),

  increaseQuantity: (productId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    })),

  decreaseQuantity: (productId) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    })),

  getTotalItems: () => {
    const items = get().items
    return items.reduce((total, item) => total + item.quantity, 0)
  },

  getTotalPrice: () => {
    const items = get().items
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  },
}))