'use client'

import Image from 'next/image'
import Link from 'next/link'

import { resolveLinkHref, type SectionLink } from '@/utilities/resolveLinkHref'

type NewsletterFormProps = {
  submitLabel: string
  privacyLink: SectionLink
}

function ScallopButtonSide({ side }: { side: 'left' | 'right' }) {
  if (side === 'left') {
    return (
      <svg
        aria-hidden="true"
        className="h-11 w-[18px] shrink-0 text-[var(--oczki-primary-500)]"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 44"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 44H10C10 38.4772 5.52285 34 0 34V10C5.52285 10 10 5.52285 10 0H18V44Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  return (
    <svg
      aria-hidden="true"
      className="h-11 w-[18px] shrink-0 text-[var(--oczki-primary-500)]"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 18 44"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0C8 5.52285 12.4772 10 18 10V34C12.4772 34 8 38.4772 8 44H0V0H8Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Newsletter signup fields — Figma node `7091:3627`. */
export function NewsletterForm({ submitLabel, privacyLink }: NewsletterFormProps) {
  const privacyHref = resolveLinkHref(privacyLink)

  return (
    <form
      action="#"
      className="flex w-full flex-col items-start gap-8"
      method="post"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="flex w-full flex-col items-start gap-3">
        <div className="flex w-full flex-col isolate items-start">
          <label
            className="relative z-[2] -mb-[11px] bg-[var(--oczki-secondary-600)] px-1 py-0.5 text-[12px] font-normal leading-[1.48] tracking-[-0.01em] text-[var(--oczki-primary-100)]"
            htmlFor="newsletter-name"
          >
            Twoje imię
          </label>
          <input
            autoComplete="given-name"
            className="z-[1] h-[46px] w-full border border-[#bbc3b5] bg-transparent px-3 pb-[13px] pt-3 text-[var(--oczki-primary-100)] outline-none focus:border-[var(--oczki-primary-300)]"
            id="newsletter-name"
            name="name"
            required
            type="text"
          />
        </div>

        <div className="flex w-full flex-col isolate items-start">
          <label
            className="relative z-[2] -mb-[11px] bg-[var(--oczki-secondary-600)] px-1 py-0.5 text-[12px] font-normal leading-[1.48] tracking-[-0.01em] text-[var(--oczki-primary-100)]"
            htmlFor="newsletter-email"
          >
            Email
          </label>
          <input
            autoComplete="email"
            className="z-[1] h-[46px] w-full border border-[#bbc3b5] bg-transparent px-3 pb-[13px] pt-3 text-[var(--oczki-primary-100)] outline-none focus:border-[var(--oczki-primary-300)]"
            id="newsletter-email"
            name="email"
            required
            type="email"
          />
        </div>

        <div className="flex h-11 items-center">
          <div className="flex size-11 shrink-0 items-center justify-center">
            <input
              className="size-[26px] shrink-0 appearance-none border border-[#bbc3b5] bg-transparent checked:border-[var(--oczki-primary-300)] checked:bg-[var(--oczki-primary-300)]"
              id="newsletter-consent"
              name="consent"
              required
              type="checkbox"
            />
          </div>
          <div className="flex flex-wrap items-center gap-1">
            <label className="oczki-body-m text-[var(--oczki-primary-100)]" htmlFor="newsletter-consent">
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

      <button
        className="inline-flex h-11 w-full items-stretch justify-center text-[var(--oczki-primary-900)] md:w-auto"
        type="submit"
      >
        <ScallopButtonSide side="left" />
        <span className="oczki-body-m-medium flex min-w-0 flex-1 items-center justify-center bg-[var(--oczki-primary-500)] px-1 md:flex-none">
          {submitLabel}
        </span>
        <ScallopButtonSide side="right" />
      </button>
    </form>
  )
}
