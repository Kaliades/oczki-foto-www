import { BorderedAccordion, type BorderedAccordionItemData } from '@/components/BorderedAccordion'
import { OczkiButton } from '@/components/OczkiButton'
import { TintedAccordionWell } from '@/components/TintedAccordionWell'
import { resolveLinkHref, type SectionLink } from '@/utilities/resolveLinkHref'

import { SERVICE_AREA_SECTION_FIGMA_NODES } from './constants'

type ServiceAreaCopyColumnProps = {
  accordion: readonly BorderedAccordionItemData[]
  accordionIdPrefix: string
  cta: SectionLink
  footer: string
  intro: readonly [string, string]
}

/**
 * Intro paragraphs, tinted accordion well, footer copy and CTA.
 *
 * Figma `Text Content` (`6884:13693` / `7084:3630` / `7086:4561`):
 *   desktop — w 514, min-h 574, justify-between (text block top / bottom block base)
 *   tablet — column gap 24
 *   mobile — column gap 20; text block gap 16
 */
export function ServiceAreaCopyColumn({
  accordion,
  accordionIdPrefix,
  cta,
  footer,
  intro,
}: ServiceAreaCopyColumnProps) {
  const ctaHref = resolveLinkHref(cta)
  const nodes = SERVICE_AREA_SECTION_FIGMA_NODES

  return (
    <div
      className="flex w-full flex-col items-start gap-5 md:gap-6 lg:min-h-[574px] lg:w-[514px] lg:justify-between lg:gap-0"
      data-figma-node={nodes.textContent.desktop}
      data-name="Text Content"
    >
      <div
        className="flex w-full flex-col items-start gap-4 md:gap-5"
        data-figma-node={nodes.textBlock.desktop}
        data-name="Text Block"
      >
        <div
          className="flex w-full flex-col items-start gap-2"
          data-figma-node={nodes.intro.desktop}
          data-name="Text Section"
        >
          <p className="oczki-body-l w-full break-words tracking-[-0.24px] text-[var(--oczki-primary-700)]">
            {intro[0]}
          </p>
          <p className="oczki-body-l w-full break-words tracking-[-0.24px] text-[var(--oczki-primary-700)]">
            {intro[1]}
          </p>
        </div>

        <TintedAccordionWell figmaNode={nodes.accordionWell.desktop}>
          <BorderedAccordion idPrefix={accordionIdPrefix} items={accordion} />
        </TintedAccordionWell>
      </div>

      <div
        className="flex w-full flex-col items-start gap-4"
        data-figma-node={nodes.bottomBlock.desktop}
        data-name="Bottom Text Block"
      >
        <p className="oczki-body-l w-full break-words tracking-[-0.24px] text-[var(--oczki-primary-700)]">
          {footer}
        </p>

        {ctaHref && cta.label ? (
          <div data-figma-node={nodes.cta.desktop}>
            <OczkiButton className="w-full md:w-auto" href={ctaHref}>
              {cta.label}
            </OczkiButton>
          </div>
        ) : null}
      </div>
    </div>
  )
}
