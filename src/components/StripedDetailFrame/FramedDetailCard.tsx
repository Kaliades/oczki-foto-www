import type { ReactNode } from 'react'

import { DetailCardOrnament } from './DetailCardOrnament'
import {
  STRIPED_DETAIL_FRAME_LAYOUT,
  STRIPED_DETAIL_FRAME_SHARED,
  type StripedDetailFrameVariant,
} from './constants'
import { VerticalStripeBacksplash } from './VerticalStripeBacksplash'

export type FramedDetailCardProps = {
  title: string
  description: string
  /** When true, copy and ornament pin to opposite ends (Figma `justify-between`). */
  stretchContent?: boolean
  figmaNode?: string
  variant?: StripedDetailFrameVariant
  children?: ReactNode
}

function resolveContentPanelClassName(
  stretchContent: boolean,
  variant: StripedDetailFrameVariant,
): string {
  if (variant === 'expertise') {
    if (stretchContent) {
      return 'gap-3 md:min-h-[153px] min-[1366px]:min-h-[207px] min-[1366px]:flex-1 min-[1366px]:justify-between'
    }

    return 'gap-3 md:min-h-[153px] min-[1366px]:min-h-[207px] min-[1366px]:flex-1'
  }

  if (stretchContent) {
    return 'min-h-[148px] flex-1 justify-between md:min-h-[127px] min-[1366px]:min-h-[175px]'
  }

  return 'gap-2.5 min-[1366px]:flex-1 min-[1366px]:min-h-[175px]'
}

function resolveArticleClassName(variant: StripedDetailFrameVariant): string {
  if (variant === 'expertise') {
    return 'md:min-h-[165px] min-[1366px]:h-full min-[1366px]:min-h-[219px]'
  }

  return 'min-[1366px]:h-full min-[1366px]:min-h-[187px]'
}

/**
 * Sage mat + paskowane tło + kremowy panel z obrysem.
 *
 * Figma `Card` / `Section`:
 *   <article> — `secondary/200`, padding 6 px, overflow clip
 *     ├── Card Background — paski (absolute, wycentrowane)
 *     └── Text Container — `primary/100`, border `secondary/400`, inset 6 px
 */
export function FramedDetailCard({
  title,
  description,
  stretchContent = false,
  figmaNode,
  variant = 'caseStudy',
  children,
}: FramedDetailCardProps) {
  const layout = variant === 'caseStudy' ? STRIPED_DETAIL_FRAME_LAYOUT : STRIPED_DETAIL_FRAME_SHARED

  return (
    <article
      className={[
        'relative flex flex-col overflow-hidden bg-[var(--oczki-secondary-200)]',
        resolveArticleClassName(variant),
      ].join(' ')}
      data-figma-node={figmaNode}
      data-name="Card"
      style={{ padding: layout.framePaddingPx }}
    >
      <VerticalStripeBacksplash variant={variant} />

      <div
        className={[
          'relative z-10 flex w-full flex-col items-end border border-solid border-[var(--oczki-secondary-400)] bg-[var(--oczki-primary-100)]',
          resolveContentPanelClassName(stretchContent, variant),
        ].join(' ')}
        data-name="Text Container"
        style={{
          paddingLeft: layout.contentPaddingX,
          paddingRight: layout.contentPaddingX,
          paddingTop: layout.contentPaddingTop,
          paddingBottom: layout.contentPaddingBottom,
        }}
      >
        <div
          className="flex w-full flex-col leading-[1.48]"
          data-name="Text Block"
          style={{ gap: layout.copyGapPx }}
        >
          <h3 className="oczki-body-xl tracking-[-0.3px] text-[var(--oczki-primary-900)]">{title}</h3>
          <p className="oczki-body-l tracking-[-0.24px] text-[var(--oczki-primary-800)]">{description}</p>
        </div>
        {children ?? <DetailCardOrnament />}
      </div>
    </article>
  )
}
