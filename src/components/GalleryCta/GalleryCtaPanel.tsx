import { FramedCtaCopy } from '@/components/FramedCtaCopy/FramedCtaCopy'
import { OrnateFrameBackdropResponsive } from '@/components/OrnateFrameBackdrop/OrnateFrameBackdrop'

import type { GalleryCtaData } from './constants'

type GalleryCtaPanelProps = {
  data: GalleryCtaData
  headingId?: string
}

/**
 * Ornate panel — Figma `Container` (6962:4040 / 7104:19141 / 7104:19440).
 *
 * Mobile frame (7104:19441) — nine-slice with fixed-scale corners.
 *
 * Hierarchy:
 *   Panel (relative)
 *     ├── OrnateFrameBackdropResponsive
 *     └── Content stack (relative z-10, flex col gap-9, breakpoint paddings)
 *           └── FramedCtaCopy → Text container + Button
 */
export function GalleryCtaPanel({ data, headingId = 'gallery-cta-heading' }: GalleryCtaPanelProps) {
  const { heading, body, cta } = data

  return (
    <div
      className="relative mx-auto w-full overflow-hidden md:w-[608px] md:min-h-[395px] md:overflow-visible lg:w-full lg:max-w-[1174px]"
      data-name="Container"
    >
      <OrnateFrameBackdropResponsive />

      <div
        className="relative z-10 flex flex-col items-center justify-center gap-9 px-8 py-12 md:min-h-[395px] md:p-12 lg:px-[336px] lg:py-12"
        data-figma-node="6962:4040"
      >
        <FramedCtaCopy body={body} cta={cta} heading={heading} headingId={headingId} />
      </div>
    </div>
  )
}
