'use client'

// TODO: Mobile breakpoints — on small screens the polaroid photo overlaps the text area;
// consider moving it to below the quote or hiding it at sm/md breakpoints.
// Requires a second pass with mobile Figma frame.

import Image from 'next/image'
import { useState } from 'react'
import type { Media } from '@/payload-types'

type Testimonial = {
  quote: string
  clientName: string
  photo?: Media | string | null
}

type HomepageTestimonialsProps = {
  blockType: 'homepageTestimonials'
  heading: string
  testimonials: Testimonial[]
}

// Diagonal stripe background pattern — alternating olive green columns
// matching Figma node Container (strips of secondary/600 and secondary/700)
function StripeBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        backgroundImage:
          'repeating-linear-gradient(90deg, #6b7a5e 0px, #6b7a5e 43px, #596a4b 43px, #596a4b 86px)',
      }}
    />
  )
}

// Em dash SVG separator — Figma node Vector 1136 (decorative line before author name)
function EmDash() {
  return (
    <svg
      aria-hidden="true"
      className="shrink-0"
      fill="none"
      height="1"
      viewBox="0 0 24 1"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line stroke="#f6f5f2" strokeWidth="1" x1="0" x2="24" y1="0.5" y2="0.5" />
    </svg>
  )
}

// Previous arrow — Figma node "6" (left-pointing arrow)
function ArrowLeft({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <button
      aria-label="Poprzednia opinia"
      className="flex size-11 items-center justify-center text-[#f6f5f2] transition-opacity hover:opacity-70 disabled:opacity-30"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <svg
        fill="none"
        height="20"
        viewBox="0 0 21 20"
        width="21"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.572 10H1M1 10L10.572 1M1 10L10.572 19"
          stroke="#f6f5f2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    </button>
  )
}

// Next arrow — Figma node "7" (right-pointing arrow, rotated 180deg of left)
function ArrowRight({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <button
      aria-label="Następna opinia"
      className="flex size-11 items-center justify-center text-[#f6f5f2] transition-opacity hover:opacity-70 disabled:opacity-30"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <svg
        fill="none"
        height="20"
        viewBox="0 0 21 20"
        width="21"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.428 10H20M20 10L10.428 1M20 10L10.428 19"
          stroke="#f6f5f2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    </button>
  )
}

// Polaroid-style client photo frame — CSS only, matches Figma rotation -16.45deg
function PolaroidPhoto({ photo, clientName }: { photo: Media | string | null | undefined; clientName: string }) {
  const src =
    photo && typeof photo === 'object' && photo.url ? photo.url : null

  if (!src) return null

  const width =
    photo && typeof photo === 'object' && photo.width ? photo.width : 286
  const height =
    photo && typeof photo === 'object' && photo.height ? photo.height : 406

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute hidden lg:block"
      style={{
        // Matches Figma Image Container absolute position: right side, slightly above section top
        right: '-60px',
        top: '-49px',
        width: '396px',
        height: '482px',
      }}
    >
      {/* Polaroid frame — white card with shadow, rotated -16.45deg */}
      <div
        className="absolute"
        style={{
          // Figma: left=14.61px from container, top=12.78px
          left: '18px',
          top: '13px',
          width: '286px',
          height: '406px',
          transform: 'rotate(-16.45deg)',
          background: '#ffffff',
          padding: '12px 12px 36px 12px',
          boxShadow:
            '0.757px 3.029px 4.392px 0px rgba(53,39,25,0.16), 4.544px 8.33px 10.072px 0px rgba(53,39,25,0.08)',
        }}
      >
        <div className="relative h-full w-full overflow-hidden">
          <Image
            alt={`Zdjęcie klienta: ${clientName}`}
            className="object-cover"
            fill
            sizes="286px"
            src={src}
          />
        </div>
      </div>
    </div>
  )
}

export const HomepageTestimonials: React.FC<HomepageTestimonialsProps> = ({
  heading,
  testimonials,
}) => {
  const [current, setCurrent] = useState(0)

  if (!testimonials || testimonials.length === 0) return null

  const total = testimonials.length
  const activeTestimonial = testimonials[current]!

  const handlePrev = () => setCurrent((i) => Math.max(0, i - 1))
  const handleNext = () => setCurrent((i) => Math.min(total - 1, i + 1))

  return (
    <section className="relative w-full overflow-hidden bg-[#6b7a5e] py-[72px] md:py-[80px]">
      {/* Diagonal stripe background texture — hardcoded decorative */}
      <StripeBackground />

      {/* Inner content — centred, max-width matches Figma 1366px frame with horizontal padding */}
      <div className="relative mx-auto w-full max-w-[1366px] px-6 md:px-12 lg:px-[104px]">
        {/* Polaroid photo — absolutely positioned, overlaps top-right */}
        <PolaroidPhoto
          clientName={activeTestimonial.clientName}
          photo={activeTestimonial.photo}
        />

        {/* Text content column */}
        <div className="flex flex-col gap-12 lg:max-w-[566px]">
          {/* Section heading — The Seasons, partial italic */}
          <h2
            className="text-center font-['The_Seasons'] text-[28px] leading-[1.04] tracking-[-0.02em] text-[#f6f5f2] md:text-left md:text-[36px]"
          >
            {/* Split "Wasze słowa to moje " (regular) + "paliwo do działania" (italic) */}
            {heading.includes('paliwo') ? (
              <>
                {heading.split('paliwo')[0]}
                <em className="font-['The_Seasons'] not-italic" style={{ fontStyle: 'italic' }}>
                  paliwo{heading.split('paliwo')[1]}
                </em>
              </>
            ) : (
              heading
            )}
          </h2>

          {/* Testimonial card — fades between entries */}
          <div className="flex flex-col gap-8" key={current}>
            {/* Quote text */}
            <p className="text-center font-['Instrument_Sans',sans-serif] text-[16px] font-normal leading-[1.48] tracking-[-0.015em] text-[#f6f5f2] md:text-left">
              {activeTestimonial.quote}
            </p>

            {/* Author row — dash + signature name */}
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <EmDash />
              <span
                className="font-['Dancing_Script',cursive] text-[24px] leading-[0.98] text-[#e5d0bb]"
              >
                {activeTestimonial.clientName}
              </span>
            </div>
          </div>
        </div>

        {/* Carousel navigation — arrows + dot indicators */}
        <div className="mt-12 flex items-center justify-center gap-3 md:justify-start">
          <ArrowLeft disabled={current === 0} onClick={handlePrev} />

          {/* Dot indicators */}
          {testimonials.map((_, i) => (
            <button
              aria-label={`Opinia ${i + 1} z ${total}`}
              className="transition-all"
              key={i}
              onClick={() => setCurrent(i)}
              type="button"
              style={{
                width: i === current ? '32px' : '8px',
                height: '8px',
                background: i === current ? '#ead3d3' : '#96a38b',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
              }}
            />
          ))}

          <ArrowRight disabled={current === total - 1} onClick={handleNext} />
        </div>
      </div>
    </section>
  )
}
