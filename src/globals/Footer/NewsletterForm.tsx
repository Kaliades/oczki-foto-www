'use client'

import { useState } from 'react'

interface NewsletterFormProps {
  placeholder?: string
  buttonLabel?: string
  successMessage?: string
  errorMessage?: string
  consentText?: string
}

export function NewsletterForm({
  placeholder = 'Twój adres e-mail',
  buttonLabel = 'Zapisz się',
  successMessage = 'Dziękujemy za zapisanie się!',
  errorMessage = 'Coś poszło nie tak. Spróbuj ponownie.',
  consentText = 'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu wysyłki newslettera.',
}: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email) || email.length > 320) {
      setStatus('error')
      setMessage(errorMessage)
      return
    }

    if (!consent) {
      setStatus('error')
      setMessage('Prosimy o wyrażenie zgody na przetwarzanie danych.')
      return
    }

    setStatus('loading')
    setMessage(null)

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setMessage(successMessage)
        setEmail('')
        setConsent(false)
      } else {
        setStatus('error')
        setMessage(errorMessage)
      }
    } catch {
      setStatus('error')
      setMessage(errorMessage)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          disabled={status === 'loading' || status === 'success'}
          className="min-h-11 flex-1 rounded border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 disabled:opacity-50"
          aria-label={placeholder}
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="min-h-11 rounded bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90 disabled:opacity-50"
        >
          {status === 'loading' ? '…' : buttonLabel}
        </button>
      </div>

      <label className="flex cursor-pointer items-start gap-2 text-xs text-white/70">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          disabled={status === 'loading' || status === 'success'}
          className="mt-0.5 shrink-0"
        />
        <span>{consentText}</span>
      </label>

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={[
          'text-sm',
          status === 'success' ? 'text-green-400' : '',
          status === 'error' ? 'text-red-400' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {message}
      </div>
    </form>
  )
}
