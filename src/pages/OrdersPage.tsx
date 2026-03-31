import { useAuthStore } from '../store/authStore'
import { useOrdersStore } from '../store/orderStore'

const OrdersPage = () => {
  const currentUser = useAuthStore((state) => state.currentUser)
  const getOrdersByUserId = useOrdersStore((state) => state.getOrdersByUserId)

  if (!currentUser) {
    return (
      <section className="p-6">
        <h1 className="text-3xl font-bold text-slate-900">Mis Ordenes</h1>
        <p className="mt-4 text-slate-600">Necesitas iniciar sesión.</p>
      </section>
    )
  }

  const userOrders = getOrdersByUserId(currentUser.id)

  if (userOrders.length === 0) {
    return (
      <section className="p-6">
        <h1 className="mb-4 text-3xl font-bold text-slate-900">Mis Ordenes</h1>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-slate-600">Todavía no tienes ordenes.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="p-6">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Mis Ordenes</h1>

      <div className="space-y-6">
        {userOrders
          .slice()
          .reverse()
          .map((order) => (
            <article
              key={order.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Orden #{order.id}
                  </p>
                  <p className="text-sm text-slate-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col gap-1 text-sm sm:items-end">
                  <span className="capitalize text-slate-600">
                    Status: {order.status}
                  </span>
                  <span className="font-semibold text-slate-900">
                    Total: ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {order.items.map((item) => (
                  <div
                    key={`${order.id}-${item.productId}`}
                    className="flex flex-col gap-4 sm:flex-row sm:items-center"
                  >
                    <div className="flex h-20 w-full items-center justify-center rounded-lg bg-slate-50 p-3 sm:w-20">
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
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>

                    <div className="text-sm font-semibold text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
      </div>
    </section>
  )
}

export default OrdersPage