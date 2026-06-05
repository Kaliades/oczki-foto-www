import type { PackagePanelTheme } from '@/components/PackagePanel/constants'

export const PACKAGE_ORNAMENT_HEADING_LAYOUT = {
  desktop: {
    assetHeightPx: 52.364,
    assetWidthPx: 36,
    gapPx: 12,
    slotHeightPx: 36,
    slotWidthPx: 52.364,
  },
  mobile: {
    assetHeightPx: 42.182,
    assetWidthPx: 29,
    gapPx: 10,
    slotHeightPx: 29,
    slotWidthPx: 42.182,
  },
} as const

export const PACKAGE_ORNAMENT_ASSETS: Record<PackagePanelTheme, string> = {
  cream: '/figma/offer-package-ornament-cream.svg',
  rose: '/figma/offer-package-ornament-rose.svg',
  sage: '/figma/offer-package-ornament-sage.svg',
}
