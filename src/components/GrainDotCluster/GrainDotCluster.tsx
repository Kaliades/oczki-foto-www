import Image from 'next/image'

import { GRAIN_DOT_CLUSTER_LAYOUT, GRAIN_DOT_CLUSTER_SRC, type GrainDotClusterVariant } from './constants'

type GrainDotClusterProps = {
  variant: GrainDotClusterVariant
}

/**
 * Textured grain-dot decoration — Figma `Warstwa_1` (`6989:25675`).
 *
 * Outer bbox is anchored at the `Additional Image Container` origin (upper-left
 * bleed). Asset fills the metadata outer frame — see isolated node export.
 */
export function GrainDotCluster({ variant }: GrainDotClusterProps) {
  const layout = GRAIN_DOT_CLUSTER_LAYOUT[variant]

  return (
    <div
      aria-hidden="true"
      className="relative"
      data-figma-node={layout.figmaNode}
      data-name="Warstwa_1"
      style={{
        height: layout.outerHeight,
        width: layout.outerWidth,
      }}
    >
      <Image
        alt=""
        aria-hidden
        className="object-contain"
        fill
        sizes={`${Math.round(layout.outerWidth)}px`}
        src={GRAIN_DOT_CLUSTER_SRC}
      />
    </div>
  )
}
