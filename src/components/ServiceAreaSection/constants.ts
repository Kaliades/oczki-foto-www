import type { BorderedAccordionItemData } from '@/components/BorderedAccordion'
import type { SectionLink } from '@/utilities/resolveLinkHref'

export const SERVICE_AREA_SECTION_FIGMA_NODES = {
  desktop: '6884:13691',
  tablet: '7084:3617',
  mobile: '7086:4548',
  heading: {
    desktop: '6884:13696',
    tablet: '7084:3618',
    mobile: '7086:4549',
  },
  mainContent: {
    desktop: '7001:2434',
    tablet: '7084:3619',
    mobile: '7086:4550',
  },
  textContent: {
    desktop: '6884:13693',
    tablet: '7084:3630',
    mobile: '7086:4561',
  },
  textBlock: {
    desktop: '7001:2435',
    tablet: '7084:3631',
    mobile: '7086:4562',
  },
  intro: {
    desktop: '6884:13697',
    tablet: '7084:3632',
    mobile: '7086:4563',
  },
  accordionWell: {
    desktop: '7001:2404',
    tablet: '7084:3635',
    mobile: '7086:4566',
  },
  bottomBlock: {
    desktop: '7001:2396',
    tablet: '7084:3650',
    mobile: '7086:4581',
  },
  cta: {
    desktop: '7063:14521',
    tablet: '7084:3652',
    mobile: '7086:4583',
  },
} as const

export type ServiceAreaSectionData = {
  accordion: readonly BorderedAccordionItemData[]
  cta: SectionLink
  footer: string
  heading: string
  intro: readonly [string, string]
  photoAlt?: string
}

export const serviceAreaSectionDefaults: ServiceAreaSectionData = {
  heading:
    'Z Krakowa w każdy zakątek Małopolski – Oczki Fotografia tam, gdzie bije serce Waszej opowieści',
  intro: [
    'Moją bazą i miejscem, w którym żyje na co dzień, jest Kraków. To tutaj znam niemal każdy kąt – od surowych, industrialnych wnętrz, przez jasne studia fotograficzne, aż po dzikie zakamarki nad Wisłą, które o zachodzie słońca wyglądają magicznie.',
    'Jednak jako Oczki Fotografia rzadko stoję w miejscu. Mój rewir to nie tylko mapa, ale każde miejsce, w którym czujecie się u siebie:',
  ],
  accordion: [
    {
      id: 'krakow',
      title: 'Kraków i okolice',
      body: 'Tu spotkacie mnie najczęściej na sesjach kobiecych, wizerunkowych i rodzinnych. Znam lokalizacje, które dają intymność i piękne, naturalne światło.',
    },
    {
      id: 'malopolska',
      title: 'Cała Małopolska i dalej',
      body: 'Docieram tam, gdzie planujecie Waszą historię — od górskich pensjonatów po wiejskie folwarki. Wspólnie znajdziemy miejsce, które będzie Waszym tłem.',
    },
  ],
  footer:
    'W granicach Krakowa dojazd na sesję macie zawsze w cenie. Planujecie coś dalej? Dajcie znać – obiecujemy, że odległość nigdy nie będzie przeszkodą dla dobrych zdjęć.',
  cta: {
    type: 'custom',
    url: '/kontakt',
    label: 'Umów sesję',
    newTab: false,
  },
  photoAlt: 'Fotografka pokazuje klientce zdjęcia na ekranie aparatu',
}
