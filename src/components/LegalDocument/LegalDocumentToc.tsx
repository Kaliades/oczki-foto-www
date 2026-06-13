import type { LegalDocumentTocItem } from './constants'
import { LegalDocumentTocItemRow } from './LegalDocumentTocItemRow'

type LegalDocumentTocProps = {
  activeSectionId?: string
  figmaNode?: string
  items: readonly LegalDocumentTocItem[]
}

/**
 * In-page table of contents — Figma cream `Container` (`7108:16024` / `7108:16051` / `7108:16687`).
 *
 * <nav>
 * └── <div> cream panel
 *     └── LegalDocumentTocItemRow × n
 */
export function LegalDocumentToc({ activeSectionId, figmaNode, items }: LegalDocumentTocProps) {
  const activeId = activeSectionId ?? items[0]?.id

  return (
    <nav
      aria-label="Spis treści dokumentu"
      className="w-full shrink-0 bg-[var(--oczki-primary-200)] px-3 pt-2 pb-3 md:px-5 md:pt-3 md:pb-5 lg:w-[398px]"
      data-figma-node={figmaNode}
      data-name="Container"
    >
      {items.map((item) => (
        <LegalDocumentTocItemRow isActive={item.id === activeId} item={item} key={item.id} />
      ))}
    </nav>
  )
}
