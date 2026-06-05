'use client'

import Image from 'next/image'

import { cn } from '@/utilities/ui'

import type { GallerySectionItem } from './constants'

const FALLBACK_CAPTION = {
  title: 'Para w kadrze',
  subtitle: 'Sesja pełna naturalnego światła i emocji',
} as const

const EASE = 'motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]'
const SIZE_TRANSITION =
  'motion-safe:transition-[width,height] motion-safe:duration-500'

type GalleryItemProps = {
  item: GallerySectionItem
  isFocused: boolean
  isFocusedNeighbour?: boolean
  onFocus: () => void
}

/**
 * One gallery slot. Figma: 16px gaps, 211px idle / 296–393px focused.
 * Focus toggles width and height in one transition; caption space is always
 * reserved so the rail stage (and progress bar below) do not jump.
 */
export function GalleryItem({
  item,
  isFocused,
  isFocusedNeighbour = false,
  onFocus,
}: GalleryItemProps) {
  const caption = item.caption ?? FALLBACK_CAPTION

  return (
    <button
      aria-pressed={isFocused}
      className={cn(
        'flex shrink-0 flex-col items-start justify-end overflow-hidden',
        SIZE_TRANSITION,
        EASE,
        isFocused ? 'w-[296px] md:w-[393px]' : 'w-[211px]',
        'cursor-pointer border-0 bg-transparent p-0 text-left',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--oczki-primary-800)]',
        isFocused
          ? 'translate-y-0'
          : isFocusedNeighbour
            ? 'translate-y-[52px] md:translate-y-[108px]'
            : 'translate-y-[108px]',
      )}
      data-gallery-item={isFocused ? 'focused' : 'idle'}
      onClick={onFocus}
      type="button"
    >
      <div
        className={cn(
          'relative w-full overflow-hidden',
          SIZE_TRANSITION,
          EASE,
          isFocused ? 'h-[366px] md:h-[486px]' : 'h-[262px]',
        )}
      >
        <Image
          alt={item.imageAlt}
          className={cn(
            'object-cover',
            item.cropClassName ?? 'absolute inset-0 size-full max-w-none',
          )}
          fill={!item.cropClassName}
          height={item.cropClassName ? 1024 : undefined}
          sizes={isFocused ? '(min-width: 768px) 393px, 296px' : '211px'}
          src={item.imageSrc}
          width={item.cropClassName ? 683 : undefined}
          priority={false}
        />
      </div>

      {/* Caption gutter always reserved — opacity-only toggle avoids layout shift */}
      <div className="mt-3 min-h-[3.25rem] w-full">
        <figcaption
          aria-hidden={!isFocused}
          className={cn(
            'flex flex-col items-start [font-family:var(--font-oczki-body)] [font-feature-settings:\'ss01\'_1,\'ss02\'_1,\'ss03\'_1,\'ss08\'_1,\'ss10\'_1,\'ss12\'_1,\'lnum\'_1,\'pnum\'_1]',
            'motion-safe:transition-opacity motion-safe:duration-300',
            EASE,
            isFocused ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
        >
          <span className="text-[18px] font-normal leading-[1.48] tracking-[-0.015em] text-[var(--oczki-primary-800)] whitespace-nowrap md:text-[20px]">
            {caption.title}
          </span>
          <span className="oczki-body-l text-[var(--oczki-primary-700)] whitespace-nowrap">
            {caption.subtitle}
          </span>
        </figcaption>
      </div>
    </button>
  )
}
