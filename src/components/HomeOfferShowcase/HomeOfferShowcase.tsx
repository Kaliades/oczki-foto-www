import Image from 'next/image'

import { HOME_OFFER_FIGMA_NODES, type HomeOfferData } from './constants'
import { OfferCardsRail } from './OfferCardsRail'
import { OfferFooterNotch } from './OfferFooterNotch'
import { OfferInquiry } from './OfferInquiry'
import { OfferSectionHeader } from './OfferSectionHeader'

type HomeOfferShowcaseProps = {
  data: HomeOfferData
}

export function HomeOfferShowcase({ data }: HomeOfferShowcaseProps) {
  const { heading, subtitle, items, inquiry, showFooterNotch = true, textureSrc } = data

  return (
    <section
      aria-labelledby="home-offer-heading"
      className="overflow-hidden [font-family:var(--font-oczki-body)]"
      data-figma-node={HOME_OFFER_FIGMA_NODES.desktopMainContainer}
    >
      <div className="relative flex flex-col items-center gap-7 bg-[var(--oczki-tertiary-300)] px-[var(--offer-section-padding)] pb-12 pt-9 [--offer-section-padding:1rem] md:gap-16 md:pb-12 md:pt-16 md:[--offer-section-padding:clamp(2rem,5.86vw,5rem)] lg:pb-8 lg:[--offer-section-padding:clamp(2rem,2.34vw,4rem)]">
        {textureSrc ? (
          <Image
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover mix-blend-color-burn"
            height={2731}
            priority={false}
            src={textureSrc}
            width={4096}
          />
        ) : null}

        <div className="relative flex w-full min-w-0 flex-col gap-7 md:gap-9">
          <OfferSectionHeader
            headingStart={heading.start}
            headingEmphasis={heading.emphasis}
            headingEnd={heading.end}
            subtitle={subtitle}
          />
          <OfferCardsRail items={items} />
        </div>

        <div className="relative w-full md:max-w-[608px]">
          <OfferInquiry title={inquiry.title} text={inquiry.text} cta={inquiry.cta} />
        </div>
      </div>
      {showFooterNotch ? <OfferFooterNotch textureSrc={textureSrc} /> : null}
    </section>
  )
}
