import type { NumberedStepItem } from '@/components/NumberedStepsRail'

export const SESSION_FEEL_SECTION_FIGMA_NODES = {
  desktop: '6972:15546',
  tablet: '7092:4362',
  mobile: '7093:5723',
  ginghamBackdrop: '7001:2008',
  heading: {
    desktop: '6972:15548',
    tablet: '7092:4440',
    mobile: '7093:5813',
  },
} as const

export type SessionFeelSectionData = {
  heading: {
    emphasis: string
    start: string
  }
  intro: string
  steps: readonly NumberedStepItem[]
}

export const sessionFeelDefaults: SessionFeelSectionData = {
  heading: {
    start: 'Sesja jak ',
    emphasis: 'spotkanie z przyjaciółką',
  },
  intro: 'Prowadzę Cię, inspiruję do ruchu, łapię naturalne momenty',
  steps: [
    {
      number: 1,
      title: 'Wspólna kawa na start (również online)',
      description:
        'Nie zaczynamy od zdjęć. Zaczynamy od rozmowy, by oswoić się z moją obecnością.',
      figmaNodes: {
        desktop: '6972:15553',
        tablet: '7092:4490',
        mobile: '7093:5841',
      },
    },
    {
      number: 2,
      title: 'Moje „suchary”',
      description:
        'Tak, mam zapas kiepskich żartów, które zawsze działają. Nic tak nie rozluźnia atmosferę jak wspólny śmiech.',
      figmaNodes: {
        desktop: '6972:15556',
        tablet: '7092:4495',
        mobile: '7093:5846',
      },
    },
    {
      number: 3,
      title: 'Naturalne prowadzenie',
      description:
        'Podpowiem Ci, co zrobić z dłońmi i jak stanąć, byś czuła się lekko, ale nigdy nie będę Cię łamać w nienaturalne pozy.',
      figmaNodes: {
        desktop: '6972:15559',
        tablet: '7092:4500',
        mobile: '7093:5851',
      },
    },
    {
      number: 4,
      title: 'Cierpliwość',
      description:
        'Jeśli potrzebujesz chwili na zebranie myśli czy poprawienie włosów – masz ją. Nigdy nie poganiam.',
      figmaNodes: {
        desktop: '6972:15562',
        tablet: '7092:4505',
        mobile: '7093:5856',
      },
    },
  ],
}
