import Image from 'next/image'

import { LEGAL_DOCUMENT_ASSETS } from './constants'

/** Small diamond bullet — Figma list marker (`7108:16096`, 16×16). */
export function LegalDocumentBulletIcon() {
  return (
    <span className="relative block size-4 shrink-0" aria-hidden="true">
      <Image
        alt=""
        className="block size-full"
        height={16}
        src={LEGAL_DOCUMENT_ASSETS.bulletIcon}
        width={16}
      />
    </span>
  )
}
