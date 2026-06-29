import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

import { cn } from '@/utilities/ui'

import {
  CROSS_MASKED_PHOTO_MAP_OVERLAY_SRC,
  CROSS_MASKED_PHOTO_VISUAL_FIGMA_NODES,
  CROSS_MASKED_PHOTO_VISUAL_METRICS,
  type CrossMaskedPhotoVisualVariant,
} from './constants'

type CrossMaskedPhotoVisualLayerProps = {
  className?: string
  photoAlt?: string
  variant: CrossMaskedPhotoVisualVariant
}

/**
 * Cross-masked portrait with Małopolska outline overlay.
 *
 * Figma `Image Container`:
 *   <div> — relative flex, items-center
 *     ├── photo `Subtract` — masked PNG
 *     └── map `Subtract` — absolute inset 9.76% / −6.17% / 9.76% / −6.3%
 */
export function CrossMaskedPhotoVisualLayer({
  className,
  photoAlt,
  variant,
}: CrossMaskedPhotoVisualLayerProps) {
  const metrics = CROSS_MASKED_PHOTO_VISUAL_METRICS[variant]
  const alt = photoAlt ?? metrics.photoAlt

  return (
    <div
      className={cn(
        'relative flex shrink-0 items-center',
        metrics.containerGapClassName,
        metrics.containerHeightClassName,
        className,
      )}
      data-figma-node={metrics.figmaNode}
      data-name="Image Container"
    >
      <div
        className="relative shrink-0"
        data-figma-node={CROSS_MASKED_PHOTO_VISUAL_FIGMA_NODES.photo[variant]}
        data-name="Subtract"
        style={{ height: metrics.photoHeight, width: metrics.photoWidth }}
      >
        <Image
          alt={alt}
          className="block size-full max-w-none object-cover"
          height={metrics.photoHeight}
          priority={false}
          src={metrics.photoSrc}
          width={metrics.photoWidth}
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[9.76%_-6.17%_9.76%_-6.3%]"
        data-figma-node={CROSS_MASKED_PHOTO_VISUAL_FIGMA_NODES.mapOverlay[variant]}
        data-name="Subtract"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="block size-full max-w-none object-contain"
          height={462}
          src={CROSS_MASKED_PHOTO_MAP_OVERLAY_SRC}
          width={536}
        />
      </div>
    </div>
  )
}
