import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

import { GrainDotCluster, type GrainDotClusterVariant } from '@/components/GrainDotCluster'

type LandscapeWithDotDecorProps = {
  dotsOffset: { left: number; top: number }
  group: { height: number; width: number }
  imageAlt: string
  imageOffset: { left: number; top: number }
  imageSize: { height: number; width: number }
  imageSrc: string
  variant: GrainDotClusterVariant
}

/**
 * Landscape photo with grain-dot cluster — Figma `Additional Image Container`.
 *
 * <div Additional Image Container>
 * ├── GrainDotCluster (`Warstwa_1`) — back / overlapping
 * └── Additional Image — front
 */
export function LandscapeWithDotDecor({
  dotsOffset,
  group,
  imageAlt,
  imageOffset,
  imageSize,
  imageSrc,
  variant,
}: LandscapeWithDotDecorProps) {
  return (
    <div
      className="relative"
      data-name="Additional Image Container"
      style={{ height: group.height, width: group.width }}
    >
      <div
        style={{
          left: dotsOffset.left,
          position: 'absolute',
          top: dotsOffset.top,
        }}
      >
        <GrainDotCluster variant={variant} />
      </div>

      <div
        className="absolute overflow-hidden"
        data-name="Additional Image"
        style={{
          height: imageSize.height,
          left: imageOffset.left,
          top: imageOffset.top,
          width: imageSize.width,
        }}
      >
        <Image
          alt={imageAlt}
          className="object-cover"
          fill
          sizes={`${imageSize.width}px`}
          src={imageSrc}
        />
      </div>
    </div>
  )
}
