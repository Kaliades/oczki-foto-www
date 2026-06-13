import type { CenteredSplitCopyHeading } from '@/components/CenteredSplitCopy'
import type { FramedDetailCardItem } from '@/components/StripedDetailFrame'

export const EXPERTISE_SECTION_FIGMA_NODES = {
  desktop: '6972:15565',
  tablet: '7092:4524',
  mobile: '7093:5889',
  heading: {
    desktop: '6972:15567',
    tablet: '7092:4526',
    mobile: '7093:5891',
  },
  cardContainer: {
    desktop: '7001:2294',
    tablet: '7092:4529',
    mobile: '7093:5894',
  },
} as const

export type ExpertiseSectionData = {
  heading: CenteredSplitCopyHeading
  intro: string
  cards: readonly FramedDetailCardItem[]
}

export const expertiseDefaults: ExpertiseSectionData = {
  heading: {
    start: 'Wiedza, która zamienia się w ',
    emphasis: 'Twój spokój',
  },
  intro:
    'Choć na sesji stawiamy na luz, po mojej stronie stoi pełen profesjonalizm. Jako doświadczona fotografka, dbam o to, byś nie musiała martwić się o technikę.',
  cards: [
    {
      title: 'Opanowanie światła',
      description:
        'Niezależnie czy pracujemy w studio, czy w plenerze, dbam o to, by światło podkreślało Twoją urodę.',
      figmaNodes: {
        desktop: '7001:2295',
        tablet: '7092:4530',
        mobile: '7093:5895',
      },
    },
    {
      title: 'Lata praktyki przy sesjach w Krakowie',
      description:
        'Znam tutejsze światło i lokalizacje. Wiem, jak sprawić, by otoczenie pracowało na Twoją korzyść.',
      figmaNodes: {
        desktop: '7001:2320',
        tablet: '7092:4555',
        mobile: '7093:5925',
      },
    },
    {
      title: 'Staranna selekcja',
      description:
        'Przeglądam setki kadrów, by wybrać te, na których wyglądasz i czujesz się najlepiej.',
      figmaNodes: {
        desktop: '7001:2345',
        tablet: '7092:4580',
        mobile: '7093:5955',
      },
    },
    {
      title: 'Czuła obróbka',
      description:
        'Moje zdjęcia mają ciepłą, naturalną tonację, która oddaje klimat spotkania i nie wychodzi z mody po jednym sezonie.',
      figmaNodes: {
        desktop: '7001:2370',
        tablet: '7092:4605',
        mobile: '7093:5985',
      },
    },
  ],
}

/** Card 2 keeps a fixed gap to the ornament on desktop — Figma `7001:2340`. */
export function resolveExpertiseCardStretchContent(index: number): boolean {
  return index !== 1
}
