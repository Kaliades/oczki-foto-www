import type { ReactNode } from 'react'

import { ScallopedPanelEars } from './ScallopedPanelEars'
import { SCALLOPED_PANEL_FRAME_FIGMA_NODES } from './constants'

type ScallopedPanelFrameProps = {
  children: ReactNode
}

/**
 * Cream panel with repeating semi-circle border — Figma `Contact form container`.
 *
 * Contact form container (relative)
 * ├── ScallopedPanelEars (absolute — top/bottom rows + left/right columns)
 * └── inner stack (relative z-10) — form content + CTA
 */
export function ScallopedPanelFrame({ children }: ScallopedPanelFrameProps) {
  return (
    <div
      className="relative min-h-[576px] w-[310px] bg-[var(--oczki-primary-100)] md:min-h-[588px] md:w-[463px]"
      data-figma-node={SCALLOPED_PANEL_FRAME_FIGMA_NODES.desktop}
    >
      <div className="md:hidden">
        <ScallopedPanelEars size="mobile" />
      </div>
      <div className="hidden md:block">
        <ScallopedPanelEars size="desktop" />
      </div>

      <div className="relative z-10 flex min-h-[576px] flex-col items-start p-2 md:min-h-[588px] md:px-5 md:pb-8 md:pt-5">
        {children}
      </div>
    </div>
  )
}
