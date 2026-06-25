import { ContactHeroSection, contactHeroDefaults } from '@/components/ContactHero'
import { ContactFaq, contactFaqDefaults } from '@/components/ContactFaq'
import { ContactFooterNewsletter } from '@/components/ContactFooterNewsletter'
import { ServiceAreaSection, serviceAreaSectionDefaults } from '@/components/ServiceAreaSection'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import type { Metadata } from 'next'

import type { ContactPage } from '@/payload-types'
import { mapContactPage } from './mapContactPage'

const queryContactPage = cache(async (): Promise<ContactPage | null> => {
  const { isEnabled: draft } = await draftMode()
  try {
    const payload = await getPayload({ config: configPromise })
    return await payload.findGlobal({
      slug: 'contactPage',
      draft,
      overrideAccess: draft,
    })
  } catch {
    return null
  }
})

export async function generateMetadata(): Promise<Metadata> {
  const doc = await queryContactPage()
  if (doc?.meta?.title) return { title: doc.meta.title, description: doc.meta.description ?? undefined }
  return { title: contactHeroDefaults.title }
}

export default async function ContactPage() {
  const { isEnabled: draft } = await draftMode()
  const doc = await queryContactPage()
  const data = doc ? mapContactPage(doc) : null

  const hero = data?.hero ?? contactHeroDefaults
  const serviceArea = data?.serviceArea ?? serviceAreaSectionDefaults
  const faq = data?.faq ?? contactFaqDefaults

  return (
    <main className="min-h-screen bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]">
      {draft && <LivePreviewListener />}
      <ContactHeroSection data={hero} />
      <ServiceAreaSection data={serviceArea} />
      <ContactFaq data={faq} />
      <ContactFooterNewsletter />
    </main>
  )
}
