'use client'

import { useCallback, useMemo, useState } from 'react'

import {
  HOME_TESTIMONIAL_FIGMA_NODES,
  resolveTestimonialSlides,
  type HomeTestimonialData,
} from './constants'
import { TESTIMONIAL_STRIPES_BACKGROUND_IMAGE } from './TestimonialBackground'
import { TestimonialCarouselNav } from './TestimonialCarouselNav'
import { TestimonialPolaroidDecor } from './TestimonialPolaroidDecor'
import { TestimonialQuoteBlock } from './TestimonialQuoteBlock'

type HomeTestimonialClientProps = {
  data: HomeTestimonialData
}

export const HomeTestimonialClient = ({ data }: HomeTestimonialClientProps) => {
  const { heading, items, showPolaroid = true } = data
  const slides = useMemo(() => resolveTestimonialSlides(items), [items])
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
      aria-labelledby="home-testimonial-heading"
      className="relative w-full overflow-hidden bg-[var(--oczki-secondary-600)] [font-family:var(--font-oczki-body)] lg:overflow-visible"
      data-figma-node={HOME_TESTIMONIAL_FIGMA_NODES.desktopFrame}
      style={{ backgroundImage: TESTIMONIAL_STRIPES_BACKGROUND_IMAGE }}
    >
      <div className="relative isolate mx-auto flex w-full max-w-[1366px] flex-col items-start gap-10 overflow-x-clip overflow-y-hidden px-4 pb-8 pt-8 md:items-center md:gap-20 md:px-20 md:pb-16 md:pt-20 lg:overflow-visible lg:gap-20 lg:px-8 lg:pb-[72px] lg:pt-[80px]">
        <div className="w-full">
          <TestimonialQuoteBlock
            author={activeSlide.author}
            headingEmphasis={heading.emphasis}
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
