/** Figma `tick-01` — mark sits inside a clipped square box with inset positioning. */
export const TICK_ICON_LAYOUT = {
  checklist: {
    bleedInsetClassName: 'inset-[-6.82%_-5.36%]',
    boxSizePx: 24,
    containerOffsetClassName: 'pt-px',
  },
  package: {
    bleedInsetClassName: 'inset-[-9.09%_-7.14%]',
    boxSizePx: 18,
    containerOffsetClassName: 'pt-0.5',
  },
} as const

export type TickIconVariant = keyof typeof TICK_ICON_LAYOUT
