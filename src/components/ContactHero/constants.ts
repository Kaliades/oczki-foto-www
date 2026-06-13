import type { OczkiBreadcrumbItemData } from '@/components/OczkiBreadcrumbs'
import type { SectionLink } from '@/utilities/resolveLinkHref'

export const CONTACT_HERO_FIGMA_NODES = {
  page: {
    desktop: '6884:13540',
    tablet: '7084:3135',
    mobile: '7086:4066',
  },
  background: {
    desktop: '6884:14441',
    tablet: '7084:3179',
    mobile: '7086:4110',
  },
  topBar: {
    desktop: '6950:16639',
    tablet: '7084:3181',
    mobile: '7086:4112',
  },
  breadcrumbs: {
    desktop: '7105:15417',
    tablet: '7105:15427',
    mobile: '7105:15437',
  },
  mainContent: {
    desktop: '6884:13560',
    tablet: '7084:3184',
    mobile: '7086:4115',
  },
  sectionTitle: {
    desktop: '6884:13561',
    tablet: '7084:3471',
    mobile: '7086:4402',
  },
  sectionTitleContent: {
    desktop: '6884:13562',
    tablet: '7084:3472',
    mobile: '7086:4403',
  },
  botanical: {
    desktop: '7001:1721',
    tablet: '7084:3185',
    mobile: '7086:4116',
  },
  contactForm: {
    desktop: '6884:14123',
    tablet: '7084:3475',
    mobile: '7086:4406',
  },
  contactFormContent: {
    desktop: '6884:14124',
    tablet: '7084:3516',
    mobile: '7086:4447',
  },
  submitButton: {
    desktop: '7063:14533',
    tablet: '7084:3532',
    mobile: '7086:4463',
  },
} as const

/** Section shell metrics from Figma `get_metadata`. */
export const CONTACT_HERO_SHELL = {
  minHeight: { mobile: 1003, tablet: 978, desktop: 688 },
  topBarHeight: { mobile: 44, tablet: 52, desktop: 52 },
  topBarPaddingX: { mobile: 16, tablet: 80, desktop: 32 },
  topBarPaddingY: { mobile: 0, tablet: 4, desktop: 4 },
  mainPaddingBottom: { mobile: 80, tablet: 80, desktop: 48 },
  mainPaddingX: { mobile: 16, tablet: 80, desktop: 0 },
  mainPaddingLeft: { desktop: 32 },
  mainPaddingRight: { desktop: 80 },
  mainGap: { mobile: 48, tablet: 64, desktop: 0 },
  titleWidth: { mobile: 328, tablet: 475, desktop: 475 },
  titlePaddingTop: { mobile: 16, tablet: 16, desktop: 32 },
  titleContentGap: { mobile: 8, tablet: 16, desktop: 16 },
  formContentGap: { mobile: 12, tablet: 16, desktop: 16 },
  fieldsGap: { mobile: 10, tablet: 12, desktop: 12 },
  sessionQuestionGap: { mobile: 4, tablet: 6, desktop: 6 },
} as const

/** Botanical `OBJECTS` — Figma `7001:1721` / mobile `7086:4116`. Layer insets from `get_design_context`. */
export const CONTACT_HERO_BOTANICAL_LAYERS = [
  {
    figmaNode: '7001:1722',
    src: '/figma/contact-hero-botanical/layer-stems.svg',
    inset: { top: 9.4, right: 20.15, bottom: 0, left: 12.71 },
  },
  {
    figmaNode: '7001:1727',
    src: '/figma/contact-hero-botanical/layer-01.svg',
    inset: { top: 39.52, right: 35.87, bottom: 47.73, left: 46.36 },
  },
  {
    figmaNode: '7001:1756',
    src: '/figma/contact-hero-botanical/layer-02.svg',
    inset: { top: 3.57, right: 19.78, bottom: 83.68, left: 62.45 },
  },
  {
    figmaNode: '7001:1785',
    src: '/figma/contact-hero-botanical/layer-03.svg',
    inset: { top: 0.42, right: 62.38, bottom: 86.83, left: 19.85 },
  },
  {
    figmaNode: '7001:1814',
    src: '/figma/contact-hero-botanical/layer-04.svg',
    inset: { top: 74.58, right: 59.72, bottom: 12.67, left: 22.5 },
  },
  {
    figmaNode: '7001:1843',
    src: '/figma/contact-hero-botanical/layer-05.svg',
    inset: { top: 19.49, right: 77.62, bottom: 67.76, left: 4.6 },
  },
  {
    figmaNode: '7001:1872',
    src: '/figma/contact-hero-botanical/layer-06.svg',
    inset: { top: 25.3, right: 48.63, bottom: 61.95, left: 33.55 },
  },
  {
    figmaNode: '7001:1901',
    src: '/figma/contact-hero-botanical/layer-07.svg',
    inset: { top: 65.25, right: 31.84, bottom: 21.99, left: 50.39 },
  },
  {
    figmaNode: '7001:1930',
    src: '/figma/contact-hero-botanical/layer-08.svg',
    inset: { top: 47.72, right: 5.05, bottom: 39.52, left: 77.18 },
  },
  {
    figmaNode: '7001:1959',
    src: '/figma/contact-hero-botanical/layer-09.svg',
    inset: { top: 77.1, right: 19.81, bottom: 15.19, left: 40.39 },
  },
  {
    figmaNode: '7001:1963',
    src: '/figma/contact-hero-botanical/layer-10.svg',
    inset: { top: 79.93, right: 36.88, bottom: 4.76, left: 29.62 },
  },
  {
    figmaNode: '7001:1967',
    src: '/figma/contact-hero-botanical/layer-11.svg',
    inset: { top: 54.1, right: -0.01, bottom: 34.84, left: 62.73 },
  },
  {
    figmaNode: '7001:1971',
    src: '/figma/contact-hero-botanical/layer-12.svg',
    inset: { top: 48.6, right: 59.5, bottom: 25.51, left: 24.18 },
  },
  {
    figmaNode: '7001:1975',
    src: '/figma/contact-hero-botanical/layer-13.svg',
    inset: { top: 8.88, right: 9.61, bottom: 68.62, left: 66.03 },
  },
  {
    figmaNode: '7001:1979',
    src: '/figma/contact-hero-botanical/layer-14.svg',
    inset: { top: 0, right: 53.98, bottom: 74.78, left: 34.04 },
  },
  {
    figmaNode: '7001:1983',
    src: '/figma/contact-hero-botanical/layer-15.svg',
    inset: { top: 53.97, right: 35.59, bottom: 22.2, left: 43.27 },
  },
  {
    figmaNode: '7001:1987',
    src: '/figma/contact-hero-botanical/layer-16.svg',
    inset: { top: 29.07, right: 57.25, bottom: 43.7, left: 26.61 },
  },
  {
    figmaNode: '7001:1991',
    src: '/figma/contact-hero-botanical/layer-17.svg',
    inset: { top: 27.41, right: 79.56, bottom: 47.52, left: 0 },
  },
  {
    figmaNode: '7001:1995',
    src: '/figma/contact-hero-botanical/layer-18.svg',
    inset: { top: 53.3, right: 64.83, bottom: 28.36, left: 4.91 },
  },
  {
    figmaNode: '7001:1999',
    src: '/figma/contact-hero-botanical/layer-19.svg',
    inset: { top: 10.85, right: 35.44, bottom: 61.12, left: 53.01 },
  },
  {
    figmaNode: '7001:2003',
    src: '/figma/contact-hero-botanical/layer-20.svg',
    inset: { top: 38.08, right: 12.05, bottom: 38.35, left: 66.23 },
  },
] as const

export const CONTACT_HERO_BOTANICAL = {
  desktop: {
    left: 124,
    top: 254,
    width: 522,
    height: 573,
  },
  mobile: {
    shell: {
      left: -145.5,
      top: 572,
      width: 522,
      height: 573,
    },
    clip: {
      width: 331,
      height: 471,
    },
    rotationDeg: 30,
  },
} as const

export const CONTACT_HERO_ASSETS = {
  paperTexture: '/figma/contact-hero-paper-texture.png',
} as const

export type ContactHeroData = {
  breadcrumbs: readonly OczkiBreadcrumbItemData[]
  heading: {
    start: string
    emphasis: string
    end: string
  }
  description: string
  sessionQuestion: string
  defaultSessionTypeId: string
  submitLabel: string
  privacyLink: SectionLink
  title: string
}

export const contactHeroDefaults: ContactHeroData = {
  title: 'Kontakt | Oczki fotografia',
  breadcrumbs: [
    { label: 'Strona główna', href: '/' },
    { label: 'Kontakt' },
  ],
  heading: {
    start: 'Porozmawiajmy o ',
    emphasis: 'Twoich marzeniach',
    end: ' i pięknych kadrach',
  },
  description:
    'Cieszę się, że tu jesteś. To znak, że czujesz mój vibe i chcesz, abyśmy to my zatrzymali Twój czas. Bez względu na to, czy planujesz sesję kobiecą w Krakowie, czy wielkie wiejskie wesele w sercu Małopolski – napisz do mnie śmiało.',
  sessionQuestion: 'O jakiej sesji marzysz?',
  defaultSessionTypeId: 'kobieca',
  submitLabel: 'Wyślij wiadomość',
  privacyLink: {
    type: 'custom',
    url: '/polityka-prywatnosci',
    label: 'politykę prywatności',
    newTab: false,
  },
}

/** Cream field tokens shared by contact form inputs. */
export const CONTACT_FORM_FIELD_SURFACE = {
  labelSurfaceClassName: 'bg-[var(--oczki-primary-100)]',
  labelClassName: 'text-[var(--oczki-primary-700)]',
  inputClassName: 'text-[var(--oczki-primary-700)]',
} as const
