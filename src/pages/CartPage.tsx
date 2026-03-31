import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfirmModal from '../components/ui/ConfirmModal'
import { useAuthStore } from '../store/authStore'
import { useCartStore } from '../store/cartStore'
import { useOrdersStore } from '../store/orderStore'

type CartModalAction = 'clear' | 'checkout' | null

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

  const [modalAction, setModalAction] = useState<CartModalAction>(null)

  const closeModal = () => {
    setModalAction(null)
  }

  const handleCheckout = () => {
    if (!currentUser || items.length === 0) return

    createOrder({
      userId: currentUser.id,
      items,
      total: totalPrice,
    })

    clearCart()
    closeModal()
    navigate('/orders')
  }

  const handleConfirm = () => {
    if (modalAction === 'clear') {
      clearCart()
      closeModal()
      return
    }

    if (modalAction === 'checkout') {
      handleCheckout()
    }
  }

  const getModalTitle = () => {
    if (modalAction === 'clear') return 'Vaciar carrito'
    if (modalAction === 'checkout') return 'Confirmar compra'
    return ''
  }

  const getModalMessage = () => {
    if (modalAction === 'clear') {
      return '¿Estás seguro de que deseas eliminar todos los productos de tu carrito?'
    }

    if (modalAction === 'checkout') {
      return '¿Estás seguro de que deseas realizar esta compra?'
    }

    return ''
  }

  const getConfirmText = () => {
    if (modalAction === 'clear') return 'Vaciar'
    if (modalAction === 'checkout') return 'Comprar'
    return 'Confirmar'
  }

  if (items.length === 0) {
    return (
      <section className="p-6">
        <h1 className="mb-4 text-3xl font-bold text-slate-900">Tu carrito</h1>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-slate-600">Tu carrito está vacío.</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">Tu carrito</h1>

          <button
            onClick={() => setModalAction('clear')}
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
          >
            Vaciar carrito
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
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Resumen del pedido
            </h2>

            <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
              <span>Total de productos</span>
              <span>{totalItems}</span>
            </div>

            <div className="mt-2 flex items-center justify-between text-base font-semibold text-slate-900">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button
              onClick={() => setModalAction('checkout')}
              className="mt-6 w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Proceder al pago
            </button>
          </aside>
        </div>
      </section>

      <ConfirmModal
        isOpen={!!modalAction}
        title={getModalTitle()}
        message={getModalMessage()}
        confirmText={getConfirmText()}
        cancelText="Cancelar"
        onConfirm={handleConfirm}
        onClose={closeModal}
      />
    </>
  )
}

export default CartPage