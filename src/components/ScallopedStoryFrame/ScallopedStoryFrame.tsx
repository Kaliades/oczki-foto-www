import type { ReactNode } from 'react'

import { ScallopedFrameEars } from './ScallopedFrameEars'
import {
  SCALLOPED_STORY_FRAME_FIGMA_NODES,
  SCALLOPED_STORY_FRAME_LAYOUT,
} from './constants'

type ScallopedStoryFrameProps = {
  children: ReactNode
}

/**
 * Scalloped double-border story panel — Figma `Group 62`.
 *
 * All positions/sizes from `get_design_context` (6972:18509 / 7102:11867 / 7130:9028).
 */
export function ScallopedStoryFrame({ children }: ScallopedStoryFrameProps) {
  const { ruleInset } = SCALLOPED_STORY_FRAME_LAYOUT

  return (
    <div
      className="relative h-[503px] w-[354px] md:h-[467px] md:w-[547px] lg:h-[469px]"
      data-figma-node={SCALLOPED_STORY_FRAME_FIGMA_NODES.desktop}
    >
      <ScallopedFrameEars />

      <div
        className="absolute left-[21px] top-[25px] z-10 w-[311px] bg-[var(--oczki-primary-100)] p-1.5 md:left-[25px] md:top-[27px] md:w-[498px] md:p-3 lg:top-[28px]"
        data-figma-node={SCALLOPED_STORY_FRAME_FIGMA_NODES.innerPanel.desktop}
      >
        <div className="border-[1.5px] border-[var(--oczki-tertiary-700)]" style={{ padding: ruleInset }}>
          <div className="border border-[var(--oczki-tertiary-500)] bg-[var(--oczki-primary-100)] px-3 pb-4 pt-3 md:px-8 md:pb-12 md:pt-8 lg:pb-9">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
