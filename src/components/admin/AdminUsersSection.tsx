import { useState } from 'react'
import ConfirmModal from '../ui/ConfirmModal'
import { useAuthStore } from '../../store/authStore'

type ModalAction = 'delete' | 'toggle' | null

const AdminUsersSection = () => {
  const users = useAuthStore((state) => state.users)
  const currentUser = useAuthStore((state) => state.currentUser)
  const deleteUser = useAuthStore((state) => state.deleteUser)
  const toggleUserStatus = useAuthStore((state) => state.toggleUserStatus)

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [modalAction, setModalAction] = useState<ModalAction>(null)

  const selectedUser = users.find((user) => user.id === selectedUserId)

  const openDeleteModal = (userId: number) => {
    setSelectedUserId(userId)
    setModalAction('delete')
  }

  const openToggleModal = (userId: number) => {
    setSelectedUserId(userId)
    setModalAction('toggle')
  }

  const closeModal = () => {
    setSelectedUserId(null)
    setModalAction(null)
  }

  const handleConfirm = () => {
    if (!selectedUserId || !modalAction) return

    if (modalAction === 'delete') {
      deleteUser(selectedUserId)
    }

    if (modalAction === 'toggle') {
      toggleUserStatus(selectedUserId)
    }

    closeModal()
  }

  const getModalTitle = () => {
    if (!selectedUser || !modalAction) return ''

    if (modalAction === 'delete') {
      return 'Eliminar usuario'
    }

    return selectedUser.isActive ? 'Desactivar usuario' : 'Activar usuario'
  }

  const getModalMessage = () => {
    if (!selectedUser || !modalAction) return ''

    if (modalAction === 'delete') {
      return `¿Estás seguro de que deseas eliminar a ${selectedUser.username}? Esta acción no se puede deshacer.`
    }

    return selectedUser.isActive
      ? `¿Estás seguro de que deseas desactivar a ${selectedUser.username}?`
      : `¿Estás seguro de que deseas activar a ${selectedUser.username}?`
  }

  const getConfirmText = () => {
    if (!selectedUser || !modalAction) return 'Confirmar'

    if (modalAction === 'delete') {
      return 'Eliminar'
    }

    return selectedUser.isActive ? 'Desactivar' : 'Activar'
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900">Usuarios</h2>
          <p className="mt-2 text-sm text-slate-600">
            Administra los usuarios registrados y su estado.
          </p>
        </div>

        {users.length === 0 ? (
          <p className="text-sm text-slate-500">No se encontraron usuarios.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
                  <th className="px-4 py-3">Usuario</th>
                  <th className="px-4 py-3">Correo</th>
                  <th className="px-4 py-3">Rol</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => {
                  const isCurrentUser = currentUser?.id === user.id

                  return (
                    <tr
                      key={user.id}
                      className="border-b border-slate-100 text-sm text-slate-800"
                    >
                      <td className="px-4 py-4 font-medium">{user.username}</td>
                      <td className="px-4 py-4">{user.email}</td>
                      <td className="px-4 py-4 capitalize">{user.role}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            user.isActive
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {user.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => openToggleModal(user.id)}
                            disabled={isCurrentUser}
                            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {user.isActive ? 'Desactivar' : 'Activar'}
                          </button>

                          <button
                            onClick={() => openDeleteModal(user.id)}
                            disabled={isCurrentUser}
                            className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Eliminar
                          </button>
                        </div>

                        {isCurrentUser && (
                          <p className="mt-2 text-xs text-slate-400">
                            No puedes modificar tu propio usuario desde aquí.
                          </p>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!modalAction && !!selectedUser}
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

export default AdminUsersSection