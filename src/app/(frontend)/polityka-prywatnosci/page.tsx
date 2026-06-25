import { OczkiBreadcrumbContainer, OczkiBreadcrumbs } from '@/components/OczkiBreadcrumbs'
import { PrivacyPolicySection, privacyPolicyDefaults } from '@/components/PrivacyPolicySection'
import { PrivacyPolicyFooterNewsletter } from '@/components/PrivacyPolicyFooterNewsletter'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import type { Metadata } from 'next'

import type { PrivacyPolicyPage } from '@/payload-types'
import { PRIVACY_POLICY_PAGE_BREADCRUMBS } from './constants'
import { mapPrivacyPolicy } from './mapPrivacyPolicy'

const queryPrivacyPolicy = cache(async (): Promise<PrivacyPolicyPage | null> => {
  const { isEnabled: draft } = await draftMode()
  try {
    const payload = await getPayload({ config: configPromise })
    return await payload.findGlobal({
      slug: 'privacyPolicyPage',
      draft,
      overrideAccess: draft,
    })
  } catch {
    return null
  }
})

export async function generateMetadata(): Promise<Metadata> {
  const doc = await queryPrivacyPolicy()
  if (doc?.meta?.title) return { title: doc.meta.title, description: doc.meta.description ?? undefined }
  return { title: privacyPolicyDefaults.pageTitle }
}

export default async function PrivacyPolicyPage() {
  const { isEnabled: draft } = await draftMode()
  const doc = await queryPrivacyPolicy()
  const data = doc ? mapPrivacyPolicy(doc) : privacyPolicyDefaults

  return (
    <main className="min-h-screen bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]">
      {draft && <LivePreviewListener />}
      <OczkiBreadcrumbContainer>
        <OczkiBreadcrumbs items={PRIVACY_POLICY_PAGE_BREADCRUMBS} />
      </OczkiBreadcrumbContainer>
      <PrivacyPolicySection data={data} />
      <PrivacyPolicyFooterNewsletter />
    </main>
  )
}
