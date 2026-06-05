import { AboutHero, aboutHeroDefaults } from '@/components/AboutHero'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: aboutHeroDefaults.title,
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]">
      <AboutHero data={aboutHeroDefaults} />
    </main>
  )
}
