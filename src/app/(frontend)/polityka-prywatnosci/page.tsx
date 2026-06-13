import { OczkiBreadcrumbContainer, OczkiBreadcrumbs } from '@/components/OczkiBreadcrumbs'
import {
  PrivacyPolicySection,
  privacyPolicyDefaults,
} from '@/components/PrivacyPolicySection'
import type { Metadata } from 'next'

import { PRIVACY_POLICY_PAGE_BREADCRUMBS } from './constants'

export const metadata: Metadata = {
  title: privacyPolicyDefaults.pageTitle,
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]">
      <OczkiBreadcrumbContainer>
        <OczkiBreadcrumbs items={PRIVACY_POLICY_PAGE_BREADCRUMBS} />
      </OczkiBreadcrumbContainer>
      <PrivacyPolicySection data={privacyPolicyDefaults} />
    </main>
  )
}
