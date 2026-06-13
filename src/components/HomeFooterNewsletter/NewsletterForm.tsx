'use client'

import Image from 'next/image'
import Link from 'next/link'

import { BorderLabelField } from '@/components/BorderLabelField'
import { ScallopedButton } from '@/components/ScallopedButton'
import { resolveLinkHref, type SectionLink } from '@/utilities/resolveLinkHref'

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
  const privacyHref = resolveLinkHref(privacyLink)
  const nameId = `${fieldIdPrefix}-name`
  const emailId = `${fieldIdPrefix}-email`
  const consentId = `${fieldIdPrefix}-consent`

  return (
    <form
      action="#"
      className="flex w-full flex-col items-start gap-8"
      method="post"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="flex w-full flex-col items-start gap-3">
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

        <div className="flex h-11 items-center">
          <div className="flex size-11 shrink-0 items-center justify-center">
            <input
              className="size-[26px] shrink-0 appearance-none border border-[var(--oczki-secondary-200)] bg-transparent checked:border-[var(--oczki-primary-300)] checked:bg-[var(--oczki-primary-300)]"
              id={consentId}
              name="consent"
              required
              type="checkbox"
            />
          </div>
          <div className="flex flex-wrap items-center gap-1">
            <label className="oczki-body-m text-[var(--oczki-primary-100)]" htmlFor={consentId}>
              Wyrażam zgodę na{' '}
            </label>
            {privacyHref ? (
              <Link
                className="oczki-body-m-medium inline-flex items-center gap-1 text-[var(--oczki-primary-300)] underline"
                href={privacyHref}
                target={privacyLink.newTab ? '_blank' : undefined}
              >
                {privacyLink.label}
                <Image
                  alt=""
                  aria-hidden="true"
                  className="size-4"
                  height={16}
                  src="/figma/newsletter-external-link.svg"
                  width={16}
                />
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      <ScallopedButton fullWidth={submitFullWidth} type="submit">
        {submitLabel}
      </ScallopedButton>
    </form>
  )
}
