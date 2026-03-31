import type { CartItem } from "./cart"

export type Order = {
    id: number
    userId: number
    items: CartItem[]
    total: number
    status: 'pending' | 'completed' | 'cancelled'
    createdAt: string
}