import {
  PERFORATED_SCALLOP_PERIMETER_LAYOUT,
  type PerforatedScallopPerimeterLayout,
} from './constants'

export type PerforatedScallopBreakpoint = 'desktop' | 'mobile' | 'tablet'

export function resolvePerforatedScallopBreakpoint(viewportWidthPx: number): PerforatedScallopBreakpoint {
  if (viewportWidthPx >= 1366) {
    return 'desktop'
  }

  if (viewportWidthPx >= 768) {
    return 'tablet'
  }

  return 'mobile'
}

export function resolvePerforatedScallopPerimeterLayout(
  viewportWidthPx: number,
): PerforatedScallopPerimeterLayout {
  return PERFORATED_SCALLOP_PERIMETER_LAYOUT[resolvePerforatedScallopBreakpoint(viewportWidthPx)]
}
