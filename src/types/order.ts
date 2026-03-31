import type { CartItem } from "./cart"

export type OrderStatus = 'pending' | 'completed' | 'cancelled'

export type Order = {
    id: number
    userId: number
    items: CartItem[]
    total: number
    status: OrderStatus
    createdAt: string
}