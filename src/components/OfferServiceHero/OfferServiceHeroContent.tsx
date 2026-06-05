import { OczkiButton } from '@/components/OczkiButton'

import { OFFER_SERVICE_HERO_FIGMA_NODES, type OfferServiceHeroData } from './constants'
import { OfferServiceHeroCopy } from './OfferServiceHeroCopy'

type OfferServiceHeroContentProps = {
  cta: OfferServiceHeroData['cta']
  description: string
  heading: OfferServiceHeroData['heading']
  headingId: string
}

/**
 * Copy block — desktop only. Figma `6994:25738`.
 *
 * Children:
 *   1. OfferServiceHeroCopy
 *   2. OczkiButton
 */
export function OfferServiceHeroContent({
  cta,
  description,
  heading,
  headingId,
}: OfferServiceHeroContentProps) {
  return (
    <div
      className="relative flex h-[517px] w-full flex-col justify-between pl-16 pr-32 pt-16 pb-20"
      data-figma-node={OFFER_SERVICE_HERO_FIGMA_NODES.copyContainer.desktop}
      data-name="Container"
    >
      <OfferServiceHeroCopy
        description={description}
        heading={heading}
        headingId={headingId}
        variant="desktop"
      />
      <OczkiButton href={cta.href}>{cta.label}</OczkiButton>
    </div>
  )
}
