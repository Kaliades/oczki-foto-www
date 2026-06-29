'use client'

import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'
import { useLayoutEffect, useRef, useState } from 'react'

import {
  OFFER_SERVICE_HERO_HORIZONTAL_SCALLOP_CIRCLE,
  OFFER_SERVICE_HERO_STACKED_LAYOUT,
} from './constants'
import { offerServiceHeroHorizontalScallopCircleCount } from './horizontalScallopUtils'

const { horizontalScallop } = OFFER_SERVICE_HERO_STACKED_LAYOUT
const { circleCount, circleSize } = horizontalScallop

/**
 * Overlapping scallop circles — tile count follows container width (ResizeObserver).
 * Figma reference: 80 px circles, 12 px overlap (`7102:9502` / `7100:7831`).
 */
export function OfferServiceHeroHorizontalScallopRow() {
  const measureRef = useRef<HTMLDivElement>(null)
  const [tileCount, setTileCount] = useState<number>(circleCount)

  useLayoutEffect(() => {
    const measureEl = measureRef.current
    if (!measureEl) {
      return
    }

    const syncTileCount = () => {
      setTileCount(offerServiceHeroHorizontalScallopCircleCount(measureEl.clientWidth))
    }

    syncTileCount()

    const observer = new ResizeObserver(syncTileCount)
    observer.observe(measureEl)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      className="h-[var(--offer-stacked-scallop-h)] w-full"
      ref={measureRef}
    >
      <div className="flex h-full w-max min-w-full items-start">
        {Array.from({ length: tileCount }, (_, index) => (
          <div
            className="relative shrink-0 [&:not(:last-child)]:-mr-3"
            key={index}
            style={{
              height: 'var(--offer-stacked-scallop-h)',
              width: 'var(--offer-stacked-scallop-h)',
            }}
          >
            <Image
              alt=""
              className="block max-w-none"
              height={circleSize}
              src={OFFER_SERVICE_HERO_HORIZONTAL_SCALLOP_CIRCLE}
              style={{
                height: 'var(--offer-stacked-scallop-h)',
                width: 'var(--offer-stacked-scallop-h)',
              }}
              width={circleSize}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
