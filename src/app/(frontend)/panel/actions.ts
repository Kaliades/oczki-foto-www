'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getServerSideURL } from '@/utilities/getURL'

export type PanelLoginState = {
  error: string | null
}

/**
 * Server-side login so the HttpOnly `payload-token` is set before navigating
 * to `/admin`. Client-side fetch + soft navigation left users on a blank
 * unauthenticated admin shell (Next.js 16 + Payload).
 */
export async function panelLoginAction(
  _prev: PanelLoginState,
  formData: FormData,
): Promise<PanelLoginState> {
  const email = String(formData.get('email') || '').trim()
  const password = String(formData.get('password') || '')

  if (!email || !password) {
    return { error: 'Podaj e-mail i hasło.' }
  }

  const base = getServerSideURL().replace(/\/$/, '')
  const res = await fetch(`${base}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    cache: 'no-store',
  })

  const data = (await res.json()) as {
    token?: string
    errors?: { message?: string }[]
    message?: string
  }

  if (!res.ok || !data.token) {
    return {
      error:
        data.errors?.[0]?.message ||
        data.message ||
        'Nie udało się zalogować. Sprawdź e-mail i hasło.',
    }
  }

  const cookieStore = await cookies()
  cookieStore.set('payload-token', data.token, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    maxAge: 60 * 60 * 2,
  })

  redirect('/admin')
}
