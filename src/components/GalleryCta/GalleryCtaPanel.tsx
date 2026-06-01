import { FramedCtaCopy } from '@/components/FramedCtaCopy/FramedCtaCopy'
import { OrnateFrameBackdropResponsive } from '@/components/OrnateFrameBackdrop/OrnateFrameBackdrop'

import type { GalleryCtaData } from './constants'
import { GALLERY_CTA_PANEL } from './constants'

type GalleryCtaPanelProps = {
  data: GalleryCtaData
  headingId?: string
}

/**
 * Ornate panel — Figma `Container` (6962:4040 / 7104:19141 / 7104:19440).
 *
 * Mobile: copy only — decorative frame deferred until Figma 7104:19441 ships.
 *
 * Hierarchy:
 *   Panel (relative)
 *     ├── OrnateFrameBackdropResponsive (tablet/desktop decorative layer)
 *     └── Content stack (relative z-10, flex col gap-9, breakpoint paddings)
 *           └── FramedCtaCopy → Text container + Button
 */
export function GalleryCtaPanel({ data, headingId = 'gallery-cta-heading' }: GalleryCtaPanelProps) {
  const { heading, body, cta } = data

  return (
    <div
      className="relative mx-auto w-[328px] md:w-[608px] md:overflow-visible lg:w-full lg:max-w-[1174px]"
      data-name="Container"
      style={{ minHeight: GALLERY_CTA_PANEL.mobile.minHeight }}
    >
      <OrnateFrameBackdropResponsive />

      <div
        className="relative z-10 flex min-h-[395px] flex-col items-center justify-center gap-9 px-4 py-12 md:p-12 lg:px-[336px] lg:py-12"
        data-figma-node="6962:4040"
      >
        <FramedCtaCopy body={body} cta={cta} heading={heading} headingId={headingId} />
      </div>
    </div>
  )
}
