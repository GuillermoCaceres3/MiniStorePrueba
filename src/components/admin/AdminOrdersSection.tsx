import { useMemo, useState } from 'react'
import { useOrdersStore } from '../../store/orderStore'

const AdminOrdersSection = () => {
  const getAllOrders = useOrdersStore((state) => state.getAllOrders)
  const orders = getAllOrders()

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const orderDate = new Date(order.createdAt)

      const matchesStartDate = startDate
        ? orderDate >= new Date(startDate)
        : true

      const matchesEndDate = endDate
        ? orderDate <= new Date(`${endDate}T23:59:59`)
        : true

      return matchesStartDate && matchesEndDate
    })
  }, [orders, startDate, endDate])

  if (orders.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Órdenes</h2>
        <p className="mt-2 text-sm text-slate-600">
          Revisa todas las órdenes registradas en el sistema.
        </p>

        <div className="mt-6 rounded-lg border border-slate-100 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            No se encontraron órdenes.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900">Órdenes</h2>
        <p className="mt-2 text-sm text-slate-600">
          Revisa todas las órdenes registradas en el sistema.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Desde
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Hasta
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-slate-500"
          />
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            No hay órdenes dentro del rango de fechas seleccionado.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders
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
                      Usuario ID: {order.userId}
                    </p>
                    <p className="text-sm text-slate-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 text-sm sm:items-end">
                    <span className="capitalize text-slate-600">
                      Estado: {order.status}
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
      )}
    </div>
  )
}

export default AdminOrdersSection