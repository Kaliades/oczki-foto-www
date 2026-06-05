export const BORDERED_PRINCIPLES_RAIL_FIGMA_NODES = {
  desktop: '7001:2519',
  tablet: '7092:4352',
  mobile: '7093:5713',
} as const

/** Desktop: equal flex columns filling the inner content width (≥1366 px). */
export const BORDERED_PRINCIPLES_RAIL_DESKTOP_COLUMN_WIDTHS = [
  'min-[1366px]:min-w-0 min-[1366px]:flex-1',
  'min-[1366px]:min-w-0 min-[1366px]:flex-1',
  'min-[1366px]:min-w-0 min-[1366px]:flex-1',
] as const
