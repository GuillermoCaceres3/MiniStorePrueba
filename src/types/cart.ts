export type CartItem = {
   productId: number
   title: string
   price: number
   image: string
   quantity: number
}

export type Cart = {
    id: number
    userId: number
    items: CartItem[]
}