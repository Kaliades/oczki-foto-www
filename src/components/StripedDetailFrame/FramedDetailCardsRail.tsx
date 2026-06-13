import { FramedDetailCard } from './FramedDetailCard'
import {
  FRAMED_DETAIL_CARDS_RAIL_DESKTOP_WIDTHS,
  type StripedDetailFrameVariant,
} from './constants'

export type FramedDetailCardItem = {
  title: string
  description: string
  figmaNodes?: {
    desktop?: string
    tablet?: string
    mobile?: string
  }
}

type FramedDetailCardsRailProps = {
  containerFigmaNode?: string
  desktopCardWidths?: readonly string[]
  items: readonly FramedDetailCardItem[]
  /** Per-card content layout — e.g. expertise pins ornament on all cards except index 1. */
  resolveStretchContent?: (index: number) => boolean
  variant?: StripedDetailFrameVariant
}

/**
 * Responsive rail of sage-mat detail cards — same breakpoint contract as
 * {@link BorderedPrinciplesRail}: column below 1366 px, full-width row at desktop.
 *
 * Figma `Card Container` (`7001:2294`): row gap 8 px, all cards share y=0 / h=219.
 */
export function FramedDetailCardsRail({
  containerFigmaNode,
  desktopCardWidths = FRAMED_DETAIL_CARDS_RAIL_DESKTOP_WIDTHS,
  items,
  resolveStretchContent = (index) => index > 0,
  variant = 'caseStudy',
}: FramedDetailCardsRailProps) {
  const lastIndex = items.length - 1

  return (
    <div
      className="flex w-full min-w-0 flex-col items-stretch gap-2 min-[1366px]:flex-row min-[1366px]:items-stretch"
      data-figma-node={containerFigmaNode}
      data-name="Card Container"
    >
      {items.map((item, index) => {
        const widthClass = desktopCardWidths[index] ?? 'min-[1366px]:min-w-0 min-[1366px]:flex-1'
        const stretchContent = resolveStretchContent(index)
        const isFlexColumn = index === lastIndex

        return (
          <div
            className={[
              'w-full min-w-0 min-[1366px]:self-stretch',
              isFlexColumn ? 'min-[1366px]:min-w-0 min-[1366px]:flex-1' : 'min-[1366px]:shrink-0',
              widthClass,
            ].join(' ')}
            key={item.title}
          >
            <FramedDetailCard
              description={item.description}
              figmaNode={item.figmaNodes?.desktop}
              stretchContent={stretchContent}
              title={item.title}
              variant={variant}
            />
          </div>
        )
      })}
    </div>
  )
}
