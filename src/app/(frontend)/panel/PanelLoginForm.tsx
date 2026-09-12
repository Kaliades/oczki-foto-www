'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function PanelLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setPending(true)

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })
      const data = (await res.json()) as { token?: string; errors?: { message?: string }[] }

      if (!res.ok || !data.token) {
        setError(data.errors?.[0]?.message || 'Nie udało się zalogować. Sprawdź e-mail i hasło.')
        setPending(false)
        return
      }

      // Prefer API Set-Cookie (HttpOnly). Fallback for environments that omit it.
      document.cookie = `payload-token=${data.token}; Path=/; Max-Age=7200; Secure; SameSite=Lax`
      router.replace('/admin')
      router.refresh()
    } catch {
      setError('Błąd połączenia. Spróbuj ponownie.')
      setPending(false)
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <label className="flex flex-col gap-1.5">
        <span className="oczki-body-s text-[var(--oczki-primary-800)]">E-mail</span>
        <input
          autoComplete="username"
          className="oczki-body-m rounded-sm border border-[var(--oczki-primary-400)] bg-white px-3 py-2.5 text-[var(--oczki-primary-900)] outline-none focus:border-[var(--oczki-primary-700)]"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          value={email}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="oczki-body-s text-[var(--oczki-primary-800)]">Hasło</span>
        <input
          autoComplete="current-password"
          className="oczki-body-m rounded-sm border border-[var(--oczki-primary-400)] bg-white px-3 py-2.5 text-[var(--oczki-primary-900)] outline-none focus:border-[var(--oczki-primary-700)]"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          value={password}
        />
      </label>

      {error ? (
        <p className="oczki-body-s text-[var(--oczki-error, #9b1c1c)]" role="alert">
          {error}
        </p>
      ) : null}

      <button
        className="oczki-body-m-medium mt-2 rounded-sm bg-[var(--oczki-primary-700)] px-4 py-3 text-white transition-colors hover:bg-[var(--oczki-primary-600)] disabled:opacity-60"
        disabled={pending}
        type="submit"
      >
        {pending ? 'Logowanie…' : 'Zaloguj'}
      </button>
    </form>
  )
}
