// TODO: dedicated mobile pass — current layout uses responsive stacking but mobile-specific
// sizing and spacing per Figma mobile frame has not yet been inspected.

import type { Media } from '@/payload-types'
import { ImageMedia } from '@/components/Media/ImageMedia'

type Card = {
  title: string
  body: string
}

type AboutHobbiesProps = {
  blockType: 'aboutHobbies'
  heading: string
  lead?: string | null
  photo: Media | string
  photoAlt?: string | null
  imagePosition?: 'left' | 'right' | null
  cards?: Card[] | null
}

export const AboutHobbies: React.FC<AboutHobbiesProps> = ({
  heading,
  lead,
  photo,
  photoAlt,
  imagePosition = 'left',
  cards,
}) => {
  const photoResource = typeof photo === 'object' && photo ? photo : null
  const isLeft = imagePosition !== 'right'

  const photoCol = (
    <div className="relative w-full md:w-[54%] shrink-0 rounded-xl overflow-hidden min-h-[360px] md:min-h-[597px]">
      {photoResource ? (
        <ImageMedia
          resource={photoResource}
          alt={photoAlt || photoResource.alt || ''}
          fill
          imgClassName="object-cover"
          size="(max-width: 768px) 100vw, 54vw"
        />
      ) : (
        <div className="absolute inset-0 bg-stone-200 flex items-center justify-center" aria-hidden>
          <span className="text-stone-400 text-sm">Brak zdjęcia</span>
        </div>
      )}
    </div>
  )

  const contentCol = (
    <div className="flex flex-col gap-4 w-full md:w-[40%] shrink-0">
      {/* Heading + lead */}
      <div className="flex flex-col gap-5">
        <h2 className="text-[32px] font-normal leading-[1.24] tracking-[-0.035em] text-black">
          {heading}
        </h2>
        {lead && (
          <p className="text-[16px] font-normal leading-[1.58] text-black">{lead}</p>
        )}
      </div>

      {/* Hobby cards */}
      {cards && cards.length > 0 && (
        <div className="flex flex-col gap-2">
          {cards.map((card, i) => (
            <div
              key={i}
              className="border border-black flex flex-col gap-3 p-4"
            >
              <p className="text-[16px] font-semibold leading-[1.36] text-black">{card.title}</p>
              <p className="text-[16px] font-normal leading-[1.5] text-black">{card.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1270px] mx-auto px-8 py-20">
        <div
          className={[
            'flex flex-col md:flex-row gap-8 items-start justify-between',
            isLeft ? '' : 'md:flex-row-reverse',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {photoCol}
          {contentCol}
        </div>
      </div>
    </section>
  )
}
