import {
  BOTANICAL_SIDE_DECOR_ASSETS,
  BOTANICAL_SIDE_DECOR_FIGMA_NODES,
  BOTANICAL_SIDE_DECOR_LAYOUT,
  type BotanicalSideDecorSide,
  type BotanicalSideDecorVariant,
} from './constants'

type BotanicalSideDecorProps = {
  side: BotanicalSideDecorSide
  variant: BotanicalSideDecorVariant
}

/**
 * Single botanical side cluster — Figma `OBJECTS` SVG (6978:19669 / 6978:19811).
 *
 * Parent must be an `absolute inset-0 overflow-visible` layer on the fixed-size
 * `Card Container`. Do not put `overflow-hidden` on ancestors of the decor.
 */
export function BotanicalSideDecor({ side, variant }: BotanicalSideDecorProps) {
  const layout = BOTANICAL_SIDE_DECOR_LAYOUT[variant][side]
  const src = BOTANICAL_SIDE_DECOR_ASSETS[side]
  const figmaNode = BOTANICAL_SIDE_DECOR_FIGMA_NODES[variant][side]

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      aria-hidden
      className="pointer-events-none absolute block max-w-none"
      data-figma-node={figmaNode}
      data-name="OBJECTS"
      height={layout.height}
      src={src}
      style={{ left: layout.left, top: layout.top }}
      width={layout.width}
    />
  )
}
