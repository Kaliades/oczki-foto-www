import type { CaseStudyDetailsData } from '@/components/CaseStudyDetails'
import type { CaseStudyDuoPerspectiveData } from '@/components/CaseStudyDuoPerspective'
import type { CaseStudyHeroData } from '@/components/CaseStudyHero'

export const CASE_STUDY_SLUGS = ['slub-justyny-i-krzysia'] as const

export type CaseStudySlug = (typeof CASE_STUDY_SLUGS)[number]

export type CaseStudyPageData = {
  details: CaseStudyDetailsData
  duoPerspective: CaseStudyDuoPerspectiveData
  hero: CaseStudyHeroData
  slug: CaseStudySlug
}

export const CASE_STUDY_CASES: Record<CaseStudySlug, CaseStudyPageData> = {
  'slub-justyny-i-krzysia': {
    slug: 'slub-justyny-i-krzysia',
    hero: {
      title: 'Ślub Justyny i Krzysia',
      background: {
        alt: 'Para młoda tańcząca na parkiecie weselnym',
        src: '/figma/case-study-hero-bg.png',
      },
      breadcrumbs: [
        { label: 'Strona główna', href: '/' },
        { label: 'Galeria', href: '/galeria' },
        { label: 'Ślub Justyny i Krzysia' },
      ],
      heading: {
        lead:
          'Gorący czerwiec, chłodne mury kościoła w Wieprzu i wesele pełne luzu. Poznajcie historię ',
        emphasis: 'Justyny i Krzysia',
        end: '.',
      },
      description:
        'To był jeden z tych czerwcowych dni, kiedy słońce nie brało jeńców, a termometry uparcie pokazywały ponad 30 stopni. Jednak u Justyny i Krzysia upał był tylko tłem dla emocji, które biły od nich od samego rana. Zapraszam Was do obejrzenia historii, która udowadnia, że najlepszy przepis na ślub to spokój i otaczanie się ludźmi, przy których można być w pełni sobą.',
    },
    details: {
      heading: {
        start: 'Ślub Justyny i Krzysia – detale, które stworzyły ',
        emphasis: 'klimat',
      },
      items: [
        {
          title: 'Miejsce ceremonii',
          description:
            'Klimatyczny, chłodny kościół w Wieprzu (idealne schronienie w czerwcowy upał!)',
          figmaNodes: { desktop: '6972:18978' },
        },
        {
          title: 'Sala weselna',
          description: 'Eleganckie wnętrza Parkhotel Łysoń w Inwałdzie',
          figmaNodes: { desktop: '6972:19001' },
        },
        {
          title: 'Kolor przewodni',
          description: 'Klasyczna biel połączona z soczystą zielenią czerwcowych liści',
          figmaNodes: { desktop: '6972:19025' },
        },
        {
          title: 'Atmosfera',
          description: 'Totalny luz, dużo śmiechu i parkiet, który nie stygł ani na minutę',
          figmaNodes: { desktop: '6972:19073' },
        },
      ],
    },
    duoPerspective: {
      heading: {
        start: 'Dwa spojrzenia na jeden ',
        emphasis: 'wyjątkowy dzień',
      },
      leadParagraph:
        'Pracując w duecie, nie tracimy ani sekundy. Podczas przygotowań Justyny i Krzysia byliśmy razem, co pozwoliło nam uchwycić każdy ważny detal i emocję z dwóch różnych perspektyw w tym samym czasie. Dzięki temu Wasza ślubna historia jest pełna, spójna i nic, co ważne, nie umknie naszej uwadze.',
      callout: 'Co nas zachwyciło?',
      photo: {
        alt: 'Para młoda na vintageowej sofie podczas przygotowań',
        src: '/figma/case-study-duo-photo-desktop.png',
      },
      highlights: [
        {
          title: 'Światło w kościele w Wieprzu',
          description:
            'Te wysokie okna i chłód murów dały nam idealne warunki do stworzenia intymnych, skupionych kadrów.',
          figmaNodes: {
            desktop: '6972:19189',
            tablet: '7102:12717',
            mobile: '7102:16643',
          },
        },
        {
          title: 'Energia w Parkhotel Łysoń',
          description:
            'Przestronna sala pozwoliła gościom na totalne szaleństwo, a my mieliśmy pole do popisu przy dynamicznych ujęciach z parkietu.',
          figmaNodes: {
            desktop: '6972:19190',
            tablet: '7102:12722',
            mobile: '7102:16648',
          },
        },
      ],
    },
  },
}

export function getCaseStudyBySlug(slug: string): CaseStudyPageData | null {
  if (!(slug in CASE_STUDY_CASES)) {
    return null
  }

  return CASE_STUDY_CASES[slug as CaseStudySlug]
}
