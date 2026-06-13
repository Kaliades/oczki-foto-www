export const PUNCHED_TAG_CARD_RAIL_FIGMA_NODES = {
  desktop: '6994:26175',
  tablet: '7092:4675',
  mobile: '7093:6060',
  ribbon: {
    desktop: '6994:26324',
    tablet: '7092:4697',
    mobile: '7093:6075',
  },
} as const

export type PunchedTagCardRailFlexSlot = {
  heightPx: number
  marginBottomPx?: number
  marginLeftPx?: number
  marginTopPx?: number
  widthPx: number
}

/** Desktop — Figma `6994:26175` `flex justify-between` + tilt-shell wrappers. */
export const PUNCHED_TAG_CARD_RAIL_DESKTOP = {
  heightPx: 257,
  layoutClassName: 'flex items-start justify-between',
  slots: [
    { widthPx: 419.171, heightPx: 241.483, marginTopPx: 24.811 },
    { widthPx: 429.847, heightPx: 257.129 },
    { widthPx: 413.367, heightPx: 248.865, marginTopPx: 11.93 },
  ],
  widthPx: 1302,
} as const

/** Tablet — Figma `7092:4675`; overlap eased from `mb-[-16px]` to `0` for slightly more card breathing room. */
export const PUNCHED_TAG_CARD_RAIL_TABLET = {
  heightPx: 747,
  layoutClassName: 'flex flex-col items-center',
  slots: [
    { widthPx: 419.171, heightPx: 241.483, marginBottomPx: 0 },
    { widthPx: 429.847, heightPx: 257.129, marginBottomPx: 0, marginLeftPx: 24.172 },
    { widthPx: 413.367, heightPx: 248.865 },
  ],
  widthPx: 608,
} as const

/** Mobile — Figma `7093:6060`; overlap eased from `mb-[-6px]` to `0` for slightly more card breathing room. */
export const PUNCHED_TAG_CARD_RAIL_MOBILE = {
  heightPx: 714,
  layoutClassName: 'flex flex-col items-center',
  slots: [
    { widthPx: 324.457, heightPx: 237.703, marginBottomPx: 0 },
    { widthPx: 328.28, heightPx: 227.59, marginBottomPx: 0, marginLeftPx: 22.035 },
    { widthPx: 327.45, heightPx: 248.35 },
  ],
  widthPx: 328,
} as const

export const COLLABORATION_PILLARS_RIBBON = {
  desktop: {
    imageHeightPx: 223,
    imageWidthPx: 166,
    left: '747.69px',
    rotationDeg: 7.29,
    src: '/figma/collaboration-pillars-ribbon.png',
    top: '-28px',
    wrapperHeightPx: 242.271,
    wrapperWidthPx: 192.97,
  },
  tablet: {
    imageHeightPx: 223,
    imageWidthPx: 166,
    left: '313.73px',
    rotationDeg: 1.17,
    skewDeg: 0.34,
    src: '/figma/collaboration-pillars-ribbon.png',
    top: '-64px',
    wrapperHeightPx: 226.38,
    wrapperWidthPx: 169.231,
  },
  mobile: {
    imageHeightPx: 132,
    imageWidthPx: 98,
    left: '269px',
    rotationDeg: 7.29,
    src: '/figma/collaboration-pillars-ribbon.png',
    top: '228px',
    wrapperHeightPx: 143.374,
    wrapperWidthPx: 113.966,
  },
} as const
