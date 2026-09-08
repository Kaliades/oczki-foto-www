import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'
import { PhotoUnitReveal } from '@/components/PhotoUnitReveal'

import {
  OFFER_SERVICE_DUO_COLLAGE_SIZE,
  OFFER_SERVICE_DUO_FIGMA_NODES,
  type DuoCollageVariant,
  type OfferServiceDuoCollage,
} from './constants'

type DuoPhotoCollageProps = {
  collage: OfferServiceDuoCollage
  variant: DuoCollageVariant
}

const COLLAGE_SRC: Record<DuoCollageVariant, keyof Pick<OfferServiceDuoCollage, 'desktopSrc' | 'tabletSrc' | 'mobileSrc'>> = {
  desktop: 'desktopSrc',
  tablet: 'tabletSrc',
  mobile: 'mobileSrc',
}

/**
 * Pre-composited Figma collage export (Union portraits + dots + botanical).
 * One image per breakpoint — sizes match `7353:9589` / Group 64 exactly.
 */
export function DuoPhotoCollage({ collage, variant }: DuoPhotoCollageProps) {
  const size = OFFER_SERVICE_DUO_COLLAGE_SIZE[variant]
  const src = collage[COLLAGE_SRC[variant]]

  return (
    <PhotoUnitReveal
      className="relative shrink-0 overflow-visible"
      data-figma-node={OFFER_SERVICE_DUO_FIGMA_NODES.collage[variant]}
      data-name="Duo Photo Collage"
      style={{ height: size.height, width: size.width }}
    >
      <Image
        alt={collage.alt}
        className="object-contain"
        fill
        sizes={`${size.width}px`}
        src={src}
      />
    </PhotoUnitReveal>
  )
}
