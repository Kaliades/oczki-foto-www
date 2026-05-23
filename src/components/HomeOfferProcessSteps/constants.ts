import type { SectionLink } from '@/utilities/resolveLinkHref'

/**
 * Figma source nodes for the "Krok po kroku do pięknych zdjęć" section
 * (a.k.a. "Kroki do realizacji oferty" in the design file).
 *
 * The section walks the visitor through a five-step process — from the
 * first conversation to the final delivery of photographs — and finishes
 * with a CTA back to the booking flow.
 */
export const HOME_OFFER_PROCESS_STEPS_FIGMA_NODES = {
  desktopFrame: '7105:8099',
  tabletFrame: '7105:11601',
  mobileFrame: '7105:13896',
} as const

export type OfferProcessStep = {
  /** Visible step number — usually 1..5 but the data drives it. */
  number: number
  title: string
  /**
   * One or two paragraphs of body copy. Some steps split a longer note
   * into two paragraphs (e.g. step 1) so the structure is an array.
   */
  paragraphs: readonly string[]
}

export type HomeOfferProcessStepsData = {
  heading: {
    /** Plain run preceding the italic emphasis. Always rendered first. */
    plain: string
    /** Italic run rendered after the plain run. */
    emphasis: string
  }
  /** Single paragraph of intro body copy below the heading. */
  intro: string
  /** Primary call-to-action under the intro copy. */
  cta: SectionLink
  items: readonly OfferProcessStep[]
}

/**
 * Static defaults — used as fallback when no CMS data is provided and
 * as the source for the homepage seed. Copy taken verbatim from Figma
 * desktop frame 7105:8099.
 */
export const homeOfferProcessStepsDefaults: HomeOfferProcessStepsData = {
  heading: {
    plain: 'Krok po kroku do ',
    emphasis: 'pięknych zdjęć',
  },
  intro:
    'Najlepsze kadry nie powstają wtedy, gdy ktoś „dobrze pozuje”. Powstają wtedy, gdy pojawia się spokój, zaufanie i odrobina luzu. Właśnie na tym opiera się mój sposób pracy.',
  cta: {
    type: 'custom',
    url: '/kontakt',
    label: 'Umów sesję',
    newTab: false,
  },
  items: [
    {
      number: 1,
      title: 'Krótka rozmowa lub wiadomość',
      paragraphs: [
        'Zanim ustalimy termin, rozmawiamy — przez telefon lub online.',
        'Chcę poznać Ciebie, Twoje obawy i to, czego naprawdę oczekujesz od tej sesji.',
      ],
    },
    {
      number: 2,
      title: 'Pomagam Ci się przygotować',
      paragraphs: [
        'Nie zostawiam Cię z myślą „radź sobie”. Po ustaleniu terminu dostajesz ode mnie wskazówki dotyczące ubioru, propozycje miejsc i klimatu oraz odpowiedzi, na wszystkie nurtujące Cię pytania. Dzięki temu przychodzisz na sesję spokojniejsza i bardziej pewna siebie.',
      ],
    },
    {
      number: 3,
      title: 'Sesja w praktyce',
      paragraphs: [
        'W trakcie sesji pokazuję, jak się poruszać, podpowiadam drobne zmiany, które robią dużą różnicę i reaguję na to, co się dzieje — na Twoje emocje, energię, tempo. Możesz skupić się na sobie, nie na aparacie.',
      ],
    },
    {
      number: 4,
      title: 'Wybór i obróbka zdjęć',
      paragraphs: [
        'Po sesji wybieram najlepsze kadry i obrabiam je w spójnym, naturalnym stylu. Dostajesz ode mnie spójny materiał, który dobrze się ogląda teraz i za kilka lat.',
      ],
    },
    {
      number: 5,
      title: 'Oddanie zdjęć',
      paragraphs: [
        'Z góry wiesz ile zdjęć otrzymasz, w jakim terminie i w jakiej formie. Po oddaniu zdjęć nadal możesz do mnie napisać — jeśli potrzebujesz odbitek, albumu albo kolejnej sesji.',
      ],
    },
  ],
}
