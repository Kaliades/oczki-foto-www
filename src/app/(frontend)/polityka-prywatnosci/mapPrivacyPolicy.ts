import type { PrivacyPolicyPage } from '@/payload-types'

import type { PrivacyPolicyData } from '@/components/PrivacyPolicySection/constants'
import { privacyPolicyDefaults } from '@/components/PrivacyPolicySection/constants'

/**
 * Maps a Payload `PrivacyPolicyPage` global onto the `PrivacyPolicyData` shape
 * the `PrivacyPolicySection` component expects.
 *
 * Section numbering is derived from array position (1-based) rather than stored
 * in the CMS — this keeps the admin UI simple and renumbers automatically when
 * sections are reordered.
 */

function pick<T>(value: T | null | undefined | '', fallback: T): T {
  return value === null || value === undefined || value === '' ? fallback : (value as T)
}

export function mapPrivacyPolicy(doc: PrivacyPolicyPage): PrivacyPolicyData {
  const d = privacyPolicyDefaults
  const cmsSections = doc.sections?.filter((s) => s.title || s.body || s.intro) ?? []

  const sections =
    cmsSections.length > 0
      ? cmsSections.map((s, i) => {
          const def = d.sections[i]
          const cmsId = s.id ?? def?.id ?? `section-${i + 1}`
          const bullets = s.bullets?.filter((b) => b.title)?.map((b, bi) => ({
            id: pick(b.id, def?.bullets?.[bi]?.id ?? `bullet-${bi}`),
            title: pick(b.title, def?.bullets?.[bi]?.title ?? ''),
            description: b.description ?? undefined,
          }))
          return {
            id: cmsId,
            number: i + 1,
            title: pick(s.title, def?.title ?? ''),
            ...(s.body != null && s.body !== '' ? { body: s.body } : def?.body != null ? { body: def.body } : {}),
            ...(s.intro != null && s.intro !== '' ? { intro: s.intro } : def?.intro != null ? { intro: def.intro } : {}),
            ...(bullets && bullets.length > 0 ? { bullets } : def?.bullets ? { bullets: def.bullets } : {}),
          }
        })
      : d.sections

  // Build TOC from section IDs and titles
  const toc = sections.map((s) => ({ id: s.id, label: s.title }))

  return {
    pageTitle: pick(doc.pageTitle, d.pageTitle),
    title: pick(doc.pageTitle, d.title),
    intro: pick(doc.intro, d.intro),
    toc,
    sections,
  }
}
