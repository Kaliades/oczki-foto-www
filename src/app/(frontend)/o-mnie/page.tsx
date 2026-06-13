import { AboutHero, aboutHeroDefaults } from '@/components/AboutHero'
import { aboutPhilosophyDefaults, PhilosophyPrinciplesSection } from '@/components/PhilosophyPrinciplesSection'
import {
  beyondPhotographyDefaults,
  BeyondPhotographySection,
} from '@/components/BeyondPhotographySection'
import {
  aboutInstagramDefaults,
  AboutInstagramSection,
} from '@/components/AboutInstagramSection'
import {
  collaborationPillarsDefaults,
  CollaborationPillarsSection,
} from '@/components/CollaborationPillarsSection'
import {
  dualPerspectiveDefaults,
  DualPerspectiveSection,
} from '@/components/DualPerspectiveSection'
import { expertiseDefaults, ExpertiseSection } from '@/components/ExpertiseSection'
import { sessionFeelDefaults, SessionFeelSection } from '@/components/SessionFeelSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: aboutHeroDefaults.title,
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]">
      <AboutHero data={aboutHeroDefaults} />
      <PhilosophyPrinciplesSection data={aboutPhilosophyDefaults} headingId="about-philosophy-heading" />
      <SessionFeelSection data={sessionFeelDefaults} headingId="about-session-feel-heading" />
      <ExpertiseSection data={expertiseDefaults} headingId="about-expertise-heading" />
      <BeyondPhotographySection
        data={beyondPhotographyDefaults}
        headingId="about-beyond-photography-heading"
      />
      <DualPerspectiveSection
        data={dualPerspectiveDefaults}
        headingId="about-dual-perspective-heading"
      />
      <CollaborationPillarsSection
        data={collaborationPillarsDefaults}
        headingId="about-collaboration-pillars-heading"
      />
      <AboutInstagramSection
        data={aboutInstagramDefaults}
        headingId="about-instagram-heading"
      />
    </main>
  )
}
