import type { CenteredSplitCopyHeading } from '@/components/CenteredSplitCopy'
import type { BorderedPrincipleItem } from '@/components/BorderedPrinciplesRail'

export const PHILOSOPHY_PRINCIPLES_SECTION_FIGMA_NODES = {
  desktop: '7001:2443',
  tablet: '7092:4348',
  mobile: '7093:5709',
} as const

/** Figma `7093:5711` — phrase units at 328 px (360 reference). */
export const PHILOSOPHY_MOBILE_HEADING_PHRASES = [
  'Oczki to spojrzenie na to,',
  'co w Tobie',
] as const

/** Figma `7001:2445` / `7092:4350` — phrase units at 514 px. */
export const PHILOSOPHY_TABLET_DESKTOP_HEADING_PHRASES = [
  'Oczki to spojrzenie na to, co w Tobie',
] as const

/** Intro body — matches {@link AboutHeroIntroduction} mobile description. */
export const PHILOSOPHY_INTRO_BODY_MOBILE_CLASS =
  'oczki-body-l w-full text-center tracking-[-0.24px] text-[var(--oczki-primary-700)] [font-feature-settings:"ss01"_1,"ss02"_1,"ss03"_1,"ss08"_1,"ss10"_1,"ss12"_1,"lnum"_1,"pnum"_1] [font-variation-settings:"wdth"_100]'

/** Intro body — matches {@link AboutHeroIntroduction} tablet/desktop description. */
export const PHILOSOPHY_INTRO_BODY_TABLET_DESKTOP_CLASS =
  'oczki-body-l w-full tracking-[-0.24px] text-[var(--oczki-primary-700)]'

export type PhilosophyPrinciplesSectionData = {
  heading: CenteredSplitCopyHeading
  intro: string
  principles: readonly BorderedPrincipleItem[]
}

const sharedPrinciples: readonly BorderedPrincipleItem[] = [
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
] as const

const sharedHeading: CenteredSplitCopyHeading = {
  start: 'Oczki to spojrzenie na to, co w Tobie ',
  emphasis: 'najbardziej naturalne',
}

const sharedIntro =
  'Wierzę, że w oczach widać wszystko – radość, spokój i te iskierki, których nie da się wyreżyserować. Moje podejście opiera się na kilku zasadach:'

export const aboutPhilosophyDefaults: PhilosophyPrinciplesSectionData = {
  heading: sharedHeading,
  intro: sharedIntro,
  principles: sharedPrinciples,
}

export const offerServicePhilosophySesjeKobieceDefaults: PhilosophyPrinciplesSectionData = {
  heading: sharedHeading,
  intro: sharedIntro,
  principles: sharedPrinciples,
}
