'use client'

import { useState } from 'react'

import { cn } from '@/utilities/ui'

import { BorderedAccordionItem, type BorderedAccordionItemData } from './BorderedAccordionItem'

type BorderedAccordionProps = {
  className?: string
  defaultOpenIndex?: number
  figmaNode?: string
  idPrefix?: string
  items: readonly BorderedAccordionItemData[]
}

/**
 * Bordered inline accordion — Figma `Info Text Container` list (`gap-[16px]`).
 */
export function BorderedAccordion({
  className,
  defaultOpenIndex = 0,
  figmaNode,
  idPrefix = 'bordered-accordion',
  items,
}: BorderedAccordionProps) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex)

  return (
    <div
      className={cn('flex w-full flex-col gap-4', className)}
      data-figma-node={figmaNode}
      data-name="Info Text Container"
    >
      {items.map((item, index) => {
        const panelId = `${idPrefix}-panel-${item.id}`
        const triggerId = `${idPrefix}-trigger-${item.id}`

        return (
          <BorderedAccordionItem
            key={item.id}
            {...item}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            panelId={panelId}
            triggerId={triggerId}
          />
        )
      })}
    </div>
  )
}
