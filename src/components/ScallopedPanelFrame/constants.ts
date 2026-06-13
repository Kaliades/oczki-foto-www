export const SCALLOPED_PANEL_FRAME_FIGMA_NODES = {
  desktop: '6884:14123',
  tablet: '7084:3475',
  mobile: '7086:4406',
  topRow: {
    desktop: '6950:16661',
    mobile: '7086:4438',
  },
  bottomRow: {
    desktop: '6950:16651',
    mobile: '7086:4407',
  },
  leftColumn: {
    desktop: '6950:16683',
    mobile: '7086:4427',
  },
  rightColumn: {
    desktop: '6950:16671',
    mobile: '7086:4416',
  },
} as const

/** Ellipse scallop metrics from Figma metadata — 72 px / 64 px step desktop, 48 px / 42 px mobile. */
export const SCALLOPED_PANEL_EAR_LAYOUT = {
  desktop: {
    circle: 72,
    overlap: 8,
    horizontalCount: 8,
    verticalCount: 10,
    top: -26,
    bottom: 550,
    sideCenterOffset: 223.5,
    verticalSpan: 648,
  },
  mobile: {
    circle: 48,
    overlap: 6,
    horizontalCount: 8,
    verticalCount: 15,
    top: -26,
    bottom: 563,
    leftColumnLeft: -16,
    rightColumnLeft: 'calc(50% + 147px)',
    sideCenterOffset: 147,
    verticalSpan: 636,
  },
} as const

export const SCALLOPED_PANEL_SHELL = {
  width: { mobile: 310, tablet: 463, desktop: 463 },
  minHeight: { mobile: 576, tablet: 588, desktop: 588 },
  padding: {
    mobile: { x: 8, top: 8, bottom: 8 },
    tablet: { x: 20, top: 20, bottom: 32 },
    desktop: { x: 20, top: 20, bottom: 32 },
  },
  contentButtonGap: { mobile: 24, tablet: 32, desktop: 32 },
} as const
