// TODO: Mobile breakpoints — on small screens stack to single column (photo on top,
// then heading + lead + pillars below). Requires a second pass with mobile Figma frame.

import Image from 'next/image'
import type { Media } from '@/payload-types'

type Pillar = {
  title: string
  body: string
}

type AboutValuesProps = {
  blockType: 'aboutValues'
  heading: string
  lead?: string | null
  photo: Media | string | number
  photoAlt?: string | null
  pillars?: Pillar[] | null
}

export const AboutValues: React.FC<AboutValuesProps> = ({
  heading,
  lead,
  photo,
  photoAlt,
  pillars,
}) => {
  const photoSrc = typeof photo === 'object' && photo !== null ? ((photo as Media).url ?? '') : ''
  const photoWidth =
    typeof photo === 'object' && photo !== null ? ((photo as Media).width ?? 697) : 697
  const photoHeight =
    typeof photo === 'object' && photo !== null ? ((photo as Media).height ?? 597) : 597
  const altText =
    photoAlt ??
    (typeof photo === 'object' && photo !== null ? ((photo as Media).alt ?? '') : '')

  return (
    <section className="w-full bg-white px-8 py-20">
      <div className="mx-auto flex max-w-[1206px] items-start justify-between gap-8">
        {/* Left column: photo */}
        <div className="relative hidden shrink-0 overflow-hidden rounded-[12px] lg:block"
          style={{ width: 697, height: 597 }}
        >
          {photoSrc && (
            <Image
              alt={altText}
              className="object-cover object-center"
              fill
              sizes="697px"
              src={photoSrc}
            />
          )}
          {!photoSrc && (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
              <span>Zdjęcie</span>
            </div>
          )}
        </div>

        {/* Mobile: photo at top (full width) */}
        <div className="relative mb-6 block h-[320px] w-full overflow-hidden rounded-[12px] lg:hidden">
          {photoSrc && (
            <Image
              alt={altText}
              className="object-cover object-center"
              fill
              sizes="100vw"
              src={photoSrc}
            />
          )}
        </div>

        {/* Right column: heading, lead, pillars */}
        <div className="flex w-full flex-col gap-4 lg:w-[514px] lg:shrink-0">
          {/* Heading + lead */}
          <div className="flex flex-col gap-5">
            <h2 className="font-['Inter',sans-serif] text-[32px] font-normal leading-[1.24] tracking-[-0.035em] text-black">
              {heading}
            </h2>
            {lead && (
              <p className="font-['Roboto',sans-serif] text-[16px] font-normal leading-[1.58] text-black">
                {lead}
              </p>
            )}
          </div>

          {/* Pillars */}
          {pillars && pillars.length > 0 && (
            <div className="flex flex-col gap-2">
              {pillars.map((pillar, idx) => (
                <div
                  className="flex flex-col gap-3 border border-black p-4"
                  key={idx}
                >
                  <p className="font-['Roboto',sans-serif] text-[16px] font-semibold leading-[1.36] text-black">
                    {pillar.title}
                  </p>
                  <p className="font-['Roboto',sans-serif] text-[16px] font-normal leading-[1.5] text-black">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
