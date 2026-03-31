import { useOrdersStore } from '../../store/orderStore'

const AdminOrdersSection = () => {
  const getAllOrders = useOrdersStore((state) => state.getAllOrders)
  const orders = getAllOrders()

  if (orders.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Ordenes</h2>
        <p className="mt-2 text-sm text-slate-600">
          Revisa todas las órdenes colocadas en el sistema.
        </p>

        <div className="mt-6 rounded-lg border border-slate-100 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">No se encontraron ordenes.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900">Ordenes</h2>
        <p className="mt-2 text-sm text-slate-600">
          Revisa todas las órdenes colocadas en el sistema.
        </p>
      </div>

      <div className="space-y-6">
        {orders
          .slice()
          .reverse()
          .map((order) => (
            <article
              key={order.id}
              className="rounded-xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Orden #{order.id}
                  </p>
                  <p className="text-sm text-slate-500">
                    ID de usuario: {order.userId}
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

              <div className="mt-4">
                <p className="mb-3 text-sm font-medium text-slate-700">
                  Productos ({order.items.length})
                </p>

                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={`${order.id}-${item.productId}`}
                      className="flex flex-col gap-4 rounded-lg bg-white p-3 sm:flex-row sm:items-center"
                    >
                      <div className="flex h-16 w-full items-center justify-center rounded-md bg-slate-50 p-2 sm:w-16">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-slate-900">
                          {item.title}
                        </h3>
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
              </div>
            </article>
          ))}
      </div>
    </div>
  )
}

export default AdminOrdersSection