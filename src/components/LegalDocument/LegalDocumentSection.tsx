import type { LegalDocumentSectionData } from './constants'
import { LegalDocumentBulletList } from './LegalDocumentBulletList'
import { LegalDocumentSectionHeader } from './LegalDocumentSectionHeader'

type LegalDocumentSectionProps = {
  section: LegalDocumentSectionData
}

/**
 * One numbered policy block — Figma `Text+Header` (`3668:4884`).
 *
 * <article>
 * ├── LegalDocumentSectionHeader
 * └── body column (`Text` or direct paragraph for section 7 pattern)
 */
export function LegalDocumentSection({ section }: LegalDocumentSectionProps) {
  const { body, bullets, id, intro, number, title } = section
  const hasBullets = Boolean(bullets?.length)
  const hasIntro = Boolean(intro)

  return (
    <article className="flex w-full flex-col gap-3 scroll-mt-28" id={id}>
      <LegalDocumentSectionHeader number={number} title={title} />

      {hasBullets || hasIntro ? (
        <div className={`flex w-full flex-col ${hasIntro && hasBullets ? 'gap-4' : ''}`}>
          {intro ? <p className="oczki-body-l text-[var(--oczki-primary-700)]">{intro}</p> : null}
          {bullets ? <LegalDocumentBulletList items={bullets} /> : null}
        </div>
      ) : body ? (
        <p className="oczki-body-l text-[var(--oczki-primary-700)]">{body}</p>
      ) : null}
    </article>
  )
}
