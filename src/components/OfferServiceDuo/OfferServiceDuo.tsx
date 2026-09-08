import { SplitDisplayHeading } from '@/components/SplitDisplayHeading/SplitDisplayHeading'

import {
  OFFER_SERVICE_DUO_FIGMA_NODES,
  type OfferServiceDuoData,
  type OfferServiceDuoFeature,
} from './constants'
import { DuoPhotoCollage } from './DuoPhotoCollage'

type OfferServiceDuoProps = {
  data: OfferServiceDuoData
}

function DuoFeatureCards({ items }: { items: readonly OfferServiceDuoFeature[] }) {
  return (
    <div className="flex w-full flex-col items-end gap-2" data-name="Feature cards">
      {items.map((item) => (
        <div
          className="flex w-full flex-col items-start border border-solid border-[var(--oczki-primary-400)] p-4"
          data-figma-node={item.figmaNodes?.desktop}
          key={item.title}
        >
          <div className="flex w-full flex-col items-start gap-1.5">
            <p className="oczki-body-l w-full tracking-[-0.24px] text-[var(--oczki-primary-800)]">
              {item.title}
            </p>
            <p className="oczki-body-m w-full tracking-[-0.14px] text-[var(--oczki-primary-700)]">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * “Podwójne spojrzenie / Asia & Łukasz” — reportaż-only duo section.
 *
 * Desktop `7353:9590`: exact 683 / 683 split inside 1366.
 * Tablet/mobile: copy band, then centred collage Group 64.
 */
export function OfferServiceDuo({ data }: OfferServiceDuoProps) {
  const {
    collage,
    features,
    featuresHeading,
    heading,
    headingId = 'offer-service-duo-heading',
    intro,
  } = data
  const nodes = OFFER_SERVICE_DUO_FIGMA_NODES

  return (
    <section
      aria-labelledby={headingId}
      className="w-full overflow-visible bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={nodes.container.desktop}
    >
      <div className="mx-auto flex w-full max-w-[1366px] flex-col items-stretch overflow-visible min-[1366px]:min-h-[931px] min-[1366px]:flex-row">
        <div
          className="flex w-full flex-col items-start gap-7 px-4 pt-12 md:gap-8 md:px-20 md:pt-20 min-[1366px]:w-[683px] min-[1366px]:shrink-0 min-[1366px]:gap-12 min-[1366px]:px-20 min-[1366px]:pb-20 min-[1366px]:pt-24"
          data-figma-node={nodes.copyColumn.desktop}
          data-name="Content container"
        >
          <div className="flex w-full flex-col items-start gap-3 md:gap-4" data-name="Section container">
            <SplitDisplayHeading
              className="w-full text-left [word-break:break-word]"
              emphasis={heading.emphasis}
              emphasisPosition="start"
              id={headingId}
              sizeClassName=""
              start={heading.start}
            />
            <p className="oczki-body-l w-full tracking-[-0.24px] text-[var(--oczki-primary-700)]">
              {intro}
            </p>
          </div>

          <div className="flex w-full flex-col items-start gap-3 md:gap-4">
            <p className="oczki-body-xl w-full tracking-[-0.3px] text-[var(--oczki-primary-800)]">
              {featuresHeading}
            </p>
            <DuoFeatureCards items={features} />
          </div>
        </div>

        <div className="flex w-full shrink-0 items-center justify-center overflow-visible px-2.5 pb-12 md:pb-0 min-[1366px]:w-[683px] min-[1366px]:self-stretch min-[1366px]:px-0">
          <div className="md:hidden">
            <DuoPhotoCollage collage={collage} variant="mobile" />
          </div>
          <div className="hidden md:max-[1365px]:block">
            <DuoPhotoCollage collage={collage} variant="tablet" />
          </div>
          <div className="hidden min-[1366px]:block">
            <DuoPhotoCollage collage={collage} variant="desktop" />
          </div>
        </div>
      </div>
    </section>
  )
}
