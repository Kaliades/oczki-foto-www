import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

import {
  GALLERY_CTA_FRAME_SET,
  type OrnateFrameSet,
  type OrnateFrameVariant,
} from './constants'
import { OrnateFrameBackdropMobile } from './OrnateFrameBackdropMobile'

type OrnateFrameBackdropProps = {
  frameSet?: OrnateFrameSet
  variant: OrnateFrameVariant
}

type FrameLayerProps = {
  asset: OrnateFrameSet[OrnateFrameVariant]
  className: string
  figmaNode: string
}

const FrameLayer = ({ asset, className, figmaNode }: FrameLayerProps) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute ${className}`}
    data-figma-node={figmaNode}
    data-name="Decorative frame"
  >
    <Image
      alt=""
      className="block size-full max-w-none"
      height={asset.intrinsicHeight}
      src={asset.src}
      width={asset.intrinsicWidth}
    />
  </div>
)

/** Tablet: 717×396 centred on the 608 px panel — ears bleed ~54 px per side. */
const TABLET_FRAME_CLASS =
  'left-1/2 top-1/2 h-[396px] w-[717px] -translate-x-1/2 -translate-y-1/2'

/**
 * Scalloped frame backdrop — sits behind copy inside a positioned panel.
 *
 * Desktop (6962:4087): fills the 1174×398 panel bbox.
 * Tablet (7104:19158): 717×396 centred — ears bleed past the 608 px column.
 */
export function OrnateFrameBackdrop({
  frameSet = GALLERY_CTA_FRAME_SET,
  variant,
}: OrnateFrameBackdropProps) {
  if (variant === 'desktop') {
    return (
      <FrameLayer
        asset={frameSet.desktop}
        className="inset-x-0 top-0 h-[398px]"
        figmaNode="6962:4087"
      />
    )
  }

  return (
    <FrameLayer
      asset={frameSet.tablet}
      className={TABLET_FRAME_CLASS}
      figmaNode="7104:19158"
    />
  )
}

/** Responsive wrapper — all three breakpoints. */
export function OrnateFrameBackdropResponsive({
  frameSet = GALLERY_CTA_FRAME_SET,
}: {
  frameSet?: OrnateFrameSet
}) {
  return (
    <>
      <div className="md:hidden">
        <OrnateFrameBackdropMobile />
      </div>
      <div className="hidden md:block lg:hidden">
        <OrnateFrameBackdrop frameSet={frameSet} variant="tablet" />
      </div>
      <div className="hidden lg:block">
        <OrnateFrameBackdrop frameSet={frameSet} variant="desktop" />
      </div>
    </>
  )
}
