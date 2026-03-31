import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useCartStore } from '../store/cartStore'
import { useOrdersStore } from '../store/orderStore'

const CartPage = () => {
  const navigate = useNavigate()
  const currentUser = useAuthStore((state) => state.currentUser)

  const items = useCartStore((state) => state.items)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const clearCart = useCartStore((state) => state.clearCart)
  const totalPrice = useCartStore((state) => state.getTotalPrice())
  const totalItems = useCartStore((state) => state.getTotalItems())

  const createOrder = useOrdersStore((state) => state.createOrder)

  const handleCheckout = () => {
    if (!currentUser || items.length === 0) return

    createOrder({
      userId: currentUser.id,
      items,
      total: totalPrice
    })

    clearCart()
    navigate('/orders')
  }

  if (items.length === 0) {
    return (
      <section className="p-6">
        <h1 className="mb-4 text-3xl font-bold text-slate-900">Your Cart</h1>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-slate-600">Your cart is empty.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Your Cart</h1>

        <button
          onClick={clearCart}
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={item.productId}
              className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
            >
              <div className="flex h-24 w-full items-center justify-center rounded-lg bg-slate-50 p-3 sm:w-24">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-sm font-semibold text-slate-900">
                  {item.title}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQuantity(item.productId)}
                  className="rounded-lg border border-slate-300 px-3 py-1 text-sm transition hover:bg-slate-100"
                >
                  -
                </button>

                <span className="min-w-8 text-center text-sm font-medium text-slate-800">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQuantity(item.productId)}
                  className="rounded-lg border border-slate-300 px-3 py-1 text-sm transition hover:bg-slate-100"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="mt-2 text-sm font-medium text-red-600 transition hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>

          <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
            <span>Total items</span>
            <span>{totalItems}</span>
          </div>

          <div className="mt-2 flex items-center justify-between text-base font-semibold text-slate-900">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button 
          onClick={handleCheckout}
          className="mt-6 w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
            Proceed to Checkout
          </button>
        </aside>
      </div>
    </section>
  )
}

export default CartPage