import { OFFER_SERVICE_HERO_STACKED_LAYOUT } from './constants'

/** Figma artboard range for stacked hero fluid interpolation. */
const STACKED_FLUID_MIN_VW = 360
const STACKED_FLUID_MAX_VW = 768
const STACKED_FLUID_VW_RANGE = STACKED_FLUID_MAX_VW - STACKED_FLUID_MIN_VW

const { mobile: stackedMobile, tablet: stackedTablet } = OFFER_SERVICE_HERO_STACKED_LAYOUT

/** Pixels scallop bleeds below copy container into the image — Figma metadata. */
const STACKED_SCALLOP_BOTTOM_BLEED_MOBILE =
  stackedMobile.scallopTop + stackedMobile.scallopSlotHeight - stackedMobile.copyContainerHeight
const STACKED_SCALLOP_BOTTOM_BLEED_TABLET =
  stackedTablet.scallopTop + stackedTablet.scallopSlotHeight - stackedTablet.copyContainerHeight

/** Extra tuck into image on viewports narrower than 360 px (320 px → 9 px more). */
const STACKED_SCALLOP_ULTRA_NARROW_TUCK = 9

/**
 * Linear clamp between mobile (360 px) and tablet (768 px) reference values.
 * Locks at min below 360 px and max from 768 px up to the desktop (`lg`) switch.
 */
export function stackedFluidPx(mobilePx: number, tabletPx: number): string {
  if (mobilePx === tabletPx) {
    return `${mobilePx}px`
  }

  const delta = tabletPx - mobilePx

  return `clamp(${mobilePx}px, calc(${mobilePx}px + (100vw - ${STACKED_FLUID_MIN_VW}px) * ${delta} / ${STACKED_FLUID_VW_RANGE}), ${tabletPx}px)`
}

/** CSS custom properties for stacked hero — set on layout root, consumed by children. */
export function offerServiceHeroStackedFluidStyle(): Record<string, string> {
  return {
    '--offer-stacked-breadcrumb-px': stackedFluidPx(16, 80),
    '--offer-stacked-breadcrumb-py': stackedFluidPx(0, 4),
    '--offer-stacked-breadcrumb-min-h': stackedFluidPx(44, 52),
    '--offer-stacked-copy-pt': stackedFluidPx(20, 48),
    '--offer-stacked-copy-px': stackedFluidPx(16, 80),
    '--offer-stacked-copy-pb': stackedFluidPx(96, 96),
    '--offer-stacked-copy-gap': stackedFluidPx(28, 32),
    '--offer-stacked-copy-min-h': stackedFluidPx(408, 407),
    '--offer-stacked-copy-inner-gap': stackedFluidPx(8, 16),
    '--offer-stacked-copy-inner-max-w': stackedFluidPx(328, 481),
    '--offer-stacked-desc-pr': stackedFluidPx(48, 48),
    /**
     * Anchor scallop to copy-container bottom (not % of height) so it stays on the
     * image edge when copy wraps. Ultra-narrow tuck reduces cream-zone protrusion.
     */
    '--offer-stacked-scallop-bottom': `calc(-1 * (${stackedFluidPx(
      STACKED_SCALLOP_BOTTOM_BLEED_MOBILE,
      STACKED_SCALLOP_BOTTOM_BLEED_TABLET,
    )}) - max(0px, ${STACKED_FLUID_MIN_VW}px - 100vw) * ${STACKED_SCALLOP_ULTRA_NARROW_TUCK} / 40)`,
    '--offer-stacked-scallop-h': stackedFluidPx(80, 80),
    '--offer-stacked-scallop-bleed': `${stackedMobile.scallopBleedXPercent}%`,
  }
}
