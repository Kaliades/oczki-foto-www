/** Noise stamp — Figma `Subtract` (`7092:4345`), 96×96 artboard. */
export const SCALLOPED_BRAND_BADGE_STAMP_ASSET = '/figma/about-hero-scalloped-badge-stamp.svg' as const

/** Drop-shadow bleed — Figma `7000:26977` outer export, 131×131 artboard. */
export const SCALLOPED_BRAND_BADGE_SHADOW_ASSET = '/figma/about-hero-scalloped-badge.svg' as const

/** Figma slot size per breakpoint — `7093:5705` / `7092:4344` / `7000:26977`. */
export const SCALLOPED_BRAND_BADGE_SLOT = {
  mobile: 64,
  tablet: 96,
  desktop: 96,
} as const

/**
 * Shadow layer bleed inside the slot — Figma `get_design_context` on `7000:26977`.
 * The 131×131 shadow export extends past the 96 px (or 64 px) bbox.
 */
export const SCALLOPED_BRAND_BADGE_SHADOW_BLEED = {
  top: '-3.11%',
  right: '-26.08%',
  bottom: '-32.84%',
  left: '-9.86%',
} as const

export const SCALLOPED_BRAND_BADGE_FIGMA_NODES = {
  desktop: '7000:26977',
  tablet: '7092:4344',
  mobile: '7093:5705',
} as const

export type ScallopedBrandBadgeVariant = keyof typeof SCALLOPED_BRAND_BADGE_SLOT
