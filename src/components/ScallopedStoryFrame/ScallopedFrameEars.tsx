import {
  SCALLOP_HORIZONTAL_TILE_COUNTS,
  SCALLOP_VERTICAL_TILE_COUNTS,
  SCALLOPED_STORY_FRAME_LAYOUT,
} from './constants'
import { ScallopTileStrip } from './ScallopTileStrip'

/**
 * Scallop tile strips — absolute positions from Figma `get_design_context`.
 */
export function ScallopedFrameEars() {
  const { ears } = SCALLOPED_STORY_FRAME_LAYOUT

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="absolute hidden md:block"
        style={{ left: ears.desktop.top.left, top: ears.desktop.top.top }}
      >
        <ScallopTileStrip count={SCALLOP_HORIZONTAL_TILE_COUNTS.desktop} orientation="horizontal" />
      </div>
      <div
        className="absolute hidden md:block"
        style={{ left: ears.desktop.bottom.left, top: ears.desktop.bottom.top }}
      >
        <div className="rotate-180">
          <ScallopTileStrip count={SCALLOP_HORIZONTAL_TILE_COUNTS.desktop} orientation="horizontal" />
        </div>
      </div>
      <div
        className="absolute hidden items-center justify-center md:flex"
        style={{
          height: ears.desktop.left.height,
          left: ears.desktop.left.left,
          top: ears.desktop.left.top,
          width: ears.desktop.left.width,
        }}
      >
        <div className="-rotate-90">
          <ScallopTileStrip count={SCALLOP_VERTICAL_TILE_COUNTS.desktop} orientation="horizontal" />
        </div>
      </div>
      <div
        className="absolute hidden items-center justify-center md:flex"
        style={{
          height: ears.desktop.right.height,
          left: ears.desktop.right.left,
          top: ears.desktop.right.top,
          width: ears.desktop.right.width,
        }}
      >
        <div className="-rotate-90 -scale-y-100">
          <ScallopTileStrip count={SCALLOP_VERTICAL_TILE_COUNTS.desktop} orientation="horizontal" />
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
          top: ears.mobile.bottom.top,
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
          height: ears.mobile.left.height,
          left: ears.mobile.left.left,
          top: ears.mobile.left.top,
          width: ears.mobile.left.width,
        }}
      >
        <div className="-rotate-90">
          <ScallopTileStrip
            count={SCALLOP_VERTICAL_TILE_COUNTS.mobile}
            orientation="horizontal"
            size="mobile"
          />
        </div>
      </div>
      <div
        className="absolute flex items-center justify-center md:hidden"
        style={{
          height: ears.mobile.right.height,
          left: ears.mobile.right.left,
          top: ears.mobile.right.top,
          width: ears.mobile.right.width,
        }}
      >
        <div className="-rotate-90 -scale-y-100">
          <ScallopTileStrip
            count={SCALLOP_VERTICAL_TILE_COUNTS.mobile}
            orientation="horizontal"
            size="mobile"
          />
        </div>
      </div>
    </div>
  )
}
