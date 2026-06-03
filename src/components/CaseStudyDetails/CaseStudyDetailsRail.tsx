import { FramedDetailCard } from '@/components/StripedDetailFrame'

import {
  CASE_STUDY_DETAILS_DESKTOP_CARD_WIDTHS,
  CASE_STUDY_DETAILS_FIGMA_NODES,
  type CaseStudyDetailItem,
} from './constants'

type CaseStudyDetailsRailProps = {
  items: readonly CaseStudyDetailItem[]
}

/**
 * Figma `Section Container` — 4 detail cards.
 * Mobile / tablet: full-width stack, 8 px gap.
 * Desktop: horizontal row, 8 px gap, mixed fixed widths + flex on last card.
 */
export function CaseStudyDetailsRail({ items }: CaseStudyDetailsRailProps) {
  return (
    <div
      className="flex w-full flex-col items-stretch gap-2 lg:flex-row lg:items-start lg:justify-end"
      data-figma-node={CASE_STUDY_DETAILS_FIGMA_NODES.sectionContainer.desktop}
      data-name="Section Container"
    >
      {items.map((item, index) => {
        const widthClass = CASE_STUDY_DETAILS_DESKTOP_CARD_WIDTHS[index] ?? 'lg:flex-1'
        const stretchContent = index > 0

        return (
          <div
            className={['w-full shrink-0', stretchContent ? 'lg:self-stretch' : '', widthClass].join(' ')}
            key={item.title}
          >
            <FramedDetailCard
              description={item.description}
              figmaNode={item.figmaNodes?.desktop}
              stretchContent={stretchContent}
              title={item.title}
            />
          </div>
        )
      })}
    </div>
  )
}
