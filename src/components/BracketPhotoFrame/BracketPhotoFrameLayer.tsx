import Image from 'next/image'

import { BracketPhotoBotanical } from './BracketPhotoBotanical'
import {
  BRACKET_PHOTO_FRAME_ASSETS,
  BRACKET_PHOTO_FRAME_FIGMA_NODES,
  BRACKET_PHOTO_FRAME_LAYOUT,
  type BracketPhotoFrameVariant,
} from './constants'

type BracketPhotoFrameLayerProps = {
  variant: BracketPhotoFrameVariant
  imageSrc: string
  imageAlt: string
}

/**
 * One breakpoint slice of the bracket photo stack (`Image Container`).
 *
 * Layer order (back → front): botanical `OBJECTS`, outer cream union, cover photo.
 */
export function BracketPhotoFrameLayer({ variant, imageSrc, imageAlt }: BracketPhotoFrameLayerProps) {
  const layout = BRACKET_PHOTO_FRAME_LAYOUT[variant]
  const nodes = BRACKET_PHOTO_FRAME_FIGMA_NODES

  return (
    <div
      className="relative shrink-0"
      data-figma-node={nodes[variant]}
      data-name="Image Container"
      style={{ height: layout.containerHeight, width: layout.containerWidth }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute z-0 overflow-hidden"
        data-figma-node={nodes.botanical[variant]}
        data-name="OBJECTS"
        style={{
          height: layout.botanical.height,
          left: layout.botanical.left,
          top: layout.botanical.top,
          width: layout.botanical.width,
        }}
      >
        <BracketPhotoBotanical height={layout.botanical.height} width={layout.botanical.width} />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute z-10"
        data-figma-node={nodes.outerUnion[variant]}
        data-name="Union"
        style={{
          height: layout.outerFrame.height,
          left: layout.outerFrame.left,
          top: layout.outerFrame.top,
          width: layout.outerFrame.width,
        }}
      >
        <Image
          alt=""
          className="block size-full max-w-none"
          height={layout.outerFrame.height}
          src={BRACKET_PHOTO_FRAME_ASSETS.outerFrame[variant]}
          width={layout.outerFrame.width}
        />
      </div>

      <div
        className="absolute z-20 overflow-hidden"
        data-figma-node={nodes.photoUnion[variant]}
        data-name="Union"
        style={{
          height: layout.photo.height,
          left: layout.photo.left,
          top: layout.photo.top,
          width: layout.photo.width,
        }}
      >
        <Image
          alt={imageAlt}
          className="object-cover"
          fill
          sizes={`${layout.photo.width}px`}
          src={imageSrc}
        />
      </div>
    </div>
  )
}
