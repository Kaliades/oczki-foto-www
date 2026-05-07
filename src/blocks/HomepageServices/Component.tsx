// TODO: Mobile breakpoints — on small screens the cards scroll horizontally via CSS scroll-snap;
// the desktop static row (lg:) may need to collapse to 2 columns on md:. Requires a second pass
// with the mobile Figma frame.

import React from 'react'
import Link from 'next/link'
import NextImage from 'next/image'

import type { Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type ServiceCard = {
  photo: Media | string
  title: string
  description: string
  linkUrl?: string | null
}

type HomepageServicesProps = {
  blockType: 'homepageServices'
  heading: string
  subheading?: string | null
  services: ServiceCard[]
  customSessionHeading?: string | null
  customSessionText?: string | null
  customSessionButtonLabel?: string | null
  customSessionButtonUrl?: string | null
}

// Resolve photo URL from a Media object (string = unpopulated relation ID)
function resolvePhotoSrc(photo: Media | string): string {
  if (typeof photo === 'object' && photo !== null && 'url' in photo) {
    return getMediaUrl(photo.url, photo.updatedAt)
  }
  return ''
}

function resolvePhotoAlt(photo: Media | string): string {
  if (typeof photo === 'object' && photo !== null && 'alt' in photo) {
    return (photo as Media).alt || ''
  }
  return ''
}

// Decorative scatter dot — renders a subtle pink dot used as section accent
function ScatterDot({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height="8"
      viewBox="0 0 8 8"
      width="8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="4" fill="#dba0a0" r="4" />
    </svg>
  )
}

// Decorative arrow icon used in the scroll button (visual only, non-interactive)
function ArrowRight() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="16"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="#4f3a26"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

// Button end-cap shape — matches the "Subtract" shape from Figma (scalloped bracket)
function ButtonCap({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`shrink-0${flip ? ' scale-x-[-1]' : ''}`}
      fill="none"
      height="44"
      viewBox="0 0 18 44"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 0 Q4 0 4 22 Q4 44 18 44" fill="#cba783" stroke="none" />
    </svg>
  )
}

// Single service card with arched photo frame
function ServiceCard({ card }: { card: ServiceCard }) {
  const src = resolvePhotoSrc(card.photo)
  const alt = resolvePhotoAlt(card.photo)

  const cardContent = (
    <div className="flex w-[298px] shrink-0 snap-start flex-col items-start rounded-tl-[999px] rounded-tr-[999px] border border-[#dba0a0] bg-[#f6f5f2] lg:w-full">
      {/* Arched photo frame — top half circle (arch = full border-radius on top only) */}
      <div className="relative h-[298px] w-full overflow-hidden rounded-tl-[999px] rounded-tr-[999px] border border-[#dba0a0]">
        {src ? (
          <NextImage
            alt={alt}
            className="object-cover"
            fill
            sizes="(max-width: 1024px) 298px, 25vw"
            src={src}
          />
        ) : (
          <div className="h-full w-full bg-[#ead3d3]" />
        )}
      </div>
      {/* Card text */}
      <div className="flex flex-col gap-2 px-5 pb-5 pt-4">
        <p className="font-sans text-[20px] leading-[1.48] tracking-[-0.015em] text-[#4f3a26]">
          {card.title}
        </p>
        <p className="font-sans text-[14px] leading-[1.48] tracking-[-0.01em] text-[#6b5947]">
          {card.description}
        </p>
      </div>
    </div>
  )

  // Outer border wrapper (the extra 6px padding ring in Figma)
  const outerWrapper = (
    <div className="flex w-[310px] shrink-0 snap-start items-center rounded-tl-[999px] rounded-tr-[999px] border border-[#dba0a0] p-[6px] lg:w-full">
      {cardContent}
    </div>
  )

  if (card.linkUrl) {
    return (
      <Link
        className="block w-[310px] shrink-0 snap-start rounded-tl-[999px] rounded-tr-[999px] transition-opacity hover:opacity-90 lg:w-full"
        href={card.linkUrl}
      >
        {outerWrapper}
      </Link>
    )
  }

  return outerWrapper
}

export const HomepageServices: React.FC<HomepageServicesProps> = ({
  heading,
  subheading,
  services,
  customSessionHeading,
  customSessionText,
  customSessionButtonLabel,
  customSessionButtonUrl,
}) => {
  return (
    <section className="relative w-full bg-[#ead3d3] pb-8 pt-16">
      {/* Scatter dot decorations — hardcoded decorative positions */}
      <ScatterDot className="pointer-events-none absolute left-[10%] top-[8%] opacity-60" />
      <ScatterDot className="pointer-events-none absolute left-[20%] top-[45%] opacity-40" />
      <ScatterDot className="pointer-events-none absolute right-[12%] top-[12%] opacity-50" />
      <ScatterDot className="pointer-events-none absolute right-[8%] top-[55%] opacity-40" />

      {/* Inner container — max-width matching Figma 1366px frame */}
      <div className="mx-auto flex w-full max-w-[1366px] flex-col gap-16 px-8">
        {/* Section header */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex max-w-[560px] flex-col items-center gap-4">
            {/* Heading — serif with partial italic word "historię" baked in design */}
            <h2 className="text-center font-['The_Seasons'] text-[36px] leading-[1.04] tracking-[-0.02em] text-[#4f3a26]">
              {heading}
            </h2>
            {subheading && (
              <p className="max-w-[535px] text-center font-sans text-[16px] leading-[1.48] tracking-[-0.015em] text-[#392818]">
                {subheading}
              </p>
            )}
          </div>
        </div>

        {/* Cards list — horizontally scrollable with CSS snap on mobile, static row on lg */}
        <div className="relative">
          {/* Scroll container */}
          <div className="flex snap-x snap-mandatory flex-row gap-4 overflow-x-auto pb-4 lg:grid lg:snap-none lg:overflow-x-visible lg:pb-0 lg:[grid-template-columns:repeat(auto-fill,minmax(240px,1fr))]">
            {services.map((card, index) => (
              <ServiceCard card={card} key={index} />
            ))}
          </div>

          {/* Decorative scroll indicator (visual only — CSS scroll-snap handles the scroll) */}
          {services.length > 3 && (
            <div
              aria-hidden="true"
              className="absolute -top-[20px] left-1/2 flex h-[64px] w-[64px] -translate-x-1/2 items-center justify-center gap-2 rounded-full bg-[rgba(219,160,160,0.48)] lg:hidden"
            >
              <ArrowRight />
            </div>
          )}
        </div>

        {/* Custom session CTA block — rendered conditionally */}
        {customSessionHeading && (
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="max-w-[535px] font-sans text-[20px] leading-[1.48] tracking-[-0.015em] text-[#392818]">
                {customSessionHeading}
              </p>
              {customSessionText && (
                <p className="max-w-[535px] font-sans text-[16px] leading-[1.48] tracking-[-0.015em] text-[#4f3a26]">
                  {customSessionText}
                </p>
              )}
            </div>

            {/* CTA button — scalloped bracket shape matching Figma */}
            {customSessionButtonLabel && customSessionButtonUrl && (
              <div className="flex items-center">
                <ButtonCap />
                <Link
                  className="flex h-[44px] items-center justify-center bg-[#cba783] px-1 font-sans text-[14px] font-medium leading-[1.48] tracking-[-0.01em] text-[#392818] transition-opacity hover:opacity-90"
                  href={customSessionButtonUrl}
                >
                  {customSessionButtonLabel}
                </Link>
                <ButtonCap flip />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
