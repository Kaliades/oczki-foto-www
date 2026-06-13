import type { LeftAlignedIntroCopyHeading } from '@/components/LeftAlignedIntroCopy'
import type { PrimaryBorderedPanelItem } from '@/components/PrimaryBorderedPanelList'

import type { DualPerspectiveSectionData } from './DualPerspectiveSection'

export const DUAL_PERSPECTIVE_SECTION_FIGMA_NODES = {
  desktop: '6994:25998',
  tablet: '7092:4648',
  mobile: '7093:6033',
  content: {
    desktop: '6994:26051',
    tablet: '7092:4651',
    mobile: '7093:6036',
  },
  intro: {
    section: {
      desktop: '6994:26052',
      tablet: '7092:4652',
      mobile: '7093:6037',
    },
    heading: {
      desktop: '6994:26053',
      tablet: '7092:4653',
      mobile: '7093:6038',
    },
    body: {
      desktop: '6994:26055',
      tablet: '7092:4655',
      mobile: '7093:6040',
    },
  },
  profile: {
    desktop: '6994:26097',
    tablet: '7092:4656',
    mobile: '7093:6041',
    subtitle: {
      desktop: '6994:26096',
      tablet: '7092:4657',
      mobile: '7093:6042',
    },
    list: {
      desktop: '6994:26068',
      tablet: '7092:4658',
      mobile: '7093:6043',
    },
  },
  portrait: {
    container: {
      desktop: '6994:26050',
      tablet: '7092:5312',
      mobile: '7093:6034',
    },
    image: {
      desktop: '6994:26044',
      tablet: '7092:5313',
      mobile: '7093:6035',
    },
  },
} as const

export const dualPerspectiveDefaults: DualPerspectiveSectionData = {
  heading: {
    emphasis: 'Podwójne spojrzenie',
    end: ' na Waszą historię',
  },
  intro:
    'Choć na sesjach kobiecych spotykamy się sam na sam, podczas reportaży ślubnych działam w duecie z Łukaszem. Dlaczego? Bo wierzymy, że Wasz dzień zasługuje na to, by widzieć go z dwóch perspektyw jednocześnie. Tam, gdzie ja szukam czułego gestu i łzy wzruszenia, Łukasz wyłapuje szeroki kadr i szaleństwo na parkiecie.',
  portrait: {
    alt: 'Łukasz — drugi fotograf ślubny Oczki Fotografia',
    src: '/figma/dual-perspective-portrait-b.png',
  },
  profileHeading: 'Poznajcie Łukasza (Oczko) – Drugi fotograf ślubny',
  profileItems: [
    {
      title: 'Geny i pasja',
      description:
        'Optymizm to jego drugie imię, a fotografia? Ma ją w genach. Jego dziadek wywoływał zdjęcia w łazience, a on sam pierwszy aparat kupił za oszczędności już w gimnazjum.',
      figmaNodes: {
        desktop: '6994:26069',
        tablet: '7092:4659',
        mobile: '7093:6044',
      },
    },
    {
      title: 'Nasza historia',
      description:
        'Na studiach przypomniałam mu o tej pasji, pożyczając moją lustrzankę. Po dwóch latach kupił własną, a 3 lata później... zostałam jego żoną. Dziś fotografujemy w duecie by dać Wam najpiękniejszą pamiątkę',
      figmaNodes: {
        desktop: '6994:26086',
        tablet: '7092:4663',
        mobile: '7093:6048',
      },
    },
    {
      title: 'Poza klatką',
      description:
        'Gadżeciarz i fan ultramaratonów. Jeśli nie ma go w krakowskim studiu, prawdopodobnie zaszył się w Bieszczadach albo biega w górach. Interesuje się finansami i produktywnością, co sprawia, że w naszym duecie to on dba o to, by każdy plan był dopięty na ostatni guzik.',
      figmaNodes: {
        desktop: '6994:26091',
        tablet: '7092:4667',
        mobile: '7093:6052',
      },
    },
  ],
}
