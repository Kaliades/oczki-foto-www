import { PERFORATED_SCALLOP_CIRCLE } from './constants'
import type { PerforatedScallopPerimeterLayout } from './constants'

const { defaultHorizontalCount, defaultVerticalCount, sizePx } = PERFORATED_SCALLOP_CIRCLE

/** Horizontal / vertical advance — Figma 64 px diameter, 6 px overlap (58 px pitch). */
export const PERFORATED_SCALLOP_STEP_PX = sizePx - PERFORATED_SCALLOP_CIRCLE.overlapPx

/**
 * Minimum circle count to cover `spanPx` with overlapping tiles.
 *
 * Desktop override: 21 horizontal / 6 vertical (`PERFORATED_SCALLOP_PERIMETER_LAYOUT.desktop`).
 */
export function perforatedScallopCircleCount(spanPx: number, fallbackCount: number): number {
  if (spanPx <= 0) {
    return fallbackCount
  }

  if (spanPx <= sizePx) {
    return 1
  }

  return Math.ceil((spanPx - sizePx) / PERFORATED_SCALLOP_STEP_PX) + 1
}

/** Left offset of the TR/BR corner tile — shared by top/bottom and right edges. */
export function perforatedScallopCornerRightLeftPx(
  bleedLeftPx: number,
  horizontalCount: number,
): number {
  if (horizontalCount <= 0) {
    return -bleedLeftPx
  }

  return -bleedLeftPx + (horizontalCount - 1) * PERFORATED_SCALLOP_STEP_PX
}

/** Right rail when the top row is centred — Figma mobile `7093:5875` @ x=274. */
export function perforatedScallopCenteredRightRailLeftPx(
  panelWidthPx: number,
  horizontalSpanPx: number,
  horizontalCount: number,
): number {
  if (horizontalCount <= 0) {
    return panelWidthPx - sizePx
  }

  return (panelWidthPx - horizontalSpanPx) / 2 + (horizontalCount - 1) * PERFORATED_SCALLOP_STEP_PX
}

/** Left offset of the right vertical rail for corner-anchored layouts. */
export function perforatedScallopRightRailLeftPx(
  layout: PerforatedScallopPerimeterLayout,
  metrics: PerforatedScallopPerimeterMetrics,
  panelWidthPx: number,
): number {
  const { bleedLeftPx, rightRailOffsetPx = 0, topCentered } = layout
  const { horizontalCount, horizontalSpanPx } = metrics

  if (topCentered) {
    const widthPx = panelWidthPx > 0 ? panelWidthPx : 320

    return perforatedScallopCenteredRightRailLeftPx(widthPx, horizontalSpanPx, horizontalCount)
  }

  return perforatedScallopCornerRightLeftPx(bleedLeftPx, horizontalCount) + rightRailOffsetPx
}

/** Top offset of the bottom horizontal rail — panel-anchored, keeps BL/BR corners on the tile grid. */
export function perforatedScallopBottomRailTopPx(
  panelHeightPx: number,
  bleedBottomPx: number,
): number {
  return panelHeightPx + bleedBottomPx - sizePx
}

/** Top offset of the BL/BR corner tile — shared by left/right and bottom edges. */
export function perforatedScallopCornerBottomTopPx(bleedTopPx: number, verticalCount: number): number {
  if (verticalCount <= 0) {
    return -bleedTopPx
  }

  return -bleedTopPx + (verticalCount - 1) * PERFORATED_SCALLOP_STEP_PX
}

/** Total span occupied by `count` overlapping circles. */
export function perforatedScallopEdgeSpanPx(count: number): number {
  if (count <= 0) {
    return 0
  }

  if (count === 1) {
    return sizePx
  }

  return sizePx + (count - 1) * PERFORATED_SCALLOP_STEP_PX
}

export type PerforatedScallopPerimeterMetrics = {
  horizontalCount: number
  horizontalSpanPx: number
  verticalCount: number
  verticalSpanPx: number
}

/**
 * Derive paired edge counts and exact tile spans from one panel measurement.
 *
 * When counts are fixed, spans come from {@link perforatedScallopEdgeSpanPx} so
 * rail boxes match circle geometry and corners meet without gaps.
 */
export function computePerforatedScallopPerimeter(
  panelWidthPx: number,
  panelHeightPx: number,
  layout: PerforatedScallopPerimeterLayout,
): PerforatedScallopPerimeterMetrics {
  const measuredHorizontalSpanPx =
    layout.topSpanPx ?? panelWidthPx + layout.bleedLeftPx + layout.bleedRightPx
  const measuredVerticalSpanPx = panelHeightPx + layout.bleedTopPx + layout.bleedBottomPx

  const horizontalCount =
    layout.horizontalCount ??
    perforatedScallopCircleCount(measuredHorizontalSpanPx, PERFORATED_SCALLOP_CIRCLE.defaultHorizontalCount)
  const verticalCount =
    layout.verticalCount ??
    perforatedScallopCircleCount(measuredVerticalSpanPx, PERFORATED_SCALLOP_CIRCLE.defaultVerticalCount)

  const horizontalSpanPx = layout.horizontalCount
    ? perforatedScallopEdgeSpanPx(horizontalCount)
    : layout.topSpanPx ?? perforatedScallopEdgeSpanPx(horizontalCount)

  const verticalSpanPx = layout.verticalCount
    ? perforatedScallopEdgeSpanPx(verticalCount)
    : perforatedScallopEdgeSpanPx(verticalCount)

  return {
    horizontalCount,
    horizontalSpanPx,
    verticalCount,
    verticalSpanPx,
  }
}

/** Layout-derived metrics before the panel is measured — avoids tablet defaults flashing on desktop. */
export function createPerforatedScallopMetricsFromLayout(
  layout: PerforatedScallopPerimeterLayout,
): PerforatedScallopPerimeterMetrics {
  const horizontalCount = layout.horizontalCount ?? defaultHorizontalCount
  const verticalCount = layout.verticalCount ?? defaultVerticalCount

  return {
    horizontalCount,
    horizontalSpanPx: layout.horizontalCount
      ? perforatedScallopEdgeSpanPx(horizontalCount)
      : (layout.topSpanPx ?? perforatedScallopEdgeSpanPx(horizontalCount)),
    verticalCount,
    verticalSpanPx: perforatedScallopEdgeSpanPx(verticalCount),
  }
}
