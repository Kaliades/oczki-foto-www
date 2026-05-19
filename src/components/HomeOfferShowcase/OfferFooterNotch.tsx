import Image from 'next/image'

export function OfferFooterNotch() {
  return (
    <div className="relative h-[22px] w-full bg-white md:h-12 lg:h-[85px]" data-figma-node="6781:17288">
      <Image
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full"
        height={85}
        src="/figma/offer-footer-notch.svg"
        width={1366}
      />
      <Image
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover opacity-30 mix-blend-color-burn"
        height={2731}
        src="/figma/offer-texture.jpg"
        width={4096}
      />
    </div>
  )
}
