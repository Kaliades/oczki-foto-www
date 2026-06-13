import { CONTACT_HERO_BOTANICAL_LAYERS } from './constants'

type ContactHeroBotanicalGraphicProps = {
  height: number
  width: number
}

/** Layered botanical `OBJECTS` — Figma `7001:1721`, one SVG asset per group. */
export function ContactHeroBotanicalGraphic({ height, width }: ContactHeroBotanicalGraphicProps) {
  return (
    <div
      className="relative"
      data-name="OBJECTS"
      style={{ height, width }}
    >
      {CONTACT_HERO_BOTANICAL_LAYERS.map((layer) => (
        <div
          key={layer.figmaNode}
          className="absolute"
          data-figma-node={layer.figmaNode}
          style={{
            bottom: `${layer.inset.bottom}%`,
            left: `${layer.inset.left}%`,
            right: `${layer.inset.right}%`,
            top: `${layer.inset.top}%`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={layer.src} />
        </div>
      ))}
    </div>
  )
}
