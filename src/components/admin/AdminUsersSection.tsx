import { useAuthStore } from '../../store/authStore'

const AdminUsersSection = () => {
  const users = useAuthStore((state) => state.users)
  const currentUser = useAuthStore((state) => state.currentUser)
  const deleteUser = useAuthStore((state) => state.deleteUser)
  const toggleUserStatus = useAuthStore((state) => state.toggleUserStatus)

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900">Users</h2>
        <p className="mt-2 text-sm text-slate-600">
          Manage registered users and their status.
        </p>
      </div>

      {users.length === 0 ? (
        <p className="text-sm text-slate-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
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
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          disabled={isCurrentUser}
                          className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {user.isActive ? 'Deactivate' : 'Activate'}
                        </button>

                        <button
                          onClick={() => deleteUser(user.id)}
                          disabled={isCurrentUser}
                          className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>

                      {isCurrentUser && (
                        <p className="mt-2 text-xs text-slate-400">
                          You cannot modify your own user here.
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
  )
}

export default AdminUsersSection