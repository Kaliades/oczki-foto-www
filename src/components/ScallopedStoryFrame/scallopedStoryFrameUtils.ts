import {
  SCALLOP_HORIZONTAL_TILE_COUNTS,
  SCALLOP_TILE,
  SCALLOPED_STORY_FRAME_LAYOUT,
} from './constants'

export type ScallopStoryBreakpoint = 'mobile' | 'desktop'

export type ScallopWrapLayout = {
  breakpoint: ScallopStoryBreakpoint
  groupWidthPx: number
  groupHeightPx: number
  panel: { top: number; left: number; width: number; height: number }
  horizontalCount: number
  verticalCount: number
  topRowTopPx: number
  bottomRowTopPx: number
  sideTopPx: number
  sideHeightPx: number
  sideWidthPx: number
  leftPx: number
  rightPx: number
}

/** Soft ceiling so a runaway CMS title cannot blow up the hero. */
export const SCALLOP_PANEL_MAX_EXTRA_TILES = 8

export function scallopVerticalStepPx(breakpoint: ScallopStoryBreakpoint): number {
  if (breakpoint === 'mobile') {
    return SCALLOP_TILE.mobile.width - SCALLOP_TILE.mobile.overlap
  }
  return SCALLOP_TILE.desktop.width - SCALLOP_TILE.desktop.verticalOverlap
}

export function scallopTileSize(breakpoint: ScallopStoryBreakpoint): {
  width: number
  height: number
  overlap: number
} {
  if (breakpoint === 'mobile') {
    return {
      width: SCALLOP_TILE.mobile.width,
      height: SCALLOP_TILE.mobile.height,
      overlap: SCALLOP_TILE.mobile.overlap,
    }
  }
  return {
    width: SCALLOP_TILE.desktop.width,
    height: SCALLOP_TILE.desktop.height,
    overlap: SCALLOP_TILE.desktop.verticalOverlap,
  }
}

/** How many overlapping tiles cover at least `lengthPx` along the strip axis. */
export function scallopTileCountForLength(
  lengthPx: number,
  tileExtentPx: number,
  overlapPx: number,
): number {
  if (lengthPx <= 0) return 1
  if (lengthPx <= tileExtentPx) return 1
  const step = tileExtentPx - overlapPx
  if (step <= 0) return 1
  return Math.ceil((lengthPx - tileExtentPx) / step) + 1
}

export function scallopStripLengthPx(
  count: number,
  tileExtentPx: number,
  overlapPx: number,
): number {
  if (count <= 0) return 0
  return count * tileExtentPx - (count - 1) * overlapPx
}

export function scallopBaseGroupHeightPx(breakpoint: ScallopStoryBreakpoint): number {
  const { height } = SCALLOPED_STORY_FRAME_LAYOUT.group
  return breakpoint === 'mobile' ? height.mobile : height.desktop
}

export function scallopPanelTopPx(breakpoint: ScallopStoryBreakpoint): number {
  const { top } = SCALLOPED_STORY_FRAME_LAYOUT.innerPanel
  return breakpoint === 'mobile' ? top.mobile : top.desktop
}

export function scallopPanelMaxHeightPx(
  breakpoint: ScallopStoryBreakpoint,
  peekPx: number,
  maxExtra = SCALLOP_PANEL_MAX_EXTRA_TILES,
): number {
  const stepPx = scallopVerticalStepPx(breakpoint)
  const baseHeight = scallopBaseGroupHeightPx(breakpoint)
  const panelTop = scallopPanelTopPx(breakpoint)
  const clearance = SCALLOPED_STORY_FRAME_LAYOUT.bottomTileClearance
  const maxFrameHeight = baseHeight + maxExtra * stepPx
  return Math.max(0, maxFrameHeight - peekPx - clearance - panelTop)
}

/**
 * Build scallop wrap from a measured cream panel (text → box → clouds).
 *
 * 1. Panel height comes from content (already measured).
 * 2. Side cloud count = ceil(coverLength / cloud step).
 * 3. Bottom row sits just under the panel; sides span top→bottom rows.
 */
export function scallopWrapFromPanel(args: {
  breakpoint: ScallopStoryBreakpoint
  panelTop: number
  panelLeft: number
  panelWidth: number
  panelHeight: number
  peekPx: number
}): ScallopWrapLayout {
  const { breakpoint, panelTop, panelLeft, panelWidth, panelHeight, peekPx } = args
  const tile = scallopTileSize(breakpoint)
  const groupWidth =
    breakpoint === 'mobile'
      ? SCALLOPED_STORY_FRAME_LAYOUT.group.width.mobile
      : SCALLOPED_STORY_FRAME_LAYOUT.group.width.desktop
  const clearance = SCALLOPED_STORY_FRAME_LAYOUT.bottomTileClearance
  const sideWidth = breakpoint === 'mobile' ? 46 : 60
  const minVertical =
    breakpoint === 'mobile'
      ? 5
      : 5

  // Top row peeks above the cream; bottom row peeks below (same chrome as Figma).
  const topRowTopPx = Math.max(0, panelTop - (tile.height - peekPx))
  const bottomRowTopPx = panelTop + panelHeight - (tile.height - peekPx)

  // Side strips cover from top-row top to bottom-row bottom.
  const coverLength = bottomRowTopPx + tile.height - topRowTopPx
  const verticalCount = Math.max(
    minVertical,
    scallopTileCountForLength(coverLength, tile.width, tile.overlap),
  )
  const sideHeightPx = scallopStripLengthPx(verticalCount, tile.width, tile.overlap)
  const sideTopPx = topRowTopPx

  const horizontalCount =
    breakpoint === 'mobile'
      ? SCALLOP_HORIZONTAL_TILE_COUNTS.mobile
      : SCALLOP_HORIZONTAL_TILE_COUNTS.desktop

  const leftPx = Math.max(0, panelLeft - sideWidth + 8)
  const rightPx = Math.min(groupWidth - sideWidth, panelLeft + panelWidth - 8)

  const groupHeightPx = Math.max(
    scallopBaseGroupHeightPx(breakpoint),
    bottomRowTopPx + tile.height + clearance,
    sideTopPx + sideHeightPx,
  )

  return {
    breakpoint,
    groupWidthPx: groupWidth,
    groupHeightPx,
    panel: {
      top: panelTop,
      left: panelLeft,
      width: panelWidth,
      height: panelHeight,
    },
    horizontalCount,
    verticalCount,
    topRowTopPx,
    bottomRowTopPx,
    sideTopPx,
    sideHeightPx,
    sideWidthPx: sideWidth,
    leftPx,
    rightPx,
  }
}

/** @deprecated Prefer scallopWrapFromPanel — kept for any external imports. */
export function scallopVerticalStripLengthPx(
  count: number,
  breakpoint: ScallopStoryBreakpoint,
): number {
  const tile = scallopTileSize(breakpoint)
  return scallopStripLengthPx(count, tile.width, tile.overlap)
}

/** @deprecated Prefer scallopWrapFromPanel */
export function scallopExtraVerticalTiles(
  contentExtentPx: number,
  baseGroupHeightPx: number,
  stepPx: number,
  minExtra = 0,
): number {
  if (stepPx <= 0) return 0
  return Math.max(minExtra, Math.ceil((contentExtentPx - baseGroupHeightPx) / stepPx))
}

/** @deprecated Prefer scallopWrapFromPanel */
export function scallopFrameMetricsFromPanel(args: {
  panelBottomPx: number
  breakpoint: ScallopStoryBreakpoint
  peekPx: number
}): { extraVerticalTiles: number; heightPx: number } {
  const wrap = scallopWrapFromPanel({
    breakpoint: args.breakpoint,
    panelTop: scallopPanelTopPx(args.breakpoint),
    panelLeft:
      args.breakpoint === 'mobile'
        ? SCALLOPED_STORY_FRAME_LAYOUT.innerPanel.left.mobile
        : SCALLOPED_STORY_FRAME_LAYOUT.innerPanel.left.desktop,
    panelWidth:
      args.breakpoint === 'mobile'
        ? SCALLOPED_STORY_FRAME_LAYOUT.innerPanel.width.mobile
        : SCALLOPED_STORY_FRAME_LAYOUT.innerPanel.width.desktop,
    panelHeight: Math.max(0, args.panelBottomPx - scallopPanelTopPx(args.breakpoint)),
    peekPx: args.peekPx,
  })
  return {
    extraVerticalTiles: Math.max(0, wrap.verticalCount - 5),
    heightPx: wrap.groupHeightPx,
  }
}
