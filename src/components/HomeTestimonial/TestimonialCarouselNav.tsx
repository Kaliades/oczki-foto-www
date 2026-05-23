type TestimonialCarouselNavProps = {
  /** Total number of testimonial slides (Figma renders 5–6 dots). */
  totalSlides: number
  /** Currently active 0-based slide index. */
  activeIndex: number
  onPrev?: () => void
  onNext?: () => void
}

/**
 * Arrow + pagination dots row from Figma node `7102:13795`.
 *
 * Visual sizes (1:1 with Figma at every breakpoint):
 *   - Arrow button hit-area: 44 × 44
 *   - Arrow glyph:           ~20.6 × 20 (the same stroke as the offer
 *                            carousel arrows)
 *   - Active pill:           32 × 8, `tertiary/300` (#ead3d3)
 *   - Inactive dot:          8 × 8 square, `secondary/400` (#96a38b)
 *   - Gap between items:     12 px
 *
 * Mobile aligns the row to the left (matching the items-start flex of the
 * section root); tablet and desktop centre it. Arrows are inline SVG so
 * the stroke colour can follow the section's primary/100 cream token.
 */
export const TestimonialCarouselNav = ({
  totalSlides,
  activeIndex,
  onPrev,
  onNext,
}: TestimonialCarouselNavProps) => {
  const dotCount = Math.max(totalSlides, 1)

  return (
    <div className="flex items-center gap-3">
      <button
        aria-label="Poprzednia opinia"
        className="flex size-11 items-center justify-center text-[var(--oczki-primary-100)] transition-opacity hover:opacity-70 disabled:opacity-40"
        disabled={!onPrev}
        onClick={onPrev}
        type="button"
      >
        <ArrowGlyph direction="left" />
      </button>

      <ul className="flex items-center gap-3" role="tablist">
        {Array.from({ length: dotCount }).map((_, index) => {
          const isActive = index === activeIndex
          return (
            <li
              key={index}
              aria-current={isActive ? 'true' : undefined}
              aria-label={`Opinia ${index + 1} z ${dotCount}`}
              className={
                isActive
                  ? 'h-2 w-8 bg-[var(--oczki-tertiary-300)]'
                  : 'size-2 bg-[var(--oczki-secondary-400)]'
              }
              role="tab"
            />
          )
        })}
      </ul>

      <button
        aria-label="Następna opinia"
        className="flex size-11 items-center justify-center text-[var(--oczki-primary-100)] transition-opacity hover:opacity-70 disabled:opacity-40"
        disabled={!onNext}
        onClick={onNext}
        type="button"
      >
        <ArrowGlyph direction="right" />
      </button>
    </div>
  )
}

type ArrowGlyphProps = { direction: 'left' | 'right' }

/**
 * Inline copy of `/figma/offer-arrow-left.svg` with `stroke="currentColor"`
 * so the testimonial carousel can pick up the cream tone — the original
 * raster asset uses a fallback hex that doesn't respond to parent CSS.
 */
const ArrowGlyph = ({ direction }: ArrowGlyphProps) => (
  <svg
    aria-hidden="true"
    className={
      direction === 'right' ? 'h-5 w-[20.572px] rotate-180' : 'h-5 w-[20.572px]'
    }
    fill="none"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.1248 7.96556L2.33234 7.96556M6.8679 3.49884C6.8679 5.50339 2.33234 7.96556 2.33234 7.96556C2.33234 7.96556 6.8679 10.4601 6.8679 12.5011"
      stroke="currentColor"
      strokeLinejoin="bevel"
    />
  </svg>
)
