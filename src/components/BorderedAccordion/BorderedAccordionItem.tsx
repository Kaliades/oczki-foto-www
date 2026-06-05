'use client'

import { AccordionChevron } from '@/components/Accordion/AccordionChevron'
import { cn } from '@/utilities/ui'

export type BorderedAccordionItemData = {
  body: string
  id: string
  title: string
}

type BorderedAccordionItemProps = BorderedAccordionItemData & {
  isOpen: boolean
  onToggle: () => void
  panelId: string
  triggerId: string
}

/**
 * Inline accordion row — Figma `Info Text Container` inside `Additional Information`.
 *
 * Open: title primary-800, body visible, `pb-[16px]`, trigger/body `gap-[10px]`.
 * Closed: title primary-700, body hidden, `pb-[8px]`.
 */
export function BorderedAccordionItem({
  body,
  isOpen,
  onToggle,
  panelId,
  title,
  triggerId,
}: BorderedAccordionItemProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-start border-b border-[var(--oczki-primary-400)]',
        isOpen ? 'gap-2.5 pb-4' : 'pb-2',
      )}
      data-name="Info Text Container"
    >
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-start justify-between border-0 bg-transparent p-0 text-left"
        id={triggerId}
        onClick={onToggle}
        type="button"
      >
        <span
          className={cn(
            'oczki-body-l min-w-0 flex-1 break-words tracking-[-0.24px]',
            isOpen ? 'text-[var(--oczki-primary-800)]' : 'text-[var(--oczki-primary-700)]',
          )}
        >
          {title}
        </span>
        <AccordionChevron open={isOpen} />
      </button>

      {isOpen ? (
        <p
          aria-labelledby={triggerId}
          className="oczki-body-l w-full break-words tracking-[-0.24px] text-[var(--oczki-primary-700)]"
          id={panelId}
          role="region"
        >
          {body}
        </p>
      ) : null}
    </div>
  )
}
