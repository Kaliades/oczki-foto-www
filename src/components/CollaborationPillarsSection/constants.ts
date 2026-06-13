import type { CollaborationPillarsSectionData } from './CollaborationPillarsSection'

export const COLLABORATION_PILLARS_SECTION_FIGMA_NODES = {
  desktop: '6994:26165',
  tablet: '7092:4671',
  mobile: '7093:6056',
  intro: {
    section: {
      desktop: '6972:15623',
      tablet: '7092:4672',
      mobile: '7093:6057',
    },
    heading: {
      desktop: '6972:15624',
      tablet: '7092:4673',
      mobile: '7093:6058',
    },
    body: {
      desktop: '6972:15626',
      tablet: '7092:4674',
      mobile: '7093:6059',
    },
  },
  rail: {
    desktop: '6994:26175',
    tablet: '7092:4675',
    mobile: '7093:6060',
    ribbon: {
      desktop: '6994:26324',
      tablet: '7092:4697',
      mobile: '7093:6075',
    },
  },
} as const

export const collaborationPillarsDefaults: CollaborationPillarsSectionData = {
  heading: {
    emphasis: 'wspólnie działamy',
    end: ' nad Waszą historią?',
    start: 'Jak ',
  },
  intro:
    'W duecie stajemy się Waszymi „cieniami” – jesteśmy wszędzie tam, gdzie dzieje się coś ważnego, ale pozostajemy niemal niewidoczni. Nasza wspólna filozofia opiera się na trzech filarach:',
  pillars: [
    {
      title: 'Opowieści pisane światłem',
      description:
        'Nie ingerujemy w bieg wydarzeń. Pozwalamy emocjom płynąć naturalnie, łapiąc te niepozowane momenty – od drżenia dłoni podczas przysięgi, po spontaniczny wybuch śmiechu rodziców.',
      variantIndex: 0,
      figmaNodes: {
        desktop: '6994:26211',
        tablet: '7092:4676',
        mobile: '7093:6061',
      },
    },
    {
      title: 'Kompozycja i technika',
      description:
        'Łączymy artystyczną wrażliwość z techniczną perfekcją. Wykorzystujemy naturalne światło, by wydobyć magię miejsc, które wybraliście na swój ślub.',
      variantIndex: 1,
      figmaNodes: {
        desktop: '6994:26303',
        tablet: '7092:4683',
        mobile: '7093:6068',
      },
    },
    {
      title: 'Wasza historia, nasze kadry',
      description:
        'Pamiętajcie, że to Wy jesteście głównymi bohaterami. My jesteśmy opowiadaczami, którzy dbają o to, byście po latach, patrząc na zdjęcia, poczuli ten sam zapach powietrza i te same dreszcze emocji.',
      variantIndex: 2,
      figmaNodes: {
        desktop: '6994:26309',
        tablet: '7092:4690',
        mobile: '7093:6076',
      },
    },
  ],
}
