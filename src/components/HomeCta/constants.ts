import { HOME_CREAM_SECTION_GAP } from '@/components/HomeInstagram/constants'
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

export const CTA_SHELL_PADDING_X = 48
/** Figma shell pt (96) — anchor for frame `topInShell` math only. */
export const CTA_SHELL_PADDING_TOP = 96
/**
 * Rendered shell pt — paired with `CTA_DESKTOP_FRAME_TOP_FROM_SECTION` so the frame
 * sits lower than Figma’s 81.6 px (more air after Instagram on the same cream bg).
 */
export const CTA_SHELL_PADDING_TOP_RENDER = 128

/** Matches Instagram → CTA rhythm — cream above newsletter / sage block. */
export const CTA_GAP_BEFORE_NEWSLETTER = HOME_CREAM_SECTION_GAP

/** Figma frame top (81.6) + 48 px — visible gap before the scalloped bbox. */
export const CTA_DESKTOP_FRAME_TOP_FROM_SECTION = 81.603515625 + 48

export const CTA_DESKTOP_SHELL_HEIGHT =
  CTA_DESKTOP_FRAME_TOP_FROM_SECTION +
  398.0009765625 +
  CTA_GAP_BEFORE_NEWSLETTER

/** Figma 7105:8627 — outer scalloped frame bbox on artboard. */
export const CTA_DESKTOP_FRAME_CLUSTER = {
  leftInShell: 96 - CTA_SHELL_PADDING_X,
  topInShell: CTA_DESKTOP_FRAME_TOP_FROM_SECTION - CTA_SHELL_PADDING_TOP_RENDER,
  width: 1174.166015625,
  height: 398.0009765625,
} as const

/** Figma 7105:8634 — inner fill offset inside outer frame. */
export const CTA_DESKTOP_INNER_FRAME = {
  left: 21,
  top: 16,
  width: 1133,
  height: 366,
} as const

/** Figma 7105:8641 — copy card relative to outer frame 8627. */
export const CTA_DESKTOP_CONTENT_IN_FRAME = {
  left: -48,
  top: 14.4,
  width: 1270,
  height: 370,
} as const

/**
 * Side ornaments — tuned to sit inside the SVG scallop ears, relative to outer frame 8627.
 * Figma 8655/8647 bbox coords sit outside the visible stroke on tablet; these values
 * track the ear geometry of cta-frame-outer-desktop.svg instead.
 */
export const CTA_DESKTOP_DECOR_LEFT_IN_FRAME = {
  left: 40,
  top: 137,
} as const

export const CTA_DESKTOP_DECOR_RIGHT_IN_FRAME = {
  left: 1054,
  top: 137,
} as const

export const CTA_TABLET_ARTBOARD = {
  width: 768,
  height: 554,
} as const

export const CTA_TABLET_CONTENT_COLUMN_WIDTH =
  CTA_TABLET_ARTBOARD.width - CTA_SHELL_PADDING_X * 2

/** Extra size on each side of the graphic frame — copy stays 608×362, frame grows around it. */
export const CTA_TABLET_FRAME_BLEED_X = 24
export const CTA_TABLET_FRAME_BLEED_Y = 24

const CTA_TABLET_FRAME_BASE_HEIGHT = 389.4
const CTA_TABLET_CONTENT_WIDTH = 608
const CTA_TABLET_CONTENT_HEIGHT = 362

export const CTA_TABLET_FRAME_CLUSTER = {
  leftInShell: -CTA_TABLET_FRAME_BLEED_X,
  topInShell: CTA_DESKTOP_FRAME_CLUSTER.topInShell - CTA_TABLET_FRAME_BLEED_Y,
  width: CTA_TABLET_CONTENT_COLUMN_WIDTH + CTA_TABLET_FRAME_BLEED_X * 2,
  height: CTA_TABLET_FRAME_BASE_HEIGHT + CTA_TABLET_FRAME_BLEED_Y * 2,
} as const

export const CTA_TABLET_SHELL_HEIGHT =
  CTA_SHELL_PADDING_TOP_RENDER +
  CTA_TABLET_FRAME_CLUSTER.topInShell +
  CTA_TABLET_FRAME_CLUSTER.height +
  CTA_GAP_BEFORE_NEWSLETTER

export const CTA_TABLET_FRAME_SCALE_X =
  CTA_TABLET_FRAME_CLUSTER.width / CTA_DESKTOP_FRAME_CLUSTER.width

export const CTA_TABLET_FRAME_SCALE_Y =
  CTA_TABLET_FRAME_CLUSTER.height / CTA_DESKTOP_FRAME_CLUSTER.height

/** Desktop frame coords scaled with separate X/Y factors so corners stay aligned. */
export const CTA_TABLET_INNER_FRAME = {
  left: CTA_DESKTOP_INNER_FRAME.left * CTA_TABLET_FRAME_SCALE_X,
  top: CTA_DESKTOP_INNER_FRAME.top * CTA_TABLET_FRAME_SCALE_Y,
  width: CTA_DESKTOP_INNER_FRAME.width * CTA_TABLET_FRAME_SCALE_X,
  height: CTA_DESKTOP_INNER_FRAME.height * CTA_TABLET_FRAME_SCALE_Y,
} as const

/** Copy card centred inside the enlarged graphic frame — Figma 8604 size unchanged. */
export const CTA_TABLET_CONTENT_IN_FRAME = {
  left: (CTA_TABLET_FRAME_CLUSTER.width - CTA_TABLET_CONTENT_WIDTH) / 2,
  top: (CTA_TABLET_FRAME_CLUSTER.height - CTA_TABLET_CONTENT_HEIGHT) / 2,
  width: CTA_TABLET_CONTENT_WIDTH,
  height: CTA_TABLET_CONTENT_HEIGHT,
} as const

/** 96 px — Figma 64 px + 32 px so side ornaments clear the copy. */
export const CTA_TABLET_CONTENT_PADDING_X = 96

/** Figma 7105:8560 — mobile graphic frame shell 328×593. */
export const CTA_MOBILE_FRAME_FIGMA_HEIGHT = 593

/**
 * Extra shell height so the bottom ornament (8573) sits inside the scallop instead of
 * ~50 px below the 593 px Figma bbox.
 */
export const CTA_MOBILE_FRAME_EXTRA_HEIGHT = 56

/** Cream above the mobile frame (after Instagram {@link HOME_CREAM_SECTION_GAP}). */
export const CTA_MOBILE_SHELL_EDGE_TOP = 72

/** Cream below the mobile frame — matches {@link HOME_CREAM_SECTION_GAP}. */
export const CTA_MOBILE_SHELL_EDGE_BOTTOM = HOME_CREAM_SECTION_GAP

export const CTA_MOBILE_FRAME = {
  left: 16,
  top: CTA_MOBILE_SHELL_EDGE_TOP,
  width: 328,
  height: CTA_MOBILE_FRAME_FIGMA_HEIGHT + CTA_MOBILE_FRAME_EXTRA_HEIGHT,
} as const

export const CTA_MOBILE_FRAME_SCALE =
  CTA_MOBILE_FRAME.height / CTA_MOBILE_FRAME_FIGMA_HEIGHT

export const CTA_MOBILE_SHELL_HEIGHT =
  CTA_MOBILE_SHELL_EDGE_TOP + CTA_MOBILE_FRAME.height + CTA_MOBILE_SHELL_EDGE_BOTTOM

/** Figma 7105:8573 clip bbox height. */
export const CTA_MOBILE_DECOR_HEIGHT = 63.913

/** Figma 7105:8573 — top ornament inset inside frame 8560. */
export const CTA_MOBILE_TOP_DECOR_INSET = 50.4

/** Mirrors top inset — bottom ornament anchored inside the enlarged frame shell. */
export const CTA_MOBILE_BOTTOM_DECOR_INSET = CTA_MOBILE_TOP_DECOR_INSET

/** Figma 8567 copy card — 139 px below frame shell top (164 − 25). */
export const CTA_MOBILE_CONTENT_OFFSET_FROM_FRAME_TOP = 139

/** Figma 7105:8567 — copy card at (16, 164), 328×345, 24 px vertical padding. */
export const CTA_MOBILE_CONTENT = {
  left: 16,
  top: CTA_MOBILE_FRAME.top + CTA_MOBILE_CONTENT_OFFSET_FROM_FRAME_TOP,
  width: 328,
  height: 345,
  paddingTop: 24,
  paddingBottom: 24,
  paddingX: 16,
} as const

/** Rotated desktop SVG intrinsic sizes — `width` becomes visual frame height. */
export const CTA_MOBILE_ORNATE_OUTER = {
  preRotateHeight: 328,
  preRotateWidth: CTA_MOBILE_FRAME.height,
} as const

export const CTA_MOBILE_ORNATE_INNER = {
  preRotateHeight: Math.round(296 * CTA_MOBILE_FRAME_SCALE),
  preRotateWidth: Math.round(561 * CTA_MOBILE_FRAME_SCALE),
  inset: Math.round(16 * CTA_MOBILE_FRAME_SCALE),
} as const

/** Ear-tuned positions — horizontal scale only; vertical tracks frame height ratio. */
export const CTA_TABLET_DECOR_LEFT_IN_FRAME = {
  left: CTA_DESKTOP_DECOR_LEFT_IN_FRAME.left * CTA_TABLET_FRAME_SCALE_X,
  top: CTA_DESKTOP_DECOR_LEFT_IN_FRAME.top * CTA_TABLET_FRAME_SCALE_Y,
} as const

export const CTA_TABLET_DECOR_RIGHT_IN_FRAME = {
  left: CTA_DESKTOP_DECOR_RIGHT_IN_FRAME.left * CTA_TABLET_FRAME_SCALE_X,
  top: CTA_DESKTOP_DECOR_RIGHT_IN_FRAME.top * CTA_TABLET_FRAME_SCALE_Y,
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
