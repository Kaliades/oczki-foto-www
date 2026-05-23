/**
 * Home — testimonials ("Opinie") section.
 *
 * Figma references (always desktop / tablet / mobile in parallel):
 *   - desktop 1366: https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7102-14473
 *   - tablet  768:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7105-11602
 *   - mobile  360:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7105-13897
 */
export const HOME_TESTIMONIAL_FIGMA_NODES = {
  desktopFrame: '7102:14473',
  tabletFrame: '7105:11602',
  mobileFrame: '7105:13897',
} as const

export type TestimonialItem = {
  /**
   * The quote text shown in the centre column. Polish quotation marks
   * („...") are part of the content, the component renders them verbatim
   * to keep editors in control of punctuation.
   */
  quote: string
  /** Display name of the person credited under the quote. */
  author: string
  /** Photograph used inside the polaroid decoration. */
  photoSrc: string
  /** Accessible description of the photograph. */
  photoAlt: string
}

export type HomeTestimonialData = {
  heading: {
    start: string
    /** Italic, hand-set fragment that closes the title. */
    emphasis: string
  }
  items: readonly TestimonialItem[]
  /**
   * Hides the right-hand polaroid decoration (used by editors who want to
   * showcase a quote without the photo). Default is `true`.
   */
  showPolaroid?: boolean
}

/** Figma `7102:13795` — one active pill plus five inactive square dots. */
export const HOME_TESTIMONIAL_SLIDE_COUNT = 6

/**
 * Quote + author stack min-height so carousel slides never shrink the section.
 * Sized for the reference quote (`7102:13791`) at body/l (16px, lh 1.48):
 * mobile ~8 lines, tablet ~6, desktop ~5, plus the signature row and gap.
 */
export const TESTIMONIAL_SLIDE_BODY_MIN_HEIGHT_CLASS =
  'min-h-[230px] md:min-h-[198px] lg:min-h-[175px]' as const

const DEFAULT_PHOTO = {
  photoSrc: '/figma/testimonial-back-photo.png',
  photoAlt: 'Klientka podczas sesji w księgarni',
} as const

/** Placeholder copy until editors add more CMS testimonials (~258 zn. jak opinia Justyny). */
const testimonialPlaceholderPool: readonly TestimonialItem[] = [
  {
    quote:
      '„Z całego serca polecam sesję z Asią - fotografką, która łączy profesjonalizm z ogromnym sercem i poczuciem humoru. Od pierwszych minut czuliśmy się swobodnie, a kadry wyszły naturalnie, ciepło i bardzo „nasze". Efekt końcowy przerosł nasze oczekiwania! Gorąco polecam!"',
    author: 'Anna Kowalska',
    ...DEFAULT_PHOTO,
  },
  {
    quote:
      '„Sesja z Asią to było wspaniałe doświadczenie - pełne uśmiechu, spokoju i dobrej energii, która naprawdę widać na zdjęciach. Asia świetnie prowadzi, podpowiada i nie narzuca. Efekty naszej współpracy są piękniejsze, niż sobie wyobrażaliśmy! Gorąco polecam!"',
    author: 'Marta Nowak',
    ...DEFAULT_PHOTO,
  },
  {
    quote:
      '„Bardzo polecam współpracę z Asią - to osoba, która potrafi rozbroić stres przed obiektywem i stworzyć atmosferę, w której po prostu jest się sobą. Zdjęcia są pełne emocji, a cała sesja minęła lekko i przyjemnie. Efekty przerosły nasze najśmielsze oczekiwania! Gorąco polecam!"',
    author: 'Katarzyna Wiśniewska',
    ...DEFAULT_PHOTO,
  },
  {
    quote:
      '„Od pierwszej wiadomości wiedzieliśmy, że trafiliśmy we właściwe miejsce - Asia wysłuchała, doradziła i poprowadziła sesję z wielką wrażliwością. Zdjęcia są piękne, autentyczne i bardzo „nasze", a wspomnienia zostaną z nami na długo. Efekty przerosły oczekiwania! Gorąco polecam!"',
    author: 'Paulina Mazur',
    ...DEFAULT_PHOTO,
  },
  {
    quote:
      '„Niesamowita energia, cierpliwość i ogromny talent - tak opisałabym sesję z Asią, która sprawiła, że nawet nieśmiałe osoby poczuły się pewnie. Kadry są lekkie, naturalne i pełne ciepła, a cała współpraca przebiegła bez pośpiechu. Efekty naszej współpracy przerosły oczekiwania! Gorąco polecam!"',
    author: 'Joanna Lewandowska',
    ...DEFAULT_PHOTO,
  },
  {
    quote:
      '„Dziękujemy Asi za sesję, która była dla nas prawdziwą przyjemnością - pełną śmiechu, wzruszeń i pięknych chwil zarejestrowanych na zdjęciach. Wszystko było dopięte na ostatni guzik, a jednocześnie z sercem i uważnością. Efekty przerosły nasze najśmielsze oczekiwania! Gorąco polecam!"',
    author: 'Monika i Tomek',
    ...DEFAULT_PHOTO,
  },
]

/**
 * Ensures the carousel always has {@link HOME_TESTIMONIAL_SLIDE_COUNT} slides
 * (Figma dot row). Real CMS items come first; the rest are placeholders.
 */
export function resolveTestimonialSlides(
  items: readonly TestimonialItem[],
): TestimonialItem[] {
  const base =
    items.length > 0
      ? [...items]
      : [...homeTestimonialDefaults.items]

  if (base.length >= HOME_TESTIMONIAL_SLIDE_COUNT) {
    return base
  }

  const slides = [...base]
  let poolIndex = 0

  while (slides.length < HOME_TESTIMONIAL_SLIDE_COUNT) {
    const placeholder =
      testimonialPlaceholderPool[poolIndex % testimonialPlaceholderPool.length]!
    slides.push({
      ...placeholder,
      photoSrc: base[0]?.photoSrc ?? placeholder.photoSrc,
      photoAlt: base[0]?.photoAlt ?? placeholder.photoAlt,
    })
    poolIndex += 1
  }

  return slides
}

export const homeTestimonialDefaults: HomeTestimonialData = {
  heading: {
    start: 'Wasze słowa to moje',
    emphasis: 'paliwo do działania',
  },
  items: [
    {
      quote:
        '„Z ogromną przyjemnością mogę polecić sesję z Asią - osobą pełną energii, która sprawia, że sesja zdjęciowa staje się wspaniałym przeżyciem, pełnym energii, zabawy i uśmiechu. Efekty naszej współpracy przerosły nasze najśmielsze oczekiwania! Gorąco polecam!"',
      author: 'Justyna Kazimierz',
      ...DEFAULT_PHOTO,
    },
  ],
  showPolaroid: true,
}
