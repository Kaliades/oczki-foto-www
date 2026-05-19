import Image from 'next/image'

import { cn } from '@/utilities/ui'

type OfferCardProps = {
  cropClassName?: string
  description: string
  imageAlt: string
  imageSrc: string
  title: string
}

export function OfferCard({
  cropClassName,
  description,
  imageAlt,
  imageSrc,
  title,
}: OfferCardProps) {
  return (
    <article
      className="w-[293px] shrink-0 rounded-t-[999px] p-1.5 ring-1 ring-inset ring-[var(--oczki-tertiary-700)] md:w-[clamp(328px,24vw,360px)]"
      data-offer-card
    >
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
              sizes="(min-width: 1536px) 348px, (min-width: 768px) 316px, 281px"
              src={imageSrc}
            />
          )}
        </div>

        <div className="flex h-[164px] shrink-0 flex-col gap-1 overflow-hidden px-3 pb-4 pt-3 md:h-[clamp(158px,11.6vw,176px)] md:gap-2 md:px-5 md:pb-5 md:pt-4">
          <h3 className="oczki-body-xl text-[var(--oczki-primary-800)]">{title}</h3>
          <p className="oczki-body-m text-[var(--oczki-primary-700)]">{description}</p>
        </div>
      </div>
    </article>
  )
}
