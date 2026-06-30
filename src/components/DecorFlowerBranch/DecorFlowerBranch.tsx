import type { DecorFlowerBranchVariant } from './constants'
import { DECOR_FLOWER_BRANCH_LAYOUT } from './constants'

type DecorFlowerBranchProps = {
  variant: DecorFlowerBranchVariant
}

/**
 * Floral branch + berry dots — Figma `6952:19970`.
 * Placement wrapper (post-rotation bbox) + centered asset rotation — same pattern as `DecorDotsField`.
 */
export function DecorFlowerBranch({ variant }: DecorFlowerBranchProps) {
  const layout = DECOR_FLOWER_BRANCH_LAYOUT[variant]

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute flex items-center justify-center overflow-visible"
      data-figma-node={layout.figmaNode}
      style={{
        height: layout.height,
        left: layout.left,
        top: layout.top,
        width: layout.width,
      }}
    >
      <div
        className="flex-none"
        style={{ transform: `rotate(${layout.rotateDeg}deg)` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="max-w-none select-none"
          height={layout.assetHeight}
          src={layout.asset}
          width={layout.assetWidth}
        />
      </div>
    </div>
  )
}
