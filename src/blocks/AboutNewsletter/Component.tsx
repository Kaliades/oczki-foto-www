'use client'

// TODO: Mobile breakpoint — Figma shows desktop 2-col layout (text left, form right).
// Mobile pass needed: single column, form below text. Responsive classes added here
// are best-effort based on the desktop Figma frame only.

import React, { useId, useState } from 'react'

type AboutNewsletterProps = {
  blockType: 'aboutNewsletter'
  heading: string
  lead?: string | null
  nameLabel?: string | null
  emailLabel?: string | null
  consentText?: string | null
  consentLinkLabel?: string | null
  consentLinkUrl?: string | null
  submitLabel?: string | null
  successMessage?: string | null
  errorMessage?: string | null
}

export const AboutNewsletter: React.FC<AboutNewsletterProps> = ({
  heading,
  lead,
  nameLabel = 'Imię',
  emailLabel = 'Email',
  consentText = 'Wyrażam zgodę na politykę prywatności',
  consentLinkLabel = 'politykę prywatności',
  consentLinkUrl = '/polityka-prywatnosci',
  submitLabel = 'Zapisz się',
  successMessage = 'Dziękujemy! Sprawdź skrzynkę.',
  errorMessage = 'Coś poszło nie tak. Spróbuj ponownie.',
}) => {
  const nameId = useId()
  const emailId = useId()
  const consentId = useId()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  // Build the consent label: replace consentLinkLabel with an <a> inside the text
  const consentBeforeLink =
    consentText && consentLinkLabel && consentText.includes(consentLinkLabel)
      ? consentText.slice(0, consentText.indexOf(consentLinkLabel))
      : consentText ?? ''
  const consentAfterLink =
    consentText && consentLinkLabel && consentText.includes(consentLinkLabel)
      ? consentText.slice(consentText.indexOf(consentLinkLabel) + consentLinkLabel.length)
      : ''
  const hasLink = !!(
    consentText &&
    consentLinkLabel &&
    consentText.includes(consentLinkLabel) &&
    consentLinkUrl
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!consent) return

    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'about' }),
      })
      const data = (await res.json()) as { ok: boolean }

      if (data.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setConsent(false)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1366px] mx-auto px-8 py-16 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-0">
        {/* Left column — heading + lead */}
        <div className="flex flex-col gap-4 lg:w-[535px] lg:shrink-0">
          <h2 className="font-['Inter',sans-serif] font-normal text-[32px] leading-[1.24] tracking-[-0.035em] text-black">
            {heading}
          </h2>
          {lead && (
            <p className="font-['Roboto',sans-serif] font-normal text-[16px] leading-[1.5] text-black max-w-[490px]">
              {lead}
            </p>
          )}
        </div>

        {/* Right column — form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-3 lg:w-[373px] lg:shrink-0"
        >
          {/* Name field */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor={nameId}
              className="font-['Inter',sans-serif] font-normal text-[14px] leading-[1.7] text-black"
            >
              {nameLabel}
            </label>
            <input
              id={nameId}
              type="text"
              autoComplete="given-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-[56px] w-full border border-black rounded-[4px] px-4 text-[16px] font-['Roboto',sans-serif] leading-[1.5] text-black bg-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-0"
            />
          </div>

          {/* Email field */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor={emailId}
              className="font-['Inter',sans-serif] font-normal text-[14px] leading-[1.7] text-black"
            >
              {emailLabel}
            </label>
            <input
              id={emailId}
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[56px] w-full border border-black rounded-[4px] px-4 text-[16px] font-['Roboto',sans-serif] leading-[1.5] text-black bg-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-0"
            />
          </div>

          {/* Consent checkbox */}
          <div className="flex items-center gap-2 h-[44px]">
            <input
              id={consentId}
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
              className="w-[18px] h-[18px] border border-black rounded-[4px] appearance-none checked:bg-black checked:border-black shrink-0 cursor-pointer relative
                after:content-[''] after:absolute after:inset-0 after:flex after:items-center after:justify-center
                [&:checked]:after:content-['✓'] after:text-white after:text-[12px] after:text-center after:leading-[18px]"
            />
            <label
              htmlFor={consentId}
              className="font-['Host_Grotesk',sans-serif] font-normal text-[12px] leading-[1.4] text-black cursor-pointer select-none"
            >
              {hasLink ? (
                <>
                  {consentBeforeLink}
                  <a
                    href={consentLinkUrl ?? '/polityka-prywatnosci'}
                    className="underline decoration-solid"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {consentLinkLabel}
                  </a>
                  {consentAfterLink}
                </>
              ) : (
                consentText
              )}
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === 'loading' || !consent}
            className="self-start bg-black border border-black text-white font-['Roboto',sans-serif] font-normal text-[16px] leading-[1.5] px-6 py-[10px] rounded-full whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:opacity-80"
          >
            {status === 'loading' ? 'Wysyłanie…' : submitLabel}
          </button>

          {/* Status messages */}
          <div aria-live="polite" aria-atomic="true" className="min-h-[20px]">
            {status === 'success' && (
              <p className="font-['Roboto',sans-serif] text-[14px] leading-[1.5] text-black">
                {successMessage}
              </p>
            )}
            {status === 'error' && (
              <p className="font-['Roboto',sans-serif] text-[14px] leading-[1.5] text-red-600">
                {errorMessage}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
