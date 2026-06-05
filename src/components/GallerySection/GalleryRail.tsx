'use client'

import { useCallback, useLayoutEffect, useRef, useState } from 'react'

import { GalleryCarouselNav } from './GalleryCarouselNav'
import { GalleryItem } from './GalleryItem'
import { GalleryProgressDivider } from './GalleryProgressDivider'
import {
  getDefaultFocusedIndex,
  isFocusedNeighbour,
  type GallerySectionItem,
} from './constants'

type GalleryRailProps = {
  items: readonly GallerySectionItem[]
}

const centerFocusedItem = (
  scrollEl: HTMLDivElement,
  focusedIndex: number,
  behavior: ScrollBehavior = 'smooth',
) => {
  const focusedEl = scrollEl.querySelector<HTMLElement>(
    `[data-gallery-index="${focusedIndex}"]`,
  )
  if (!focusedEl) return

  const scrollRect = scrollEl.getBoundingClientRect()
  const focusedRect = focusedEl.getBoundingClientRect()
  const targetScrollLeft =
    scrollEl.scrollLeft +
    (focusedRect.left - scrollRect.left) -
    (scrollEl.clientWidth - focusedRect.width) / 2

  const maxScroll = Math.max(0, scrollEl.scrollWidth - scrollEl.clientWidth)
  const left = Math.max(0, Math.min(targetScrollLeft, maxScroll))

  scrollEl.scrollTo({ left, behavior })
}

/**
 * Horizontally-scrollable rail — one focused (large) slot at a time.
 * Focus changes animate every slot in parallel; the stage keeps a fixed
 * min-height so the progress bar below does not shift.
 *
 * Hierarchy (Figma `7105:8217`):
 *   Gallery container
 *   ├── Gallery row (`7105:8218`) — flex row, 16 px gap
 *   │   ├── Small image container × N — pt 108 px, 211×262 image
 *   │   ├── Large image container — 393×486 image + caption (`7105:8225`)
 *   │   └── Carousel controls container (`7105:8232`) — absolute, desktop
 *   └── Divider container (`7105:8237`) — 4 px track + fill
 */
export function GalleryRail({ items }: GalleryRailProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const skipSmoothScrollRef = useRef(true)
  const [focusedIndex, setFocusedIndex] = useState(() =>
    getDefaultFocusedIndex(items.length),
  )
  const [navOffset, setNavOffset] = useState({ left: 831, top: 229.4 })

  const count = items.length

  const focusIndex = useCallback(
    (index: number) => {
      const next = (index + count) % count
      setFocusedIndex((prev) => (prev === next ? prev : next))
    },
    [count],
  )

  const scrollByFocus = (direction: 1 | -1) => {
    focusIndex(focusedIndex + direction)
  }

  const updateNavPosition = useCallback(() => {
    const rail = railRef.current
    const scroll = scrollRef.current
    if (!rail || !scroll) return

    if (!window.matchMedia('(min-width: 1024px)').matches) return

    const focusedEl = scroll.querySelector<HTMLElement>(
      `[data-gallery-index="${focusedIndex}"]`,
    )
    if (!focusedEl) return

    const railRect = rail.getBoundingClientRect()
    const focusedRect = focusedEl.getBoundingClientRect()
    const gapHalf = 8
    const controlSize = 64

    setNavOffset({
      left: focusedRect.right - railRect.left + gapHalf - controlSize / 2,
      top: 229.4,
    })
  }, [focusedIndex])

  useLayoutEffect(() => {
    const scroll = scrollRef.current
    if (!scroll) return

    const behavior: ScrollBehavior = skipSmoothScrollRef.current ? 'auto' : 'smooth'
    skipSmoothScrollRef.current = false

    centerFocusedItem(scroll, focusedIndex, behavior)
    updateNavPosition()

    const focusedButton = scroll.querySelector<HTMLElement>(
      `[data-gallery-index="${focusedIndex}"] button`,
    )

    const onWidthTransitionEnd = (event: TransitionEvent) => {
      if (event.propertyName !== 'width') return
      centerFocusedItem(scroll, focusedIndex, 'smooth')
      updateNavPosition()
    }

    focusedButton?.addEventListener('transitionend', onWidthTransitionEnd)

    const onResize = () => {
      centerFocusedItem(scroll, focusedIndex, 'auto')
      updateNavPosition()
    }

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      focusedButton?.removeEventListener('transitionend', onWidthTransitionEnd)
    }
  }, [focusedIndex, items.length, updateNavPosition])

  const progressPercent = count > 0 ? ((focusedIndex + 1) / count) * 100 : 0

  return (
    <div className="flex w-full flex-col gap-9">
      <div
        className="relative -mx-4 w-[calc(100%+2rem)] md:-mx-20 md:w-[calc(100%+10rem)] lg:mx-0 lg:w-full"
        ref={railRef}
      >
        {/* Locked stage: large image + caption gutter (Figma desktop ≈ 550px) */}
        <div className="min-h-[430px] md:min-h-[550px]">
          <div
            className="overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            ref={scrollRef}
          >
            <div className="flex w-max items-start gap-4">
              {items.map((item, idx) => (
                <div
                  className="shrink-0"
                  data-gallery-index={idx}
                  key={`${item.imageSrc}-${idx}`}
                >
                  <GalleryItem
                    isFocused={idx === focusedIndex}
                    isFocusedNeighbour={isFocusedNeighbour(idx, focusedIndex, count)}
                    item={item}
                    onFocus={() => focusIndex(idx)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <GalleryCarouselNav
          left={navOffset.left}
          onNext={() => scrollByFocus(1)}
          onPrevious={() => scrollByFocus(-1)}
          top={navOffset.top}
        />
      </div>

      <GalleryProgressDivider fillPercent={progressPercent} />
    </div>
  )
}
