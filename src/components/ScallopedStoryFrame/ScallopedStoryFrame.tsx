'use client'

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

import { ScallopedFrameEars } from './ScallopedFrameEars'
import {
  SCALLOPED_STORY_FRAME_FIGMA_NODES,
  SCALLOPED_STORY_FRAME_LAYOUT,
} from './constants'
import {
  scallopExtraVerticalTiles,
  scallopVerticalStepPx,
  type ScallopStoryBreakpoint,
} from './scallopedStoryFrameUtils'

type ScallopedStoryFrameProps = {
  children: ReactNode
}

type FrameMetrics = {
  extraVerticalTiles: number
  heightPx: number
}

function resolveBreakpoint(widthPx: number): ScallopStoryBreakpoint {
  return widthPx >= 768 ? 'desktop' : 'mobile'
}

function resolveBottomChrome(widthPx: number): number {
  const { bottomChrome } = SCALLOPED_STORY_FRAME_LAYOUT
  if (widthPx < 768) {
    return bottomChrome.mobile
  }
  if (widthPx < 1024) {
    return bottomChrome.tablet
  }
  return bottomChrome.desktop
}

function resolveBaseGroupHeight(breakpoint: ScallopStoryBreakpoint): number {
  const { height } = SCALLOPED_STORY_FRAME_LAYOUT.group
  return breakpoint === 'mobile' ? height.mobile : height.desktop
}

/**
 * Scalloped double-border story panel — Figma `Group 62`.
 *
 * Hierarchy:
 * - outer group (base height from tile math; grows by whole side-tile steps)
 *   - `ScallopedFrameEars` (absolute scallop strips)
 *   - cream inner panel → tertiary double rule → children
 *
 * Growth model: when the cream panel needs more vertical room, add one scallop
 * tile at the bottom of the left AND right sides, and shift the bottom row down
 * by the same step — never a tile on every edge.
 */
export function ScallopedStoryFrame({ children }: ScallopedStoryFrameProps) {
  const { ruleInset } = SCALLOPED_STORY_FRAME_LAYOUT
  const panelRef = useRef<HTMLDivElement>(null)
  const [frame, setFrame] = useState<FrameMetrics | null>(null)

  useLayoutEffect(() => {
    const panelEl = panelRef.current
    if (!panelEl) {
      return
    }

    const syncFrame = () => {
      const widthPx = window.innerWidth
      const breakpoint = resolveBreakpoint(widthPx)
      const baseHeight = resolveBaseGroupHeight(breakpoint)
      const stepPx = scallopVerticalStepPx(breakpoint)
      const bottomChrome = resolveBottomChrome(widthPx)
      const contentExtentPx = panelEl.offsetTop + panelEl.offsetHeight + bottomChrome
      const extraVerticalTiles = scallopExtraVerticalTiles(contentExtentPx, baseHeight, stepPx)
      const heightPx = baseHeight + extraVerticalTiles * stepPx

      setFrame((prev) =>
        prev && prev.extraVerticalTiles === extraVerticalTiles && prev.heightPx === heightPx
          ? prev
          : { extraVerticalTiles, heightPx },
      )
    }

    syncFrame()

    const observer = new ResizeObserver(syncFrame)
    observer.observe(panelEl)
    window.addEventListener('resize', syncFrame)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', syncFrame)
    }
  }, [])

  return (
    <div
      className="relative h-[251px] w-[354px] md:h-[310px] md:w-[547px]"
      data-figma-node={SCALLOPED_STORY_FRAME_FIGMA_NODES.desktop}
      style={frame ? { height: frame.heightPx } : undefined}
    >
      <ScallopedFrameEars extraVerticalTiles={frame?.extraVerticalTiles ?? 0} />

      <div
        className="absolute left-[23px] top-[25px] z-10 w-[311px] bg-[var(--oczki-primary-100)] p-1.5 md:left-[25px] md:top-[29px] md:w-[498px] md:p-3 lg:top-[31px]"
        data-figma-node={SCALLOPED_STORY_FRAME_FIGMA_NODES.innerPanel.desktop}
        ref={panelRef}
      >
        <div className="border-[1.5px] border-[var(--oczki-tertiary-700)]" style={{ padding: ruleInset }}>
          <div className="border border-[var(--oczki-tertiary-500)] bg-[var(--oczki-primary-100)] px-4 pb-4 pt-3.5 md:px-8 md:pb-12 md:pt-8 lg:pb-9">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
