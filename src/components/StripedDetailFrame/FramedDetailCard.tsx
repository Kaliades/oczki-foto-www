import type { ReactNode } from 'react'

import { DetailCardOrnament } from './DetailCardOrnament'
import { STRIPED_DETAIL_FRAME_LAYOUT } from './constants'
import { VerticalStripeBacksplash } from './VerticalStripeBacksplash'

export type FramedDetailCardProps = {
  title: string
  description: string
  /** When true, copy and ornament pin to opposite ends (Figma `justify-between`). */
  stretchContent?: boolean
  figmaNode?: string
  children?: ReactNode
}

/**
 * Sage mat + paskowane tło + kremowy panel z obrysem.
 *
 * Figma `Section` (`6972:18978`):
 *   <article> — `secondary/200`, padding 6 px, overflow clip
 *     ├── Section Header — paski (absolute, wycentrowane, 872×187)
 *     └── Content Container — `primary/100`, border `secondary/400`, inset 6 px
 */
export function FramedDetailCard({
  title,
  description,
  stretchContent = false,
  figmaNode,
  children,
}: FramedDetailCardProps) {
  const { framePaddingPx } = STRIPED_DETAIL_FRAME_LAYOUT

  return (
    <article
      className="relative flex flex-col overflow-hidden bg-[var(--oczki-secondary-200)] lg:min-h-[187px]"
      data-figma-node={figmaNode}
      data-name="Section"
      style={{ padding: framePaddingPx }}
    >
      <VerticalStripeBacksplash />

      <div
        className={[
          'relative z-10 flex w-full flex-col items-end border border-solid border-[var(--oczki-secondary-400)] bg-[var(--oczki-primary-100)]',
          stretchContent
            ? 'min-h-[148px] flex-1 justify-between md:min-h-[127px] lg:min-h-[175px]'
            : 'gap-2.5 lg:flex-1 lg:min-h-[175px]',
        ].join(' ')}
        data-name="Content Container"
        style={{
          paddingLeft: STRIPED_DETAIL_FRAME_LAYOUT.contentPaddingX,
          paddingRight: STRIPED_DETAIL_FRAME_LAYOUT.contentPaddingX,
          paddingTop: STRIPED_DETAIL_FRAME_LAYOUT.contentPaddingTop,
          paddingBottom: STRIPED_DETAIL_FRAME_LAYOUT.contentPaddingBottom,
        }}
      >
        <div
          className="flex w-full flex-col leading-[1.48]"
          data-name="Content Header"
          style={{ gap: STRIPED_DETAIL_FRAME_LAYOUT.copyGapPx }}
        >
          <h3 className="oczki-body-xl tracking-[-0.3px] text-[var(--oczki-primary-900)]">{title}</h3>
          <p className="oczki-body-l tracking-[-0.24px] text-[var(--oczki-primary-800)]">{description}</p>
        </div>
        {children ?? <DetailCardOrnament />}
      </div>
    </article>
  )
}
