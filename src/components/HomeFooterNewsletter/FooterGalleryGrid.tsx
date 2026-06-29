import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

import type { FooterGalleryImage } from './constants'

type FooterGalleryGridProps = {
  images: readonly FooterGalleryImage[]
}

/**
 * Six-up preview grid at the bottom of the footer (Figma `7091:3713`).
 *
 * Desktop: single row, fixed tile widths (211 / 212 px) with 10 px gap.
 * Tablet: three columns × two rows, tile height 180 px.
 * Mobile: two columns × three rows, tile height 140 px.
 */
export function FooterGalleryGrid({ images }: FooterGalleryGridProps) {
  return (
    <div className="w-full" data-name="Footer Links">
      <ul className="grid grid-cols-2 gap-2.5 md:grid-cols-3 min-[1366px]:flex min-[1366px]:gap-2.5" data-name="Image Row">
        {images.map((image, index) => (
          <li
            className="relative h-[140px] w-full overflow-hidden md:h-[180px] min-[1366px]:h-[262px] min-[1366px]:w-[211px] min-[1366px]:shrink-0 [&:nth-child(5)]:min-[1366px]:w-[212px]"
            data-name="Gallery Image"
            key={`${image.src}-${index}`}
          >
            <Image
              alt={image.alt}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 211px"
              src={image.src}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
