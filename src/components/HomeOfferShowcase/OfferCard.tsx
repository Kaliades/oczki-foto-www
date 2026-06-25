import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/utilities/ui'

type OfferCardProps = {
  cropClassName?: string
  description: string
  /** When set the entire card becomes a navigation link to the offer detail page. */
  href?: string
  imageAlt: string
  imageSrc: string
  title: string
}

/** Outer (flex-item) classes shared by both the static and linked variants. */
const OUTER_CLASS =
  'w-[310px] shrink-0 rounded-t-[999px] p-1.5 ring-1 ring-inset ring-[var(--oczki-tertiary-700)] md:w-[320px]'

export function OfferCard({
  cropClassName,
  description,
  href,
  imageAlt,
  imageSrc,
  title,
}: OfferCardProps) {
  const inner = (
    <div className="flex flex-col rounded-t-[999px] bg-[var(--oczki-primary-100)] ring-1 ring-inset ring-[var(--oczki-tertiary-700)]">
      <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-t-[999px]">
        {cropClassName ? (
          <Image
            alt={imageAlt}
            className={cn('absolute left-0 max-w-none object-cover', cropClassName)}
            height={1920}
            src={imageSrc}
            width={1280}
          />
        ) : (
          <Image
            alt={imageAlt}
            className="object-cover"
            fill
            sizes="(min-width: 768px) 308px, 298px"
            src={imageSrc}
          />
        )}
      </div>

      {/* Uniform card height locked to Figma's MAX values per breakpoint so
          every description (incl. the 5-line ones — "Sesja wizerunkowa",
          "Sesja miłosna") renders in full. Short descriptions get a small
          bottom buffer; no truncation. */}
      <div className="flex h-[164px] shrink-0 flex-col gap-1 px-3 pb-4 pt-3 md:h-[158px] md:gap-2 md:px-5 md:pb-5 md:pt-4">
        {/* Card title: typography/body/xl is 18 on mobile, 20 on tablet+ in
            Figma. Inlined override of `oczki-body-xl` (which is fixed 20). */}
        <h3 className="text-[18px] font-normal leading-[1.48] tracking-[-0.015em] text-[var(--oczki-primary-800)] md:text-[20px]">
          {title}
        </h3>
        <p className="oczki-body-m text-[var(--oczki-primary-700)]">{description}</p>
      </div>
    </div>
  )

  // `data-offer-card` must sit on the flex item (direct child of the rail track)
  // so OfferCardsRail can measure card width + column gap for arrow scrolling.
  if (href) {
    return (
      <Link
        className={cn(
          OUTER_CLASS,
          'block transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--oczki-primary-700)]',
        )}
        data-offer-card
        href={href}
      >
        {inner}
      </Link>
    )
  }

  return (
    <article className={OUTER_CLASS} data-offer-card>
      {inner}
    </article>
  )
}
