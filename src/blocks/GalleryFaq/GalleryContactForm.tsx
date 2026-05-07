'use client'

import { useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

interface GalleryContactFormProps {
  heading: string
  messageLabel: string
  submitLabel: string
  successMessage: string
  errorMessage: string
}

export const GalleryContactForm: React.FC<GalleryContactFormProps> = ({
  heading,
  messageLabel,
  submitLabel,
  successMessage,
  errorMessage,
}) => {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, email }),
      })

      if (!res.ok) {
        throw new Error('Network response was not ok')
      }

      setStatus('success')
      setMessage('')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <aside className="w-full lg:w-[405px] shrink-0 flex flex-col gap-6">
      <p className="text-base leading-[1.7] text-black">{heading}</p>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="faq-contact-email"
            className="text-sm leading-[1.4] text-black font-normal"
          >
            E-mail
          </label>
          <input
            id="faq-contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'submitting'}
            className="w-full rounded-lg border border-black bg-white px-3 py-2 text-base text-black placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
            placeholder="twoj@email.pl"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="faq-contact-message"
            className="text-sm leading-[1.4] text-black font-normal"
          >
            {messageLabel}
          </label>
          <textarea
            id="faq-contact-message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={status === 'submitting'}
            rows={5}
            className="w-full rounded-lg border border-black bg-white px-3 py-2 text-base text-black placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-black resize-none disabled:opacity-50"
            placeholder="Napisz swoje pytanie…"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full rounded-full bg-black border border-black px-6 py-[10px] text-base leading-[1.5] text-white text-center transition-opacity hover:opacity-80 disabled:opacity-50"
        >
          {status === 'submitting' ? 'Wysyłanie…' : submitLabel}
        </button>

        {/* a11y live region for status feedback */}
        <div aria-live="polite" aria-atomic="true">
          {status === 'success' && (
            <p className="text-sm text-green-700">{successMessage}</p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}
        </div>
      </form>
    </aside>
  )
}
