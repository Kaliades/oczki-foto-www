'use client'

import { useLayoutEffect, useRef, useState } from 'react'

import { cn } from '@/utilities/ui'

import { SEGMENTED_SCALLOP_TILE, type SegmentedScallopDividerVariant } from './constants'

type SegmentedScallopDividerProps = {
  variant: SegmentedScallopDividerVariant
  className?: string
  figmaNode?: string
}

function segmentedScallopTileCount(containerWidthPx: number): number {
  const { gapPx, widthPx } = SEGMENTED_SCALLOP_TILE
  const pitch = widthPx + gapPx

  return Math.max(1, Math.ceil((containerWidthPx + gapPx) / pitch) + 2)
}

/**
 * Rectangle tile row — Figma `RoundedRectangle Container` (`6986:25026` / `6986:25051`).
 * Tiles are plain 48×24 px rectangles (no corner radius in Figma).
 *
 * `transition-down`: primary-100 strip with primary-200 tiles (leads into a primary-200 block).
 * `transition-up`: primary-100 strip with primary-200 tiles (closes a primary-200 block).
 */
export function SegmentedScallopDivider({ variant, className, figmaNode }: SegmentedScallopDividerProps) {
  const measureRef = useRef<HTMLDivElement>(null)
  const [tileCount, setTileCount] = useState(14)

  useLayoutEffect(() => {
    const measureEl = measureRef.current
    if (!measureEl) {
      return
    }

    const syncTileCount = () => {
      setTileCount(segmentedScallopTileCount(measureEl.clientWidth))
    }

    syncTileCount()

    const observer = new ResizeObserver(syncTileCount)
    observer.observe(measureEl)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={cn(
        'flex h-6 w-full items-start justify-center gap-12 overflow-hidden bg-[var(--oczki-primary-100)]',
        className,
      )}
      data-figma-node={figmaNode}
      data-name="RoundedRectangle Container"
      ref={measureRef}
    >
      {Array.from({ length: tileCount }, (_, index) => (
        <div
          className="h-6 w-12 shrink-0 bg-[var(--oczki-primary-200)]"
          data-name="RoundedRectangle"
          key={`${variant}-${index}`}
        />
      ))}
    </div>
  )
}
