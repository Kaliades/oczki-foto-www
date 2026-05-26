import { Fragment } from 'react'

import { OCZKI_BREADCRUMBS_COMPONENT_FIGMA_NODE, type OczkiBreadcrumbItemData } from './constants'
import { OczkiBreadcrumbItem } from './OczkiBreadcrumbItem'
import { OczkiBreadcrumbSeparator } from './OczkiBreadcrumbSeparator'

type OczkiBreadcrumbsProps = {
  items: readonly OczkiBreadcrumbItemData[]
}

/**
 * Breadcrumb trail — Figma `Breadcrumbs` symbol `7064:15094`.
 *
 * Root: flex h-44 items-center gap-4px
 * ├── Element-01 (h-44) → ancestor link
 * ├── Icons (no fixed height) → chevron 12×12
 * └── Icons (h-44) → current label
 */
export function OczkiBreadcrumbs({ items }: OczkiBreadcrumbsProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <nav aria-label="Nawigacja okruszkowa" data-figma-node={OCZKI_BREADCRUMBS_COMPONENT_FIGMA_NODE}>
      <ol className="flex h-11 items-center gap-[4px]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const isCurrent = isLast && item.href === undefined

          return (
            <Fragment key={`${item.label}-${index}`}>
              {index > 0 ? (
                <li className="flex items-center">
                  <OczkiBreadcrumbSeparator />
                </li>
              ) : null}
              <li className="flex h-11 items-center">
                <OczkiBreadcrumbItem href={item.href} isCurrent={isCurrent} label={item.label} />
              </li>
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
