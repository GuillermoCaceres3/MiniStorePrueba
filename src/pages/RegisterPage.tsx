import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

const RegisterPage = () => {
  const navigate = useNavigate()
  const register = useAuthStore((state) => state.register)

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    const result = register(formData)

    if (!result.success) {
      setError(result.message)
      return
    }

    navigate('/')
  }

  return (
    <section className="flex min-h-[calc(100vh-80px)] items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Registrarse</h1>
        <p className="mt-2 text-sm text-slate-500">
          Crea una cuenta para empezar a comprar.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Ingresa tu username"
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tucorreo@example.com"
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-slate-500"
              required
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Registrarse
          </button>
        </form>
        <p className="mt-6 text-sm text-slate-600">
          ¿Ya tienes una cuenta?{' '}
          <Link
            to="/login"
            className="font-medium text-slate-900 underline-offset-2 hover:underline"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </section>
  )
}

export default RegisterPage