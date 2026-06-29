import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

import { BorderedFeatureList } from '@/components/BorderedFeatureList'
import { CenteredSplitCopy } from '@/components/CenteredSplitCopy'
import { OczkiButton } from '@/components/OczkiButton'
import { resolveLinkHref } from '@/utilities/resolveLinkHref'

import {
  OFFER_SERVICE_CARE_FIGMA_NODES,
  OFFER_SERVICE_CARE_PORTRAIT_CROP_CLASS,
  type OfferServiceCareData,
} from './constants'

type OfferServiceCareProps = {
  data: OfferServiceCareData
}

/**
 * “Wrażliwość, która widzi więcej” care section on offer-service pages.
 *
 * Figma `Image` root:
 *   <section> — primary/100
 *     <div inner> — centred stack
 *       ├── <div Title> — `CenteredSplitCopy`
 *       └── <div Content Container>
 *             ├── <div Image> — portrait (left on desktop, below copy on tablet/mobile)
 *             └── <div Content Right>
 *                   ├── <div Container> — `BorderedFeatureList`
 *                   └── `OczkiButton`
 *
 * Section padding: mobile 64/48/16; tablet+desktop 96/128; desktop px 32, tablet px 80.
 */
export function OfferServiceCare({ data }: OfferServiceCareProps) {
  const { cta, features, heading, headingId = 'offer-service-care-heading', image, intro } = data
  const nodes = OFFER_SERVICE_CARE_FIGMA_NODES
  const ctaHref = resolveLinkHref(cta)

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={nodes.container.desktop}
    >
      <div className="mx-auto flex w-full max-w-[1366px] flex-col items-center gap-6 px-4 pb-12 pt-16 md:gap-8 md:px-20 md:pb-32 md:pt-24 lg:gap-9 lg:px-8">
        <CenteredSplitCopy
          body={intro}
          bodyClassName="md:max-w-none md:px-0"
          containerClassName="gap-3 md:w-[442px] md:gap-3"
          emphasisPosition="start"
          figmaNodes={{
            body: nodes.title.body.desktop,
            heading: nodes.title.heading.desktop,
          }}
          heading={heading}
          headingId={headingId}
        />

        <div
          className="flex w-full flex-col items-start gap-9 md:gap-12 lg:flex-row lg:items-stretch lg:justify-center lg:gap-12"
          data-figma-node={nodes.content.desktop}
          data-name="Content Container"
        >
          <div
            className="relative order-2 aspect-[328/402] w-full shrink-0 overflow-hidden md:order-2 md:aspect-[608/746] lg:order-1 lg:aspect-auto lg:h-[628px] lg:w-[512px]"
            data-figma-node={nodes.image.desktop}
            data-name="Image"
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <Image
                alt={image.alt}
                className={`object-cover ${OFFER_SERVICE_CARE_PORTRAIT_CROP_CLASS}`}
                height={1920}
                sizes="(min-width: 1024px) 512px, 100vw"
                src={image.src}
                width={1280}
              />
            </div>
          </div>

          <div
            className="order-1 flex w-full shrink-0 flex-col items-start gap-7 md:order-1 md:gap-8 lg:order-2 lg:h-[628px] lg:w-[514px] lg:justify-between lg:gap-0"
            data-figma-node={nodes.copyColumn.desktop}
            data-name="Content Right"
          >
            <BorderedFeatureList figmaNode={nodes.featureList.desktop} items={features} />

            {ctaHref ? (
              <OczkiButton className="w-full md:w-auto" href={ctaHref}>
                {cta.label}
              </OczkiButton>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
