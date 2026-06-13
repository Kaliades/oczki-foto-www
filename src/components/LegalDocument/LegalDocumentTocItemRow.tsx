import type { LegalDocumentTocItem } from './constants'
import { LegalDocumentTocArrowIcon } from './LegalDocumentTocArrowIcon'

type LegalDocumentTocItemRowProps = {
  isActive?: boolean
  item: LegalDocumentTocItem
}

export function LegalDocumentTocItemRow({ isActive = false, item }: LegalDocumentTocItemRowProps) {
  return (
    <a
      className={`flex h-11 w-full items-center ${isActive ? 'gap-2.5' : ''}`}
      href={`#${item.id}`}
    >
      {isActive ? <LegalDocumentTocArrowIcon /> : null}
      <span
        className={`oczki-body-l [word-break:break-word] ${
          isActive ? 'text-[var(--oczki-primary-900)]' : 'text-[var(--oczki-primary-700)]'
        }`}
      >
        {item.label}
      </span>
    </a>
  )
}
