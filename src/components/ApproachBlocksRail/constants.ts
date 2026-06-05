export const APPROACH_BLOCKS_RAIL_FIGMA_NODES = {
  desktop: '6986:20148',
  tablet: '7100:7854',
  mobile: '7102:9525',
} as const

/** Desktop column widths: 346 + 8 + 346 + 8 + 241 + 8 + 345 = 1302 px inside shell. */
export const APPROACH_BLOCKS_RAIL_DESKTOP_WIDTHS = [
  'min-[1366px]:w-[346px]',
  'min-[1366px]:w-[346px]',
  'min-[1366px]:w-[241px]',
  'min-[1366px]:flex-1 min-[1366px]:min-w-0',
] as const
