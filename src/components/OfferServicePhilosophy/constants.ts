import type { CenteredSplitCopyHeading } from '@/components/CenteredSplitCopy'
import type { BorderedPrincipleItem } from '@/components/BorderedPrinciplesRail'

export const OFFER_SERVICE_PHILOSOPHY_FIGMA_NODES = {
  desktopFrame: '7001:2443',
  tabletFrame: '7092:4348',
  mobileFrame: '7093:5709',
} as const

export type OfferServicePhilosophyData = {
  heading: CenteredSplitCopyHeading
  intro: string
  principles: readonly BorderedPrincipleItem[]
}

export const offerServicePhilosophySesjeKobieceDefaults: OfferServicePhilosophyData = {
  heading: {
    start: 'Oczki to spojrzenie na to, co w Tobie ',
    emphasis: 'najbardziej naturalne',
  },
  intro:
    'Wierzę, że w oczach widać wszystko – radość, spokój i te iskierki, których nie da się wyreżyserować. Moje podejście opiera się na kilku zasadach:',
  principles: [
    {
      title: 'Naturalność bez filtrów',
      description:
        'Uwielbiam miękkie światło i kolory, które oddają rzeczywistość taką, jaka jest – ciepłą i szlachetną.',
      figmaNodes: {
        desktop: '7001:2520',
        tablet: '7092:4353',
        mobile: '7093:5714',
      },
    },
    {
      title: 'Komfort jako priorytet',
      description:
        'Wiem, że poczucie bezpieczeństwa to klucz do pięknych zdjęć. Zawsze dbam o to, byś czuła się zaopiekowana od pierwszego maila aż po odbiór albumu.',
      figmaNodes: {
        desktop: '7001:2523',
        tablet: '7092:4356',
        mobile: '7093:5717',
      },
    },
    {
      title: 'Brak sztywnych schematów',
      description:
        'Każda sesja to dla mnie nowa historia. Nie ustawiam Was pod linijkę – pozwalam wydarzeniom płynąć, łapiąc te najbardziej szczere chwile.',
      figmaNodes: {
        desktop: '7001:2526',
        tablet: '7092:4359',
        mobile: '7093:5720',
      },
    },
  ],
}
