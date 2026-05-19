import Image from 'next/image'

type OfferCarouselNavProps = {
  onNext: () => void
  onPrevious: () => void
}

export function OfferCarouselNav({ onNext, onPrevious }: OfferCarouselNavProps) {
  return (
    <div className="absolute left-[min(567px,calc(100%-96px))] top-[29px] z-10 hidden size-16 items-center justify-center gap-2 rounded-full bg-[rgba(219,160,160,0.48)] md:flex">
      <button
        aria-label="Poprzednia oferta"
        className="flex size-4 items-center justify-center transition-opacity hover:opacity-70"
        onClick={onPrevious}
        type="button"
      >
        <Image
          alt=""
          aria-hidden="true"
          className="size-4 -scale-y-100"
          height={16}
          src="/figma/offer-arrow-left.svg"
          width={16}
        />
      </button>
      <button
        aria-label="Następna oferta"
        className="flex size-4 items-center justify-center transition-opacity hover:opacity-70"
        onClick={onNext}
        type="button"
      >
        <Image
          alt=""
          aria-hidden="true"
          className="size-4 rotate-180"
          height={16}
          src="/figma/offer-arrow-right.svg"
          width={16}
        />
      </button>
    </div>
  )
}
