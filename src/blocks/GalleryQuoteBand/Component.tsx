// TODO: Mobile breakpoint — stacked layout (photo first, then text) on small screens.
// Desktop: 2-col band with photo ~697px wide and text panel ~514px wide.

import Image from 'next/image'

type GalleryQuoteBandProps = {
  blockType: 'galleryQuoteBand'
  photo: {
    url: string
    width?: number | null
    height?: number | null
    alt?: string | null
  }
  photoAlt?: string | null
  heading: string
  lead: string
  side?: 'left' | 'right' | null
}

export function GalleryQuoteBand({ photo, photoAlt, heading, lead, side = 'left' }: GalleryQuoteBandProps) {
  const photoPanel = (
    <div className="relative w-full md:w-[697px] shrink-0 rounded-[12px] overflow-hidden border border-black aspect-[697/360]">
      <Image
        src={photo.url}
        alt={photoAlt ?? photo.alt ?? ''}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 697px"
      />
    </div>
  )

  const textPanel = (
    <div className="flex flex-col gap-5 w-full md:w-[514px] shrink-0">
      <h2 className="font-['Inter',sans-serif] font-normal text-[32px] leading-[1.24] tracking-[-0.035em] text-black">
        {heading}
      </h2>
      <p className="font-['Roboto',sans-serif] font-normal text-[16px] leading-[1.58] text-black">
        {lead}
      </p>
    </div>
  )

  return (
    <section className="w-full bg-white py-[79px] px-8">
      <div className="max-w-[1366px] mx-auto">
        {/* Desktop: flex row; mobile: flex col with photo first */}
        <div
          className={[
            'flex flex-col md:flex-row md:items-center md:justify-between gap-8',
            side === 'right' ? 'md:flex-row-reverse' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {photoPanel}
          {textPanel}
        </div>
      </div>
    </section>
  )
}
