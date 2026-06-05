import { OczkiButton } from '@/components/OczkiButton'

import { OFFER_SERVICE_HERO_FIGMA_NODES, type OfferServiceHeroData } from './constants'
import { OfferServiceHeroCopy } from './OfferServiceHeroCopy'
import { OfferServiceHeroStackedScallop } from './OfferServiceHeroStackedScallop'

type OfferServiceHeroStackedContentProps = {
  cta: OfferServiceHeroData['cta']
  description: string
  heading: OfferServiceHeroData['heading']
  headingId: string
}

/**
 * Copy block — fluid padding / gap / min-height from layout CSS vars.
 * Scallop is bottom-anchored via `--offer-stacked-scallop-bottom` on the layout root.
 */
export function OfferServiceHeroStackedContent({
  cta,
  description,
  heading,
  headingId,
}: OfferServiceHeroStackedContentProps) {
  return (
    <div
      className="relative flex min-h-[var(--offer-stacked-copy-min-h)] w-full flex-col gap-[var(--offer-stacked-copy-gap)] px-[var(--offer-stacked-copy-px)] pt-[var(--offer-stacked-copy-pt)] pb-[var(--offer-stacked-copy-pb)]"
      data-figma-node={OFFER_SERVICE_HERO_FIGMA_NODES.copyContainer.mobile}
      data-name="Container"
    >
      <OfferServiceHeroCopy
        description={description}
        heading={heading}
        headingId={headingId}
        variant="stacked"
      />
      <OczkiButton className="relative z-10 w-full shrink-0 md:w-auto" href={cta.href}>
        {cta.label}
      </OczkiButton>
      <OfferServiceHeroStackedScallop />
    </div>
  )
}
