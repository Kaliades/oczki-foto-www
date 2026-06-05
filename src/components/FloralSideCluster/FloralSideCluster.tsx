import type { FloralSideClusterLayout } from './constants'

type FloralSideClusterProps = FloralSideClusterLayout

/**
 * Single absolute floral cluster — Figma `OBJECTS` SVG export.
 *
 * Parent must be `relative overflow-visible`. Use `fullHeight` to span the
 * section vertically; width stays at the intrinsic SVG export size.
 */
export function FloralSideCluster({
  bottom,
  figmaNode,
  flipY = false,
  fullHeight = false,
  height,
  left,
  right,
  src,
  top,
  width,
}: FloralSideClusterProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute"
      data-figma-node={figmaNode}
      data-name="OBJECTS"
      style={
        fullHeight
          ? { bottom: 0, left, right, top: 0, width }
          : { bottom, height, left, right, top, width }
      }
    >
      <div className={flipY ? 'size-full -scale-y-100' : 'size-full'}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className={
            fullHeight
              ? 'block h-full w-full max-w-none object-fill'
              : 'block size-full max-w-none'
          }
          src={src}
        />
      </div>
    </div>
  )
}
