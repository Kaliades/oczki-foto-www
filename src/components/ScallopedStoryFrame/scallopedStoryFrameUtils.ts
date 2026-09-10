import { SCALLOP_TILE } from './constants'

export type ScallopStoryBreakpoint = 'mobile' | 'desktop'

/** Along-side pitch after `-rotate-90` — tile width minus vertical-strip overlap. */
export function scallopVerticalStepPx(breakpoint: ScallopStoryBreakpoint): number {
  if (breakpoint === 'mobile') {
    return SCALLOP_TILE.mobile.width - SCALLOP_TILE.mobile.overlap
  }

  return SCALLOP_TILE.desktop.width - SCALLOP_TILE.desktop.verticalOverlap
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
 * How many extra side tiles (left AND right, one each at the bottom) are needed
 * so the group can grow by whole scallop steps under taller copy.
 */
export function scallopExtraVerticalTiles(
  contentExtentPx: number,
  baseGroupHeightPx: number,
  stepPx: number,
): number {
  if (stepPx <= 0) {
    return 0
  }

  const overflowPx = contentExtentPx - baseGroupHeightPx
  if (overflowPx <= 0) {
    return 0
  }

  return Math.ceil(overflowPx / stepPx)
}
