import { SCALLOPED_PANEL_EAR_LAYOUT } from './constants'

type ScallopedPanelEarsProps = {
  size: 'desktop' | 'mobile'
}

function ScallopCircle({ diameter }: { diameter: number }) {
  return (
    <div
      aria-hidden
      className="shrink-0 rounded-full bg-[var(--oczki-primary-100)]"
      style={{ height: diameter, width: diameter }}
    />
  )
}

function ScallopRow({
  count,
  diameter,
  overlap,
  figmaNode,
  top,
}: {
  count: number
  diameter: number
  overlap: number
  figmaNode: string
  top: number
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 flex -translate-x-1/2 items-center"
      data-figma-node={figmaNode}
      style={{ top }}
    >
      {Array.from({ length: count }, (_, index) => (
        <div key={index} style={{ marginRight: index < count - 1 ? -overlap : undefined }}>
          <ScallopCircle diameter={diameter} />
        </div>
      ))}
    </div>
  )
}

function ScallopColumn({
  count,
  diameter,
  figmaNode,
  left,
  overlap,
  top,
  verticalSpan,
}: {
  count: number
  diameter: number
  figmaNode: string
  left: string
  overlap: number
  top: number
  verticalSpan: number
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -translate-x-1/2"
      data-figma-node={figmaNode}
      style={{ height: verticalSpan, left, top }}
    >
      <div className="flex flex-col items-center">
        {Array.from({ length: count }, (_, index) => (
          <div key={index} style={{ marginBottom: index < count - 1 ? -overlap : undefined }}>
            <ScallopCircle diameter={diameter} />
          </div>
        ))}
      </div>
    </div>
  )
}

/** Figma mobile side columns — horizontal row rotated -90deg inside a 48×636 anchor. */
function ScallopRotatedColumn({
  count,
  diameter,
  figmaNode,
  horizontalSpan,
  left,
  overlap,
  top,
  translateX,
}: {
  count: number
  diameter: number
  figmaNode: string
  horizontalSpan: number
  left: number | string
  overlap: number
  top: number
  translateX?: string
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute flex items-center justify-center"
      data-figma-node={figmaNode}
      style={{
        height: horizontalSpan,
        left,
        top,
        transform: translateX,
        width: diameter,
      }}
    >
      <div className="-rotate-90 flex-none">
        <div className="flex items-center" style={{ height: diameter, width: horizontalSpan }}>
          {Array.from({ length: count }, (_, index) => (
            <div key={index} style={{ marginRight: index < count - 1 ? -overlap : undefined }}>
              <ScallopCircle diameter={diameter} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Repeating primary-100 circles forming the postage-stamp border — Figma ellipse rows/columns. */
export function ScallopedPanelEars({ size }: ScallopedPanelEarsProps) {
  const isDesktop = size === 'desktop'

  if (!isDesktop) {
    const layout = SCALLOPED_PANEL_EAR_LAYOUT.mobile

    return (
      <>
        <ScallopRow
          count={layout.horizontalCount}
          diameter={layout.circle}
          figmaNode="7086:4438"
          overlap={layout.overlap}
          top={layout.top}
        />
        <ScallopRow
          count={layout.horizontalCount}
          diameter={layout.circle}
          figmaNode="7086:4407"
          overlap={layout.overlap}
          top={layout.bottom}
        />
        <ScallopRotatedColumn
          count={layout.verticalCount}
          diameter={layout.circle}
          figmaNode="7086:4427"
          horizontalSpan={layout.verticalSpan}
          left={layout.leftColumnLeft}
          overlap={layout.overlap}
          top={layout.top}
        />
        <ScallopRotatedColumn
          count={layout.verticalCount}
          diameter={layout.circle}
          figmaNode="7086:4416"
          horizontalSpan={layout.verticalSpan}
          left={layout.rightColumnLeft}
          overlap={layout.overlap}
          top={layout.top}
          translateX="translateX(-50%)"
        />
      </>
    )
  }

  const layout = SCALLOPED_PANEL_EAR_LAYOUT.desktop

  return (
    <>
      <ScallopRow
        count={layout.horizontalCount}
        diameter={layout.circle}
        figmaNode="6950:16661"
        overlap={layout.overlap}
        top={layout.top}
      />
      <ScallopRow
        count={layout.horizontalCount}
        diameter={layout.circle}
        figmaNode="6950:16651"
        overlap={layout.overlap}
        top={layout.bottom}
      />
      <ScallopColumn
        count={layout.verticalCount}
        diameter={layout.circle}
        figmaNode="6950:16683"
        left={`calc(50% - ${layout.sideCenterOffset}px)`}
        overlap={layout.overlap}
        top={layout.top}
        verticalSpan={layout.verticalSpan}
      />
      <ScallopColumn
        count={layout.verticalCount}
        diameter={layout.circle}
        figmaNode="6950:16671"
        left={`calc(50% + ${layout.sideCenterOffset}px)`}
        overlap={layout.overlap}
        top={layout.top}
        verticalSpan={layout.verticalSpan}
      />
    </>
  )
}

/**
 * Mobile right scallop column anchored to `Main content`, not the form shell.
 * Figma `7086:4416` — `left: calc(50% + 147px)`, `top: 281px` from main content origin.
 * Kept for optional main-content anchoring; form shell uses inline right column by default.
 */
export function ScallopedPanelMobileRightEar() {
  const layout = SCALLOPED_PANEL_EAR_LAYOUT.mobile

  return (
    <ScallopRotatedColumn
      count={layout.verticalCount}
      diameter={layout.circle}
      figmaNode="7086:4416"
      horizontalSpan={layout.verticalSpan}
      left={layout.rightColumnLeft}
      overlap={layout.overlap}
      top={281}
      translateX="translateX(-50%)"
    />
  )
}
