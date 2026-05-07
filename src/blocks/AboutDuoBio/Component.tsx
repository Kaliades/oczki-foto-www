// TODO: Mobile breakpoints — layout is desktop-first (2-col, photo on right).
// On mobile: single column, photo first (above content), cards stack below.
// Requires a second pass with mobile Figma frame.

import Image from 'next/image'
import type { Media } from '@/payload-types'

type Card = {
  id?: string | null
  title: string
  body: string
}

type AboutDuoBioProps = {
  blockType: 'aboutDuoBio'
  heading: string
  lead?: string | null
  subLead?: string | null
  photo: Media | string
  photoAlt?: string | null
  cards?: Card[] | null
}

export const AboutDuoBio: React.FC<AboutDuoBioProps> = ({
  heading,
  lead,
  subLead,
  photo,
  photoAlt,
  cards,
}) => {
  const photoSrc = typeof photo === 'string' ? photo : (photo?.url ?? '')
  const photoWidth = typeof photo === 'object' ? (photo?.width ?? 697) : 697
  const photoHeight = typeof photo === 'object' ? (photo?.height ?? 789) : 789
  const altText = photoAlt ?? (typeof photo === 'object' ? (photo?.alt ?? '') : '')

  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex max-w-[1270px] items-start justify-between px-8 py-[80px]">
        {/* ── Left column: text content + cards ── */}
        <div className="flex w-[514px] shrink-0 flex-col gap-4">
          {/* Text block: heading + lead + sub-lead */}
          <div className="flex flex-col gap-5">
            <h2 className="font-['Inter',sans-serif] text-[32px] font-normal leading-[1.24] tracking-[-0.035em] text-black">
              {heading}
            </h2>

            {lead && (
              <p className="w-[442px] font-['Roboto',sans-serif] text-[16px] font-normal leading-[1.58] text-black">
                {lead}
              </p>
            )}

            {subLead && (
              <p className="w-[442px] font-['Roboto',sans-serif] text-[16px] font-semibold leading-[1.58] text-black">
                {subLead}
              </p>
            )}
          </div>

          {/* Cards stack */}
          {cards && cards.length > 0 && (
            <div className="flex flex-col items-end gap-2">
              {cards.map((card, index) => (
                <div
                  className="flex w-full flex-col gap-3 border border-black p-4"
                  key={card.id ?? index}
                >
                  <p className="font-['Roboto',sans-serif] text-[16px] font-semibold leading-[1.36] text-black">
                    {card.title}
                  </p>
                  <p className="font-['Roboto',sans-serif] text-[16px] font-normal leading-[1.5] text-black">
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Right column: photo ── */}
        <div className="relative h-[789px] w-[697px] shrink-0 overflow-hidden rounded-[12px] border border-black">
          {/* Mobile: photo shown first, above text (handled below) */}
          {photoSrc && (
            <Image
              alt={altText}
              className="object-cover object-center"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 697px"
              src={photoSrc}
            />
          )}
        </div>
      </div>

      {/* ── Mobile layout: photo first, then text ── */}
      {/* TODO: Implement mobile-first layout (photo on top, stacked content below).
          This section intentionally left as TODO pending mobile Figma frame. */}
    </section>
  )
}
