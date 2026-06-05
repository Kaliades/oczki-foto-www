import { OfferPackagesHeader } from '@/components/OfferPackagesHeader'
import { PackageShowcaseRow } from '@/components/PackageShowcaseRow'

import {
  OFFER_SERVICE_PACKAGES_FIGMA_NODES,
  type OfferServicePackagesData,
} from './constants'

type OfferServicePackagesProps = {
  data: OfferServicePackagesData
}

const PACKAGE_ROW_KEYS = ['starter', 'story', 'premium'] as const

/**
 * Pricing packages section on offer-service pages.
 *
 * Figma `App container`:
 *   desktop `6986:20158` — pt 64 pb 128, header/content gap 48
 *   tablet  `7100:7874` — pt 64 pb 128, header px 80
 *   mobile  `7102:9545` — pt 48 pb 64, header/content gap 36
 */
export function OfferServicePackages({ data }: OfferServicePackagesProps) {
  const { catalogDownload, headingId = 'offer-service-packages-heading', packages } = data
  const rowNodes = OFFER_SERVICE_PACKAGES_FIGMA_NODES.rows

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={OFFER_SERVICE_PACKAGES_FIGMA_NODES.container.desktop}
    >
      <div className="mx-auto flex w-full max-w-[1366px] flex-col gap-9 pt-12 pb-16 md:gap-12 md:pt-16 md:pb-32">
        <OfferPackagesHeader
          catalogDownload={catalogDownload}
          className="px-4 md:px-20 min-[1366px]:px-8"
          figmaNode={OFFER_SERVICE_PACKAGES_FIGMA_NODES.header.desktop}
          headingId={headingId}
        />

        <div
          className="flex w-full flex-col"
          data-figma-node={OFFER_SERVICE_PACKAGES_FIGMA_NODES.content.desktop}
          data-name="Content container"
        >
          {packages.map((pkg, index) => {
            const rowKey = PACKAGE_ROW_KEYS[index]
            const nodes = rowNodes[rowKey]

            return (
              <PackageShowcaseRow
                figmaNode={nodes.desktop}
                image={{
                  alt: pkg.image.alt,
                  figmaNode: nodes.image.desktop,
                  position: pkg.image.position,
                  src: pkg.image.src,
                }}
                key={rowKey}
                panel={{
                  ...pkg.panel,
                  figmaNodes: {
                    column: nodes.panel.column.desktop,
                    columnDetails: nodes.panel.columnDetails.desktop,
                    columnHeader: nodes.panel.columnHeader.desktop,
                    heading: nodes.panel.heading.desktop,
                  },
                }}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
