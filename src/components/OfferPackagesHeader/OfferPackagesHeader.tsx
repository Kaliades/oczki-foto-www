import { OczkiCatalogDownloadButton } from '@/components/OczkiCatalogDownloadButton'
import { SplitDisplayHeading } from '@/components/SplitDisplayHeading/SplitDisplayHeading'
import { resolveLinkHref, type SectionLink } from '@/utilities/resolveLinkHref'
import { cn } from '@/utilities/ui'

type OfferPackagesHeaderProps = {
  catalogDownload: SectionLink
  className?: string
  figmaNode?: string
  headingId: string
}

/**
 * Packages section title + catalog download — Figma `Header` (`6989:25497`).
 *
 * Mobile: column, gap 16, full-width download.
 * Tablet/desktop: row, space-between, intrinsic download width.
 */
export function OfferPackagesHeader({
  catalogDownload,
  className,
  figmaNode,
  headingId,
}: OfferPackagesHeaderProps) {
  const downloadHref = resolveLinkHref(catalogDownload)

  return (
    <header
      className={cn(
        'flex w-full flex-col items-start gap-4 md:flex-row md:items-center md:justify-between',
        className,
      )}
      data-figma-node={figmaNode}
      data-name="Header"
    >
      <SplitDisplayHeading
        className="w-full text-left [word-break:break-word] md:w-auto"
        emphasis="pakiet idealny"
        end=" dla siebie"
        id={headingId}
        sizeClassName="text-[28px] tracking-[-0.28px] md:text-[32px] md:tracking-[-0.32px] lg:text-[36px] lg:tracking-[-0.36px]"
        start="Wybierz "
      />

      {downloadHref && catalogDownload.label ? (
        <OczkiCatalogDownloadButton className="w-full md:w-auto" href={downloadHref}>
          {catalogDownload.label}
        </OczkiCatalogDownloadButton>
      ) : null}
    </header>
  )
}
