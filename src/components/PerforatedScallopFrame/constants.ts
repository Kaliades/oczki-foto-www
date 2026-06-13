/** Figma `Ellipse 52` (`7001:2104`) — 64×64 primary/100 circle. */
export const PERFORATED_SCALLOP_CIRCLE = {
  sizePx: 64,
  overlapPx: 6,
  asset: '/figma/session-feel-scallop-circle.svg',
  defaultHorizontalCount: 21,
  defaultVerticalCount: 6,
} as const

export type PerforatedScallopPerimeterLayout = {
  bleedBottomPx: number
  bleedLeftPx: number
  bleedRightPx: number
  bleedTopPx: number
  /** Fixed tile count — bypasses span-derived count when set. */
  horizontalCount?: number
  verticalCount?: number
  /** When set, top/bottom span is fixed (mobile centred rail `7093:5817`). */
  topSpanPx?: number
  topCentered: boolean
  showBottomOnPanel: boolean
  /** Extra left offset for the right vertical rail — desktop outer rail +58 px (`7001:2176`). */
  rightRailOffsetPx?: number
  showSideRails: boolean
}

/** Bleed offsets from metadata `6972:15552` / `7092:4443` / `7093:5816`. */
export const PERFORATED_SCALLOP_PERIMETER_LAYOUT = {
  mobile: {
    bleedTopPx: 27,
    bleedBottomPx: 0,
    bleedLeftPx: 19,
    bleedRightPx: 19,
    horizontalCount: 6,
    verticalCount: 13,
    topSpanPx: 354,
    topCentered: true,
    showBottomOnPanel: false,
    showSideRails: true,
  },
  tablet: {
    bleedTopPx: 28,
    bleedBottomPx: 44,
    bleedLeftPx: 19,
    bleedRightPx: 11,
    horizontalCount: 11,
    verticalCount: 13,
    topCentered: false,
    showBottomOnPanel: true,
    showSideRails: true,
  },
  desktop: {
    bleedTopPx: 28,
    bleedBottomPx: 41,
    bleedLeftPx: 19,
    bleedRightPx: 25,
    horizontalCount: 21,
    verticalCount: 5,
    rightRailOffsetPx: PERFORATED_SCALLOP_CIRCLE.sizePx - PERFORATED_SCALLOP_CIRCLE.overlapPx,
    topCentered: false,
    showBottomOnPanel: true,
    showSideRails: true,
  },
} as const satisfies Record<string, PerforatedScallopPerimeterLayout>

/** Panel shell classes — one set per breakpoint, no overlapping Tailwind media queries. */
export const PERFORATED_SCALLOP_PANEL_CLASSNAME = {
  mobile:
    'relative mx-auto h-[695px] w-[320px] overflow-visible bg-[var(--oczki-primary-100)] py-3 max-md:px-0',
  tablet:
    'relative mx-auto h-[688px] w-[608px] overflow-visible bg-[var(--oczki-primary-100)] px-5 py-3',
  desktop:
    'relative mx-auto h-[250px] w-[1238px] overflow-visible bg-[var(--oczki-primary-100)] p-5',
} as const satisfies Record<keyof typeof PERFORATED_SCALLOP_PERIMETER_LAYOUT, string>

export const PERFORATED_SCALLOP_FRAME_FIGMA_NODES = {
  desktopPanel: '6972:15552',
  tabletPanel: '7092:4443',
  mobilePanel: '7093:5816',
  mobileBottomRail: '7093:6665',
  topRailDesktop: '7001:2106',
  bottomRailDesktop: '7001:2149',
  leftRailDesktop: '7001:2185',
  rightRailDesktop: '7001:2176',
  topRailTablet: '7092:4444',
  bottomRailTablet: '7092:5528',
  leftRailTablet: '7092:4517',
  rightRailTablet: '7092:5514',
  topRailMobile: '7093:5817',
  leftRailMobile: '7093:5861',
  rightRailMobile: '7093:5875',
} as const

/** Mobile bottom rail sits outside the cream panel (`7093:6665`). */
export const PERFORATED_SCALLOP_MOBILE_BOTTOM_RAIL = {
  circleCount: 6,
  offsetBottomPx: 36,
  spanPx: 354,
} as const

/** @deprecated Use PERFORATED_SCALLOP_PERIMETER_LAYOUT */
export const PERFORATED_SCALLOP_FRAME_LAYOUT = {
  horizontal: {
    heightPx: 64,
    offsetLeftPx: -19,
    offsetTopPx: -28,
    mobileCenteredWidthPx: 354,
  },
  vertical: {
    desktopHeightPx: 354,
    mobileTabletHeightPx: 760,
    offsetLeftPx: -19,
    offsetTopPx: -28,
    widthPx: 64,
    rightOffsetPx: -25,
  },
} as const
