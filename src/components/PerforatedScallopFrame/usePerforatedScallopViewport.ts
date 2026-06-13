'use client'

import { useLayoutEffect, useState, type RefObject } from 'react'

import type { PerforatedScallopPerimeterLayout } from './constants'
import {
  computePerforatedScallopPerimeter,
  createPerforatedScallopMetricsFromLayout,
  type PerforatedScallopPerimeterMetrics,
} from './perforatedScallopUtils'
import {
  resolvePerforatedScallopBreakpoint,
  resolvePerforatedScallopPerimeterLayout,
  type PerforatedScallopBreakpoint,
} from './resolvePerimeterLayout'

export type PerforatedScallopViewportState = {
  breakpoint: PerforatedScallopBreakpoint
  layout: PerforatedScallopPerimeterLayout
  metrics: PerforatedScallopPerimeterMetrics
  panelHeightPx: number
  panelWidthPx: number
}

function readViewportWidthPx(): number {
  if (typeof window === 'undefined') {
    return 360
  }

  return window.innerWidth
}

function createViewportState(viewportWidthPx: number): PerforatedScallopViewportState {
  const layout = resolvePerforatedScallopPerimeterLayout(viewportWidthPx)
  const breakpoint = resolvePerforatedScallopBreakpoint(viewportWidthPx)

  return {
    breakpoint,
    layout,
    metrics: createPerforatedScallopMetricsFromLayout(layout),
    panelHeightPx: 0,
    panelWidthPx: 0,
  }
}

export function usePerforatedScallopViewport(
  panelRef: RefObject<HTMLDivElement | null>,
): PerforatedScallopViewportState {
  const [state, setState] = useState(() => createViewportState(readViewportWidthPx()))

  useLayoutEffect(() => {
    const panelEl = panelRef.current
    if (!panelEl) {
      return
    }

    const sync = () => {
      const viewportWidthPx = window.innerWidth
      const nextLayout = resolvePerforatedScallopPerimeterLayout(viewportWidthPx)
      const { width, height } = panelEl.getBoundingClientRect()

      setState({
        breakpoint: resolvePerforatedScallopBreakpoint(viewportWidthPx),
        layout: nextLayout,
        metrics: computePerforatedScallopPerimeter(width, height, nextLayout),
        panelHeightPx: height,
        panelWidthPx: width,
      })
    }

    sync()

    const observer = new ResizeObserver(sync)
    observer.observe(panelEl)
    window.addEventListener('resize', sync)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', sync)
    }
  }, [panelRef])

  return state
}
