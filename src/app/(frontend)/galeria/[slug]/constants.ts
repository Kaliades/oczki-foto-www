import type { CaseStudyHeroData } from '@/components/CaseStudyHero'

export const CASE_STUDY_SLUGS = ['slub-justyny-i-krzysia'] as const

export type CaseStudySlug = (typeof CASE_STUDY_SLUGS)[number]

export type CaseStudyPageData = {
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
  },
}

export function getCaseStudyBySlug(slug: string): CaseStudyPageData | null {
  if (!(slug in CASE_STUDY_CASES)) {
    return null
  }

  return CASE_STUDY_CASES[slug as CaseStudySlug]
}
