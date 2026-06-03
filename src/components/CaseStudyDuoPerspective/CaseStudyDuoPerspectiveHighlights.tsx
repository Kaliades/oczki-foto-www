import { TertiaryBorderedPanel } from '@/components/TertiaryBorderedPanel'

import { CASE_STUDY_DUO_PERSPECTIVE_FIGMA_NODES, type CaseStudyDuoHighlight } from './constants'

type CaseStudyDuoPerspectiveHighlightsProps = {
  items: readonly CaseStudyDuoHighlight[]
}

/**
 * Figma `Section` — stacked `TertiaryBorderedPanel` cards, 8 px gap, end-aligned.
 */
export function CaseStudyDuoPerspectiveHighlights({ items }: CaseStudyDuoPerspectiveHighlightsProps) {
  return (
    <div
      className="flex w-full flex-col items-end gap-2"
      data-figma-node={CASE_STUDY_DUO_PERSPECTIVE_FIGMA_NODES.highlights.desktop}
      data-name="Section"
    >
      {items.map((item) => (
        <TertiaryBorderedPanel
          description={item.description}
          figmaNode={item.figmaNodes?.desktop}
          key={item.title}
          title={item.title}
        />
      ))}
    </div>
  )
}
