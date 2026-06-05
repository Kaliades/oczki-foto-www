import { OFFER_SERVICE_HERO_STACKED_LAYOUT } from './constants'

const { circleSize, circleOverlap, circleCount } = OFFER_SERVICE_HERO_STACKED_LAYOUT.horizontalScallop

/** Horizontal advance per circle — Figma 80 px diameter, 12 px overlap. */
export const OFFER_SERVICE_HERO_HORIZONTAL_SCALLOP_STEP_PX = circleSize - circleOverlap

/**
 * Circle count to cover `containerWidthPx` with overlapping tiles.
 * One extra tile keeps edges smooth under sub-pixel resize / bleed clip.
 */
export function offerServiceHeroHorizontalScallopCircleCount(containerWidthPx: number): number {
  if (containerWidthPx <= 0) {
    return circleCount
  }

  if (containerWidthPx <= circleSize) {
    return 1
  }

  return (
    Math.ceil((containerWidthPx - circleSize) / OFFER_SERVICE_HERO_HORIZONTAL_SCALLOP_STEP_PX) + 1 + 1
  )
}
