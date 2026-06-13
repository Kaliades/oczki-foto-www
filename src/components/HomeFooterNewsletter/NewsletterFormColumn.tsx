import Image from 'next/image'

import type { SectionLink } from '@/utilities/resolveLinkHref'
import { NewsletterForm } from './NewsletterForm'
import { NewsletterHeading } from './NewsletterHeading'

type NewsletterFormColumnProps = {
  heading: {
    plain: string
    emphasis: string
    plainEnd: string
  }
  headingId: string
  intro: string
  privacyLink: SectionLink
  shellClassName: string
  submitFullWidth?: boolean
  submitLabel: string
  fieldIdPrefix?: string
}

/**
 * Sage form column — Figma `7091:3622`.
 * Texture (`7091:3623`) is absolute inside this shell; copy + form sit above it.
 */
export function NewsletterFormColumn({
  heading,
  headingId,
  intro,
  privacyLink,
  shellClassName,
  submitFullWidth,
  submitLabel,
  fieldIdPrefix,
}: NewsletterFormColumnProps) {
  return (
    <div
      className={`relative flex w-full shrink-0 flex-col items-start gap-8 overflow-hidden bg-[var(--oczki-secondary-600)] ${shellClassName}`}
      data-name="Text Column"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 h-[772px] w-[1031px] mix-blend-darken"
        data-name="cement-texture 1"
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
        <div className="flex w-full flex-col items-start gap-4" data-name="Header Text">
          <NewsletterHeading
            emphasis={heading.emphasis}
            headingId={headingId}
            plain={heading.plain}
            plainEnd={heading.plainEnd}
          />
          <p className="oczki-body-l w-full text-[var(--oczki-primary-100)]">{intro}</p>
        </div>
        <NewsletterForm
          fieldIdPrefix={fieldIdPrefix}
          privacyLink={privacyLink}
          submitFullWidth={submitFullWidth}
          submitLabel={submitLabel}
        />
      </div>
    </div>
  )
}
