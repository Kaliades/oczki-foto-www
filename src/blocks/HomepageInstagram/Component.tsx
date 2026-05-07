// TODO: Mobile breakpoint — tiles switch to a horizontally scrollable snap row on small screens.
// Heading and handle badge stack vertically on mobile, side-by-side on md+.
// This pass implements the desktop layout matching Figma node 7105:7493.

import React from 'react'
import Link from 'next/link'
import type { Media } from '@/payload-types'
import { ImageMedia } from '@/components/Media/ImageMedia'

type HomepageInstagramProps = {
  blockType: 'homepageInstagram'
  heading: string
  instagramHandle: string
  instagramUrl: string
  photos: {
    image: Media | string
    linkUrl?: string | null
  }[]
  avatarImage?: Media | string | null
}

// Small reel/play icon overlay — decorative, top-right corner of each tile
// Matches the icon visible on Figma tiles (node I7105:7493;7105:7412 et al.)
function TileIcon() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute right-2 top-2 drop-shadow-sm"
      fill="none"
      height="18"
      viewBox="0 0 18 18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer rounded square background */}
      <rect fill="white" fillOpacity="0.85" height="16" rx="3.5" width="16" x="1" y="1" />
      {/* Play triangle */}
      <path d="M7.5 6.5L12 9L7.5 11.5V6.5Z" fill="#4f3a26" />
    </svg>
  )
}

export const HomepageInstagram: React.FC<HomepageInstagramProps> = ({
  heading,
  instagramHandle,
  instagramUrl,
  photos,
  avatarImage,
}) => {
  return (
    <section className="w-full bg-[#f6f5f2] px-8 py-12">
      {/* Inner container — max-width matches Figma 1366px frame with 32px side padding */}
      <div className="mx-auto flex max-w-[1302px] flex-col gap-6">

        {/* Header row: heading left, handle badge right */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Heading — serif, from CMS. Visual design shows last word "Instagramie" in italic serif.
              We render the full string in regular serif to stay CMS-agnostic. The photographer can
              adjust if needed. */}
          <h2 className="font-['The_Seasons'] text-[28px] leading-[1.04] tracking-[-0.02em] text-[#4f3a26] md:text-[32px]">
            {heading}
          </h2>

          {/* Handle badge: circular avatar + @handle linking to Instagram profile */}
          <Link
            className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-80"
            href={instagramUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            {/* Circular avatar with thin decorative border — matches Figma node I7105:7493;7105:7408 */}
            <div className="rounded-full border border-[#e5d0bb] p-0.5">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                {avatarImage && typeof avatarImage === 'object' ? (
                  <ImageMedia
                    fill
                    imgClassName="object-cover"
                    resource={avatarImage as Media}
                  />
                ) : (
                  /* Fallback: plain cream circle when no avatar is uploaded */
                  <div className="h-full w-full rounded-full bg-[#f1eee8]" />
                )}
              </div>
            </div>

            {/* Handle label */}
            <span className="font-sans text-[16px] leading-[1.48] tracking-[-0.015em] text-[#6b5947]">
              {instagramHandle}
            </span>
          </Link>
        </div>

        {/* Photo tiles — horizontal snap-scroll on mobile, equal-width flex row on md+ */}
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:overflow-x-visible md:pb-0">
          {photos.map((photo, index) => {
            const tileHref =
              typeof photo.linkUrl === 'string' && photo.linkUrl.length > 0
                ? photo.linkUrl
                : instagramUrl

            return (
              <Link
                key={index}
                className="relative aspect-square min-w-[72vw] shrink-0 snap-start overflow-hidden border border-[#f1eee8] bg-[#f1eee8] md:min-w-0 md:flex-1"
                href={tileHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                {/* Tile photo via next/image (fill mode, object-cover) */}
                {typeof photo.image === 'object' && photo.image !== null ? (
                  <ImageMedia
                    fill
                    imgClassName="object-cover"
                    resource={photo.image as Media}
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#f1eee8]" />
                )}

                {/* Decorative reel/play icon — top-right corner, matches Figma tiles */}
                <TileIcon />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
