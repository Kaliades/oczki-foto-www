import Image from 'next/image'
import Link from 'next/link'

import { resolveLinkHref, type SectionLink } from '@/utilities/resolveLinkHref'

type GalleryHeaderProps = {
  headingStart: string
  headingEmphasis: string
  description: string
  cta: SectionLink
  headingId?: string
}

/**
 * "Text container" row from Figma:
 *   - Desktop 7105:8499 → horizontal flex, heading-left + cta-right,
 *     items-end (cta bottom-aligned with the description baseline).
 *   - Tablet 7105:11600 + Mobile 7105:13895 → vertical stack with the cta
 *     below the heading + description.
 *
 * The heading itself stays at Figma's 531 px on tablet+ (matches the bbox
 * even though the actual text overflows that frame slightly in Figma — the
 * source heading text node is 554 wide because the design lets the heading
 * spill past its parent's reported width without wrapping).
 */
export function GalleryHeader({
  headingStart,
  headingEmphasis,
  description,
  cta,
  headingId = 'home-gallery-heading',
}: GalleryHeaderProps) {
  const href = resolveLinkHref(cta)
  const label = cta.label ?? ''

  return (
    <div className="flex w-full flex-col items-start gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
      <div className="flex w-full flex-col items-start justify-center gap-2.5 md:w-[531px]">
        <h2
          className="w-full text-[28px] font-normal leading-[1.04] tracking-[-0.02em] text-[var(--oczki-primary-800)] [font-family:var(--font-oczki-display)] [font-feature-settings:'lnum'_1,'pnum'_1] md:text-[32px] lg:text-[36px]"
          id={headingId}
        >
          {headingStart}{' '}
          <em className="italic tracking-[-0.01em] [font-feature-settings:'dlig'_1,'lnum'_1,'pnum'_1]">
            {headingEmphasis}
          </em>
        </h2>
        <p className="w-full text-[16px] font-normal leading-[1.7] tracking-[0] text-[var(--oczki-primary-700)] [font-family:var(--font-instrument-sans),'Inter',sans-serif]">
          {description}
        </p>
      </div>

      {href && label ? (
        <Link
          aria-label={label}
          className="group inline-flex h-11 shrink-0 items-start justify-center pb-[10px] pt-[11px]"
          href={href}
          target={cta.newTab ? '_blank' : undefined}
          rel={cta.newTab ? 'noopener noreferrer' : undefined}
        >
          <span className="flex flex-col items-start">
            <span className="flex items-start gap-1 pb-1">
              <span className="text-center text-[14px] font-normal leading-[1.48] tracking-[-0.01em] text-[var(--oczki-primary-900)] [font-family:var(--font-oczki-body)] whitespace-nowrap">
                {label}
              </span>
              <span className="flex w-[14px] flex-col items-start pt-[5px]">
                <Image
                  alt=""
                  aria-hidden="true"
                  className="block h-[7.719px] w-[10.111px] text-[var(--oczki-primary-900)]"
                  height={8}
                  src="/figma/gallery-link-arrow.svg"
                  style={{ height: 'auto', width: 'auto' }}
                  width={10}
                />
              </span>
            </span>
            <span
              aria-hidden="true"
              className="block h-px w-full origin-left scale-x-0 bg-[var(--oczki-primary-900)] transition-transform duration-300 group-hover:scale-x-100"
            />
          </span>
        </Link>
      ) : null}
    </div>
  )
}
