import type { ReactNode } from 'react'

import {
  TAPED_NOTE_CARD_FIGMA_NODES,
  TAPED_NOTE_CARD_SHADOW,
} from './constants'
import { TapedNoteCardTape } from './TapedNoteCardTape'

type TapedNoteCardProps = {
  body: string
  cta: ReactNode
  heading: string
  headingId: string
}

/**
 * Cream “taped note” card — Figma `Container`.
 *
 * <div Container> — primary/100, drop shadow, relative
 * ├── <TapedNoteCardTape> — absolute, centred on top edge
 * ├── <div Message container> — gap 16 desktop/tablet, 10 mobile
 * │   ├── <h2 Main message> — header/m (32 px) all breakpoints
 * │   └── <div Subtitle container> — px-36 tablet+, body/l 16 px
 * └── {cta} — Button slot
 */
export function TapedNoteCard({ body, cta, heading, headingId }: TapedNoteCardProps) {
  return (
    <div
      className={`relative z-10 flex w-full shrink-0 flex-col items-center gap-7 bg-[var(--oczki-primary-100)] px-4 pb-6 pt-7 md:gap-9 md:p-16 md:pb-16 md:pt-16 lg:mx-auto lg:w-[706px] ${TAPED_NOTE_CARD_SHADOW}`}
      data-figma-node={TAPED_NOTE_CARD_FIGMA_NODES.container.desktop}
      data-name="Container"
    >
      <TapedNoteCardTape />

      <div
        className="flex w-full shrink-0 flex-col items-start gap-2.5 md:gap-4"
        data-figma-node={TAPED_NOTE_CARD_FIGMA_NODES.heading.desktop}
        data-name="Message container"
      >
        <h2
          className="w-full text-center text-[32px] font-normal leading-[1.04] tracking-[-0.32px] text-[var(--oczki-primary-800)] [font-family:var(--font-oczki-display)] [font-feature-settings:'lnum'_1,'pnum'_1] [word-break:break-word]"
          id={headingId}
        >
          {heading}
        </h2>

        <div
          className="flex w-full shrink-0 flex-col items-center md:px-9"
          data-figma-node={TAPED_NOTE_CARD_FIGMA_NODES.body.desktop}
          data-name="Subtitle container"
        >
          <p className="oczki-body-l w-full shrink-0 text-center tracking-[-0.24px] text-[var(--oczki-primary-700)] [word-break:break-word]">
            {body}
          </p>
        </div>
      </div>

      <div
        className="w-full shrink-0 md:w-auto"
        data-figma-node={TAPED_NOTE_CARD_FIGMA_NODES.button.desktop}
        data-name="Button"
      >
        {cta}
      </div>
    </div>
  )
}
