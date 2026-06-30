'use client'

import { useState, type FormEvent } from 'react'

import { BorderLabelField } from '@/components/BorderLabelField'
import { OczkiConsentCheckbox } from '@/components/OczkiConsentCheckbox'
import { ScallopedButton } from '@/components/ScallopedButton'
import type { NewsletterSignupSource } from '@/newsletter/types'
import type { SectionLink } from '@/utilities/resolveLinkHref'

import { FOOTER_NEWSLETTER_SHELL } from './constants'

type NewsletterFormProps = {
  submitLabel: string
  privacyLink: SectionLink
  signupSource: NewsletterSignupSource
  /** Mobile stacks the CTA full-width; tablet+ uses intrinsic button width. */
  submitFullWidth?: boolean
  /** Prefix so stacked breakpoint shells do not share duplicate ids in the DOM. */
  fieldIdPrefix?: string
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

/** Newsletter signup fields — Figma node `7091:3627`. */
export function NewsletterForm({
  submitLabel,
  privacyLink,
  signupSource,
  submitFullWidth = false,
  fieldIdPrefix = 'newsletter',
}: NewsletterFormProps) {
  const { formGap, inputGroupGap } = FOOTER_NEWSLETTER_SHELL.newsletter
  const nameId = `${fieldIdPrefix}-name`
  const emailId = `${fieldIdPrefix}-email`
  const consentId = `${fieldIdPrefix}-consent`
  const [submitState, setSubmitState] = useState<SubmitState>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (submitState === 'submitting' || submitState === 'success') {
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const consentGiven = formData.get('consent') === 'on'

    setSubmitState('submitting')

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, consentGiven, source: signupSource }),
      })

      if (!response.ok) {
        setSubmitState('error')
        return
      }

      setSubmitState('success')
      form.reset()
    } catch {
      setSubmitState('error')
    }
  }

  if (submitState === 'success') {
    return (
      <p
        className="oczki-body-l w-full text-[var(--oczki-primary-100)]"
        role="status"
      >
        Dziękujemy za zapis! Wkrótce odezwiemy się z nowościami.
      </p>
    )
  }

  return (
    <form
      className="flex w-full flex-col items-start"
      data-name="Form"
      method="post"
      noValidate
      onSubmit={handleSubmit}
      style={{ gap: formGap }}
    >
      <div
        className="flex w-full flex-col items-start"
        data-name="Input Group"
        style={{ gap: inputGroupGap }}
      >
        <BorderLabelField
          autoComplete="given-name"
          disabled={submitState === 'submitting'}
          id={nameId}
          label="Twoje imię"
          name="name"
          required
          type="text"
        />

        <BorderLabelField
          autoComplete="email"
          disabled={submitState === 'submitting'}
          id={emailId}
          label="Email"
          name="email"
          required
          type="email"
        />

        <OczkiConsentCheckbox id={consentId} privacyLink={privacyLink} variant="onSage" />
      </div>

      {submitState === 'error' ? (
        <p className="oczki-body-m w-full text-[var(--oczki-primary-100)]" role="alert">
          Nie udało się zapisać. Spróbuj ponownie za chwilę.
        </p>
      ) : null}

      <ScallopedButton
        disabled={submitState === 'submitting'}
        fullWidth={submitFullWidth}
        type="submit"
      >
        {submitState === 'submitting' ? 'Zapisuję…' : submitLabel}
      </ScallopedButton>
    </form>
  )
}
