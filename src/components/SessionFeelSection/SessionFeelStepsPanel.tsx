import { NumberedStepsRail } from '@/components/NumberedStepsRail'
import type { NumberedStepItem } from '@/components/NumberedStepsRail'
import {
  PERFORATED_SCALLOP_FRAME_FIGMA_NODES,
  PERFORATED_SCALLOP_MOBILE_BOTTOM_RAIL,
  PerforatedScallopFrame,
  PerforatedScallopRail,
} from '@/components/PerforatedScallopFrame'

type SessionFeelStepsPanelProps = {
  steps: readonly NumberedStepItem[]
}

/**
 * Perforated cream panel with numbered steps — kulki + copy in one shell.
 *
 * Figma `Container` (`6972:15552`):
 *   <SessionFeelStepsPanel>
 *     ├── <PerforatedScallopFrame> — cream well + four-edge scallops
 *     │     └── <NumberedStepsRail> — four aligned step columns
 *     └── <PerforatedScallopRail> — mobile-only bottom row (outside well)
 */
export function SessionFeelStepsPanel({ steps }: SessionFeelStepsPanelProps) {
  return (
    <div className="relative flex w-full justify-center min-[1366px]:-mx-16 min-[1366px]:w-[calc(100%+8rem)]">
      <PerforatedScallopFrame className="min-[1366px]:shrink-0">
        <NumberedStepsRail items={steps} />
      </PerforatedScallopFrame>

      <PerforatedScallopRail
        circleCount={PERFORATED_SCALLOP_MOBILE_BOTTOM_RAIL.circleCount}
        className="bottom-[-36px] left-1/2 -translate-x-1/2 md:hidden"
        figmaNode={PERFORATED_SCALLOP_FRAME_FIGMA_NODES.mobileBottomRail}
        spanPx={PERFORATED_SCALLOP_MOBILE_BOTTOM_RAIL.spanPx}
      />
    </div>
  )
}
