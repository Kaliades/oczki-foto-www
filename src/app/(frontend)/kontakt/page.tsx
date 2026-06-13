import { ContactHeroSection, contactHeroDefaults } from '@/components/ContactHero'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: contactHeroDefaults.title,
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]">
      <ContactHeroSection data={contactHeroDefaults} />
    </main>
  )
}
