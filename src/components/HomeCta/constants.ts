import type { SectionLink } from '@/utilities/resolveLinkHref'

/**
 * Home — final booking CTA ("Czy to jest ten moment…").
 *
 * Figma references (always desktop / tablet / mobile in parallel):
 *   - desktop 1366: https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7105-8981
 *   - tablet  768:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7118-9246
 *   - mobile  360:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7105-14226
 */
export const HOME_CTA_FIGMA_NODES = {
  desktopFrame: '7105:8981',
  tabletFrame: '7118:9246',
  mobileFrame: '7105:14226',
} as const

export const CTA_DESKTOP_ARTBOARD = {
  width: 1366,
  height: 594,
} as const

export const CTA_TABLET_ARTBOARD = {
  width: 768,
  height: 554,
} as const

export const CTA_TABLET_SHELL_PADDING_X = 48

export const CTA_TABLET_CONTENT_COLUMN_WIDTH =
  CTA_TABLET_ARTBOARD.width - CTA_TABLET_SHELL_PADDING_X * 2

/** Figma 7105:8627 — outer scalloped frame; all tablet layers are relative to this box. */
export const CTA_TABLET_FRAME_CLUSTER = {
  left: 0,
  top: 81.6,
  width: CTA_TABLET_CONTENT_COLUMN_WIDTH,
  height: 389.4,
} as const

/** Figma 7105:8634 — inner fill, offset inside outer frame. */
export const CTA_TABLET_INNER_FRAME = {
  left: 21,
  top: 16,
  width: 648,
  height: 358,
} as const

/**
 * Figma 7105:8604 — copy card (608×362 at artboard 80,96); centered in 672 px outer frame.
 */
export const CTA_TABLET_CONTENT_IN_FRAME = {
  left: 32,
  top: 14.4,
  width: 608,
  height: 362,
} as const

/** Figma 7105:8610 / 8618 — coords relative to copy container 8604 (ears). */
export const CTA_TABLET_DECOR_LEFT_IN_CONTENT = {
  left: -29,
  top: 122.69921875,
} as const

export const CTA_TABLET_DECOR_RIGHT_IN_CONTENT = {
  left: 632.359375,
  top: 122.69921875,
} as const

export type HomeCtaData = {
  heading: {
    plain: string
    emphasis: string
  }
  body: string
  cta: SectionLink
}

export const homeCtaDefaults: HomeCtaData = {
  heading: {
    plain: 'Czy to jest ten moment, w którym robimy ',
    emphasis: 'coś pięknego',
  },
  body: 'Nie musisz mieć doświadczenia przed aparatem ani wiedzieć dokładnie, czego oczekujesz. Moim zadaniem jest sprawić, żeby Twoja sesja była spokojna, naturalna i pełna prawdziwych emocji.',
  cta: {
    type: 'custom',
    url: '/kontakt',
    label: 'Umów sesję zdjęciową',
    newTab: false,
  },
}
