import type { Metadata } from 'next'

import { PanelLoginForm } from './PanelLoginForm'

export const metadata: Metadata = {
  title: 'Logowanie do panelu',
  robots: { index: false, follow: false },
}

/**
 * Bypass for Payload admin login blank page on Next.js 16
 * (https://github.com/payloadcms/payload/issues/17545).
 * Authenticates via REST, sets `payload-token`, then redirects to `/admin`.
 */
export default function PanelLoginPage() {
  return (
    <main className="flex min-h-[70vh] w-full items-center justify-center bg-[var(--oczki-primary-100)] px-4 py-16 [font-family:var(--font-oczki-body)]">
      <div className="w-full max-w-md rounded-sm border border-[var(--oczki-primary-300)] bg-[var(--oczki-primary-50)] p-8 shadow-sm">
        <h1 className="oczki-display-m mb-2 text-[var(--oczki-primary-900)]">Panel CMS</h1>
        <p className="oczki-body-m mb-8 text-[var(--oczki-primary-700)]">
          Zaloguj się, żeby edytować treści i zdjęcia na stronie.
        </p>
        <PanelLoginForm />
      </div>
    </main>
  )
}
