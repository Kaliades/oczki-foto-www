import { HOME_TESTIMONIAL_FIGMA_NODES, type HomeTestimonialData } from './constants'
import { TESTIMONIAL_STRIPES_BACKGROUND_IMAGE } from './TestimonialBackground'
import { TestimonialCarouselNav } from './TestimonialCarouselNav'
import { TestimonialPolaroidDecor } from './TestimonialPolaroidDecor'
import { TestimonialQuoteBlock } from './TestimonialQuoteBlock'

type HomeTestimonialProps = {
  data: HomeTestimonialData
}

/**
 * "Opinie" — testimonials section. Sits between the process steps and
 * the footer / final CTA on the home page.
 *
 * Figma references (always desktop / tablet / mobile in parallel):
 *   - Desktop: {@link HOME_TESTIMONIAL_FIGMA_NODES.desktopFrame}
 *   - Tablet:  {@link HOME_TESTIMONIAL_FIGMA_NODES.tabletFrame}
 *   - Mobile:  {@link HOME_TESTIMONIAL_FIGMA_NODES.mobileFrame}
 *
 * Section shell pattern (see `responsive-layout.mdc`):
 *   - outer `<section>` — full-bleed striped background
 *   - inner `<div>` — 1366 cap, layout, paddings, absolute polaroid
 *
 * Polaroid placement (from screenshots — not the shared instance JSX):
 *   - mobile:  bottom-right, beside left-aligned nav
 *   - tablet:  top-right inside the cap (`top: 0`), no bleed above the section
 *   - desktop: top-right at `right: -44`, `top: -49` — bleeds into cream above
 */
export const HomeTestimonial = ({ data }: HomeTestimonialProps) => {
  const { heading, items, showPolaroid = true } = data
  const activeTestimonial = items[0] ?? null
  const totalSlides = Math.max(items.length, 6)

  return (
    <section
      aria-labelledby="home-testimonial-heading"
      className="relative w-full overflow-hidden bg-[var(--oczki-secondary-600)] [font-family:var(--font-oczki-body)] lg:overflow-visible"
      data-figma-node={HOME_TESTIMONIAL_FIGMA_NODES.desktopFrame}
      style={{ backgroundImage: TESTIMONIAL_STRIPES_BACKGROUND_IMAGE }}
    >
      <div className="relative isolate mx-auto flex w-full max-w-[1366px] flex-col items-start gap-10 overflow-x-clip overflow-y-hidden px-4 pb-8 pt-8 md:items-center md:gap-20 md:px-20 md:pb-16 md:pt-20 lg:overflow-y-visible lg:gap-20 lg:px-8 lg:pb-[72px] lg:pt-[80px]">
        {activeTestimonial ? (
          <>
            <TestimonialQuoteBlock
              author={activeTestimonial.author}
              headingEmphasis={heading.emphasis}
              headingStart={heading.start}
              quote={activeTestimonial.quote}
            />

            <div className="relative z-20 w-full md:flex md:justify-center">
              <TestimonialCarouselNav activeIndex={0} totalSlides={totalSlides} />
            </div>

            {showPolaroid ? (
              <TestimonialPolaroidDecor
                photoAlt={activeTestimonial.photoAlt}
                photoSrc={activeTestimonial.photoSrc}
              />
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  )
}
