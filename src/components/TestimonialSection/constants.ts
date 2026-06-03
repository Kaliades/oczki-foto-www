export type TestimonialItem = {
  /**
   * Quote body — Polish quotation marks („…") are part of the content so
   * editors keep full control of punctuation.
   */
  quote: string
  author: string
  photoSrc: string
  photoAlt: string
}

export type TestimonialSectionData = {
  heading: {
    start: string
    emphasis: string
  }
  items: readonly TestimonialItem[]
  showPolaroid?: boolean
}

/** Figma `7102:13795` — one active pill plus five inactive square dots. */
export const TESTIMONIAL_SLIDE_COUNT = 6

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
 * Ensures the carousel always has {@link TESTIMONIAL_SLIDE_COUNT} slides
 * (Figma dot row). Real items come first; the rest are placeholders.
 */
export function resolveTestimonialSlides(
  items: readonly TestimonialItem[],
  fallbackItems: readonly TestimonialItem[],
): TestimonialItem[] {
  const base = items.length > 0 ? [...items] : [...fallbackItems]

  if (base.length >= TESTIMONIAL_SLIDE_COUNT) {
    return base
  }

  const slides = [...base]
  let poolIndex = 0

  while (slides.length < TESTIMONIAL_SLIDE_COUNT) {
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
