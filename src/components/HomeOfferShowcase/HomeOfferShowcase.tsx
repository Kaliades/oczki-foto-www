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
      className="relative w-full overflow-hidden bg-[var(--oczki-tertiary-300)] [font-family:var(--font-oczki-body)]"
      data-figma-node={HOME_OFFER_FIGMA_NODES.desktopMainContainer}
    >
      {/* Section is full-bleed: tertiary bg + texture span the whole viewport
          at every width. Above 1366 px the rail keeps extending to viewport
          edges (more cards visible without scroll) while the header and
          inquiry stay centered via their own max-widths.
          Vertical gap between Wyróżniki content (header+rail) and the
          Inquiry block is bumped above Figma's 28 / 64 to 40 / 80 — Figma's
          values read visually tight in the real render (owner feedback). */}
      <div className="relative flex flex-col items-center gap-10 px-[var(--offer-section-padding)] pb-12 pt-9 [--offer-section-padding:1rem] md:gap-20 md:pt-16 md:[--offer-section-padding:5rem] lg:pb-8 lg:[--offer-section-padding:2rem]">
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
