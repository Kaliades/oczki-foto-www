import {
  HOME_INSTAGRAM_FIGMA_NODES,
  INSTAGRAM_SHELL_PADDING_TOP,
  type InstagramSectionData,
} from '@/components/InstagramSection/constants'

/**
 * Extra cream below the post grid before HomeCta (same bg token).
 * Not part of the Instagram Figma frame — tuned for section-to-section rhythm.
 */
export const INSTAGRAM_GAP_BEFORE_HOME_CTA = 80

export const INSTAGRAM_SHELL_PADDING_BOTTOM =
  INSTAGRAM_SHELL_PADDING_TOP + INSTAGRAM_GAP_BEFORE_HOME_CTA

/**
 * Cream band between homepage sections on the shared `--oczki-primary-100` bg.
 * Section #9→#10 uses {@link INSTAGRAM_SHELL_PADDING_BOTTOM}; #10→#11 mirrors it on HomeCta.
 */
export const HOME_CREAM_SECTION_GAP = INSTAGRAM_SHELL_PADDING_BOTTOM

export {
  HOME_INSTAGRAM_FIGMA_NODES,
  instagramSectionDefaults as homeInstagramDefaults,
  type InstagramPost,
  type InstagramSectionData as HomeInstagramData,
} from '@/components/InstagramSection/constants'
