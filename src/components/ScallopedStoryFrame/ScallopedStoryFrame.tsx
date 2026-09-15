'use client'

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

import { ScallopedFrameEars } from './ScallopedFrameEars'
import {
  SCALLOPED_STORY_FRAME_FIGMA_NODES,
  SCALLOPED_STORY_FRAME_LAYOUT,
} from './constants'
import {
  scallopPanelMaxHeightPx,
  scallopWrapFromPanel,
  type ScallopStoryBreakpoint,
  type ScallopWrapLayout,
} from './scallopedStoryFrameUtils'

type ScallopedStoryFrameProps = {
  children: ReactNode
}

function resolveBreakpoint(widthPx: number): ScallopStoryBreakpoint {
  return widthPx >= 768 ? 'desktop' : 'mobile'
}

function resolveBottomChrome(widthPx: number): number {
  const { bottomChrome } = SCALLOPED_STORY_FRAME_LAYOUT
  if (widthPx < 768) return bottomChrome.mobile
  if (widthPx < 1024) return bottomChrome.tablet
  return bottomChrome.desktop
}

/**
 * Scalloped story card — Figma `Group 62`.
 *
 * Order:
 * 1. Text sizes the cream panel (in-flow).
 * 2. Measure that rectangle.
 * 3. Cloud count = cover length ÷ tile step; ears wrap the panel.
 */
export function ScallopedStoryFrame({ children }: ScallopedStoryFrameProps) {
  const { ruleInset } = SCALLOPED_STORY_FRAME_LAYOUT
  const panelRef = useRef<HTMLDivElement>(null)
  const [wrap, setWrap] = useState<ScallopWrapLayout | null>(null)

  useLayoutEffect(() => {
    const panelEl = panelRef.current
    if (!panelEl) return

    const sync = () => {
      const widthPx = window.innerWidth
      const breakpoint = resolveBreakpoint(widthPx)
      const peekPx = resolveBottomChrome(widthPx)
      panelEl.style.maxHeight = `${scallopPanelMaxHeightPx(breakpoint, peekPx)}px`

      const next = scallopWrapFromPanel({
        breakpoint,
        panelTop: panelEl.offsetTop,
        panelLeft: panelEl.offsetLeft,
        panelWidth: panelEl.offsetWidth,
        panelHeight: panelEl.offsetHeight,
        peekPx,
      })

      setWrap((prev) => {
        if (
          prev &&
          prev.groupHeightPx === next.groupHeightPx &&
          prev.verticalCount === next.verticalCount &&
          prev.panel.height === next.panel.height &&
          prev.panel.top === next.panel.top
        ) {
          return prev
        }
        return next
      })
    }

    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(panelEl)
    window.addEventListener('resize', sync)

    let cancelled = false
    void document.fonts?.ready.then(() => {
      if (!cancelled) sync()
    })

    return () => {
      cancelled = true
      observer.disconnect()
      window.removeEventListener('resize', sync)
    }
  }, [])

  return (
    <div
      className="relative min-h-[251px] w-[354px] overflow-visible md:min-h-[310px] md:w-[547px]"
      data-figma-node={SCALLOPED_STORY_FRAME_FIGMA_NODES.desktop}
      style={wrap ? { height: wrap.groupHeightPx } : undefined}
    >
      <ScallopedFrameEars layout={wrap} />

      <div
        className="relative z-10 mx-auto mt-[25px] flex min-h-[198px] w-[311px] flex-col overflow-hidden bg-[var(--oczki-primary-100)] p-1.5 md:mt-[29px] md:min-h-[241px] md:w-[498px] md:p-3 lg:mt-[31px] lg:min-h-[239px]"
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
