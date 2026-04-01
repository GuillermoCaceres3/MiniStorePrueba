import { useState } from 'react'
import { Link } from 'react-router-dom'

const ForgotPasswordPage = () => {

  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSubmitted(true)
  }

  return (
    <section className="flex min-h-[calc(100vh-80px)] items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">
          ¿Olvidaste tu contraseña?
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Ingresa tu correo electrónico y te mostraremos el siguiente paso para
          recuperar el acceso.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@ejemplo.com"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-slate-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Enviar
            </button>
          </form>
        ) : (
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm leading-6 text-slate-700">
              Si el correo está registrado, recibirás instrucciones para
              restablecer tu contraseña.
            </p>
          </div>
        )}

        <p className="mt-6 text-sm text-slate-600">
          <Link
            to="/login"
            className="font-medium text-slate-900 underline-offset-2 hover:underline"
          >
            Volver a iniciar sesión
          </Link>
        </p>
      </div>
    </section>
  )
}

export default ForgotPasswordPage