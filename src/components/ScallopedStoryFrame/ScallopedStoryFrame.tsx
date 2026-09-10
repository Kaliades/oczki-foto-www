'use client'

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

import { ScallopedFrameEars } from './ScallopedFrameEars'
import {
  SCALLOPED_STORY_FRAME_FIGMA_NODES,
  SCALLOPED_STORY_FRAME_LAYOUT,
} from './constants'
import {
  scallopFrameMetricsFromPanel,
  type ScallopFrameMetrics,
  type ScallopStoryBreakpoint,
} from './scallopedStoryFrameUtils'

type ScallopedStoryFrameProps = {
  children: ReactNode
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

/**
 * Scalloped double-border story panel — Figma `Group 62`.
 *
 * Hierarchy:
 * - outer group (Figma base height; grows by whole side-tile steps for long copy)
 *   - `ScallopedFrameEars` (absolute scallop strips)
 *   - cream inner panel (min-height fills the base ≈4-line box) → double rule → children
 *
 * Short (3-line) headings keep the base scallop frame and get extra cream below
 * the text. Longer copy grows the frame in whole tiles.
 */
export function ScallopedStoryFrame({ children }: ScallopedStoryFrameProps) {
  const { ruleInset } = SCALLOPED_STORY_FRAME_LAYOUT
  const panelRef = useRef<HTMLDivElement>(null)
  const [frame, setFrame] = useState<ScallopFrameMetrics | null>(null)

  useLayoutEffect(() => {
    const panelEl = panelRef.current
    if (!panelEl) {
      return
    }

    const syncFrame = () => {
      const widthPx = window.innerWidth
      const breakpoint = resolveBreakpoint(widthPx)
      const peekPx = resolveBottomChrome(widthPx)
      const panelBottomPx = panelEl.offsetTop + panelEl.offsetHeight
      const next = scallopFrameMetricsFromPanel({ panelBottomPx, breakpoint, peekPx })

      setFrame((prev) =>
        prev && prev.extraVerticalTiles === next.extraVerticalTiles && prev.heightPx === next.heightPx
          ? prev
          : next,
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
      className="relative h-[251px] w-[354px] overflow-visible md:h-[310px] md:w-[547px]"
      data-figma-node={SCALLOPED_STORY_FRAME_FIGMA_NODES.desktop}
      style={frame ? { height: frame.heightPx } : undefined}
    >
      <ScallopedFrameEars extraVerticalTiles={frame?.extraVerticalTiles ?? 0} />

      <div
        className="absolute left-[23px] top-[25px] z-10 flex min-h-[198px] w-[311px] flex-col bg-[var(--oczki-primary-100)] p-1.5 md:left-[25px] md:top-[29px] md:min-h-[241px] md:w-[498px] md:p-3 lg:top-[31px] lg:min-h-[239px]"
        data-figma-node={SCALLOPED_STORY_FRAME_FIGMA_NODES.innerPanel.desktop}
        ref={panelRef}
      >
        <div
          className="flex min-h-0 flex-1 flex-col border-[1.5px] border-[var(--oczki-tertiary-700)]"
          style={{ padding: ruleInset }}
        >
          <div className="flex min-h-0 flex-1 flex-col border border-[var(--oczki-tertiary-500)] bg-[var(--oczki-primary-100)] px-4 pb-4 pt-3.5 md:px-8 md:pb-8 md:pt-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
