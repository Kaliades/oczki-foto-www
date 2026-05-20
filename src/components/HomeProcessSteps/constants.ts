export const HOME_PROCESS_STEPS_FIGMA_NODES = {
  desktopFrame: '6724:13218',
  tabletFrame: '7105:11463',
  mobileFrame: '7105:13758',
} as const

export type ProcessStepItem = {
  title: string
  paragraphs: readonly [string, string]
  ornamentSrc: string
  /** Backsplash (zielona karta tła) rotation in degrees — taken from Figma. */
  backsplashRotation: number
  /** Foreground (beige karta) rotation in degrees — taken from Figma. */
  foregroundRotation: number
}

/**
 * Design-level decoration assigned to each step by its position in the rail.
 *
 * Ornament + rotation pair are part of the visual rhythm of the section
 * (taken verbatim from Figma), not editable content. The Payload block
 * therefore stores only textual fields per step and applies a decoration
 * from this list using the step's index. Steps beyond the third reuse the
 * decorations cyclically.
 */
export const PROCESS_STEP_DECORATIONS = [
  {
    ornamentSrc: '/figma/process-ornament-1.svg',
    backsplashRotation: 7.99,
    foregroundRotation: -2.3,
  },
  {
    ornamentSrc: '/figma/process-ornament-2.svg',
    backsplashRotation: -2.32,
    foregroundRotation: 4.39,
  },
  {
    ornamentSrc: '/figma/process-ornament-3.svg',
    backsplashRotation: 3.66,
    foregroundRotation: -5.56,
  },
] as const

/**
 * Pick the design decoration for a step at `index` — cyclic so editors can
 * add more than three steps without breaking the visual.
 */
export const getStepDecoration = (index: number) =>
  PROCESS_STEP_DECORATIONS[index % PROCESS_STEP_DECORATIONS.length]!

export type HomeProcessStepsData = {
  heading: {
    italicOne: string
    plainOne: string
    italicTwo: string
    plainTwo: string
  }
  intro: {
    paragraphOne: string
    paragraphTwo: string
  }
  items: readonly ProcessStepItem[]
  showWaxStamp?: boolean
}

export const homeProcessStepsDefaults: HomeProcessStepsData = {
  heading: {
    italicOne: 'Ruch',
    plainOne: ' zamiast sztywności, ',
    italicTwo: 'uśmiech',
    plainTwo: ' zamiast poleceń',
  },
  intro: {
    paragraphOne:
      'Najlepsze kadry nie powstają wtedy, gdy ktoś „dobrze pozuje”. Powstają wtedy, gdy pojawia się spokój, zaufanie i odrobina luzu.',
    paragraphTwo: 'Właśnie na tym opiera się mój sposób pracy.',
  },
  items: [
    {
      title: 'Zaczynamy od relacji, nie od aparatu',
      paragraphs: [
        'Zanim pojawi się pierwsze zdjęcie, pojawia się rozmowa. Sprawdzamy, jak się czujesz, czego potrzebujesz i w jakim jesteś miejscu.',
        'Nie musisz od razu być otwarta ani pewna siebie. Dajemy sobie chwilę — a kiedy napięcie puszcza, zdjęcia zaczynają dziać się naturalnie.',
      ],
      ...PROCESS_STEP_DECORATIONS[0]!,
    },
    {
      title: 'Spokój jest ważniejszy niż perfekcja',
      paragraphs: [
        'Dbam o atmosferę, w której nie musisz nic udowadniać. Możesz się zatrzymać, możesz się pomylić, możesz być cicho.',
        'Kiedy napięcie znika, pojawia się prawdziwa emocja. A ona zawsze wygląda dobrze na zdjęciach.',
      ],
      ...PROCESS_STEP_DECORATIONS[1]!,
    },
    {
      title: 'Prowadzę ale nie kontroluję',
      paragraphs: [
        'Jeśli nie wiesz, co zrobić — jestem obok. Jeśli potrzebujesz chwili — dajemy sobie czas. Jeśli coś Cię niepokoi — rozmawiamy.',
        'Sesja nie polega na tym, że „musisz dać z siebie wszystko”. To ja biorę odpowiedzialność za atmosferę, tempo i komfort.',
      ],
      ...PROCESS_STEP_DECORATIONS[2]!,
    },
  ],
  showWaxStamp: true,
}
