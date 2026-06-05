import Image from 'next/image'

import { OFFER_SERVICE_HERO_FIGMA_NODES } from './constants'

type OfferServiceHeroImageProps = {
  alt: string
  src: string
}

/** Hero photograph — desktop row only. Figma `6994:25770` (768×569). */
export function OfferServiceHeroImage({ alt, src }: OfferServiceHeroImageProps) {
  return (
    <div
      className="relative h-[569px] min-w-0 flex-1 shrink-0"
      data-figma-node={OFFER_SERVICE_HERO_FIGMA_NODES.mainImage.desktop}
      data-name="Main image"
    >
      <Image
        alt={alt}
        className="object-cover"
        fill
        priority
        sizes="768px"
        src={src}
      />
    </div>
  )
}
