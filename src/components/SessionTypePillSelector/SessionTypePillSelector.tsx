'use client'

import { useState } from 'react'

import { OczkiPill } from '@/components/OczkiPill'

import {
  SESSION_TYPE_PILL_SELECTOR_FIGMA_NODES,
  type SessionTypeOption,
} from './constants'

type SessionTypePillSelectorProps = {
  options: readonly SessionTypeOption[]
  defaultOptionId: string
  question: string
  onChange?: (optionId: string) => void
}

/**
 * Session-type chip grid — Figma `Session type question container`.
 *
 * Session type question container
 * ├── question label (body/m)
 * └── Session type options container — flex-wrap, 6 px / 4 px gap
 *     └── Pill × N
 */
export function SessionTypePillSelector({
  options,
  defaultOptionId,
  question,
  onChange,
}: SessionTypePillSelectorProps) {
  const [activeId, setActiveId] = useState(defaultOptionId)

  return (
    <div className="flex w-full flex-col items-start gap-1 md:gap-1.5">
      <p
        className="oczki-body-m text-[var(--oczki-primary-700)]"
        data-figma-node={SESSION_TYPE_PILL_SELECTOR_FIGMA_NODES.question.desktop}
      >
        {question}
      </p>
      <div
        aria-label={question}
        className="flex w-full flex-wrap content-center items-center gap-x-1 gap-y-0 md:gap-x-1.5 lg:gap-x-1.5"
        data-figma-node={SESSION_TYPE_PILL_SELECTOR_FIGMA_NODES.desktop}
        role="group"
      >
        {options.map((option) => {
          const isActive = option.id === activeId

          return (
            <OczkiPill
              aria-pressed={isActive}
              isActive={isActive}
              key={option.id}
              label={option.label}
              onClick={() => {
                setActiveId(option.id)
                onChange?.(option.id)
              }}
              type="button"
            />
          )
        })}
      </div>
    </div>
  )
}
