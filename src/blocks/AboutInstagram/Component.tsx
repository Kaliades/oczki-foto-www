// TODO: Mobile breakpoint — on mobile (<md) the tile grid switches to a 2-column layout
// or a horizontally scrollable snap row. This pass implements the desktop layout (5-col)
// and a tablet fallback (3-col) matching Figma node 6593:13836.

import React from 'react'
import Link from 'next/link'
import type { Media } from '@/payload-types'
import { ImageMedia } from '@/components/Media/ImageMedia'

type Tile = {
  photo: Media | number | null
  photoAlt?: string | null
  url?: string | null
  id?: string | null
}

type AboutInstagramProps = {
  blockType: 'aboutInstagram'
  heading: string
  lead?: string | null
  tiles: Tile[]
}

export const AboutInstagram: React.FC<AboutInstagramProps> = ({ heading, lead, tiles }) => {
  return (
    <section className="w-full bg-white px-8 py-24">
      {/* Inner container — max-width matches Figma 1366px frame with 32px side padding */}
      <div className="mx-auto flex max-w-[1302px] flex-col gap-8">

        {/* Text header */}
        <div className="flex flex-col gap-3">
          <h2 className="font-['Inter'] text-[32px] font-normal leading-[1.24] tracking-[-0.035em] text-black">
            {heading}
          </h2>
          {lead && (
            <p className="font-sans text-[16px] leading-[1.5] text-black">
              {lead}
            </p>
          )}
        </div>

        {/* Photo tiles — 5-col desktop, 3-col tablet, horizontal scroll on mobile */}
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-x-visible md:pb-0 lg:grid-cols-5">
          {tiles.map((tile, index) => {
            const tileHref =
              typeof tile.url === 'string' && tile.url.length > 0 ? tile.url : '#'

            const altText =
              typeof tile.photoAlt === 'string' && tile.photoAlt.length > 0
                ? tile.photoAlt
                : `Zdjęcie Instagram ${index + 1}`

            return (
              <Link
                key={tile.id ?? index}
                className="relative aspect-square min-w-[72vw] shrink-0 snap-start overflow-hidden rounded-xl border border-black bg-[#f1eee8] md:min-w-0"
                href={tileHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                {typeof tile.photo === 'object' && tile.photo !== null ? (
                  <ImageMedia
                    fill
                    imgClassName="object-cover"
                    resource={tile.photo as Media}
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#f1eee8]" />
                )}

                {/* Visually hidden alt for screen readers already handled by ImageMedia alt prop */}
                <span className="sr-only">{altText}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
