import { OczkiNumberDiamond } from '@/components/OczkiNumberDiamond'

type LegalDocumentSectionHeaderProps = {
  number: number
  title: string
}

/** Numbered heading row — Figma `Number+Header` (`3668:4885`). */
export function LegalDocumentSectionHeader({ number, title }: LegalDocumentSectionHeaderProps) {
  return (
    <div className="flex w-full items-center gap-3" data-name="Number+Header">
      <OczkiNumberDiamond value={number} variant="tertiary" size="compact" />
      <h2 className="oczki-heading-s min-w-0 flex-1 text-[var(--oczki-primary-800)]">{title}</h2>
    </div>
  )
}
