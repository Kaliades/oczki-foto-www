'use client'

import { useActionState } from 'react'

import { panelLoginAction, type PanelLoginState } from './actions'

const initialState: PanelLoginState = { error: null }

export function PanelLoginForm() {
  const [state, formAction, pending] = useActionState(panelLoginAction, initialState)

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="oczki-body-s text-[var(--oczki-primary-800)]">E-mail</span>
        <input
          autoComplete="username"
          className="oczki-body-m rounded-sm border border-[var(--oczki-primary-400)] bg-white px-3 py-2.5 text-[var(--oczki-primary-900)] outline-none focus:border-[var(--oczki-primary-700)]"
          name="email"
          required
          type="email"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="oczki-body-s text-[var(--oczki-primary-800)]">Hasło</span>
        <input
          autoComplete="current-password"
          className="oczki-body-m rounded-sm border border-[var(--oczki-primary-400)] bg-white px-3 py-2.5 text-[var(--oczki-primary-900)] outline-none focus:border-[var(--oczki-primary-700)]"
          name="password"
          required
          type="password"
        />
      </label>

      {state.error ? (
        <p className="oczki-body-s text-[var(--oczki-error, #9b1c1c)]" role="alert">
          {state.error}
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
