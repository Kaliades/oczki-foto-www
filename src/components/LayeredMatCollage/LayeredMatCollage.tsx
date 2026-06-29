import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

import { CreamMatPhoto } from '@/components/CreamMatPhoto'

import type { LayeredMatCollageVariant } from './constants'
import { LAYERED_MAT_COLLAGE_LAYOUT } from './constants'

export type LayeredMatCollageImages = {
  back: { src: string; alt: string }
  front: { src: string; alt: string }
}

type LayeredMatCollageProps = {
  variant: LayeredMatCollageVariant
  images: LayeredMatCollageImages
}

/**
 * Landscape back photo + cream mat portrait (sygnet rendered by parent for z-order).
 * All offsets are relative to the `Herosection` coordinate space.
 */
export function LayeredMatCollage({ variant, images }: LayeredMatCollageProps) {
  const layout = LAYERED_MAT_COLLAGE_LAYOUT[variant]
  const { back, front } = images

  return (
    <>
      <div
        className="pointer-events-none absolute overflow-hidden"
        data-figma-node={layout.backImage.figmaNode}
        data-name="Image"
        style={{
          height: layout.backImage.height,
          left: layout.backImage.left,
          top: layout.backImage.top,
          width: layout.backImage.width,
        }}
      >
        <Image
          alt={back.alt}
          className="object-cover"
          fill
          sizes={`${layout.backImage.width}px`}
          src={back.src}
        />
      </div>

      <div
        className="absolute"
        style={{ left: layout.matPhoto.left, top: layout.matPhoto.top }}
      >
        <CreamMatPhoto imageAlt={front.alt} imageSrc={front.src} variant={variant} />
      </div>

    </>
  )
}
