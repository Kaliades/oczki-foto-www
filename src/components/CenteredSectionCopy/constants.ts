/** Copy block layout inside centered story sections — Figma `Heading` nodes. */
export const CENTERED_SECTION_COPY_LAYOUT = {
  desktop: {
    bodyInsetX: 36,
    bodyWidth: 442,
    figmaNode: '6989:25337',
    gap: 16,
    titleNode: '6986:20044',
    bodyNode: '6986:20045',
    width: 514,
  },
  tablet: {
    bodyInsetX: 36,
    bodyWidth: 442,
    figmaNode: '7102:12812',
    gap: 16,
    titleNode: '7102:12813',
    bodyNode: '7102:12814',
    width: 514,
  },
  mobile: {
    bodyInsetX: 0,
    bodyWidth: 328,
    figmaNode: '7102:16693',
    gap: 10,
    titleNode: '7102:16694',
    bodyNode: '7102:16695',
    width: 328,
  },
} as const

export type CenteredSectionCopyVariant = keyof typeof CENTERED_SECTION_COPY_LAYOUT
