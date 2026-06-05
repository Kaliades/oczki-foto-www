import { GalleryHeader } from './GalleryHeader'
import { GalleryRail } from './GalleryRail'
import type { GallerySectionData } from './constants'

export type GallerySectionFigmaNodes = {
  desktop: string
  tablet: string
  mobile: string
}

type GallerySectionProps = {
  data: GallerySectionData
  figmaNodes: GallerySectionFigmaNodes
  headingId: string
}

/**
 * Shared gallery preview section — five-slot rail with one enlarged,
 * captioned slide at a time (click or desktop carousel control).
 *
 * Hierarchy (Figma `Galeria` instance):
 *   <section> full-bleed primary/100
 *   └── inner 1366 cap
 *       ├── Text container (`7105:8212`) — heading + cta
 *       └── Gallery container (`7105:8217`) — rail + progress divider
 *
 * Shell pattern (see `responsive-layout.mdc`):
 *   - outer `<section>` carries `w-full` + the cream background, so above
 *     1366 px the colour bleeds to the viewport edges.
 *   - inner `<div>` carries the 1366 cap, mx-auto centring, flex layout,
 *     Figma paddings, and the absolute carousel decoration (lives inside
 *     `GalleryRail`). The rail bleeds past inner padding on mobile / tablet
 *     so images reach the viewport edges; above `lg` it stays inside the
 *     padded cap.
 *
 * Section padding (metadata across home + offer instances):
 *   mobile 48/48 px 16, gap 24; tablet 80/96 px 80, gap 36;
 *   desktop 80/96 px 32, gap 36.
 */
export function GallerySection({ data, figmaNodes, headingId }: GallerySectionProps) {
  const { heading, description, cta, items } = data

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={figmaNodes.desktop}
      data-figma-node-mobile={figmaNodes.mobile}
      data-figma-node-tablet={figmaNodes.tablet}
    >
      <div className="relative mx-auto flex w-full max-w-[1366px] flex-col items-start gap-6 px-4 pb-12 pt-12 md:items-center md:gap-9 md:px-20 md:pb-24 md:pt-20 lg:items-start lg:px-8">
        <GalleryHeader
          cta={cta}
          description={description}
          headingEmphasis={heading.emphasis}
          headingId={headingId}
          headingStart={heading.start}
        />

        <div className="flex w-full flex-col items-start gap-9 md:items-center lg:items-start">
          <GalleryRail items={items} />
        </div>
      </div>
    </section>
  )
}
