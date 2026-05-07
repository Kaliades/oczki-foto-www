'use client'

// TODO: Mobile breakpoint — full responsive pass needed.
// On mobile: 1 photo per snap, swipe-to-navigate. On md: 2 per view. On lg: current desktop layout.
// Current implementation targets the desktop Figma frame (1366px).

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState, useCallback } from 'react'
import type { Media } from '@/payload-types'

type Photo = {
  image: Media | string
  captionTitle?: string | null
  captionSubtitle?: string | null
}

type HomepageGalleryProps = {
  blockType: 'homepageGallery'
  heading: string
  subheading?: string | null
  galleryLinkLabel?: string | null
  galleryLinkUrl?: string | null
  photos: Photo[]
}

// Resolve Media object or string ID to image URL + alt
function getImageSrc(image: Media | string): { url: string; alt: string } {
  if (typeof image === 'string') {
    return { url: '', alt: 'Zdjęcie portfolio' }
  }
  return {
    url: (image.url as string) ?? '',
    alt: (image.alt as string) || 'Zdjęcie portfolio',
  }
}

// Arrow icon — left/right chevron, used for prev/next buttons
function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="16"
      viewBox="0 0 17 16"
      width="17"
      xmlns="http://www.w3.org/2000/svg"
    >
      {direction === 'left' ? (
        <path
          d="M10.5 3L5.5 8L10.5 13"
          stroke="#392818"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      ) : (
        <path
          d="M6.5 3L11.5 8L6.5 13"
          stroke="#392818"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      )}
    </svg>
  )
}

// A single gallery card — alternates between small (side) and large (featured/centre)
function GalleryCard({
  photo,
  size,
}: {
  photo: Photo
  size: 'small' | 'large'
}) {
  const { url, alt } = getImageSrc(photo.image)
  const hasCaption = size === 'large' && (photo.captionTitle || photo.captionSubtitle)

  if (size === 'large') {
    return (
      <div className="flex shrink-0 flex-col gap-3">
        {/* Large featured image: 393×486 from Figma */}
        <div className="relative h-[486px] w-[393px] overflow-hidden">
          {url ? (
            <Image
              alt={photo.captionTitle ?? alt}
              className="object-cover"
              fill
              sizes="393px"
              src={url}
            />
          ) : (
            <div className="h-full w-full bg-[#e8e2da]" />
          )}
        </div>

        {/* Caption — only shown on the large card */}
        {hasCaption && (
          <div className="flex flex-col font-['Instrument_Sans',sans-serif]">
            {photo.captionTitle && (
              <p className="text-[20px] leading-[1.48] tracking-[-0.3px] text-[#4f3a26]">
                {photo.captionTitle}
              </p>
            )}
            {photo.captionSubtitle && (
              <p className="text-[16px] leading-[1.48] tracking-[-0.24px] text-[#6b5947]">
                {photo.captionSubtitle}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }

  // Small card: 211×262, pushed down by pt-[108px] to sit lower than the large centre card
  return (
    <div className="flex shrink-0 items-center pt-[108px]">
      <div className="relative h-[262px] w-[211px] overflow-hidden">
        {url ? (
          <Image
            alt={photo.captionTitle ?? alt}
            className="object-cover"
            fill
            sizes="211px"
            src={url}
          />
        ) : (
          <div className="h-full w-full bg-[#e8e2da]" />
        )}
      </div>
    </div>
  )
}

export function HomepageGallery({
  heading,
  subheading,
  galleryLinkLabel,
  galleryLinkUrl,
  photos,
}: HomepageGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Track active index for progress bar (0-based, tracks the centred/large card)
  const [activeIndex, setActiveIndex] = useState(0)

  // Each "page" scrolls by the width of one large card + gap (393 + 16 = 409)
  const SCROLL_STEP = 409

  const scrollBy = useCallback(
    (direction: 'prev' | 'next') => {
      const el = scrollRef.current
      if (!el) return
      const delta = direction === 'next' ? SCROLL_STEP : -SCROLL_STEP
      el.scrollBy({ left: delta, behavior: 'smooth' })

      setActiveIndex((prev) => {
        if (direction === 'next') return Math.min(prev + 1, photos.length - 1)
        return Math.max(prev - 1, 0)
      })
    },
    [photos.length],
  )

  // Progress bar width: proportional to activeIndex position
  const progressPercent =
    photos.length > 1 ? ((activeIndex + 1) / photos.length) * 100 : 100

  // Heading has italic "kadrze" at the end — split and render with italic span
  const headingParts = heading.split('kadrze')
  const hasItalicPart = headingParts.length === 2

  return (
    <section className="w-full bg-[#f6f5f2] pb-24 pt-20">
      <div className="mx-auto max-w-[1366px] px-8">
        {/* Top bar: heading/subheading left, link right */}
        <div className="mb-9 flex items-end justify-between gap-8">
          {/* Left: heading + subheading */}
          <div className="flex max-w-[554px] flex-col gap-[10px]">
            <h2 className="font-['The_Seasons',serif] text-[36px] leading-[1.04] tracking-[-0.02em] text-[#4f3a26]">
              {hasItalicPart ? (
                <>
                  {headingParts[0]}
                  <em className="font-['The_Seasons',serif] not-italic italic tracking-[-0.01em]">
                    kadrze
                  </em>
                  {headingParts[1]}
                </>
              ) : (
                heading
              )}
            </h2>

            {subheading && (
              <p className="font-['Inter',sans-serif] text-[16px] leading-[1.7] text-[#6b5947]">
                {subheading}
              </p>
            )}
          </div>

          {/* Right: "Zobacz wszystkie zdjęcia →" link */}
          {galleryLinkLabel && galleryLinkUrl && (
            <div className="shrink-0 pb-[10px]">
              <Link
                className="group inline-flex items-center gap-1 font-['Instrument_Sans',sans-serif] text-[14px] leading-[1.48] tracking-[-0.01em] text-[#392818] underline-offset-4 hover:underline"
                href={galleryLinkUrl}
              >
                {galleryLinkLabel}
              </Link>
            </div>
          )}
        </div>

        {/* Gallery container */}
        <div className="flex flex-col gap-9">
          {/* Scrollable gallery row */}
          <div className="relative">
            {/* Horizontal scroll track — scroll-snap-x */}
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {photos.map((photo, index) => {
                // Middle photo (index 2 in a 5-photo set, or index 1 in a 3-photo set) is large
                // Rule: determine the "feature" card dynamically. We pick the middle index.
                const midIndex = Math.floor(photos.length / 2)
                const isLarge = index === midIndex
                return (
                  <div
                    key={index}
                    style={{ scrollSnapAlign: 'center' }}
                  >
                    <GalleryCard photo={photo} size={isLarge ? 'large' : 'small'} />
                  </div>
                )
              })}
            </div>

            {/* Prev/Next carousel control — pink circle button, absolutely positioned */}
            <div
              aria-label="Nawigacja galerii"
              className="absolute left-1/2 top-[229px] flex -translate-x-1/2 items-center gap-2 rounded-full bg-[rgba(219,160,160,0.48)] p-2"
            >
              <button
                aria-label="Poprzednie zdjęcie"
                className="flex h-8 w-8 items-center justify-center transition-opacity hover:opacity-80 active:scale-95"
                onClick={() => scrollBy('prev')}
                type="button"
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                aria-label="Następne zdjęcie"
                className="flex h-8 w-8 items-center justify-center transition-opacity hover:opacity-80 active:scale-95"
                onClick={() => scrollBy('next')}
                type="button"
              >
                <ChevronIcon direction="right" />
              </button>
            </div>
          </div>

          {/* Progress bar — Figma: full-width track (#f1eee8) with green indicator (#6b7a5e) */}
          <div
            aria-hidden="true"
            className="relative h-1 w-full overflow-hidden rounded-full bg-[#f1eee8]"
          >
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-[#6b7a5e] transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
