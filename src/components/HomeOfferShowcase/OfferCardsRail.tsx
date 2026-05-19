'use client'

import { useRef } from 'react'

import { OfferCard } from './OfferCard'
import { OfferCarouselNav } from './OfferCarouselNav'
import type { HomeOfferItem } from './constants'

type OfferCardsRailProps = {
  items: readonly HomeOfferItem[]
}

export function OfferCardsRail({ items }: OfferCardsRailProps) {
  const railRef = useRef<HTMLDivElement>(null)

  const scrollByCard = (direction: 1 | -1) => {
    const rail = railRef.current

    if (!rail) return

    const firstCard = rail.querySelector<HTMLElement>('[data-offer-card]')
    const railTrack = firstCard?.parentElement
    const gap = railTrack ? Number.parseFloat(getComputedStyle(railTrack).columnGap || '0') : 0
    const cardStep = firstCard ? firstCard.offsetWidth + gap : rail.clientWidth

    rail.scrollBy({
      behavior: 'smooth',
      left: direction * cardStep,
    })
  }

  return (
    <div
      className="relative w-[calc(100%+var(--offer-section-padding))] min-w-0"
      data-figma-node="6724:13191"
    >
      <div
        className="overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        ref={railRef}
      >
        <div className="relative flex w-max gap-2 md:gap-[clamp(1rem,1.17vw,1.5rem)]">
          {items.map((item) => (
            <OfferCard key={item.title} {...item} />
          ))}
        </div>
      </div>
      <OfferCarouselNav onNext={() => scrollByCard(1)} onPrevious={() => scrollByCard(-1)} />
    </div>
  )
}
