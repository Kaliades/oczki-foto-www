import { ContactHeroSection, contactHeroDefaults } from '@/components/ContactHero'
import { ContactFaq, contactFaqDefaults } from '@/components/ContactFaq'
import { ContactFooterNewsletter } from '@/components/ContactFooterNewsletter'
import { ServiceAreaSection, serviceAreaSectionDefaults } from '@/components/ServiceAreaSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: contactHeroDefaults.title,
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]">
      <ContactHeroSection data={contactHeroDefaults} />
      <ServiceAreaSection data={serviceAreaSectionDefaults} />
      <ContactFaq data={contactFaqDefaults} />
      <ContactFooterNewsletter />
    </main>
  )
}
