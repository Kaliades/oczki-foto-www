import { SCALLOP_TILE } from './constants'
import { ScallopTileStrip } from './ScallopTileStrip'
import type { ScallopWrapLayout } from './scallopedStoryFrameUtils'

type ScallopedFrameEarsProps = {
  layout: ScallopWrapLayout | null
}

/**
 * Scallop strips from a measured cream-panel wrap.
 * Vertical count = cover length ÷ tile step.
 */
export function ScallopedFrameEars({ layout }: ScallopedFrameEarsProps) {
  if (!layout) return null

  const isMobile = layout.breakpoint === 'mobile'
  const overlap = isMobile
    ? SCALLOP_TILE.mobile.overlap
    : SCALLOP_TILE.desktop.verticalOverlap
  const size = isMobile ? 'mobile' : 'desktop'
  const topLeft = isMobile ? 3 : 2
  const bottomLeft = isMobile ? 0 : 7

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-visible">
      <div className="absolute" style={{ left: topLeft, top: layout.topRowTopPx }}>
        <ScallopTileStrip count={layout.horizontalCount} orientation="horizontal" size={size} />
      </div>

      <div
        className="absolute"
        style={{
          left: bottomLeft,
          top: layout.bottomRowTopPx,
          height: isMobile ? SCALLOP_TILE.mobile.height : undefined,
          width: isMobile ? layout.groupWidthPx : undefined,
        }}
      >
        <div className={isMobile ? '-scale-y-100' : 'rotate-180'}>
          <ScallopTileStrip count={layout.horizontalCount} orientation="horizontal" size={size} />
        </div>
      </div>

      <div
        className="absolute flex items-center justify-center"
        style={{
          height: layout.sideHeightPx,
          left: layout.leftPx,
          top: layout.sideTopPx,
          width: layout.sideWidthPx,
        }}
      >
        <div className="-rotate-90">
          <ScallopTileStrip
            count={layout.verticalCount}
            orientation="horizontal"
            overlap={overlap}
            size={size}
          />
        </div>
      </div>

      <div
        className="absolute flex items-center justify-center"
        style={{
          height: layout.sideHeightPx,
          left: layout.rightPx,
          top: layout.sideTopPx,
          width: layout.sideWidthPx,
        }}
      >
        <div className="-rotate-90 -scale-y-100">
          <ScallopTileStrip
            count={layout.verticalCount}
            orientation="horizontal"
            overlap={overlap}
            size={size}
          />
        </div>
      </div>
    </div>
  )
}
