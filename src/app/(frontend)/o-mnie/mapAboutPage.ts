import type { AboutPage } from '@/payload-types'

import type { AboutHeroData } from '@/components/AboutHero'
import {
  aboutHeroDefaults,
  ABOUT_HERO_ASSETS,
} from '@/components/AboutHero/constants'
import type { PhilosophyPrinciplesSectionData } from '@/components/PhilosophyPrinciplesSection'
import { aboutPhilosophyDefaults } from '@/components/PhilosophyPrinciplesSection/constants'
import type { SessionFeelSectionData } from '@/components/SessionFeelSection'
import { sessionFeelDefaults } from '@/components/SessionFeelSection/constants'
import type { ExpertiseSectionData } from '@/components/ExpertiseSection'
import { expertiseDefaults } from '@/components/ExpertiseSection/constants'
import type { BeyondPhotographySectionData } from '@/components/BeyondPhotographySection'
import {
  beyondPhotographyDefaults,
  BEYOND_PHOTOGRAPHY_BACKDROP_CROP,
} from '@/components/BeyondPhotographySection/constants'
import type { DualPerspectiveSectionData } from '@/components/DualPerspectiveSection'
import { dualPerspectiveDefaults } from '@/components/DualPerspectiveSection/constants'
import type { CollaborationPillarsSectionData } from '@/components/CollaborationPillarsSection'
import { collaborationPillarsDefaults } from '@/components/CollaborationPillarsSection/constants'
import type { AboutInstagramSectionData } from '@/components/AboutInstagramSection'
import { aboutInstagramDefaults } from '@/components/AboutInstagramSection/constants'
import type { AboutCtaData } from '@/components/AboutCta'
import { aboutCtaDefaults } from '@/components/AboutCta/constants'

/**
 * Maps a Payload `AboutPage` global document onto the per-section data shapes
 * the components expect.
 *
 * Same principle as mapOfferItem / mapGallery: CMS content is overlaid onto the
 * code-side defaults. Technical values (Figma nodes, layout offsets, crop classes,
 * botanical asset paths, variantIndex) are always injected from code.
 * Any CMS field left blank falls back to the default, so the page never breaks.
 */

type MediaLike = number | { url?: string | null } | null | undefined

function pick<T>(value: T | null | undefined | '', fallback: T): T {
  return value === null || value === undefined || value === '' ? fallback : (value as T)
}

function mediaUrl(media: MediaLike): string | null {
  if (media && typeof media === 'object' && 'url' in media && typeof media.url === 'string') {
    return media.url
  }
  return null
}

export function mapAboutHero(doc: AboutPage): AboutHeroData {
  const d = aboutHeroDefaults
  const cms = doc.hero
  return {
    ...d,
    heading: {
      start: pick(cms?.heading?.start, d.heading.start),
      emphasis: pick(cms?.heading?.emphasis, d.heading.emphasis),
    },
    description: pick(cms?.description, d.description),
    cta: {
      href: pick(cms?.cta?.url, d.cta.href),
      label: pick(cms?.cta?.label, d.cta.label),
    },
    portrait: {
      src: pick(mediaUrl(cms?.portrait), d.portrait.src),
      alt: pick(cms?.portraitAlt, d.portrait.alt),
    },
    secondaryPhoto: {
      src: pick(mediaUrl(cms?.secondaryPhoto), d.secondaryPhoto.src),
      alt: pick(cms?.secondaryPhotoAlt, d.secondaryPhoto.alt),
    },
  }
}

export function mapPhilosophy(doc: AboutPage): PhilosophyPrinciplesSectionData {
  const d = aboutPhilosophyDefaults
  const cms = doc.philosophy
  const cmsPrinciples = cms?.principles?.filter((p) => p.title || p.description) ?? []
  const principles =
    cmsPrinciples.length > 0
      ? cmsPrinciples.map((p, i) => ({
          title: pick(p.title, d.principles[i]?.title ?? ''),
          description: pick(p.description, d.principles[i]?.description ?? ''),
          figmaNodes: d.principles[i]?.figmaNodes,
        }))
      : d.principles
  return {
    heading: {
      start: pick(cms?.heading?.start, d.heading.start),
      emphasis: pick(cms?.heading?.emphasis, d.heading.emphasis),
    },
    intro: pick(cms?.intro, d.intro),
    principles,
  }
}

export function mapSessionFeel(doc: AboutPage): SessionFeelSectionData {
  const d = sessionFeelDefaults
  const cms = doc.sessionFeel
  const cmsSteps = cms?.steps?.filter((s) => s.title || s.description) ?? []
  const steps =
    cmsSteps.length > 0
      ? cmsSteps.map((s, i) => ({
          number: (i + 1) as 1 | 2 | 3 | 4,
          title: pick(s.title, d.steps[i]?.title ?? ''),
          description: pick(s.description, d.steps[i]?.description ?? ''),
          figmaNodes: d.steps[i]?.figmaNodes,
        }))
      : d.steps
  return {
    heading: {
      start: pick(cms?.heading?.start, d.heading.start),
      emphasis: pick(cms?.heading?.emphasis, d.heading.emphasis),
    },
    intro: pick(cms?.intro, d.intro),
    steps,
  }
}

export function mapExpertise(doc: AboutPage): ExpertiseSectionData {
  const d = expertiseDefaults
  const cms = doc.expertise
  const cmsCards = cms?.cards?.filter((c) => c.title || c.description) ?? []
  const cards =
    cmsCards.length > 0
      ? cmsCards.map((c, i) => ({
          title: pick(c.title, d.cards[i]?.title ?? ''),
          description: pick(c.description, d.cards[i]?.description ?? ''),
          figmaNodes: d.cards[i]?.figmaNodes,
        }))
      : d.cards
  return {
    heading: {
      start: pick(cms?.heading?.start, d.heading.start),
      emphasis: pick(cms?.heading?.emphasis, d.heading.emphasis),
    },
    intro: pick(cms?.intro, d.intro),
    cards,
  }
}

export function mapBeyondPhotography(doc: AboutPage): BeyondPhotographySectionData {
  const d = beyondPhotographyDefaults
  const cms = doc.beyond
  const cmsFeatures = cms?.features?.filter((f) => f.title || f.description) ?? []
  const features =
    cmsFeatures.length > 0
      ? cmsFeatures.map((f, i) => ({
          title: pick(f.title, d.features[i]?.title ?? ''),
          description: pick(f.description, d.features[i]?.description ?? ''),
          figmaNodes: d.features[i]?.figmaNodes,
        }))
      : d.features
  return {
    heading: {
      start: pick(cms?.heading?.start, d.heading.start),
      emphasis: pick(cms?.heading?.emphasis, d.heading.emphasis),
      end: pick(cms?.heading?.end, d.heading.end),
    },
    intro: pick(cms?.intro, d.intro),
    backdrop: {
      // crop values are technical — always from code
      crop: BEYOND_PHOTOGRAPHY_BACKDROP_CROP,
      src: pick(mediaUrl(cms?.backdrop), d.backdrop.src),
      alt: pick(cms?.backdropAlt, d.backdrop.alt),
    },
    features,
  }
}

export function mapDualPerspective(doc: AboutPage): DualPerspectiveSectionData {
  const d = dualPerspectiveDefaults
  const cms = doc.dual
  const cmsProfileItems = cms?.profileItems?.filter((p) => p.title || p.description) ?? []
  const profileItems =
    cmsProfileItems.length > 0
      ? cmsProfileItems.map((p, i) => ({
          title: pick(p.title, d.profileItems[i]?.title ?? ''),
          description: pick(p.description, d.profileItems[i]?.description ?? ''),
          figmaNodes: d.profileItems[i]?.figmaNodes,
        }))
      : d.profileItems
  return {
    heading: {
      emphasis: pick(cms?.heading?.emphasis, d.heading.emphasis),
      end: pick(cms?.heading?.end, d.heading.end),
    },
    intro: pick(cms?.intro, d.intro),
    portrait: {
      src: pick(mediaUrl(cms?.portrait), d.portrait.src),
      alt: pick(cms?.portraitAlt, d.portrait.alt),
    },
    profileHeading: pick(cms?.profileHeading, d.profileHeading),
    profileItems,
  }
}

export function mapCollaborationPillars(doc: AboutPage): CollaborationPillarsSectionData {
  const d = collaborationPillarsDefaults
  const cms = doc.pillars
  const cmsItems = cms?.items?.filter((p) => p.title || p.description) ?? []
  const pillars =
    cmsItems.length > 0
      ? cmsItems.map((p, i) => ({
          title: pick(p.title, d.pillars[i]?.title ?? ''),
          description: pick(p.description, d.pillars[i]?.description ?? ''),
          // variantIndex drives CSS rotation — always from the code skeleton
          variantIndex: d.pillars[i]?.variantIndex ?? (i as 0 | 1 | 2),
          figmaNodes: d.pillars[i]?.figmaNodes,
        }))
      : d.pillars
  return {
    heading: {
      start: pick(cms?.heading?.start, d.heading.start),
      emphasis: pick(cms?.heading?.emphasis, d.heading.emphasis),
      end: pick(cms?.heading?.end, d.heading.end),
    },
    intro: pick(cms?.intro, d.intro),
    pillars,
  }
}

export function mapInstagram(doc: AboutPage): AboutInstagramSectionData {
  const d = aboutInstagramDefaults
  const cms = doc.instagram
  return {
    ...d,
    heading: {
      plain: pick(cms?.heading?.plain, d.heading.plain),
      emphasis: pick(cms?.heading?.emphasis, d.heading.emphasis),
    },
    profile: {
      ...d.profile,
      link: pick(cms?.profileUrl, null)
        ? { ...d.profile.link, url: cms!.profileUrl! }
        : d.profile.link,
    },
  }
}

export function mapAboutCta(doc: AboutPage): AboutCtaData {
  const d = aboutCtaDefaults
  const cms = doc.cta
  return {
    heading: {
      type: 'single',
      text: pick(cms?.headingText, d.heading.type === 'single' ? d.heading.text : ''),
    },
    body: pick(cms?.body, d.body),
    cta: {
      ...d.cta,
      label: pick(cms?.button?.label, d.cta.label),
      url: pick(cms?.button?.url, d.cta.url),
    },
  }
}

export type AboutPageMapped = {
  hero: AboutHeroData
  philosophy: PhilosophyPrinciplesSectionData
  sessionFeel: SessionFeelSectionData
  expertise: ExpertiseSectionData
  beyondPhotography: BeyondPhotographySectionData
  dualPerspective: DualPerspectiveSectionData
  collaborationPillars: CollaborationPillarsSectionData
  instagram: AboutInstagramSectionData
  cta: AboutCtaData
}

export function mapAboutPage(doc: AboutPage): AboutPageMapped {
  return {
    hero: mapAboutHero(doc),
    philosophy: mapPhilosophy(doc),
    sessionFeel: mapSessionFeel(doc),
    expertise: mapExpertise(doc),
    beyondPhotography: mapBeyondPhotography(doc),
    dualPerspective: mapDualPerspective(doc),
    collaborationPillars: mapCollaborationPillars(doc),
    instagram: mapInstagram(doc),
    cta: mapAboutCta(doc),
  }
}
