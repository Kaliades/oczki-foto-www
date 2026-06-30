import { DecorFlowerBranch } from '@/components/DecorFlowerBranch'
import { EaseEnvelope } from '@/components/EaseEnvelope'
import { ScallopedHandwrittenBadge } from '@/components/ScallopedHandwrittenBadge'
import { EASE_PHOTO_CLUSTER_LAYOUT } from '@/components/TiltedPhotoFrame/constants'

import type { HomeEaseData } from './constants'

type EasePhotoVisualProps = {
  variant: keyof typeof EASE_PHOTO_CLUSTER_LAYOUT
  tiltedPhoto: HomeEaseData['tiltedPhoto']
  handwrittenQuote: HomeEaseData['handwrittenQuote']
}

/** Photo cluster (`6952:19969`) — flower branch, envelope, handwritten badge. */
export function EasePhotoVisual({
  variant,
  tiltedPhoto,
  handwrittenQuote,
}: EasePhotoVisualProps) {
  const layout = EASE_PHOTO_CLUSTER_LAYOUT[variant]

  return (
    <div
      className="relative shrink-0 overflow-visible"
      data-figma-node={layout.figmaNode}
      style={{ height: layout.height, width: layout.width }}
    >
      <DecorFlowerBranch variant={variant} />

      <EaseEnvelope
        imageAlt={tiltedPhoto.alt}
        imageSrc={tiltedPhoto.src}
        variant={variant}
      />

      <ScallopedHandwrittenBadge quote={handwrittenQuote} variant={variant} />
    </div>
  )
}
