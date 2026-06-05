import type { ApproachBlockItem } from '@/components/ApproachBlocksRail'
import type { LeftAlignedSplitCopyHeading } from '@/components/LeftAlignedSplitCopy'

export const OFFER_SERVICE_APPROACH_FIGMA_NODES = {
  container: {
    desktop: '6986:20139',
    tablet: '7100:7847',
    mobile: '7102:9518',
  },
  sectionIntro: {
    desktop: '6986:20141',
    tablet: '7100:7848',
    mobile: '7102:9519',
  },
  introCopy: {
    desktop: '6986:20143',
    tablet: '7100:7849',
    mobile: '7102:9520',
  },
  blocksRail: {
    desktop: '6986:20148',
    tablet: '7100:7854',
    mobile: '7102:9525',
  },
  portraitImage: {
    desktop: '6999:26928',
    tablet: '7100:7867',
    mobile: '7102:9538',
  },
} as const

export type OfferServiceApproachData = {
  blocks: readonly [ApproachBlockItem, ApproachBlockItem, ApproachBlockItem]
  heading: LeftAlignedSplitCopyHeading
  introParagraphs: readonly [string, string]
  portrait: {
    alt: string
    src: string
  }
}

export const offerServiceApproachSesjeKobieceDefaults: OfferServiceApproachData = {
  heading: {
    start: 'Obiektyw ',
    emphasis: 'nie gryzie',
    end: ', a ja mam na niego (i na stres) swoje sposoby',
  },
  introParagraphs: [
    'Wiele kobiet zwleka z decyzją o sesji, czekając na „odpowiedni moment” – aż schudną, aż nauczą się pozować, aż poczują się pewniej. Prawda jest taka, że ten moment jest teraz.',
    'Oto jak dbam o Twoje samopoczucie i dlaczego moje sesje są inne niż wszystkie:',
  ],
  blocks: [
    {
      title: 'Ruch zamiast sztywnych póz',
      description:
        'Słyszę często: „Nie umiem pozować”. Nie musisz! Zamiast kazać Ci zastygać w nienaturalnych pozycjach, zachęcam Cię do ruchu. Pokazuję proste gesty, pozwalam Ci się wiercić i poprawiać włosy – to wtedy powstają najpiękniejsze kadry.',
      layout: 'bookend',
      figmaNode: '6986:20149',
    },
    {
      title: 'Towarzyszenie zamiast komenderowania',
      description:
        'Nie jestem fotografem, który wydaje rozkazy. Jestem obok, prowadzę Cię za rękę i podpowiadam. Podczas sesji dużo rozmawiamy i śmiejemy się – moje legendarne suchary są w cenie każdego pakietu!',
      layout: 'stacked',
      figmaNode: '6986:20152',
    },
    {
      title: 'Naturalność zamiast wyreżyserowania',
      description:
        'Skupiam się na łapaniu prawdziwych momentów, a nie sztucznych scen. Chcę, żebyś na zdjęciach rozpoznała samą siebie. Akceptacja Twojej natury jest dla mnie ważniejsza niż perfekcyjny retusz w Photoshopie.',
      layout: 'stacked',
      stretchContent: true,
      figmaNode: '6986:20155',
    },
  ],
  portrait: {
    src: '/figma/offer-service-approach-portrait.png',
    alt: 'Uśmiechnięta kobieta w kwiatowej marynarce podczas sesji zdjęciowej',
  },
}
