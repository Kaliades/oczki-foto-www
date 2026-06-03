export type BrandSygnetBadgeVariant = 'desktop' | 'tablet' | 'mobile'

type BrandSygnetBadgeLayout = {
  figmaNode: string
  /** Figma `Container` bbox — full badge including outer ring (108 artboard). */
  shellSize: number
}

/** Figma `6986:20009` / `7104:20205` / `7111:9001` — frosted rose sygnet badge. */
export const BRAND_SYGNET_BADGE_LAYOUT: Record<BrandSygnetBadgeVariant, BrandSygnetBadgeLayout> = {
  desktop: {
    figmaNode: '6986:20009',
    shellSize: 108,
  },
  tablet: {
    figmaNode: '7104:20205',
    shellSize: 88,
  },
  mobile: {
    figmaNode: '7111:9001',
    shellSize: 54,
  },
}

/** 108×108 export from Figma node `6986:20006` (noise filter + tertiary ring). */
export const BRAND_SYGNET_BADGE_ASSET = '/figma/case-study-venue-sygnet-badge.svg'
