'use client'

import { useState } from 'react'

import { cn } from '@/utilities/ui'

import { AccordionItem, type AccordionItemData } from './AccordionItem'

type AccordionProps = {
  items: AccordionItemData[]
  /** Index of the initially expanded item; `-1` for all collapsed. */
  defaultOpenIndex?: number
  className?: string
  idPrefix?: string
}

export function Accordion({
  items,
  defaultOpenIndex = 0,
  className,
  idPrefix = 'accordion',
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex)

  return (
    <div className={cn('flex w-full flex-col gap-2', className)} data-name="FAQs container">
      {items.map((item, index) => {
        const panelId = `${idPrefix}-panel-${item.id}`
        const triggerId = `${idPrefix}-trigger-${item.id}`

        return (
          <AccordionItem
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
