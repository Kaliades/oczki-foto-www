import Link from 'next/link'

import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'
import { SplitDisplayHeading } from '@/components/SplitDisplayHeading/SplitDisplayHeading'
import { cn } from '@/utilities/ui'
import { resolveLinkHref } from '@/utilities/resolveLinkHref'

import type { OfferServiceGalleryData, OfferServiceGalleryItem } from './constants'
import { OFFER_SERVICE_GALLERY_REPORTAZE_FIGMA_NODES } from './constants'

type GalleryMosaicProps = {
  data: OfferServiceGalleryData
  headingId?: string
}

type MosaicSlotSize = 'small' | 'large'

/**
 * Reportaż mosaic order (Figma `7353:9847`):
 *   desktop 4-col: S S L(span2) / L(span2) S S
 *   tablet/mobile 2-col: S S / L / L / S S
 */
const SLOT_SIZES: readonly MosaicSlotSize[] = [
  'small',
  'small',
  'large',
  'large',
  'small',
  'small',
]

const SLOT_HEIGHT: Record<MosaicSlotSize, string> = {
  small: 'h-[199px] md:h-[372px] min-[1366px]:h-[395px]',
  large: 'h-[200px] md:h-[372px] min-[1366px]:h-[395px]',
}

function MosaicCell({
  item,
  size,
}: {
  item: OfferServiceGalleryItem
  size: MosaicSlotSize
}) {
  const sizes =
    size === 'large'
      ? '(min-width: 1024px) 50vw, (min-width: 768px) 608px, 328px'
      : '(min-width: 1024px) 25vw, (min-width: 768px) 299px, 160px'

  return (
    <div
      className={cn(
        'relative min-w-0 overflow-hidden',
        SLOT_HEIGHT[size],
        size === 'large' && 'col-span-2',
      )}
    >
      {item.cropClassName ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Figma crop on slot 2: top -20.76% / height 120.76% */}
          <Image
            alt={item.imageAlt}
            className={cn(
              'absolute left-0 w-full max-w-none object-cover',
              item.cropClassName,
            )}
            height={480}
            sizes={sizes}
            src={item.imageSrc}
            width={318}
          />
        </div>
      ) : (
        <Image
          alt={item.imageAlt}
          className="object-cover"
          fill
          sizes={sizes}
          src={item.imageSrc}
        />
      )}
    </div>
  )
}

/**
 * Reportaż “Galeria” mosaic — centred heading, 6-slot grid, footer CTA.
 * Figma: desktop `7353:9844` / tablet `7356:11072` / mobile `7356:11054`.
 */
export function GalleryMosaic({
  data,
  headingId = 'offer-service-gallery-heading',
}: GalleryMosaicProps) {
  const { heading, cta, items } = data
  const nodes = OFFER_SERVICE_GALLERY_REPORTAZE_FIGMA_NODES
  const href = resolveLinkHref(cta)
  const label = cta.label ?? ''

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={nodes.desktop}
      data-figma-node-mobile={nodes.mobile}
      data-figma-node-tablet={nodes.tablet}
    >
      <div className="mx-auto flex w-full max-w-[1366px] flex-col items-center gap-7 px-4 pb-16 pt-12 md:gap-9 md:p-20 lg:gap-9 lg:px-8 lg:py-20">
        <SplitDisplayHeading
          className="w-full max-w-[480px] text-center"
          emphasis={heading.emphasis}
          end={heading.end}
          id={headingId}
          sizeClassName="text-[32px] tracking-[-0.32px]"
          start={heading.start}
        />

        <div className="flex w-full flex-col items-center justify-center gap-6 md:gap-8">
          <div className="grid w-full grid-cols-2 gap-2 md:gap-2.5 lg:grid-cols-4">
            {items.slice(0, SLOT_SIZES.length).map((item, index) => (
              <MosaicCell
                item={item}
                key={`${item.imageSrc}-${index}`}
                size={SLOT_SIZES[index] ?? 'small'}
              />
            ))}
          </div>

          {href && label ? (
            <div className="flex w-full flex-col items-center justify-center border-t border-solid border-[var(--oczki-primary-300)] pt-2 md:pt-3">
              <Link
                aria-label={label}
                className="group inline-flex h-11 shrink-0 items-start justify-center pb-[10px] pt-[11px]"
                href={href}
                rel={cta.newTab ? 'noopener noreferrer' : undefined}
                target={cta.newTab ? '_blank' : undefined}
              >
                <span className="flex flex-col items-start">
                  <span className="flex items-start gap-1 pb-1">
                    <span className="whitespace-nowrap text-center text-[14px] font-normal leading-[1.48] tracking-[-0.01em] text-[var(--oczki-primary-900)] [font-family:var(--font-oczki-body)]">
                      {label}
                    </span>
                    <span className="flex w-[14px] flex-col items-start pt-[5px]">
                      <Image
                        alt=""
                        aria-hidden="true"
                        className="block h-[7.719px] w-[10.111px] rotate-90 text-[var(--oczki-primary-900)]"
                        height={8}
                        src="/figma/gallery-link-arrow.svg"
                        style={{ height: 'auto', width: 'auto' }}
                        width={10}
                      />
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="block h-px w-full origin-left scale-x-0 bg-[var(--oczki-primary-900)] transition-transform duration-300 group-hover:scale-x-100"
                  />
                </span>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
