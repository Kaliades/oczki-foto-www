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
 * Copy block — desktop only. Figma `6994:25738` / reportaż `7338:7968`.
 *
 * Reportaż frames use a 32 px gap between copy and CTA (`gap-8`) with `pb` 72 px
 * (metadata), not `justify-between` — long wedding copy was collapsing that gap.
 * `mt-auto` on the CTA wrap still pins short kobiece copy toward the column bottom.
 *
 * Children:
 *   1. OfferServiceHeroCopy
 *   2. OczkiButton (wrapped)
 */
export function OfferServiceHeroContent({
  cta,
  description,
  heading,
  headingId,
}: OfferServiceHeroContentProps) {
  return (
    <div
      className="relative flex h-[517px] w-full flex-col pl-16 pr-32 pt-12 pb-[72px]"
      data-figma-node={OFFER_SERVICE_HERO_FIGMA_NODES.copyContainer.desktop}
      data-name="Container"
    >
      <OfferServiceHeroCopy
        description={description}
        heading={heading}
        headingId={headingId}
        variant="desktop"
      />
      <div className="mt-auto flex shrink-0 flex-col pt-8">
        <OczkiButton href={cta.href}>{cta.label}</OczkiButton>
      </div>
    </div>
  )
}
