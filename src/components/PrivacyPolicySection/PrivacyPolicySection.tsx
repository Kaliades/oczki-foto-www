import {
  LegalDocumentIntro,
  LegalDocumentSection,
  LegalDocumentToc,
} from '@/components/LegalDocument'

import { PRIVACY_POLICY_FIGMA_NODES, type PrivacyPolicyData } from './constants'

type PrivacyPolicySectionProps = {
  data: PrivacyPolicyData
  headingId?: string
}

/**
 * Privacy policy content — Figma `Privacy-policy` (`3668:4879` / `7108:16049` / `7108:16685`).
 *
 * <section> (full-bleed primary-100)
 * └── <div> inner 1366 cap + section padding
 *     └── <div> Container (`7108:16043`)
 *         ├── LegalDocumentToc — sidebar desktop / stacked mobile+tablet
 *         └── <div> Privacy-policy-copy (`3668:4880`)
 *             ├── LegalDocumentIntro
 *             └── <div> sections rail
 *                 └── LegalDocumentSection × n
 *
 * Navbar: global `OczkiNavbar` via layout — not rendered here.
 */
export function PrivacyPolicySection({
  data,
  headingId = 'privacy-policy-heading',
}: PrivacyPolicySectionProps) {
  const { intro, sections, title, toc } = data

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={PRIVACY_POLICY_FIGMA_NODES.section.desktop}
    >
      <div className="mx-auto w-full max-w-[1366px] px-4 pt-6 pb-20 md:px-20 md:pt-9 md:pb-32">
        <div
          className="flex flex-col gap-12 md:gap-20 lg:flex-row lg:items-start lg:justify-between lg:gap-[138px]"
          data-figma-node={PRIVACY_POLICY_FIGMA_NODES.container.desktop}
          data-name="Container"
        >
          <LegalDocumentToc figmaNode={PRIVACY_POLICY_FIGMA_NODES.toc.desktop} items={toc} />

          <div
            className="flex w-full flex-col gap-9 md:gap-16 lg:w-[670px] lg:shrink-0"
            data-figma-node={PRIVACY_POLICY_FIGMA_NODES.copy.desktop}
            data-name="Privacy-policy-copy"
          >
            <LegalDocumentIntro
              description={intro}
              figmaNode={PRIVACY_POLICY_FIGMA_NODES.intro.desktop}
              headingId={headingId}
              title={title}
            />

            <div
              className="flex w-full flex-col gap-12"
              data-figma-node={PRIVACY_POLICY_FIGMA_NODES.sections.desktop}
              data-name="Container"
            >
              {sections.map((section) => (
                <LegalDocumentSection key={section.id} section={section} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <span className="sr-only">{data.pageTitle}</span>
    </section>
  )
}
