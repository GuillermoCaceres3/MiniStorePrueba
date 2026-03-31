import { create } from 'zustand'
import type { CartItem } from '../types/cart'
import type { Order } from '../types/order'

type CreateOrderData = {
  userId: number
  items: CartItem[]
  total: number
}

type OrdersStore = {
  orders: Order[]
  createOrder: (data: CreateOrderData) => Order
  getOrdersByUserId: (userId: number) => Order[]
  getAllOrders: () => Order[]
}

const getStoredOrders = (): Order[] => {
  const storedOrders = localStorage.getItem('orders')
  return storedOrders ? JSON.parse(storedOrders) : []
}

export const useOrdersStore = create<OrdersStore>((set, get) => ({
  orders: getStoredOrders(),

  createOrder: ({ userId, items, total }) => {
    const newOrder: Order = {
      id: Date.now(),
      userId,
      items,
      total,
      status: 'completed',
      createdAt: new Date().toISOString(),
    }

    const updatedOrders = [...get().orders, newOrder]

    localStorage.setItem('orders', JSON.stringify(updatedOrders))

    set({
      orders: updatedOrders,
    })

    return newOrder
  },

  getOrdersByUserId: (userId) => {
    return get().orders.filter((order) => order.userId === userId)
  },

  getAllOrders: () => {
    return get().orders
  },
}))