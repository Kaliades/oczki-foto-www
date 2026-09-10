import { SCALLOP_TILE, SCALLOPED_STORY_FRAME_LAYOUT } from './constants'

export type ScallopStoryBreakpoint = 'mobile' | 'desktop'

export type ScallopFrameMetrics = {
  /** Whole-tile growth only — sides, bottom row, and group height stay on one grid. */
  extraVerticalTiles: number
  heightPx: number
}

/** Along-side pitch after `-rotate-90` — tile width minus vertical-strip overlap. */
export function scallopVerticalStepPx(breakpoint: ScallopStoryBreakpoint): number {
  if (breakpoint === 'mobile') {
    return SCALLOP_TILE.mobile.width - SCALLOP_TILE.mobile.overlap
  }

  return SCALLOP_TILE.desktop.width - SCALLOP_TILE.desktop.verticalOverlap
}

/** Horizontal scallop tile height (unrotated top/bottom row). */
export function scallopHorizontalTileHeightPx(breakpoint: ScallopStoryBreakpoint): number {
  return breakpoint === 'mobile' ? SCALLOP_TILE.mobile.height : SCALLOP_TILE.desktop.height
}

/** Base top offset of the bottom scallop row (before extra-tile shifts). */
export function scallopBaseBottomRowTopPx(breakpoint: ScallopStoryBreakpoint): number {
  return breakpoint === 'mobile'
    ? SCALLOPED_STORY_FRAME_LAYOUT.ears.mobile.bottom.top
    : SCALLOPED_STORY_FRAME_LAYOUT.ears.desktop.bottom.top
}

export function scallopBaseGroupHeightPx(breakpoint: ScallopStoryBreakpoint): number {
  const { height } = SCALLOPED_STORY_FRAME_LAYOUT.group
  return breakpoint === 'mobile' ? height.mobile : height.desktop
}

/** Strip length for `count` side tiles (pre-rotation axis). */
export function scallopVerticalStripLengthPx(
  count: number,
  breakpoint: ScallopStoryBreakpoint,
): number {
  if (count <= 0) {
    return 0
  }

  const tile = breakpoint === 'mobile' ? SCALLOP_TILE.mobile.width : SCALLOP_TILE.desktop.width
  const overlap =
    breakpoint === 'mobile' ? SCALLOP_TILE.mobile.overlap : SCALLOP_TILE.desktop.verticalOverlap

  return count * tile - (count - 1) * overlap
}

/**
 * Whole-tile growth from content extent vs base group height.
 * `minExtra` defaults to 0 — the cream panel min-height locks the Figma base
 * (≈4 lines); short copy just gets extra space inside, never shrinks the frame.
 */
export function scallopExtraVerticalTiles(
  contentExtentPx: number,
  baseGroupHeightPx: number,
  stepPx: number,
  minExtra = 0,
  maxExtra = 8,
): number {
  if (stepPx <= 0) {
    return 0
  }

  const raw = Math.ceil((contentExtentPx - baseGroupHeightPx) / stepPx)
  return Math.min(maxExtra, Math.max(minExtra, raw))
}

/**
 * Frame metrics from the measured cream panel.
 *
 * Floor is the Figma base group (inner panel min-height fills it for short /
 * 3-line copy). Longer copy grows by whole side-tile steps; bottom row moves
 * with the sides so corners never double up.
 */
export function scallopFrameMetricsFromPanel(args: {
  panelBottomPx: number
  breakpoint: ScallopStoryBreakpoint
  peekPx: number
}): ScallopFrameMetrics {
  const { panelBottomPx, breakpoint, peekPx } = args
  const stepPx = scallopVerticalStepPx(breakpoint)
  const tileH = scallopHorizontalTileHeightPx(breakpoint)
  const baseBottomTop = scallopBaseBottomRowTopPx(breakpoint)
  const baseHeight = scallopBaseGroupHeightPx(breakpoint)
  const clearance = SCALLOPED_STORY_FRAME_LAYOUT.bottomTileClearance

  const neededHeight = panelBottomPx + peekPx + clearance
  const extra = scallopExtraVerticalTiles(neededHeight, baseHeight, stepPx)
  const bottomTopPx = baseBottomTop + extra * stepPx
  const heightPx = Math.max(baseHeight + extra * stepPx, bottomTopPx + tileH + clearance)

  return { extraVerticalTiles: extra, heightPx }
}
