import type { CSSProperties } from 'react'

import { cn } from '@/utilities/ui'

import { PERFORATED_SCALLOP_CIRCLE } from './constants'
import { perforatedScallopCircleCount, perforatedScallopEdgeSpanPx } from './perforatedScallopUtils'
import { ScallopEdge } from './ScallopEdge'

type PerforatedScallopRailProps = {
  circleCount?: number
  className?: string
  figmaNode?: string
  /** Span along the rail axis — used to derive a fixed tile count when `circleCount` is omitted. */
  spanPx: number
  style?: CSSProperties
}

/**
 * Standalone horizontal scallop strip with an explicit span (e.g. mobile bottom `7093:6665`).
 */
export function PerforatedScallopRail({
  circleCount,
  className,
  figmaNode,
  spanPx,
  style,
}: PerforatedScallopRailProps) {
  const count =
    circleCount ??
    perforatedScallopCircleCount(spanPx, PERFORATED_SCALLOP_CIRCLE.defaultHorizontalCount)
  const edgeSpanPx = perforatedScallopEdgeSpanPx(count)

  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute z-0', className)}
      data-figma-node={figmaNode}
      data-name="Container"
      style={{ height: PERFORATED_SCALLOP_CIRCLE.sizePx, width: edgeSpanPx, ...style }}
    >
      <ScallopEdge axis="horizontal" count={count} edgeSpanPx={edgeSpanPx} />
    </div>
  )
}
