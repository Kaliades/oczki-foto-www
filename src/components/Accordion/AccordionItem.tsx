'use client'

import { AccordionChevron } from './AccordionChevron'

export type AccordionItemData = {
  id: string
  question: string
  answer: string
}

type AccordionItemProps = AccordionItemData & {
  isOpen: boolean
  onToggle: () => void
  panelId: string
  triggerId: string
}

/**
 * Single FAQ accordion row — mirrors Figma component hierarchy:
 *
 * Open (`7064:15114` + `7064:15121`):
 *   Accordion
 *   ├── Question container (bg-300, rounded-br-12)
 *   │     └── Question content (border-b-200) → question + chevron
 *   └── FAQ item / answer (bg-300, rounded-tr-12)
 *         └── Answer content (pr-48) → body copy
 *
 * Closed (`7064:15126`):
 *   Accordion (border-300)
 *     └── Question content → question + chevron
 */
export function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  panelId,
  triggerId,
}: AccordionItemProps) {
  if (isOpen) {
    return (
      <div className="flex w-full flex-col" data-name="Accordion">
        <div
          className="flex w-full items-start rounded-br-xl bg-[var(--oczki-primary-300)] pl-4 pr-5 pt-3.5"
          data-figma-node="7064:15114"
          data-name="Question container"
        >
          <div className="flex min-w-0 flex-1 flex-col items-start justify-center">
            <button
              aria-controls={panelId}
              aria-expanded
              className="flex w-full cursor-pointer items-start justify-center gap-2.5 border-0 border-b border-[var(--oczki-primary-200)] bg-transparent p-0 pb-2.5 text-left"
              data-figma-node="7064:15116"
              id={triggerId}
              onClick={onToggle}
              type="button"
            >
              <span className="oczki-body-xl min-w-0 flex-1 break-words text-[var(--oczki-primary-800)]">
                {question}
              </span>
              <AccordionChevron open />
            </button>
          </div>
        </div>

        <div
          className="flex w-full items-start rounded-tr-xl bg-[var(--oczki-primary-300)] pb-7 pl-4 pr-5 pt-3.5"
          data-figma-node="7064:15121"
          data-name="FAQ item"
        >
          <div className="flex min-w-0 flex-1 flex-col items-start justify-center">
            <div className="flex w-full items-center justify-center pr-12" data-figma-node="7064:15123">
              <p
                aria-labelledby={triggerId}
                className="oczki-body-l min-w-0 flex-1 break-words text-[var(--oczki-primary-700)]"
                id={panelId}
                role="region"
              >
                {answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="flex w-full items-start border border-[var(--oczki-primary-300)] pb-4 pl-4 pr-5 pt-3.5"
      data-name="Accordion"
    >
      <div className="flex min-w-0 flex-1 flex-col items-start justify-center">
        <button
          aria-controls={panelId}
          aria-expanded={false}
          className="flex w-full cursor-pointer items-start justify-center gap-2.5 border-0 bg-transparent p-0 text-left"
          data-figma-node="7064:15127"
          id={triggerId}
          onClick={onToggle}
          type="button"
        >
          <span className="oczki-body-xl min-w-0 flex-1 break-words text-[var(--oczki-primary-700)]">
            {question}
          </span>
          <AccordionChevron open={false} />
        </button>
      </div>
    </div>
  )
}
