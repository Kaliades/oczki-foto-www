'use client'

import { BorderLabelField } from '@/components/BorderLabelField'
import { OczkiConsentCheckbox } from '@/components/OczkiConsentCheckbox'
import { ScallopedButton } from '@/components/ScallopedButton'
import type { SectionLink } from '@/utilities/resolveLinkHref'

import { FOOTER_NEWSLETTER_SHELL } from './constants'

type NewsletterFormProps = {
  submitLabel: string
  privacyLink: SectionLink
  /** Mobile stacks the CTA full-width; tablet+ uses intrinsic button width. */
  submitFullWidth?: boolean
  /** Prefix so stacked breakpoint shells do not share duplicate ids in the DOM. */
  fieldIdPrefix?: string
}

/** Newsletter signup fields — Figma node `7091:3627`. */
export function NewsletterForm({
  submitLabel,
  privacyLink,
  submitFullWidth = false,
  fieldIdPrefix = 'newsletter',
}: NewsletterFormProps) {
  const { formGap, inputGroupGap } = FOOTER_NEWSLETTER_SHELL.newsletter
  const nameId = `${fieldIdPrefix}-name`
  const emailId = `${fieldIdPrefix}-email`
  const consentId = `${fieldIdPrefix}-consent`

  return (
    <form
      action="#"
      className="flex w-full flex-col items-start"
      data-name="Form"
      method="post"
      onSubmit={(event) => event.preventDefault()}
      style={{ gap: formGap }}
    >
      <div
        className="flex w-full flex-col items-start"
        data-name="Input Group"
        style={{ gap: inputGroupGap }}
      >
        <BorderLabelField
          autoComplete="given-name"
          id={nameId}
          label="Twoje imię"
          name="name"
          required
          type="text"
        />

        <BorderLabelField
          autoComplete="email"
          id={emailId}
          label="Email"
          name="email"
          required
          type="email"
        />

        <OczkiConsentCheckbox id={consentId} privacyLink={privacyLink} variant="onSage" />
      </div>

      <ScallopedButton fullWidth={submitFullWidth} type="submit">
        {submitLabel}
      </ScallopedButton>
    </form>
  )
}
