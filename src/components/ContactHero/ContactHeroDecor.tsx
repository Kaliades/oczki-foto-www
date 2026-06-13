import { ContactHeroBotanicalGraphic } from './ContactHeroBotanicalGraphic'
import { CONTACT_HERO_BOTANICAL, CONTACT_HERO_FIGMA_NODES } from './constants'

/**
 * Bottom-left botanical line art — Figma `OBJECTS` (`7001:1721` / `7086:4116`).
 * Backmost layer in `Main content` (under copy and form).
 */
export function ContactHeroDecor() {
  const desktop = CONTACT_HERO_BOTANICAL.desktop
  const mobile = CONTACT_HERO_BOTANICAL.mobile

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute z-0 flex items-center justify-center lg:hidden"
        data-figma-node={CONTACT_HERO_FIGMA_NODES.botanical.mobile}
        style={{
          height: mobile.shell.height,
          left: mobile.shell.left,
          top: mobile.shell.top,
          width: mobile.shell.width,
        }}
      >
        <div className="rotate-[30deg]">
          <div
            className="relative overflow-hidden"
            style={{ height: mobile.clip.height, width: mobile.clip.width }}
          >
            <ContactHeroBotanicalGraphic
              height={mobile.clip.height}
              width={mobile.clip.width}
            />
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute z-0 hidden lg:block"
        data-figma-node={CONTACT_HERO_FIGMA_NODES.botanical.desktop}
        style={{
          height: desktop.height,
          left: desktop.left,
          top: desktop.top,
          width: desktop.width,
        }}
      >
        <ContactHeroBotanicalGraphic height={desktop.height} width={desktop.width} />
      </div>
    </>
  )
}
