import { cn } from '@/utilities/ui'

import { SplitDisplayHeading } from '@/components/SplitDisplayHeading/SplitDisplayHeading'

import { AboutHeroMobileTitle } from './AboutHeroMobileTitle'
import { ABOUT_HERO_FIGMA_NODES, type AboutHeroLayoutVariant } from './constants'

type AboutHeroIntroductionProps = {
  className?: string
  description: string
  gap: number
  heading: {
    emphasis: string
    start: string
  }
  headingId: string
  variant: AboutHeroLayoutVariant
}

/** Figma `7093:5701` — Body/L, 16 px / 1.48 / -0.24 px. */
const MOBILE_DESCRIPTION_CLASS =
  'oczki-body-l w-full text-center tracking-[-0.24px] text-[var(--oczki-primary-700)] [font-feature-settings:"ss01"_1,"ss02"_1,"ss03"_1,"ss08"_1,"ss10"_1,"ss12"_1,"lnum"_1,"pnum"_1] [font-variation-settings:"wdth"_100]'

/**
 * Centred display heading + body — Figma `Introduction`.
 */
export function AboutHeroIntroduction({
  className,
  description,
  gap,
  heading,
  headingId,
  variant,
}: AboutHeroIntroductionProps) {
  if (variant === 'mobile') {
    return (
      <div
        className={cn(
          'flex w-full flex-col items-start text-center [word-break:break-word]',
          className,
        )}
        data-figma-node={ABOUT_HERO_FIGMA_NODES.introduction.mobile}
        data-name="Introduction"
        style={{ gap }}
      >
        <AboutHeroMobileTitle emphasis={heading.emphasis} headingId={headingId} />

        <div className="flex w-full min-h-0 flex-col items-start" data-name="Description">
          <p className={MOBILE_DESCRIPTION_CLASS}>{description}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex w-full flex-col items-start text-center [word-break:break-word]',
        className,
      )}
      data-figma-node={ABOUT_HERO_FIGMA_NODES.introduction[variant]}
      data-name="Introduction"
      style={{ gap }}
    >
      <SplitDisplayHeading
        as="h1"
        className="w-full text-[var(--oczki-primary-800)]"
        emphasis={heading.emphasis}
        emphasisPosition="end"
        id={headingId}
        sizeClassName="oczki-heading-l"
        start={heading.start}
      />

      <div className="flex w-full flex-col items-start" data-name="Description">
        <p className="oczki-body-l w-full tracking-[-0.24px] text-[var(--oczki-primary-700)]">
          {description}
        </p>
      </div>
    </div>
  )
}
