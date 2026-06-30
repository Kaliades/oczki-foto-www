import { AboutHero } from '@/components/AboutHero'
import { aboutPhilosophyDefaults, PhilosophyPrinciplesSection } from '@/components/PhilosophyPrinciplesSection'
import { BeyondPhotographySection, beyondPhotographyDefaults } from '@/components/BeyondPhotographySection'
import { AboutInstagramSection, aboutInstagramDefaults } from '@/components/AboutInstagramSection'
import { aboutCtaDefaults, AboutCta } from '@/components/AboutCta'
import { SiteFooterNewsletter } from '@/components/SiteFooterNewsletter'
import { CollaborationPillarsSection, collaborationPillarsDefaults } from '@/components/CollaborationPillarsSection'
import { DualPerspectiveSection, dualPerspectiveDefaults } from '@/components/DualPerspectiveSection'
import { expertiseDefaults, ExpertiseSection } from '@/components/ExpertiseSection'
import { sessionFeelDefaults, SessionFeelSection } from '@/components/SessionFeelSection'
import { aboutHeroDefaults } from '@/components/AboutHero/constants'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import type { Metadata } from 'next'

import type { AboutPage } from '@/payload-types'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { mapAboutPage } from './mapAboutPage'

const ABOUT_META_DESCRIPTION =
  'Poznaj fotografkę Oczki Fotografia — naturalne podejście do sesji kobiecych i ślubnych w Krakowie, oparte na zaufaniu i swobodzie.'

const queryAboutPage = cache(async (): Promise<AboutPage | null> => {
  const { isEnabled: draft } = await draftMode()
  try {
    const payload = await getPayload({ config: configPromise })
    return await payload.findGlobal({
      slug: 'aboutPage',
      depth: 1,
      draft,
      overrideAccess: draft,
    })
  } catch {
    return null
  }
})

export async function generateMetadata(): Promise<Metadata> {
  const doc = await queryAboutPage()
  const title = doc?.meta?.title || aboutHeroDefaults.title
  const description = doc?.meta?.description || ABOUT_META_DESCRIPTION
  return {
    title,
    description,
    openGraph: mergeOpenGraph({ title, description, url: '/o-mnie' }),
  }
}

export default async function AboutPage() {
  const { isEnabled: draft } = await draftMode()
  const doc = await queryAboutPage()
  const data = doc ? mapAboutPage(doc) : null

  const hero = data?.hero ?? aboutHeroDefaults
  const philosophy = data?.philosophy ?? aboutPhilosophyDefaults
  const sessionFeel = data?.sessionFeel ?? sessionFeelDefaults
  const expertise = data?.expertise ?? expertiseDefaults
  const beyondPhotography = data?.beyondPhotography ?? beyondPhotographyDefaults
  const dualPerspective = data?.dualPerspective ?? dualPerspectiveDefaults
  const collaborationPillars = data?.collaborationPillars ?? collaborationPillarsDefaults
  const instagram = data?.instagram ?? aboutInstagramDefaults
  const cta = data?.cta ?? aboutCtaDefaults

  return (
    <main className="min-h-screen bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]">
      {draft && <LivePreviewListener />}
      <AboutHero data={hero} />
      <PhilosophyPrinciplesSection data={philosophy} headingId="about-philosophy-heading" />
      <SessionFeelSection data={sessionFeel} headingId="about-session-feel-heading" />
      <ExpertiseSection data={expertise} headingId="about-expertise-heading" />
      <BeyondPhotographySection data={beyondPhotography} headingId="about-beyond-photography-heading" />
      <DualPerspectiveSection data={dualPerspective} headingId="about-dual-perspective-heading" />
      <CollaborationPillarsSection data={collaborationPillars} headingId="about-collaboration-pillars-heading" />
      <AboutInstagramSection data={instagram} headingId="about-instagram-heading" />
      <AboutCta data={cta} />
      <SiteFooterNewsletter variant="about" />
    </main>
  )
}
