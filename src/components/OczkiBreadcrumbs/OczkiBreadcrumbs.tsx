import { Fragment } from 'react'

import {
  OCZKI_BREADCRUMBS_COMPONENT_FIGMA_NODE,
  OCZKI_BREADCRUMBS_ON_PHOTO_FIGMA_NODE,
  type OczkiBreadcrumbItemData,
  type OczkiBreadcrumbsVariant,
} from './constants'
import { OczkiBreadcrumbItem } from './OczkiBreadcrumbItem'
import { OczkiBreadcrumbSeparator } from './OczkiBreadcrumbSeparator'

type OczkiBreadcrumbsProps = {
  items: readonly OczkiBreadcrumbItemData[]
  variant?: OczkiBreadcrumbsVariant
}

/**
 * Breadcrumb trail — Figma `Breadcrumbs`.
 *
 * `onPhoto` (`6972:18555`): ancestor links bold 12 px / primary-800,
 * current page regular 12 px / primary-700, leading 1.7.
 */
export function OczkiBreadcrumbs({ items, variant = 'default' }: OczkiBreadcrumbsProps) {
  if (items.length === 0) {
    return null
  }

  const figmaNode =
    variant === 'onPhoto' ? OCZKI_BREADCRUMBS_ON_PHOTO_FIGMA_NODE : OCZKI_BREADCRUMBS_COMPONENT_FIGMA_NODE

  return (
    <nav aria-label="Nawigacja okruszkowa" data-figma-node={figmaNode}>
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
                <OczkiBreadcrumbItem
                  href={item.href}
                  isCurrent={isCurrent}
                  label={item.label}
                  variant={variant}
                />
              </li>
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
