import { TAPED_NOTE_CARD_FIGMA_NODES, TAPED_NOTE_CARD_TAPE } from './constants'

/**
 * Masking-tape strip centred on the card top edge — Figma node `10`.
 *
 * Lives inside `TapedNoteCard` (relative card root), not the section shell.
 */
export function TapedNoteCardTape() {
  const desktop = TAPED_NOTE_CARD_TAPE.desktop
  const mobile = TAPED_NOTE_CARD_TAPE.mobile

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 md:block"
        data-figma-node={TAPED_NOTE_CARD_FIGMA_NODES.tape.desktop}
        data-name="10"
        style={{ height: desktop.height, top: -39, width: desktop.width }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="block size-full max-w-none"
          height={desktop.height}
          src={desktop.src}
          width={desktop.width}
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 md:hidden"
        data-figma-node={TAPED_NOTE_CARD_FIGMA_NODES.tape.mobile}
        data-name="10"
        style={{ height: mobile.height, top: -35, width: mobile.width }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="block size-full max-w-none"
          height={mobile.height}
          src={mobile.src}
          width={mobile.width}
        />
      </div>
    </>
  )
}
