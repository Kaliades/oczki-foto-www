import { cn } from '@/utilities/ui'

import { PERFORATED_SCALLOP_CIRCLE } from './constants'
import { ScallopCircle } from './ScallopCircle'

type ScallopEdgeProps = {
  axis: 'horizontal' | 'vertical'
  className?: string
  count: number
  /** Exact bbox length — must equal {@link perforatedScallopEdgeSpanPx}(count). */
  edgeSpanPx: number
}

/**
 * Fixed-count scallop edge — 64 px tiles, 6 px overlap (58 px pitch).
 *
 * Rail length is pinned to `edgeSpanPx` so adjacent edges meet at corners
 * without gaps or double-width clusters.
 */
export function ScallopEdge({ axis, className, count, edgeSpanPx }: ScallopEdgeProps) {
  const isHorizontal = axis === 'horizontal'
  const { sizePx } = PERFORATED_SCALLOP_CIRCLE

  if (count <= 0) {
    return null
  }

  return (
    <div
      className={cn(
        'flex shrink-0 flex-nowrap items-center',
        isHorizontal ? 'flex-row' : 'flex-col',
        className,
      )}
      style={
        isHorizontal ? { height: sizePx, width: edgeSpanPx } : { height: edgeSpanPx, width: sizePx }
      }
    >
      {Array.from({ length: count }, (_, index) => (
        <ScallopCircle
          className={index < count - 1 ? (isHorizontal ? '-mr-[6px]' : '-mb-[6px]') : undefined}
          key={index}
        />
      ))}
    </div>
  )
}
