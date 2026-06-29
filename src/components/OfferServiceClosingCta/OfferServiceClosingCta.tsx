import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

import { FloralSideCluster } from '@/components/FloralSideCluster'
import { OczkiButton } from '@/components/OczkiButton'
import { TapedNoteCard } from '@/components/TapedNoteCard'
import { resolveLinkHref } from '@/utilities/resolveLinkHref'

import {
  OFFER_SERVICE_CLOSING_CTA_FLORAL,
  OFFER_SERVICE_CLOSING_CTA_FIGMA_NODES,
  OFFER_SERVICE_CLOSING_CTA_TEXTURE,
  type OfferServiceClosingCtaData,
} from './constants'

type OfferServiceClosingCtaProps = {
  data: OfferServiceClosingCtaData
}

/**
 * Closing reservation CTA on offer-service pages — Figma `Proces`.
 *
 * <section> — tertiary/500 full-bleed, texture + florals span the shell
 * └── <div inner> — max-w 1366 cap for card content only
 *     └── <TapedNoteCard> — centred cream card with tape, copy, button
 */
export function OfferServiceClosingCta({ data }: OfferServiceClosingCtaProps) {
  const { body, cta, heading, textureSrc = OFFER_SERVICE_CLOSING_CTA_TEXTURE.src } = data
  const headingId = 'offer-service-closing-cta-heading'
  const ctaHref = resolveLinkHref(cta)
  const texture = OFFER_SERVICE_CLOSING_CTA_TEXTURE
  const floral = OFFER_SERVICE_CLOSING_CTA_FLORAL

  return (
    <section
      aria-labelledby={headingId}
      className="relative w-full overflow-x-clip bg-[var(--oczki-tertiary-500)] [font-family:var(--font-oczki-body)]"
      data-figma-node={OFFER_SERVICE_CLOSING_CTA_FIGMA_NODES.desktop}
    >
      <Image
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-80 mix-blend-color-burn"
        data-figma-node={OFFER_SERVICE_CLOSING_CTA_FIGMA_NODES.texture.desktop}
        height={texture.height}
        src={textureSrc}
        width={texture.width}
      />

      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="md:hidden">
          <FloralSideCluster {...floral.left.mobile} />
        </div>
        <div className="hidden md:block">
          <FloralSideCluster {...floral.left.desktop} />
        </div>
        <div className="hidden lg:block">
          <FloralSideCluster {...floral.right.desktop} />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1366px] items-center justify-center px-4 py-12 md:px-20 md:py-20 md:pb-24 lg:px-12">
        <TapedNoteCard
          body={body}
          cta={
            ctaHref && cta.label ? (
              <OczkiButton className="w-full md:w-auto" href={ctaHref}>
                {cta.label}
              </OczkiButton>
            ) : null
          }
          heading={heading}
          headingId={headingId}
        />
      </div>
    </section>
  )
}
