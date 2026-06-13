import type { LegalDocumentBulletItem } from './constants'
import { LegalDocumentBulletItemRow } from './LegalDocumentBulletItemRow'

type LegalDocumentBulletListProps = {
  items: readonly LegalDocumentBulletItem[]
}

/** Bulleted block — Figma list `Container` (`7108:16093`). */
export function LegalDocumentBulletList({ items }: LegalDocumentBulletListProps) {
  return (
    <ul className="flex w-full flex-col gap-3">
      {items.map((item) => (
        <LegalDocumentBulletItemRow item={item} key={item.id} />
      ))}
    </ul>
  )
}
