import type { BorderedFeatureItem } from '@/components/BorderedFeatureList'
import type { CenteredSplitCopyHeading } from '@/components/CenteredSplitCopy'
import type { SectionLink } from '@/utilities/resolveLinkHref'

export const OFFER_SERVICE_CARE_FIGMA_NODES = {
  container: {
    desktop: '6998:26815',
    mobile: '7102:9814',
    tablet: '7100:8148',
  },
  content: {
    desktop: '6998:26819',
    mobile: '7102:9818',
    tablet: '7100:8152',
  },
  copyColumn: {
    desktop: '6998:26854',
    mobile: '7102:9819',
    tablet: '7100:8154',
  },
  featureList: {
    desktop: '6998:26821',
    mobile: '7102:9820',
    tablet: '7100:8155',
  },
  image: {
    desktop: '6998:26820',
    mobile: '7102:9838',
    tablet: '7100:8153',
  },
  title: {
    body: {
      desktop: '6998:26836',
      mobile: '7102:9817',
      tablet: '7100:8151',
    },
    heading: {
      desktop: '6998:26834',
      mobile: '7102:9815',
      tablet: '7100:8149',
    },
  },
} as const

/** Figma export crop on the portrait asset inside the frame. */
export const OFFER_SERVICE_CARE_PORTRAIT_CROP_CLASS =
  'absolute left-0 top-[-2.87%] h-[122.29%] w-full max-w-none' as const

export type OfferServiceCareData = {
  cta: SectionLink
  features: readonly BorderedFeatureItem[]
  heading: CenteredSplitCopyHeading
  headingId?: string
  image: {
    alt: string
    src: string
  }
  intro: string
}

const sesjeKobieceFeatures: readonly BorderedFeatureItem[] = [
  {
    title: 'Pełne wsparcie stylizacyjne',
    description:
      'Nie musisz kupować nowej szafy. Przed sesją wspólnie przejrzymy Twoje ubrania, a ja podpowiem Ci, jakie kroje i kolory najlepiej pracują z Twoją sylwetką i światłem.',
    figmaNodes: {
      desktop: '6998:26822',
      mobile: '7102:9821',
      tablet: '7100:8156',
    },
  },
  {
    title: 'Zaufany zespół beauty',
    description:
      'Jeśli chcesz, polecę Ci sprawdzone makijażystki, które potrafią podkreślić urodę, nie tworząc efektu „maski”. Dzięki temu poczujesz się pewniej już od pierwszego kliknięcia migawki.',
    figmaNodes: {
      desktop: '6998:26826',
      mobile: '7102:9825',
      tablet: '7100:8160',
    },
  },
  {
    title: 'Twoje tempo, Twoje zasady',
    description:
      'Nie gonię z zegarkiem w ręku. Jeśli potrzebujesz chwili na oddech, poprawienie fryzury czy po prostu oswojenie się z moją obecnością – masz tę przestrzeń.',
    figmaNodes: {
      desktop: '6998:26830',
      mobile: '7102:9829',
      tablet: '7100:8164',
    },
  },
  {
    title: 'Bezpieczna atmosfera',
    description:
      'Moja wrażliwość pozwala mi wyczuć momenty, w których potrzebujesz wskazówki, a w których po prostu warto pozwolić Ci „być”',
    figmaNodes: {
      desktop: '6998:26838',
      mobile: '7102:9833',
      tablet: '7100:8168',
    },
  },
]

export const offerServiceCareSesjeKobieceDefaults: OfferServiceCareData = {
  heading: {
    emphasis: 'Wrażliwość',
    start: ', która widzi więcej',
  },
  intro:
    'Wiem, że przed obiektywem oddajesz mi cząstkę swojej prywatności. Dlatego w Oczki Fotografia dbam o to, byś czuła się zaopiekowana na każdym etapie:',
  features: sesjeKobieceFeatures,
  image: {
    alt: 'Fotografka Oczki Fotografia z aparatem w ręku',
    src: '/figma/offer-service-care-portrait.png',
  },
  cta: {
    label: 'Umów sesję',
    type: 'custom',
    url: '/kontakt',
  },
}

const reportazeSlubneFeatures: readonly BorderedFeatureItem[] = [
  {
    title: 'Wsparcie w harmonogramie i przygotowaniach',
    description:
      'Nie musicie się martwić o to, jak poukładać dzień ślubu. Pomagamy w zaplanowaniu idealnego harmonogramu – od przygotowań po oczepiny – tak, abyście mieli czas na oddech, radość i chwile tylko dla siebie',
    figmaNodes: {
      desktop: '7338:8289',
      tablet: '7356:11190',
      mobile: '7356:11172',
    },
  },
  {
    title: 'Dwa spojrzenia, zerowy stres (Praca w duecie)',
    description:
      'Asia dba o artystyczny detal i budowanie ciepłej atmosfery, a Łukasz czuwa nad dynamiką kadrów i kwestiami technicznymi. Zapominacie o obecności aparatów, bo jesteśmy jak przyjaciele, na których możecie polegać.',
    figmaNodes: {
      desktop: '7338:8293',
      tablet: '7356:11194',
      mobile: '7356:11176',
    },
  },
  {
    title: 'Wasze tempo, Wasze emocje',
    description:
      'Nie gonimy z zegarkiem w ręku i niczego nie reżyserujemy. Potrzebujecie chwili na łzy wzruszenia, poprawienie fryzury, przytulenie świadka czy szybką kawę? Masz na to pełną przestrzeń.',
    figmaNodes: {
      desktop: '7338:8297',
      tablet: '7356:11198',
      mobile: '7356:11180',
    },
  },
  {
    title: 'Dyskrecja i czuła obserwacja',
    description:
      'Nasza praca polega na wyczuciu momentu. Wiemy, kiedy dyskretnie zniknąć w tle, by chwycić spontaniczny uśmiech, a kiedy podpowiedzieć Wam coś miłego, byście poczuli się pewnie.',
    figmaNodes: {
      desktop: '7338:8301',
      tablet: '7356:11202',
      mobile: '7356:11184',
    },
  },
]

/** Reportaż `7338:8281` / `7338:8941` / `7338:9601` — same Care shell, wedding-duo copy. */
export const offerServiceCareReportazeSlubneDefaults: OfferServiceCareData = {
  heading: {
    emphasis: 'Wrażliwość',
    start: ' i doświadczenie, które widzą więcej',
  },
  intro: 'Wspólnie dbamy o Wasz komfort i spokój na każdym etapie.',
  features: reportazeSlubneFeatures,
  image: {
    alt: 'Asia w różowej marynarce z aparatem, uśmiechnięta podczas sesji',
    src: '/figma/offer-service-care-portrait-reportaze-slubne.png',
  },
  cta: {
    label: 'Umów sesję',
    type: 'custom',
    url: '/kontakt',
  },
}
