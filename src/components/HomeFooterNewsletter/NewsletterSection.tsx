import Image from 'next/image'

import type { SectionLink } from '@/utilities/resolveLinkHref'
import { NewsletterForm } from './NewsletterForm'
import { NewsletterHeading } from './NewsletterHeading'

type NewsletterSectionProps = {
  heading: {
    plain: string
    emphasis: string
    plainEnd: string
  }
  intro: string
  submitLabel: string
  privacyLink: SectionLink
  photoSrc: string
  photoAlt: string
}

/**
 * Top half of Footer+Newsletter — split photo / form layout on desktop,
 * stacked form-then-photo on mobile and tablet (Figma `7091:3620`).
 *
 * Shell notes:
 *   - Outer `<section>` carries the sage background for right-side bleed.
 *   - Inner cap holds the flex layout; an absolute photo layer extends
 *     the image to the left viewport edge above 1366 px.
 *   - Content section uses `mb-[-32px]` so the footer scallop row can
 *     overlap the newsletter block (Figma overlap).
 */
export function NewsletterSection({
  heading,
  intro,
  submitLabel,
  privacyLink,
  photoSrc,
  photoAlt,
}: NewsletterSectionProps) {
  return (
    <section
      aria-labelledby="home-footer-newsletter-heading"
      className="relative w-full overflow-hidden bg-[var(--oczki-secondary-600)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 hidden lg:block"
        style={{ width: 'max(660px, calc((100vw - 1366px) / 2 + 660px))' }}
      >
        <Image alt="" className="object-cover object-right" fill sizes="50vw" src={photoSrc} />
      </div>

      <div className="relative mx-auto mb-[-32px] flex w-full max-w-[1366px] flex-col lg:flex-row">
        <div className="relative order-2 aspect-square w-full shrink-0 lg:order-1 lg:w-[660px]">
          <Image
            alt={photoAlt}
            className="object-cover"
            fill
            priority={false}
            sizes="(max-width: 1024px) 100vw, 660px"
            src={photoSrc}
          />
        </div>

        <div className="relative order-1 flex w-full shrink-0 flex-col items-start gap-8 overflow-hidden px-8 pb-20 pt-20 md:px-20 lg:order-2 lg:w-[706px] lg:gap-8 lg:px-32 lg:pb-32 lg:pt-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 h-[772px] w-[1031px] mix-blend-darken"
            style={{ top: 'calc(50% + 48.2px)', transform: 'translate(-50%, -50%)' }}
          >
            <Image
              alt=""
              className="object-cover opacity-50"
              fill
              sizes="1031px"
              src="/figma/newsletter-cement-texture.png"
            />
          </div>

          <div className="relative z-[1] flex w-full max-w-[450px] flex-col items-start gap-8">
            <div className="flex w-full flex-col items-start gap-4">
              <NewsletterHeading
                emphasis={heading.emphasis}
                plain={heading.plain}
                plainEnd={heading.plainEnd}
              />
              <p className="oczki-body-l w-full text-[var(--oczki-primary-100)]">{intro}</p>
            </div>
            <NewsletterForm privacyLink={privacyLink} submitLabel={submitLabel} />
          </div>
        </div>
      </div>
    </section>
  )
}
