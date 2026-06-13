import type { LegalDocumentBulletItem } from './constants'
import { LegalDocumentBulletIcon } from './LegalDocumentBulletIcon'

type LegalDocumentBulletItemRowProps = {
  item: LegalDocumentBulletItem
}

/** Single list row — Figma bullet `Container` (`7108:16094`). */
export function LegalDocumentBulletItemRow({ item }: LegalDocumentBulletItemRowProps) {
  const hasDescription = Boolean(item.description)

  return (
    <li className="flex w-full items-start gap-2">
      <span className="flex shrink-0 items-center pt-0.5">
        <LegalDocumentBulletIcon />
      </span>
      {hasDescription ? (
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <p className="oczki-body-m-medium text-[var(--oczki-primary-700)]">{item.title}</p>
          <p className="oczki-body-m text-[var(--oczki-primary-700)]">{item.description}</p>
        </div>
      ) : (
        <p className="oczki-body-m min-w-0 flex-1 text-[var(--oczki-primary-700)]">{item.title}</p>
      )}
    </li>
  )
}
