import { OczkiButton } from '@/components/OczkiButton'

import { AboutHeroIntroduction } from './AboutHeroIntroduction'
import { AboutHeroSecondaryPhoto } from './AboutHeroSecondaryPhoto'
import { ABOUT_HERO_FIGMA_NODES, type AboutHeroLayoutVariant } from './constants'

type MainContentLayout = {
  buttonGap: number
  height: number
  left: number
  top: number
  width: number
}

type AboutHeroMainContentProps = {
  buttonGap: number
  cta: {
    href: string
    label: string
  }
  description: string
  heading: {
    emphasis: string
    start: string
  }
  headingId: string
  introductionGap: number
  layout: MainContentLayout
  secondaryPhoto?: {
    alt: string
    box: {
      height: number
      left: number
      top: number
      width: number
    }
    src: string
  }
  secondaryPhotoGap?: number
  variant: AboutHeroLayoutVariant
}

/**
 * Centred copy column + CTA — Figma `7093:5697`.
 *
 * Mobile: flex column — CTA after Introduction (`buttonGap`); secondary photo after CTA (`secondaryPhotoGap`).
 */
export function AboutHeroMainContent({
  buttonGap,
  cta,
  description,
  heading,
  headingId,
  introductionGap,
  layout,
  secondaryPhoto,
  secondaryPhotoGap,
  variant,
}: AboutHeroMainContentProps) {
  if (variant === 'mobile') {
    return (
      <div
        className="relative z-10 flex w-full flex-col items-stretch"
        data-figma-node={ABOUT_HERO_FIGMA_NODES.mainContent.mobile}
        data-name="Main Content"
        style={{
          paddingLeft: layout.left,
          paddingRight: layout.left,
          paddingTop: layout.top,
        }}
      >
        <AboutHeroIntroduction
          description={description}
          gap={introductionGap}
          heading={heading}
          headingId={headingId}
          variant={variant}
        />
        <div className="shrink-0" style={{ marginTop: buttonGap }}>
          <OczkiButton className="flex w-full" href={cta.href}>
            {cta.label}
          </OczkiButton>
        </div>
        {secondaryPhoto && secondaryPhotoGap !== undefined ? (
          <AboutHeroSecondaryPhoto
            alt={secondaryPhoto.alt}
            box={secondaryPhoto.box}
            contentInset={layout.left}
            flowGap={secondaryPhotoGap}
            layout="flow"
            src={secondaryPhoto.src}
            variant={variant}
          />
        ) : null}
      </div>
    )
  }

  return (
    <div
      className="absolute z-10 flex flex-col items-center"
      data-figma-node={ABOUT_HERO_FIGMA_NODES.mainContent[variant]}
      data-name="Main Content"
      style={{
        gap: buttonGap,
        height: layout.height,
        left: layout.left,
        top: layout.top,
        width: layout.width,
      }}
    >
      <AboutHeroIntroduction
        description={description}
        gap={introductionGap}
        heading={heading}
        headingId={headingId}
        variant={variant}
      />
      <OczkiButton href={cta.href}>{cta.label}</OczkiButton>
    </div>
  )
}
