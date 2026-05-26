import type { ReactNode } from 'react'

import { OCZKI_BREADCRUMB_CONTAINER_FIGMA_NODES } from './constants'

type OczkiBreadcrumbContainerProps = {
  children: ReactNode
}

/**
 * Page chrome below navbar — Figma frame `Container`.
 *
 * Inner padding from metadata (breadcrumb x offset = horizontal padding):
 * - mobile 360: 16px, 0 vertical → 44px tall
 * - tablet 768: 80px, 4px top + 4px bottom → 52px tall
 * - desktop 1366: 32px, 4px top + 4px bottom → 52px tall
 */
export function OczkiBreadcrumbContainer({ children }: OczkiBreadcrumbContainerProps) {
  return (
    <div className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]">
      <div
        className="mx-auto w-full max-w-[1366px] px-4 md:px-20 md:pt-1 md:pb-1 lg:px-8"
        data-figma-node={OCZKI_BREADCRUMB_CONTAINER_FIGMA_NODES.desktop}
      >
        {children}
      </div>
    </div>
  )
}
