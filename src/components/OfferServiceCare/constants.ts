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
