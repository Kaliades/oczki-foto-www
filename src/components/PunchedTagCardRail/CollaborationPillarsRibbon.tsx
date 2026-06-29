import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

import { cn } from '@/utilities/ui'

import { COLLABORATION_PILLARS_RIBBON } from './constants'

type CollaborationPillarsRibbonProps = {
  className?: string
  figmaNode?: string
  placement: keyof typeof COLLABORATION_PILLARS_RIBBON
}

export function CollaborationPillarsRibbon({
  className,
  figmaNode,
  placement,
}: CollaborationPillarsRibbonProps) {
  const layout = COLLABORATION_PILLARS_RIBBON[placement]

  return (
    <div
      aria-hidden="true"
      className={cn('flex items-center justify-center', className)}
      data-figma-node={figmaNode}
      style={{
        height: layout.wrapperHeightPx,
        left: layout.left,
        top: layout.top,
        width: layout.wrapperWidthPx,
      }}
    >
      <div
        className="flex-none"
        style={{
          transform:
            'skewDeg' in layout && layout.skewDeg != null
              ? `rotate(${layout.rotationDeg}deg) skewX(${layout.skewDeg}deg)`
              : `rotate(${layout.rotationDeg}deg)`,
        }}
      >
        <Image
          alt=""
          className="pointer-events-none block max-w-none select-none object-cover"
          height={layout.imageHeightPx}
          src={layout.src}
          width={layout.imageWidthPx}
        />
      </div>
    </div>
  )
}
