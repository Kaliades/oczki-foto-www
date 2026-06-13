import { FramedDetailCardsRail } from '@/components/StripedDetailFrame'

import { CASE_STUDY_DETAILS_FIGMA_NODES, type CaseStudyDetailItem } from './constants'

type CaseStudyDetailsRailProps = {
  items: readonly CaseStudyDetailItem[]
}

export function CaseStudyDetailsRail({ items }: CaseStudyDetailsRailProps) {
  return (
    <FramedDetailCardsRail
      containerFigmaNode={CASE_STUDY_DETAILS_FIGMA_NODES.sectionContainer.desktop}
      items={items}
      resolveStretchContent={(index) => index > 0}
      variant="caseStudy"
    />
  )
}
