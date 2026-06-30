import { BorderedAccordion } from '@/components/BorderedAccordion'
import { ChecklistFeatureList } from '@/components/ChecklistFeatureList'
import { OverlapPhotoCollage } from '@/components/OverlapPhotoCollage'
import { SegmentedScallopDivider } from '@/components/SegmentedScallopDivider'
import { SplitDisplayHeading } from '@/components/SplitDisplayHeading/SplitDisplayHeading'

import { OFFER_SERVICE_INCLUSIONS_FIGMA_NODES, type OfferServiceInclusionsData } from './constants'

type OfferServiceInclusionsProps = {
  data: OfferServiceInclusionsData
}

/**
 * “Co dokładnie obejmuje cena każdej sesji?” — inclusions + additional-info section.
 *
 * Figma `Container`:
 *   desktop `6986:25067` — row layout, px 32, pt 80 pb 96
 *   tablet  `7100:7973` — column, px 80, pt 80 pb 96, content gap 48
 *   mobile  `7102:9639` — column, px 16, py 48, content gap 36
 */
export function OfferServiceInclusions({ data }: OfferServiceInclusionsProps) {
  const {
    accordion,
    checklist,
    heading,
    headingId = 'offer-service-inclusions-heading',
    images,
    intro,
  } = data
  const nodes = OFFER_SERVICE_INCLUSIONS_FIGMA_NODES

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={nodes.container.desktop}
    >
      <div className="relative mx-auto w-full max-w-[1366px]">
        <SegmentedScallopDivider
          figmaNode={nodes.topDivider.desktop}
          variant="transition-down"
        />

        <div
          className="flex w-full flex-col gap-9 bg-[var(--oczki-primary-200)] px-4 py-12 md:gap-12 md:px-20 md:pt-20 md:pb-24 lg:flex-row lg:items-start lg:justify-between lg:px-8"
          data-figma-node={nodes.content.desktop}
          data-name="Image and Text Container"
        >
          <div
            className="order-1 flex w-full flex-col items-start gap-4 md:gap-5 lg:order-2 lg:w-[538px] lg:gap-4"
            data-figma-node={nodes.textColumn.desktop}
            data-name="Text Container Vertical"
          >
            <div
              className="flex w-full flex-col items-start gap-2.5 md:gap-4"
              data-figma-node={nodes.header.desktop}
              data-name="Text Block Container"
            >
              <SplitDisplayHeading
                className="w-full text-left [word-break:break-word]"
                emphasis={heading.emphasis}
                end={heading.end}
                id={headingId}
                sizeClassName="text-[24px] tracking-[-0.24px] md:text-[28px] md:tracking-[-0.28px] lg:text-[32px] lg:tracking-[-0.32px]"
                start={heading.start}
              />
              <p className="oczki-body-l w-full tracking-[-0.24px] text-[var(--oczki-primary-700)]">
                {intro}
              </p>
            </div>

            <ChecklistFeatureList figmaNode={nodes.checklist.desktop} items={checklist} />

            <div
              className="flex w-full flex-col items-start pt-2 md:pt-3 lg:pt-9"
              data-figma-node={nodes.additionalInfo.desktop}
              data-name="Additional Information Container"
            >
              <div
                className="flex w-full flex-col items-start gap-6 bg-[var(--oczki-primary-300)] px-4 pt-4 pb-5 md:gap-9 md:px-5 md:pt-5 md:pb-8"
                data-figma-node={nodes.additionalInfoInner.desktop}
                data-name="Additional Information Inner Container"
              >
                <h3 className="oczki-heading-s w-full break-words text-[20px] tracking-[-0.2px] text-[var(--oczki-primary-900)] md:text-[24px] md:tracking-[-0.24px]">
                  {accordion.heading}
                </h3>
                <BorderedAccordion
                  idPrefix="offer-service-inclusions-accordion"
                  items={accordion.items}
                />
              </div>
            </div>
          </div>

          <OverlapPhotoCollage
            className="order-2 shrink-0 lg:order-1"
            mainPhotoAlt={images.mainAlt}
            mainPhotoSrc={images.mainPhotoSrc ?? ''}
            scallopPhotoAlt={images.scallopAlt}
            scallopPhotoSrc={images.scallopPhotoSrc ?? ''}
          />
        </div>

        <SegmentedScallopDivider
          figmaNode={nodes.bottomDivider.desktop}
          variant="transition-up"
        />
      </div>
    </section>
  )
}
