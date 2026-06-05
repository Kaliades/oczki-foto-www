import { OVERLAP_PHOTO_COLLAGE_ASSETS } from './constants'

type VerticalScallopEarProps = {
  figmaNode?: string
  height: number
  left: number
  top: string
  width: number
}

type HorizontalScallopEarProps = {
  centerOffset: number
  figmaNode?: string
  height: number
  left: number
  side: 'bottom' | 'top'
  width: number
}

export type ScallopFrameEarProps =
  | ({ orientation: 'vertical' } & VerticalScallopEarProps)
  | ({ orientation: 'horizontal' } & HorizontalScallopEarProps)

/**
 * Scallop tab on the oval frame — Figma `6989:25173`.
 *
 * Side ears: `left` + `top: calc(50% + 0.5px)` + `-translate-y-1/2`.
 * Top/bottom ears: `left` + `top: calc(50% ± offset)` + `-translate-y-1/2` + `-rotate-90`.
 */
export function ScallopFrameEar(props: ScallopFrameEarProps) {
  const assets = OVERLAP_PHOTO_COLLAGE_ASSETS

  if (props.orientation === 'vertical') {
    const { figmaNode, height, left, top, width } = props

    return (
      <div
        className="pointer-events-none absolute z-0 -translate-y-1/2"
        data-figma-node={figmaNode}
        style={{ height, left, top, width }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="absolute inset-0 block size-full max-w-none"
          height={height}
          src={assets.scallopEarVertical}
          width={width}
        />
      </div>
    )
  }

  const { centerOffset, figmaNode, height, left, side, width } = props

  return (
    <div
      className="pointer-events-none absolute z-0 flex -translate-y-1/2 items-center justify-center"
      data-figma-node={figmaNode}
      style={{
        height,
        left,
        top: side === 'top' ? `calc(50% - ${centerOffset}px)` : `calc(50% + ${centerOffset}px)`,
        width,
      }}
    >
      <div className="-rotate-90 flex-none">
        <div className="relative" style={{ height: width, width: height }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="absolute inset-0 block size-full max-w-none"
            height={width}
            src={assets.scallopEarVertical}
            width={height}
          />
        </div>
      </div>
    </div>
  )
}
