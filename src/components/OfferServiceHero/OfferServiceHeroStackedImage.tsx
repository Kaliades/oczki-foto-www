import Image from 'next/image'

import { OFFER_SERVICE_HERO_FIGMA_NODES } from './constants'

type OfferServiceHeroStackedImageProps = {
  alt: string
  src: string
}

/**
 * Hero photograph — stacked layouts only.
 * Mobile `7102:9517`: aspect 360/267. Tablet `7102:9477`: aspect 768/569.
 */
export function OfferServiceHeroStackedImage({ alt, src }: OfferServiceHeroStackedImageProps) {
  return (
    <div
      className="relative aspect-[360/267] w-full shrink-0 md:aspect-[768/569]"
      data-figma-node={OFFER_SERVICE_HERO_FIGMA_NODES.mainImage.mobile}
      data-name="Main image"
    >
      <Image
        alt={alt}
        className="object-cover"
        fill
        priority
        sizes="(min-width: 768px) 768px, 100vw"
        src={src}
      />
    </div>
  )
}
