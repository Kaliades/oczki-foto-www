import {
  SCALLOP_HORIZONTAL_TILE_COUNTS,
  SCALLOP_TILE,
  SCALLOP_VERTICAL_TILE_COUNTS,
  SCALLOPED_STORY_FRAME_LAYOUT,
} from './constants'
import { ScallopTileStrip } from './ScallopTileStrip'
import {
  scallopVerticalStepPx,
  scallopVerticalStripLengthPx,
} from './scallopedStoryFrameUtils'

type ScallopedFrameEarsProps = {
  /**
   * Extra side tiles (may be negative). Bottom horizontal row shifts by the
   * same number of vertical steps so corners stay locked to the tile grid.
   */
  extraVerticalTiles?: number
}

/**
 * Scallop tile strips — absolute positions from Figma `get_design_context`.
 * Grows/shrinks in whole-tile steps via `extraVerticalTiles`.
 */
export function ScallopedFrameEars({ extraVerticalTiles = 0 }: ScallopedFrameEarsProps) {
  const { ears } = SCALLOPED_STORY_FRAME_LAYOUT
  const desktopStep = scallopVerticalStepPx('desktop')
  const mobileStep = scallopVerticalStepPx('mobile')

  const desktopVerticalCount = SCALLOP_VERTICAL_TILE_COUNTS.desktop + extraVerticalTiles
  const mobileVerticalCount = SCALLOP_VERTICAL_TILE_COUNTS.mobile + extraVerticalTiles

  const desktopSideHeight = scallopVerticalStripLengthPx(desktopVerticalCount, 'desktop')
  const mobileSideHeight = scallopVerticalStripLengthPx(mobileVerticalCount, 'mobile')

  const desktopBottomTop = ears.desktop.bottom.top + extraVerticalTiles * desktopStep
  const mobileBottomTop = ears.mobile.bottom.top + extraVerticalTiles * mobileStep

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-visible">
      <div
        className="absolute hidden md:block"
        style={{ left: ears.desktop.top.left, top: ears.desktop.top.top }}
      >
        <ScallopTileStrip count={SCALLOP_HORIZONTAL_TILE_COUNTS.desktop} orientation="horizontal" />
      </div>
      <div
        className="absolute hidden md:block"
        style={{ left: ears.desktop.bottom.left, top: desktopBottomTop }}
      >
        <div className="rotate-180">
          <ScallopTileStrip count={SCALLOP_HORIZONTAL_TILE_COUNTS.desktop} orientation="horizontal" />
        </div>
      </div>
      <div
        className="absolute hidden items-center justify-center md:flex"
        style={{
          height: desktopSideHeight,
          left: ears.desktop.left.left,
          top: ears.desktop.left.top,
          width: ears.desktop.left.width,
        }}
      >
        <div className="-rotate-90">
          <ScallopTileStrip
            count={desktopVerticalCount}
            orientation="horizontal"
            overlap={SCALLOP_TILE.desktop.verticalOverlap}
          />
        </div>
      </div>
      <div
        className="absolute hidden items-center justify-center md:flex"
        style={{
          height: desktopSideHeight,
          left: ears.desktop.right.left,
          top: ears.desktop.right.top,
          width: ears.desktop.right.width,
        }}
      >
        <div className="-rotate-90 -scale-y-100">
          <ScallopTileStrip
            count={desktopVerticalCount}
            orientation="horizontal"
            overlap={SCALLOP_TILE.desktop.verticalOverlap}
          />
        </div>
      </div>

      <div
        className="absolute md:hidden"
        style={{ left: ears.mobile.top.left, top: ears.mobile.top.top, width: ears.mobile.top.width }}
      >
        <ScallopTileStrip
          count={SCALLOP_HORIZONTAL_TILE_COUNTS.mobile}
          orientation="horizontal"
          size="mobile"
        />
      </div>
      <div
        className="absolute flex items-center justify-center md:hidden"
        style={{
          height: ears.mobile.bottom.height,
          left: ears.mobile.bottom.left,
          top: mobileBottomTop,
          width: ears.mobile.bottom.width,
        }}
      >
        <div className="-scale-y-100">
          <ScallopTileStrip
            count={SCALLOP_HORIZONTAL_TILE_COUNTS.mobile}
            orientation="horizontal"
            size="mobile"
          />
        </div>
      </div>
      <div
        className="absolute flex items-center justify-center md:hidden"
        style={{
          height: mobileSideHeight,
          left: ears.mobile.left.left,
          top: ears.mobile.left.top,
          width: ears.mobile.left.width,
        }}
      >
        <div className="-rotate-90">
          <ScallopTileStrip
            count={mobileVerticalCount}
            orientation="horizontal"
            overlap={SCALLOP_TILE.mobile.overlap}
            size="mobile"
          />
        </div>
      </div>
      <div
        className="absolute flex items-center justify-center md:hidden"
        style={{
          height: mobileSideHeight,
          left: ears.mobile.right.left,
          top: ears.mobile.right.top,
          width: ears.mobile.right.width,
        }}
      >
        <div className="-rotate-90 -scale-y-100">
          <ScallopTileStrip
            count={mobileVerticalCount}
            orientation="horizontal"
            overlap={SCALLOP_TILE.mobile.overlap}
            size="mobile"
          />
        </div>
      </div>
    </div>
  )
}
