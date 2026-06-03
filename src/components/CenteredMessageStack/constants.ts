/** Centred heading + body stack — Figma `Text Container` on closing CTA panels. */
export const CENTERED_MESSAGE_STACK_LAYOUT = {
  desktop: {
    bodyInsetX: 0,
    bodyMaxWidth: 442,
    figmaNode: '6952:17281',
    gap: 16,
    headingNode: '6952:17282',
    bodyNode: '6952:17284',
    headingSizeClassName: 'text-[32px] tracking-[-0.32px]',
    width: 591,
  },
  tablet: {
    bodyInsetX: 0,
    bodyMaxWidth: 442,
    figmaNode: '7102:12885',
    gap: 16,
    headingNode: '7102:12886',
    bodyNode: '7102:12887',
    headingSizeClassName: 'text-[28px] tracking-[-0.28px]',
    width: 504,
  },
  mobile: {
    bodyInsetX: 0,
    bodyMaxWidth: undefined,
    figmaNode: '7102:16766',
    gap: 10,
    headingNode: '7102:16767',
    bodyNode: '7102:16768',
    headingSizeClassName: 'text-[24px] tracking-[-0.24px]',
    width: 328,
  },
} as const

export type CenteredMessageStackVariant = keyof typeof CENTERED_MESSAGE_STACK_LAYOUT

export type CenteredMessageStackHeading = {
  emphasis: string
  end: string
  start: string
}
