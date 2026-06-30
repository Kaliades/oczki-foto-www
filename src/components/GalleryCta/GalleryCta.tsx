import type { GalleryCtaData } from './constants'
import { GALLERY_CTA_FIGMA_NODES } from './constants'
import { GalleryCtaPanel } from './GalleryCtaPanel'

type GalleryCtaProps = {
  data: GalleryCtaData
}

/**
 * "Twoja autentyczność to Twoja siła" — gallery page closing CTA.
 *
 * Figma: desktop `6962:4025`, tablet `7104:19128`, mobile `7104:19439`.
 *
 * Shell: outer `<section>` (full-bleed cream bg) + inner cap (`max-w-[1366px]`).
 * Section padding 83 / 128 vertical; 8 / 80 / 96 horizontal (mobile / tablet / desktop).
 */
export function GalleryCta({ data }: GalleryCtaProps) {
  return (
    <section
      aria-labelledby="gallery-cta-heading"
      className="relative w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={GALLERY_CTA_FIGMA_NODES.desktopFrame}
    >
      <div className="mx-auto w-full max-w-[1366px] px-2 pb-32 pt-[83px] md:px-20 lg:px-24">
        <GalleryCtaPanel data={data} />
      </div>
    </section>
  )
}
