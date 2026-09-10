import type { CaseStudyClosingCtaData } from '@/components/CaseStudyClosingCta'
import { caseStudyClosingCtaDefaults } from '@/components/CaseStudyClosingCta'
import type { CaseStudyDetailsData } from '@/components/CaseStudyDetails'
import type { CaseStudyDuoPerspectiveData } from '@/components/CaseStudyDuoPerspective'
import type { CaseStudyHeroData } from '@/components/CaseStudyHero'
import type { CaseStudyMemorableMomentData } from '@/components/CaseStudyMemorableMoment'
import type { CaseStudyPhotoGalleryData } from '@/components/CaseStudyPhotoGallery/constants'
import { caseStudyPhotoGalleryDefaults } from '@/components/CaseStudyPhotoGallery/constants'
import type { CaseStudyRelatedStoriesData } from '@/components/CaseStudyRelatedStories'
import { caseStudyRelatedStoriesDefaults } from '@/components/CaseStudyRelatedStories'
import type { CaseStudyTestimonialData } from '@/components/CaseStudyTestimonial/constants'
import type { CaseStudyVenueStoryData } from '@/components/CaseStudyVenueStory'

import type { CaseStudyPageData } from './constants'

/**
 * Brand-safe copy used when a Gallery CMS field is blank.
 *
 * Never couple-specific (no names / venues from a single reportage). Used by
 * `mapGallery` and by live-gallery seed scripts for non-canonical stories so
 * empty fields do not leak “Justyna i Krzyś” across pages.
 */
export type CaseStudyContentFallbacks = Omit<CaseStudyPageData, 'slug'>

const brandHero: CaseStudyHeroData = {
  title: '',
  background: {
    alt: 'Zdjęcie z reportażu ślubnego',
    src: '',
  },
  breadcrumbs: [
    { label: 'Strona główna', href: '/' },
    { label: 'Galeria', href: '/galeria' },
    { label: 'Galeria' },
  ],
  heading: {
    lead: 'Poznajcie historię ',
    emphasis: '',
    end: '.',
  },
}

const brandDetails: CaseStudyDetailsData = {
  heading: {
    start: 'Detale, które stworzyły ',
    emphasis: 'klimat',
  },
  items: [
    {
      title: 'Miejsce ceremonii',
      description: 'Wybrane z myślą o komforcie pary i gości.',
    },
    {
      title: 'Sala weselna',
      description: 'Przestrzeń, w której historia dnia nabiera koloru.',
    },
    {
      title: 'Kolor przewodni',
      description: 'Spójna paleta, która łączy detale w jedną opowieść.',
    },
    {
      title: 'Atmosfera',
      description: 'Luz, bliskość i emocje, które widać na zdjęciach.',
    },
  ],
}

const brandDuo: CaseStudyDuoPerspectiveData = {
  heading: {
    start: 'Dwa spojrzenia na jeden ',
    emphasis: 'wyjątkowy dzień',
  },
  leadParagraph:
    'Pracując w duecie, nie tracimy ani sekundy. Jesteśmy razem przy przygotowaniach i ceremonii, żeby uchwycić każdy ważny detal i emocję z dwóch perspektyw w tym samym czasie. Dzięki temu Wasza historia jest pełna, spójna i nic, co ważne, nie umknie naszej uwadze.',
  callout: 'Co nas zachwyciło?',
  photo: {
    alt: 'Para podczas przygotowań ślubnych',
    src: '',
  },
  highlights: [
    {
      title: 'Światło i przestrzeń',
      description:
        'Szukamy kadrów, w których architektura i światło naturalne budują intymny klimat.',
    },
    {
      title: 'Energia przyjęcia',
      description:
        'Dynamiczne ujęcia z parkietu i spokojniejsze portrety — dzień w pełnym spektrum.',
    },
  ],
}

const brandVenue: CaseStudyVenueStoryData = {
  heading: {
    emphasis: 'Ślub',
    start: ' i przyjęcie — historia miejsca',
  },
  body: 'Jako fotografowie ślubni z Krakowa lubimy miejsca, które dobrze współpracują ze światłem i dają parze przestrzeń na autentyczne emocje. Ten reportaż zapamiętamy właśnie za taki klimat.',
  photos: {
    desktop: {
      back: { src: '', alt: 'Zdjęcie w tle z reportażu' },
      front: { src: '', alt: 'Zdjęcie na pierwszym planie' },
      scallop: { src: '', alt: 'Zdjęcie w ramce scallop' },
    },
    tablet: {
      back: { src: '', alt: 'Zdjęcie w tle z reportażu' },
      front: { src: '', alt: 'Zdjęcie na pierwszym planie' },
      scallop: { src: '', alt: 'Zdjęcie w ramce scallop' },
    },
    mobile: {
      back: { src: '', alt: 'Zdjęcie w tle z reportażu' },
      front: { src: '', alt: 'Zdjęcie na pierwszym planie' },
      scallop: { src: '', alt: 'Zdjęcie w ramce scallop' },
    },
  },
}

const brandPhotoGallery: CaseStudyPhotoGalleryData = {
  ...caseStudyPhotoGalleryDefaults,
  items: [],
}

const brandTestimonial: CaseStudyTestimonialData = {
  heading: {
    start: 'Wasze słowa to moje',
    emphasis: 'paliwo do działania',
  },
  items: [],
  showPolaroid: true,
}

const brandMemorable: CaseStudyMemorableMomentData = {
  title: 'To, co zapamiętamy najbardziej',
  body: 'Bywają takie chwile tuż po przysiędze — bez pozowania, bez reżyserii — kiedy para patrzy na siebie, jakby na świecie nie było nikogo innego. Właśnie dla takich kadrów kochamy tę pracę.',
  portraitPhoto: { alt: 'Portret pary młodej', src: '' },
  landscapePhoto: { alt: 'Kadr z reportażu ślubnego', src: '' },
}

const brandClosingCta: CaseStudyClosingCtaData = caseStudyClosingCtaDefaults

const brandRelated: CaseStudyRelatedStoriesData = {
  heading: caseStudyRelatedStoriesDefaults.heading,
  items: [],
}

export const CASE_STUDY_CONTENT_FALLBACKS: CaseStudyContentFallbacks = {
  hero: brandHero,
  details: brandDetails,
  duoPerspective: brandDuo,
  venueStory: brandVenue,
  photoGallery: brandPhotoGallery,
  testimonial: brandTestimonial,
  memorableMoment: brandMemorable,
  closingCta: brandClosingCta,
  relatedStories: brandRelated,
}
