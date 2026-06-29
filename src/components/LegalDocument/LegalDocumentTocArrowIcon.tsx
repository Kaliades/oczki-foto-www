import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

import { LEGAL_DOCUMENT_ASSETS } from './constants'

/** Active TOC row marker — Figma `6` chevron (`7108:16053`, 20×16, rotated to point right). */
export function LegalDocumentTocArrowIcon() {
  return (
    <span className="relative block h-4 w-5 shrink-0 rotate-180" aria-hidden="true">
      <Image
        alt=""
        className="block size-full"
        height={16}
        src={LEGAL_DOCUMENT_ASSETS.tocArrowIcon}
        width={20}
      />
    </span>
  )
}
