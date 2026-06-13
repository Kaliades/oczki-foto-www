import { CONTACT_HERO_ASSETS } from './constants'

/**
 * Paper grain overlay — Figma `brown-paper-texture-background 1` (`6994:25773`).
 * Full section bleed; `mix-blend-color-burn` from Figma. Height tracks the section
 * so content taller than the Figma artboard (tablet scallops) never leaves a bare strip.
 */
export function ContactHeroPaperTexture() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      data-figma-node="6994:25773"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        className="absolute inset-0 size-full max-w-none object-cover object-left-top mix-blend-color-burn"
        src={CONTACT_HERO_ASSETS.paperTexture}
      />
    </div>
  )
}
