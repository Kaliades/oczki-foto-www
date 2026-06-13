import { HOME_CREAM_SECTION_GAP } from '@/components/HomeInstagram/constants'

import { buildOrnateCtaLayoutMetrics, type OrnateCtaLayoutMetrics } from './geometry'

export type OrnateCtaLayoutProfileId = 'home-final' | 'about'

export type OrnateCtaLayoutProfile = {
  id: OrnateCtaLayoutProfileId
  metrics: OrnateCtaLayoutMetrics
}

/** Homepage final CTA — Figma 7105:8981; extra air after Instagram on shared cream bg. */
export const HOME_FINAL_CTA_PROFILE: OrnateCtaLayoutProfile = {
  id: 'home-final',
  metrics: buildOrnateCtaLayoutMetrics({
    desktopFrameTopFromSection: 81.603515625 + 48,
    desktopShellPaddingTopRender: 128,
    gapAfterFrame: HOME_CREAM_SECTION_GAP,
    mobileShellEdgeTop: 72,
    mobileShellEdgeBottom: HOME_CREAM_SECTION_GAP,
  }),
}

/** About page booking CTA — Figma 7105:8698 / 7105:8746 / 7105:8794. */
export const ABOUT_CTA_PROFILE: OrnateCtaLayoutProfile = {
  id: 'about',
  metrics: buildOrnateCtaLayoutMetrics({
    desktopFrameTopFromSection: 81.603515625,
    desktopShellPaddingTopRender: 0,
    gapAfterFrame: 0,
    mobileShellEdgeTop: 48,
    mobileShellEdgeBottom: 32,
    desktopArtboardHeight: 594,
    tabletArtboardHeight: 554,
  }),
}
