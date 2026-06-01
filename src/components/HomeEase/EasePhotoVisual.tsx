import { TiltedPhotoFrame } from '@/components/TiltedPhotoFrame/TiltedPhotoFrame'
import { EASE_PHOTO_CLUSTER_LAYOUT } from '@/components/TiltedPhotoFrame/constants'

import type { HomeEaseData } from './constants'

type EasePhotoVisualProps = {
  variant: keyof typeof EASE_PHOTO_CLUSTER_LAYOUT
  tiltedPhoto: HomeEaseData['tiltedPhoto']
}

/**
 * Photo cluster (`6952:19969`). Envelope vectors (`6952:19916`) intentionally omitted.
 *
 * TODO(galeria/ease): Add DecorFlowerBranch (`6952:19970`) + ScallopedHandwrittenBadge (`6952:19954`).
 */
export function EasePhotoVisual({ variant, tiltedPhoto }: EasePhotoVisualProps) {
  const layout = EASE_PHOTO_CLUSTER_LAYOUT[variant]

  return (
    <div
      className="relative shrink-0 overflow-visible"
      data-figma-node={layout.figmaNode}
      style={{ height: layout.height, width: layout.width }}
    >
      <TiltedPhotoFrame
        imageAlt={tiltedPhoto.alt}
        imageSrc={tiltedPhoto.src}
        variant={variant}
      />
    </div>
  )
}
