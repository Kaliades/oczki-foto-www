'use client'

import { useRef, type ReactNode } from 'react'

import { cn } from '@/utilities/ui'

import {
  PERFORATED_SCALLOP_FRAME_FIGMA_NODES,
  PERFORATED_SCALLOP_PANEL_CLASSNAME,
} from './constants'
import { PerforatedScallopPerimeter } from './PerforatedScallopPerimeter'
import { usePerforatedScallopViewport } from './usePerforatedScallopViewport'

type PerforatedScallopFrameProps = {
  children: ReactNode
  className?: string
  contentClassName?: string
  figmaNodes?: {
    desktop?: string
    mobile?: string
    tablet?: string
  }
}

/**
 * Cream well with perforated scallop perimeter — Figma `Container` (`6972:15552`).
 *
 * <div panel ref> — primary/100; measured once for all four edges
 *   ├── <PerforatedScallopPerimeter> — paired counts, shared corner origin
 *   └── <div content> — numbered steps rail
 *
 * Mobile bottom row is rendered outside this shell — see {@link SessionFeelSection}.
 */
export function PerforatedScallopFrame({
  children,
  className,
  contentClassName,
  figmaNodes,
}: PerforatedScallopFrameProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const { breakpoint, layout, metrics, panelWidthPx } = usePerforatedScallopViewport(panelRef)

  return (
    <div
      className={cn(PERFORATED_SCALLOP_PANEL_CLASSNAME[breakpoint], 'flex flex-col', className)}
      data-figma-node={figmaNodes?.desktop ?? PERFORATED_SCALLOP_FRAME_FIGMA_NODES.desktopPanel}
      data-figma-node-mobile={figmaNodes?.mobile ?? PERFORATED_SCALLOP_FRAME_FIGMA_NODES.mobilePanel}
      data-figma-node-tablet={figmaNodes?.tablet ?? PERFORATED_SCALLOP_FRAME_FIGMA_NODES.tabletPanel}
      data-name="Container"
      ref={panelRef}
    >
      <PerforatedScallopPerimeter
        breakpoint={breakpoint}
        layout={layout}
        metrics={metrics}
        panelWidthPx={panelWidthPx}
      />

      <div
        className={cn('relative z-[1] flex min-h-0 w-full flex-1 flex-col', contentClassName)}
      >
        {children}
      </div>
    </div>
  )
}

export type { PerforatedScallopFrameProps }
