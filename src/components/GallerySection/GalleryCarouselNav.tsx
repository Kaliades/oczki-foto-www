import Image from 'next/image'

type GalleryCarouselNavProps = {
  onNext: () => void
  onPrevious: () => void
  left: number
  top: number
}

/**
 * Pink-tinted circular nav over the gap to the right of the focused image
 * on desktop. Positioned with `translate3d` so it glides without layout
 * thrash when focus moves between slots.
 */
export function GalleryCarouselNav({
  onNext,
  onPrevious,
  left,
  top,
}: GalleryCarouselNavProps) {
  return (
    <div
      className="pointer-events-none absolute left-0 top-0 z-10 hidden size-16 items-center justify-center gap-2 rounded-full bg-[rgba(219,160,160,0.48)] motion-safe:transition-[transform] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] lg:flex"
      style={{ transform: `translate3d(${left}px, ${top}px, 0)` }}
    >
      <button
        aria-label="Poprzednie zdjęcie"
        className="pointer-events-auto flex h-4 w-[16.458px] items-center justify-center transition-opacity hover:opacity-70"
        onClick={onPrevious}
        type="button"
      >
        <Image
          alt=""
          aria-hidden="true"
          className="block h-4 w-[16.458px] -scale-y-100"
          height={16}
          src="/figma/offer-arrow-left.svg"
          style={{ height: 'auto', width: 'auto' }}
          width={16}
        />
      </button>
      <button
        aria-label="Następne zdjęcie"
        className="pointer-events-auto flex h-4 w-[16.458px] items-center justify-center transition-opacity hover:opacity-70"
        onClick={onNext}
        type="button"
      >
        <Image
          alt=""
          aria-hidden="true"
          className="block h-4 w-[16.458px] rotate-180"
          height={16}
          src="/figma/offer-arrow-right.svg"
          style={{ height: 'auto', width: 'auto' }}
          width={16}
        />
      </button>
    </div>
  )
}
