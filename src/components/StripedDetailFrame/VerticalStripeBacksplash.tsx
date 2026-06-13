import {
  STRIPED_DETAIL_FRAME_CASE_STUDY_BACKSPLASH,
  STRIPED_DETAIL_FRAME_EXPERTISE_BACKSPLASH_DESKTOP,
  STRIPED_DETAIL_FRAME_EXPERTISE_BACKSPLASH_MOBILE_TABLET,
  STRIPED_DETAIL_FRAME_FIGMA_NODES,
  type StripedDetailFrameVariant,
} from './constants'
import { StripeBacksplashLayer } from './StripeBacksplashLayer'

type VerticalStripeBacksplashProps = {
  className?: string
  variant?: StripedDetailFrameVariant
}

/**
 * Vertical stripe mat behind a framed detail card.
 *
 * Case study: single 872×187 field (`7102:14770`).
 * Expertise: 620×236 on mobile/tablet, 480×238 on desktop (`7001:2296` / `7093:5896`).
 */
export function VerticalStripeBacksplash({
  className,
  variant = 'caseStudy',
}: VerticalStripeBacksplashProps) {
  if (variant === 'caseStudy') {
    return (
      <StripeBacksplashLayer
        className={className}
        figmaNode={STRIPED_DETAIL_FRAME_FIGMA_NODES.sectionHeader}
        spec={STRIPED_DETAIL_FRAME_CASE_STUDY_BACKSPLASH}
      />
    )
  }

  return (
    <>
      <StripeBacksplashLayer
        className={['min-[1366px]:hidden', className].filter(Boolean).join(' ')}
        spec={STRIPED_DETAIL_FRAME_EXPERTISE_BACKSPLASH_MOBILE_TABLET}
      />
      <StripeBacksplashLayer
        className={['hidden min-[1366px]:flex', className].filter(Boolean).join(' ')}
        spec={STRIPED_DETAIL_FRAME_EXPERTISE_BACKSPLASH_DESKTOP}
      />
    </>
  )
}
