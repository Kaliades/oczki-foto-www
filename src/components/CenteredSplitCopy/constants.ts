/** Responsive centred heading + body — Figma `Heading` pattern (header/m + body/l). */
export const CENTERED_SPLIT_COPY_FIGMA_NODES = {
  heading: {
    desktop: '7001:2444',
    tablet: '7092:4349',
    mobile: '7093:5710',
  },
  title: {
    desktop: '7001:2445',
    tablet: '7092:4350',
    mobile: '7093:5711',
  },
  body: {
    desktop: '7001:2446',
    tablet: '7092:4351',
    mobile: '7093:5712',
  },
} as const

export type CenteredSplitCopyHeading = {
  emphasis: string
  start: string
  end?: string
}
