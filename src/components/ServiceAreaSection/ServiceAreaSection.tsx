import { CrossMaskedPhotoVisual } from '@/components/CrossMaskedPhotoVisual'

import {
  SERVICE_AREA_SECTION_FIGMA_NODES,
  type ServiceAreaSectionData,
} from './constants'
import { ServiceAreaCopyColumn } from './ServiceAreaCopyColumn'
import { ServiceAreaSectionHeading } from './ServiceAreaSectionHeading'

type ServiceAreaSectionProps = {
  accordionIdPrefix?: string
  data: ServiceAreaSectionData
  headingId?: string
}

/**
 * "Z Krakowa w każdy zakątek Małopolski…" — service-area coverage with cross photo.
 *
 * Figma `Container` (`6884:13691` / `7084:3617` / `7086:4548`):
 *   <section> — primary/100 full bleed
 *     └── inner 1366 cap — centred column
 *         ├── <ServiceAreaSectionHeading>
 *         └── Main Content
 *             ├── <CrossMaskedPhotoVisual>
 *             └── <ServiceAreaCopyColumn>
 *
 * Section padding: mobile 48/16, gap 32; tablet 96/80/80, gap 36; desktop 96/32/80, gap 48.
 * Main layout: stacked mobile/tablet; side-by-side desktop (gap 96, justify-center).
 */
export function ServiceAreaSection({
  accordionIdPrefix = 'service-area',
  data,
  headingId = 'service-area-heading',
}: ServiceAreaSectionProps) {
  const { accordion, cta, footer, heading, intro, photoAlt } = data
  const nodes = SERVICE_AREA_SECTION_FIGMA_NODES

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={nodes.desktop}
      data-figma-node-mobile={nodes.mobile}
      data-figma-node-tablet={nodes.tablet}
    >
      <div className="relative mx-auto flex w-full max-w-[1366px] flex-col items-center gap-8 px-4 py-12 md:gap-9 md:px-20 md:pt-24 md:pb-20 min-[1366px]:gap-12 min-[1366px]:px-8">
        <ServiceAreaSectionHeading heading={heading} headingId={headingId} />

        <div
          className="flex w-full flex-col items-center gap-8 md:gap-9 lg:flex-row lg:items-start lg:justify-center lg:gap-24"
          data-figma-node={nodes.mainContent.desktop}
          data-name="Main Content"
        >
          <CrossMaskedPhotoVisual photoAlt={photoAlt} />

          <ServiceAreaCopyColumn
            accordion={accordion}
            accordionIdPrefix={accordionIdPrefix}
            cta={cta}
            footer={footer}
            intro={intro}
          />
        </div>
      </div>
    </section>
  )
}
