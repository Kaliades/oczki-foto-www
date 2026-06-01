import type { GalleryCtaData } from './constants'
import { GALLERY_CTA_FIGMA_NODES } from './constants'
import { GalleryCtaInProgressMark } from './GalleryCtaInProgressMark'
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
 * Section padding 83 / 128 vertical; 96 / 80 / 16 horizontal (desktop / tablet / mobile).
 * The ornate panel sits inside the cap; mobile frame deferred (Figma 7104:19441).
 */
export function GalleryCta({ data }: GalleryCtaProps) {
  return (
    <section
      aria-labelledby="gallery-cta-heading"
      className="relative w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={GALLERY_CTA_FIGMA_NODES.desktopFrame}
    >
      {/* TODO(galeria/cta): Remove mark when mobile frame ships and section matches Figma. */}
      <GalleryCtaInProgressMark />

      <div className="mx-auto w-full max-w-[1366px] px-4 pb-32 pt-[83px] md:px-20 lg:px-24">
        <GalleryCtaPanel data={data} />
      </div>
    </section>
  )
}
