import { TiltedPhotoFrame } from '@/components/TiltedPhotoFrame/TiltedPhotoFrame'

import type { EaseEnvelopeVariant } from './constants'
import { combinedFlapsAlignedToBack, EASE_ENVELOPE_LAYOUT } from './constants'

type EaseEnvelopeProps = {
  variant: EaseEnvelopeVariant
  imageSrc: string
  imageAlt: string
}

function EnvelopeSvgLayer({
  height,
  left,
  src,
  top,
  width,
}: {
  src: string
  left: number
  top: number
  width: number
  height: number
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      aria-hidden
      className="pointer-events-none absolute max-w-none select-none"
      height={height}
      src={src}
      style={{ height, left, top, width }}
      width={width}
    />
  )
}

/**
 * Pink envelope stack — Figma `6952:19916`.
 * Layer order: envelope back → tilted photo → flaps.
 */
export function EaseEnvelope({ variant, imageSrc, imageAlt }: EaseEnvelopeProps) {
  const layout = EASE_ENVELOPE_LAYOUT[variant]
  const flapLayers = [combinedFlapsAlignedToBack(layout.back)]

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 overflow-visible"
      data-figma-node={layout.figmaNode}
      style={{
        height: layout.height,
        transform: `rotate(${layout.rotateDeg}deg)`,
        transformOrigin: 'top left',
        width: layout.width,
      }}
    >
      <EnvelopeSvgLayer {...layout.back} />

      <TiltedPhotoFrame
        imageAlt={imageAlt}
        imageSrc={imageSrc}
        shellOffset={layout.photoShell}
        shellRotateDeg={layout.photoRotateDeg}
        variant={variant}
      />

      {flapLayers.map((layer) => (
        <EnvelopeSvgLayer key={`${layer.src}-${layer.left}-${layer.top}`} {...layer} />
      ))}
    </div>
  )
}
