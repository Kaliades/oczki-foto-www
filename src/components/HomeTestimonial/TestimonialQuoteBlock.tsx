import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/utilities/ui'

import { TESTIMONIAL_SLIDE_BODY_MIN_HEIGHT_CLASS } from './constants'

type TestimonialQuoteBlockProps = {
  /** First, regular-weight fragment of the heading. */
  headingStart: string
  /** Italic, hand-set fragment that closes the heading. */
  headingEmphasis: string
  /** The quote body itself (Polish quotation marks included by editors). */
  quote: string
  /** Display name of the testimonial author. */
  author: string
  headingId?: string
  /** Wraps only the quote + author (carousel region). */
  slideRegionProps?: ComponentPropsWithoutRef<'div'>
}

/**
 * Heading + quote + author block from Figma node `7102:13788`.
 *
 * Layout per breakpoint (taken from the screenshots and the design
 * context — Figma's component instance reports the same JSX at all three
 * frames, but the actual breakpoints differ in alignment, font-size and
 * inner gaps which we restore here):
 *
 *   - mobile  : `items-start`, text-left, heading 28 px, gap 16 / 16 px
 *   - tablet  : `items-center`, text-center, heading 32 px, gap 32 / 32 px
 *   - desktop : `items-center`, text-center, heading 36 px, gap 48 / 32 px
 *
 * Heading `max-w` reserves the top-right polaroid band on tablet / desktop
 * (Figma `7105:11602` / `7102:14473`) so the serif title never runs under
 * the decoration. Mobile keeps full width — polaroid sits bottom-right.
 *
 * The dash decoration before the author name is a 24 × 1 px line drawn
 * with a tinted `<span>` (Figma uses a vector with the same stroke, but a
 * span is cheaper and matches the rendered pixels). The author colour is
 * Figma `primary/400` (#e5d0bb), which differs from the codebase token
 * `--oczki-primary-400` (#d8b68f) — kept inline with a TODO so we can
 * reconcile the token map in a follow-up.
 */
export const TestimonialQuoteBlock = ({
  headingStart,
  headingEmphasis,
  quote,
  author,
  headingId = 'home-testimonial-heading',
  slideRegionProps,
}: TestimonialQuoteBlockProps) => {
  const { className: slideRegionClassName, ...slideRegionRest } =
    slideRegionProps ?? {}

  return (
    <div className="relative z-[2] flex w-full flex-col items-start gap-4 text-left md:items-center md:gap-8 md:text-center lg:gap-12">
      <h2
        className="w-full shrink-0 text-[28px] font-normal leading-[1.04] tracking-[-0.02em] text-[var(--oczki-primary-100)] [font-family:var(--font-oczki-display)] [font-feature-settings:'lnum'_1,'pnum'_1] md:mx-auto md:max-w-[min(520px,calc(100%-17rem))] md:text-[32px] lg:max-w-[min(566px,calc(100%-26rem))] lg:text-[36px]"
        id={headingId}
      >
        {headingStart}{' '}
        <em className="italic tracking-[-0.01em] [font-feature-settings:'dlig'_1,'lnum'_1,'pnum'_1]">
          {headingEmphasis}
        </em>
      </h2>

      <div
        {...slideRegionRest}
        className={cn(
          'flex w-full flex-col items-start gap-4 md:mx-auto md:max-w-[min(480px,calc(100%-17rem))] md:items-center md:gap-8 lg:max-w-[min(566px,calc(100%-26rem))]',
          TESTIMONIAL_SLIDE_BODY_MIN_HEIGHT_CLASS,
          slideRegionClassName,
        )}
      >
        <p className="oczki-body-l w-full text-left text-[var(--oczki-primary-100)] md:text-center">
          {quote}
        </p>

        <div className="flex items-center gap-3 md:justify-center">
          {/* 24 × 1 px tinted dash from Figma node `7102:13793`. */}
          <span
            aria-hidden="true"
            className="block h-px w-6 bg-[#e5d0bb]"
          />
          {/* TODO: extract `#e5d0bb` to `--oczki-primary-400` once token
              palette is reconciled with Figma (the existing
              `--oczki-primary-400` is `#d8b68f`, a different colour with
              the same name). */}
          <p className="text-[24px] font-normal leading-[0.98] text-[#e5d0bb] [font-family:var(--font-oczki-handwritten),cursive] [font-feature-settings:'lnum'_1,'pnum'_1]">
            {author}
          </p>
        </div>
      </div>
    </div>
  )
}
