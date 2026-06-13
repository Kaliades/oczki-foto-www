import { PERFORATED_SCALLOP_CIRCLE, PERFORATED_SCALLOP_FRAME_FIGMA_NODES } from './constants'
import {
  perforatedScallopCornerBottomTopPx,
  perforatedScallopRightRailLeftPx,
  type PerforatedScallopPerimeterMetrics,
} from './perforatedScallopUtils'
import type { PerforatedScallopPerimeterLayout } from './constants'
import type { PerforatedScallopBreakpoint } from './resolvePerimeterLayout'
import { ScallopEdge } from './ScallopEdge'

type PerforatedScallopPerimeterProps = {
  breakpoint: PerforatedScallopBreakpoint
  layout: PerforatedScallopPerimeterLayout
  metrics: PerforatedScallopPerimeterMetrics
  panelWidthPx: number
}

function resolvePerforatedScallopRailFigmaNodes(breakpoint: PerforatedScallopBreakpoint) {
  if (breakpoint === 'tablet') {
    return {
      bottom: PERFORATED_SCALLOP_FRAME_FIGMA_NODES.bottomRailTablet,
      left: PERFORATED_SCALLOP_FRAME_FIGMA_NODES.leftRailTablet,
      right: PERFORATED_SCALLOP_FRAME_FIGMA_NODES.rightRailTablet,
      top: PERFORATED_SCALLOP_FRAME_FIGMA_NODES.topRailTablet,
    }
  }

  if (breakpoint === 'mobile') {
    return {
      bottom: PERFORATED_SCALLOP_FRAME_FIGMA_NODES.mobileBottomRail,
      left: PERFORATED_SCALLOP_FRAME_FIGMA_NODES.leftRailMobile,
      right: PERFORATED_SCALLOP_FRAME_FIGMA_NODES.rightRailMobile,
      top: PERFORATED_SCALLOP_FRAME_FIGMA_NODES.topRailMobile,
    }
  }

  return {
    bottom: PERFORATED_SCALLOP_FRAME_FIGMA_NODES.bottomRailDesktop,
    left: PERFORATED_SCALLOP_FRAME_FIGMA_NODES.leftRailDesktop,
    right: PERFORATED_SCALLOP_FRAME_FIGMA_NODES.rightRailDesktop,
    top: PERFORATED_SCALLOP_FRAME_FIGMA_NODES.topRailDesktop,
  }
}

/**
 * Four-edge perforation shell — paired counts, exact tile spans, shared corner origin.
 *
 * TL anchors at `(−bleedLeft, −bleedTop)`. Rails sit at z-0 behind copy (`z-[1]`).
 */
export function PerforatedScallopPerimeter({
  breakpoint,
  layout,
  metrics,
  panelWidthPx,
}: PerforatedScallopPerimeterProps) {
  const { bleedLeftPx, bleedTopPx, showBottomOnPanel, showSideRails, topCentered } = layout
  const { horizontalCount, horizontalSpanPx, verticalCount, verticalSpanPx } = metrics

  const { sizePx } = PERFORATED_SCALLOP_CIRCLE
  const rightRailLeftPx = perforatedScallopRightRailLeftPx(layout, metrics, panelWidthPx)
  const bottomRailTopPx = perforatedScallopCornerBottomTopPx(bleedTopPx, verticalCount)
  const railFigmaNodes = resolvePerforatedScallopRailFigmaNodes(breakpoint)

  const topShellStyle = topCentered
    ? {
        height: sizePx,
        left: '50%',
        top: -bleedTopPx,
        transform: 'translateX(-50%)',
        width: horizontalSpanPx,
      }
    : {
        height: sizePx,
        left: -bleedLeftPx,
        top: -bleedTopPx,
        width: horizontalSpanPx,
      }

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute z-0"
        data-figma-node={railFigmaNodes.top}
        data-name="Container"
        style={topShellStyle}
      >
        <ScallopEdge
          axis="horizontal"
          count={horizontalCount}
          edgeSpanPx={horizontalSpanPx}
        />
      </div>

      {showBottomOnPanel ? (
        <div
          aria-hidden
          className="pointer-events-none absolute z-0"
          data-figma-node={railFigmaNodes.bottom}
          data-name="Container"
          style={{
            height: sizePx,
            left: -bleedLeftPx,
            top: bottomRailTopPx,
            width: horizontalSpanPx,
          }}
        >
          <ScallopEdge
            axis="horizontal"
            count={horizontalCount}
            edgeSpanPx={horizontalSpanPx}
          />
        </div>
      ) : null}

      {showSideRails ? (
        <div
          aria-hidden
          className="pointer-events-none absolute z-0"
          data-figma-node={railFigmaNodes.left}
          data-name="Container"
          style={{
            height: verticalSpanPx,
            left: -bleedLeftPx,
            top: -bleedTopPx,
            width: sizePx,
          }}
        >
          <ScallopEdge axis="vertical" count={verticalCount} edgeSpanPx={verticalSpanPx} />
        </div>
      ) : null}

      {showSideRails ? (
        <div
          aria-hidden
          className="pointer-events-none absolute z-0"
          data-figma-node={railFigmaNodes.right}
          data-name="Container"
          style={{
            height: verticalSpanPx,
            left: rightRailLeftPx,
            top: -bleedTopPx,
            width: sizePx,
          }}
        >
          <ScallopEdge axis="vertical" count={verticalCount} edgeSpanPx={verticalSpanPx} />
        </div>
      ) : null}
    </>
  )
}
