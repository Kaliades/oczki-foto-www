import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

import {
  GALLERY_CTA_FRAME_SET,
  GALLERY_CTA_MOBILE_FRAME,
  galleryCtaMobileCornerSize,
  galleryCtaMobileEdgeBands,
  galleryCtaMobileFrameScale,
  galleryCtaMobileSideClip,
  galleryCtaMobileHorizRailSegment,
  galleryCtaMobileSideRailSegment,
} from './constants'

type CornerPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

const CORNER_CLASS: Record<CornerPosition, string> = {
  'top-left': 'left-0 top-0',
  'top-right': 'right-0 top-0',
  'bottom-left': 'left-0 bottom-0',
  'bottom-right': 'right-0 bottom-0',
}

type ScaledArtboardProps = {
  imageLeft?: number | string
  imageTop?: number | string
  imageHeight?: number | string
  imageWidth?: number | string
  clipPath?: string
}

/** Full artboard at uniform scale — optional clip-path for side rails. */
function ScaledArtboard({
  imageLeft = 0,
  imageTop = 0,
  imageHeight,
  imageWidth,
  clipPath,
}: ScaledArtboardProps) {
  const scale = galleryCtaMobileFrameScale()
  const { source } = GALLERY_CTA_MOBILE_FRAME

  return (
    <Image
      alt=""
      aria-hidden
      className="absolute block max-w-none"
      height={source.height}
      src={GALLERY_CTA_FRAME_SET.tablet.src}
      style={{
        clipPath,
        height: imageHeight ?? source.height * scale,
        left: imageLeft,
        top: imageTop,
        width: imageWidth ?? source.width * scale,
      }}
      width={source.width}
    />
  )
}

function GalleryCtaMobileCorner({ position }: { position: CornerPosition }) {
  const scale = galleryCtaMobileFrameScale()
  const { cornerCrop, source } = GALLERY_CTA_MOBILE_FRAME
  const cornerSize = galleryCtaMobileCornerSize()
  const isRight = position.endsWith('right')
  const isBottom = position.startsWith('bottom')

  return (
    <div
      className={`absolute z-[4] overflow-hidden ${CORNER_CLASS[position]}`}
      style={{ height: cornerSize, width: cornerSize }}
    >
      <Image
        alt=""
        aria-hidden
        className="absolute block max-w-none"
        height={source.height}
        src={GALLERY_CTA_FRAME_SET.tablet.src}
        style={{
          height: source.height * scale,
          left: isRight ? -(source.width - cornerCrop) * scale : 0,
          top: isBottom ? -(source.height - cornerCrop) * scale : 0,
          width: source.width * scale,
        }}
        width={source.width}
      />
    </div>
  )
}

function GalleryCtaMobileSideRail({ side }: { side: 'left' | 'right' }) {
  const scale = galleryCtaMobileFrameScale()
  const { source, edgeSource } = GALLERY_CTA_MOBILE_FRAME
  const bands = galleryCtaMobileEdgeBands()
  const clip = galleryCtaMobileSideClip()
  const cornerSize = galleryCtaMobileCornerSize()
  const segment = galleryCtaMobileSideRailSegment()
  const isRight = side === 'right'

  return (
    <div
      className={`absolute z-[2] overflow-hidden ${isRight ? 'right-0' : 'left-0'}`}
      style={{
        bottom: cornerSize,
        top: cornerSize,
        width: isRight ? bands.rightWidth : bands.leftWidth,
      }}
    >
      <ScaledArtboard
        clipPath={
          isRight
            ? `inset(0 0% 0 ${clip.rightStripLeft}%)`
            : `inset(0 ${clip.leftStripRight}% 0 0%)`
        }
        imageHeight={`calc(100% * ${segment.imageHeightRatio})`}
        imageLeft={isRight ? -(source.width - edgeSource.rightWidth) * scale : 0}
        imageTop={`calc(-100% * ${segment.imageTopRatio})`}
      />
    </div>
  )
}

function GalleryCtaMobileHorizRail({ edge }: { edge: 'top' | 'bottom' }) {
  const scale = galleryCtaMobileFrameScale()
  const { source, edgeSource } = GALLERY_CTA_MOBILE_FRAME
  const bands = galleryCtaMobileEdgeBands()
  const cornerSize = galleryCtaMobileCornerSize()
  const segment = galleryCtaMobileHorizRailSegment()
  const isBottom = edge === 'bottom'

  return (
    <div
      className={`absolute z-[2] overflow-hidden ${isBottom ? 'bottom-0' : 'top-0'}`}
      style={{
        height: isBottom ? bands.bottomHeight : bands.topHeight,
        left: cornerSize,
        right: cornerSize,
      }}
    >
      <ScaledArtboard
        imageLeft={`calc(-100% * ${segment.imageLeftRatio})`}
        imageTop={isBottom ? -(source.height - edgeSource.bottomHeight) * scale : 0}
        imageWidth={`calc(100% * ${segment.imageWidthRatio})`}
      />
    </div>
  )
}

/**
 * Mobile gallery CTA frame — Figma 7104:19441.
 *
 * Nine-slice: fixed-scale corners + caps; side rails stretch only the straight
 * segment between corner crops (same horizontal scale as corners).
 */
export function OrnateFrameBackdropMobile() {
  const bands = galleryCtaMobileEdgeBands()

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 flex flex-col overflow-hidden"
      data-figma-node="7104:19441"
      data-name="Decorative frame"
    >
      <GalleryCtaMobileHorizRail edge="top" />

      <div className="relative z-[1] min-h-0 flex-1">
        <div
          className="absolute inset-0 bg-[var(--oczki-primary-100)]"
          style={{
            bottom: 0,
            left: bands.leftWidth,
            right: bands.rightWidth,
            top: 0,
          }}
        />
      </div>

      <GalleryCtaMobileHorizRail edge="bottom" />

      <GalleryCtaMobileSideRail side="left" />
      <GalleryCtaMobileSideRail side="right" />

      <GalleryCtaMobileCorner position="top-left" />
      <GalleryCtaMobileCorner position="top-right" />
      <GalleryCtaMobileCorner position="bottom-left" />
      <GalleryCtaMobileCorner position="bottom-right" />
    </div>
  )
}
