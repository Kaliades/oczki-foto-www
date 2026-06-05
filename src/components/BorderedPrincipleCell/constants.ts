/** Copy cell inside bordered principle rails — title body/l + description body/m. */
export const BORDERED_PRINCIPLE_CELL_LAYOUT = {
  copyGapMobilePx: 8,
  copyGapTabletDesktopPx: 10,
  paddingDesktopPx: 16,
  paddingTabletX: 64,
  paddingTabletY: 16,
  paddingMobileY: 16,
} as const

/** Snug body typography — tighter wrapped-line rhythm than default body tokens. */
export const BORDERED_PRINCIPLE_COPY_TYPOGRAPHY = {
  description: 'oczki-body-m-snug',
  title: 'oczki-body-l-snug',
} as const
