'use client'

import { useCallback, useMemo, useState } from 'react'

import { TestimonialCarouselNav } from '@/components/HomeTestimonial/TestimonialCarouselNav'
import { TESTIMONIAL_STRIPES_BACKGROUND_IMAGE } from '@/components/HomeTestimonial/TestimonialBackground'
import { TestimonialPolaroidDecor } from '@/components/HomeTestimonial/TestimonialPolaroidDecor'
import { TestimonialQuoteBlock } from '@/components/HomeTestimonial/TestimonialQuoteBlock'

import {
  resolveTestimonialSlides,
  type TestimonialSectionData,
} from './constants'

export type TestimonialSectionFigmaNodes = {
  desktop: string
  tablet: string
  mobile: string
}

type TestimonialSectionClientProps = {
  data: TestimonialSectionData
  fallbackItems: readonly TestimonialSectionData['items'][number][]
  figmaNodes: TestimonialSectionFigmaNodes
  headingId: string
}

/**
 * Shared “Opinie” shell — green stripe background, quote carousel, polaroid.
 *
 * <section> full-bleed secondary/600 + vertical stripe gradient
 * └── inner 1366 cap (relative, overflow clip)
 *     ├── TestimonialQuoteBlock (`7102:13788`) — heading + quote + author
 *     ├── TestimonialCarouselNav (`7102:13795`) — arrows + dot row
 *     └── TestimonialPolaroidDecor (`7102:13808`) — absolute decoration
 *
 * Section padding (metadata `7102:14533` / `7102:14592` / `7102:16691`):
 * mobile 32/32 px 16, gap 40; tablet 80/64 px 80, gap 80; desktop 80/72 px 32, gap 80.
 */
export function TestimonialSectionClient({
  data,
  fallbackItems,
  figmaNodes,
  headingId,
}: TestimonialSectionClientProps) {
  const { heading, items, showPolaroid = true } = data
  const slides = useMemo(
    () => resolveTestimonialSlides(items, fallbackItems),
    [fallbackItems, items],
  )
  const [activeIndex, setActiveIndex] = useState(0)

  const activeSlide = slides[activeIndex] ?? slides[0]

  const goToPrevious = useCallback(() => {
    setActiveIndex((index) => (index - 1 + slides.length) % slides.length)
  }, [slides.length])

  const goToNext = useCallback(() => {
    setActiveIndex((index) => (index + 1) % slides.length)
  }, [slides.length])

  if (!activeSlide) {
    return null
  }

  return (
    <section
      aria-labelledby={headingId}
      className="relative w-full overflow-hidden bg-[var(--oczki-secondary-600)] [font-family:var(--font-oczki-body)] lg:overflow-visible"
      data-figma-node={figmaNodes.desktop}
      style={{ backgroundImage: TESTIMONIAL_STRIPES_BACKGROUND_IMAGE }}
    >
      <div
        className="relative isolate mx-auto flex w-full max-w-[1366px] flex-col items-start gap-10 overflow-x-clip overflow-y-hidden px-4 pb-8 pt-8 md:items-center md:gap-20 md:px-20 md:pb-16 md:pt-20 lg:overflow-visible lg:gap-20 lg:px-8 lg:pb-[72px] lg:pt-[80px]"
        data-figma-node-tablet={figmaNodes.tablet}
        data-figma-node-mobile={figmaNodes.mobile}
      >
        <div className="w-full">
          <TestimonialQuoteBlock
            author={activeSlide.author}
            headingEmphasis={heading.emphasis}
            headingId={headingId}
            headingStart={heading.start}
            quote={activeSlide.quote}
            slideRegionProps={{
              'aria-atomic': true,
              'aria-live': 'polite',
            }}
          />
        </div>

        <div className="relative z-20 w-full md:flex md:justify-center">
          <TestimonialCarouselNav
            activeIndex={activeIndex}
            onNext={goToNext}
            onPrev={goToPrevious}
            totalSlides={slides.length}
          />
        </div>

        {showPolaroid ? (
          <TestimonialPolaroidDecor
            key={`polaroid-${activeIndex}`}
            photoAlt={activeSlide.photoAlt}
            photoSrc={activeSlide.photoSrc}
          />
        ) : null}
      </div>
    </section>
  )
}
