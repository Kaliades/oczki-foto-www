import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

import { homeOfferDefaults } from './constants'

type OfferFooterNotchProps = {
  textureSrc?: string
}

export function OfferFooterNotch({
  textureSrc = homeOfferDefaults.textureSrc,
}: OfferFooterNotchProps) {
  const resolvedTexture = textureSrc || homeOfferDefaults.textureSrc

  return (
    <div
      className="relative h-[22px] w-full bg-[var(--oczki-primary-100)] md:h-12 lg:h-[85px]"
      data-figma-node="6781:17288"
    >
      <Image
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full"
        height={85}
        src="/figma/offer-footer-notch.svg"
        width={1366}
      />
      {resolvedTexture ? (
        <Image
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover opacity-30 mix-blend-color-burn"
          height={2731}
          src={resolvedTexture}
          width={4096}
        />
      ) : null}
    </div>
  )
}
