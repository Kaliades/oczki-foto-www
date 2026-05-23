import { GalleryHeader } from './GalleryHeader'
import { GalleryRail } from './GalleryRail'
import { HOME_GALLERY_FIGMA_NODES, type HomeGalleryData } from './constants'

type HomeGalleryProps = {
  data: HomeGalleryData
}

/**
 * "Chwile zatrzymane w kadrze" — gallery preview section that links to the
 * full portfolio. Five-slot rail — one enlarged, captioned slide at a time
 * (click or desktop carousel control).
 *
 * Figma references (always desktop / tablet / mobile in parallel):
 *   - Desktop: {@link HOME_GALLERY_FIGMA_NODES.desktopFrame}
 *   - Tablet:  {@link HOME_GALLERY_FIGMA_NODES.tabletFrame}
 *   - Mobile:  {@link HOME_GALLERY_FIGMA_NODES.mobileFrame}
 *
 * Shell pattern (see `responsive-layout.mdc`):
 *   - outer `<section>` carries `w-full` + the cream background, so above
 *     1366 px the colour bleeds to the viewport edges.
 *   - inner `<div>` carries the 1366 cap, mx-auto centring, flex layout,
 *     Figma paddings, and the absolute carousel decoration (lives inside
 *     `GalleryRail`). The rail itself bleeds past inner padding on mobile
 *     / tablet so images reach the viewport edges; above `lg` it stays
 *     inside the padded cap.
 *
 * Vertical paddings differ between mobile and tablet+ (48/48 vs 80/96)
 * verbatim from Figma, as does the section gap (24 vs 36) and section
 * padding-x (16 / 80 / 32).
 */
export function HomeGallery({ data }: HomeGalleryProps) {
  const { heading, description, cta, items } = data

  return (
    <section
      aria-labelledby="home-gallery-heading"
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={HOME_GALLERY_FIGMA_NODES.desktopFrame}
    >
      <div className="relative mx-auto flex w-full max-w-[1366px] flex-col items-start gap-6 px-4 pb-12 pt-12 md:items-center md:gap-9 md:px-20 md:pb-24 md:pt-20 lg:items-start lg:px-8">
        <GalleryHeader
          cta={cta}
          description={description}
          headingEmphasis={heading.emphasis}
          headingStart={heading.start}
        />

        <div className="flex w-full flex-col items-start gap-9 md:items-center lg:items-start">
          <GalleryRail items={items} />
        </div>
      </div>
    </section>
  )
}
