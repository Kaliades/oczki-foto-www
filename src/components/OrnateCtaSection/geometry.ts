/** Shared CTA-section component geometry — Figma 7105:8627 / 8634 / 8641. */

export const ORNATE_CTA_SHELL_PADDING_X = 48

/** Figma shell pt anchor — used in home-final `topInShell` math. */
export const ORNATE_CTA_SHELL_PADDING_TOP = 96

/** Figma 7105:8627 — outer scalloped frame bbox. */
export const ORNATE_CTA_DESKTOP_FRAME_SIZE = {
  width: 1174.166015625,
  height: 398.0009765625,
} as const

/** Figma 7105:8634 — inner fill offset inside outer frame. */
export const ORNATE_CTA_DESKTOP_INNER_FRAME = {
  left: 21,
  top: 16,
  width: 1133,
  height: 366,
} as const

/** Figma 7105:8641 — copy card relative to outer frame 8627. */
export const ORNATE_CTA_DESKTOP_CONTENT_IN_FRAME = {
  left: -48,
  top: 14.4,
  width: 1270,
  height: 370,
} as const

export const ORNATE_CTA_DESKTOP_DECOR_LEFT_IN_FRAME = {
  left: 40,
  top: 137,
} as const

export const ORNATE_CTA_DESKTOP_DECOR_RIGHT_IN_FRAME = {
  left: 1054,
  top: 137,
} as const

export const ORNATE_CTA_TABLET_ARTBOARD = {
  width: 768,
  height: 554,
} as const

export const ORNATE_CTA_TABLET_CONTENT_COLUMN_WIDTH =
  ORNATE_CTA_TABLET_ARTBOARD.width - ORNATE_CTA_SHELL_PADDING_X * 2

export const ORNATE_CTA_TABLET_FRAME_BLEED_X = 24
export const ORNATE_CTA_TABLET_FRAME_BLEED_Y = 24

const ORNATE_CTA_TABLET_FRAME_BASE_HEIGHT = 389.4
const ORNATE_CTA_TABLET_CONTENT_WIDTH = 608
const ORNATE_CTA_TABLET_CONTENT_HEIGHT = 362

/** 96 px — Figma 64 px + 32 px so side ornaments clear the copy. */
export const ORNATE_CTA_TABLET_CONTENT_PADDING_X = 96

/** Figma 7105:8560 — mobile graphic frame shell 328×593. */
export const ORNATE_CTA_MOBILE_FRAME_FIGMA_HEIGHT = 593

export const ORNATE_CTA_MOBILE_FRAME_EXTRA_HEIGHT = 56

/** Figma 7105:8573 clip bbox height. */
export const ORNATE_CTA_MOBILE_DECOR_HEIGHT = 63.913

/** Figma 7105:8573 — top ornament inset inside frame 8560. */
export const ORNATE_CTA_MOBILE_TOP_DECOR_INSET = 50.4

export const ORNATE_CTA_MOBILE_BOTTOM_DECOR_INSET = ORNATE_CTA_MOBILE_TOP_DECOR_INSET

export const ORNATE_CTA_MOBILE_CONTENT_OFFSET_FROM_FRAME_TOP = 139

export type OrnateCtaFrameCluster = {
  leftInShell: number
  topInShell: number
  width: number
  height: number
}

export type OrnateCtaContentInFrame = {
  left: number
  top: number
  width: number
  height: number
}

export type OrnateCtaLayoutMetrics = {
  desktopShellHeight: number
  tabletShellHeight: number
  mobileShellHeight: number
  desktopFrameCluster: OrnateCtaFrameCluster
  tabletFrameCluster: OrnateCtaFrameCluster
  tabletInnerFrame: OrnateCtaContentInFrame
  tabletContentInFrame: OrnateCtaContentInFrame
  tabletFrameScaleX: number
  tabletFrameScaleY: number
  tabletDecorLeftInFrame: { left: number; top: number }
  tabletDecorRightInFrame: { left: number; top: number }
  mobileShellEdgeTop: number
  mobileShellEdgeBottom: number
  mobileFrame: { left: number; top: number; width: number; height: number }
  mobileFrameScale: number
  mobileContent: {
    left: number
    top: number
    width: number
    height: number
    paddingTop: number
    paddingBottom: number
    paddingX: number
  }
  mobileOrnateOuter: { preRotateHeight: number; preRotateWidth: number }
  mobileOrnateInner: {
    preRotateHeight: number
    preRotateWidth: number
    inset: number
  }
}

type BuildOrnateCtaLayoutMetricsInput = {
  desktopFrameTopFromSection: number
  desktopShellPaddingTopRender: number
  gapAfterFrame: number
  mobileShellEdgeTop: number
  mobileShellEdgeBottom: number
  desktopArtboardHeight?: number
  tabletArtboardHeight?: number
  mobileArtboardHeight?: number
}

export function buildOrnateCtaLayoutMetrics({
  desktopFrameTopFromSection,
  desktopShellPaddingTopRender,
  gapAfterFrame,
  mobileShellEdgeTop,
  mobileShellEdgeBottom,
  desktopArtboardHeight,
  tabletArtboardHeight,
  mobileArtboardHeight,
}: BuildOrnateCtaLayoutMetricsInput): OrnateCtaLayoutMetrics {
  const desktopFrameCluster = {
    leftInShell: 96 - ORNATE_CTA_SHELL_PADDING_X,
    topInShell: desktopFrameTopFromSection - desktopShellPaddingTopRender,
    width: ORNATE_CTA_DESKTOP_FRAME_SIZE.width,
    height: ORNATE_CTA_DESKTOP_FRAME_SIZE.height,
  }

  const tabletFrameWidth =
    ORNATE_CTA_TABLET_CONTENT_COLUMN_WIDTH + ORNATE_CTA_TABLET_FRAME_BLEED_X * 2

  const tabletFrameCluster = {
    // Centred in the 768 artboard — Figma px-48 with 24 px ear bleed per side (48 − 24 = 24).
    leftInShell: (ORNATE_CTA_TABLET_ARTBOARD.width - tabletFrameWidth) / 2,
    topInShell: desktopFrameCluster.topInShell - ORNATE_CTA_TABLET_FRAME_BLEED_Y,
    width: tabletFrameWidth,
    height: ORNATE_CTA_TABLET_FRAME_BASE_HEIGHT + ORNATE_CTA_TABLET_FRAME_BLEED_Y * 2,
  }

  const tabletFrameScaleX = tabletFrameCluster.width / desktopFrameCluster.width
  const tabletFrameScaleY = tabletFrameCluster.height / desktopFrameCluster.height

  const tabletInnerFrame = {
    left: ORNATE_CTA_DESKTOP_INNER_FRAME.left * tabletFrameScaleX,
    top: ORNATE_CTA_DESKTOP_INNER_FRAME.top * tabletFrameScaleY,
    width: ORNATE_CTA_DESKTOP_INNER_FRAME.width * tabletFrameScaleX,
    height: ORNATE_CTA_DESKTOP_INNER_FRAME.height * tabletFrameScaleY,
  }

  const tabletContentInFrame = {
    left: (tabletFrameCluster.width - ORNATE_CTA_TABLET_CONTENT_WIDTH) / 2,
    top: (tabletFrameCluster.height - ORNATE_CTA_TABLET_CONTENT_HEIGHT) / 2,
    width: ORNATE_CTA_TABLET_CONTENT_WIDTH,
    height: ORNATE_CTA_TABLET_CONTENT_HEIGHT,
  }

  const mobileFrame = {
    left: 16,
    top: mobileShellEdgeTop,
    width: 328,
    height: ORNATE_CTA_MOBILE_FRAME_FIGMA_HEIGHT + ORNATE_CTA_MOBILE_FRAME_EXTRA_HEIGHT,
  }

  const mobileFrameScale = mobileFrame.height / ORNATE_CTA_MOBILE_FRAME_FIGMA_HEIGHT

  const mobileContent = {
    left: 16,
    top: mobileFrame.top + ORNATE_CTA_MOBILE_CONTENT_OFFSET_FROM_FRAME_TOP,
    width: 328,
    height: 345,
    paddingTop: 24,
    paddingBottom: 24,
    paddingX: 16,
  }

  const mobileOrnateOuter = {
    preRotateHeight: 328,
    preRotateWidth: mobileFrame.height,
  }

  const mobileOrnateInner = {
    preRotateHeight: Math.round(296 * mobileFrameScale),
    preRotateWidth: Math.round(561 * mobileFrameScale),
    inset: Math.round(16 * mobileFrameScale),
  }

  const desktopShellHeight =
    desktopArtboardHeight ??
    desktopFrameTopFromSection +
      ORNATE_CTA_DESKTOP_FRAME_SIZE.height +
      gapAfterFrame

  const tabletShellHeight =
    tabletArtboardHeight ??
    desktopShellPaddingTopRender +
      tabletFrameCluster.topInShell +
      tabletFrameCluster.height +
      gapAfterFrame

  const mobileShellHeight =
    mobileArtboardHeight ??
    mobileShellEdgeTop + mobileFrame.height + mobileShellEdgeBottom

  return {
    desktopShellHeight,
    tabletShellHeight,
    mobileShellHeight,
    desktopFrameCluster,
    tabletFrameCluster,
    tabletInnerFrame,
    tabletContentInFrame,
    tabletFrameScaleX,
    tabletFrameScaleY,
    tabletDecorLeftInFrame: {
      left: ORNATE_CTA_DESKTOP_DECOR_LEFT_IN_FRAME.left * tabletFrameScaleX,
      top: ORNATE_CTA_DESKTOP_DECOR_LEFT_IN_FRAME.top * tabletFrameScaleY,
    },
    tabletDecorRightInFrame: {
      left: ORNATE_CTA_DESKTOP_DECOR_RIGHT_IN_FRAME.left * tabletFrameScaleX,
      top: ORNATE_CTA_DESKTOP_DECOR_RIGHT_IN_FRAME.top * tabletFrameScaleY,
    },
    mobileShellEdgeTop,
    mobileShellEdgeBottom,
    mobileFrame,
    mobileFrameScale,
    mobileContent,
    mobileOrnateOuter,
    mobileOrnateInner,
  }
}
