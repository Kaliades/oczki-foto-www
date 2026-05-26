import type { ButtonHTMLAttributes } from 'react'

import { OCZKI_PILL_FIGMA_NODES } from './constants'

type OczkiPillProps = {
  label: string
  isActive?: boolean
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type' | 'className' | 'aria-current'>

/**
 * Figma `Pill` filter chip — 44 px tall, 6 px top notch, 2 px bottom border on label area.
 *
 * Root (h-44)
 * └── Button (relative, pb-6, bg primary-400 | primary-200)
 *     ├── Button Container (border-b-2 primary-100, px-12 pt-6 pb-4)
 *     │   └── label (body/m medium | regular)
 *     └── Ellipse 32 (8×8, top -4, centered — page-colour notch)
 */
export function OczkiPill({
  label,
  isActive = false,
  className,
  type = 'button',
  ...buttonProps
}: OczkiPillProps) {
  return (
    <div className={`flex h-11 shrink-0 flex-col justify-center ${className ?? ''}`}>
      <button
        className={`relative flex shrink-0 items-center justify-center pb-1.5 ${
          isActive ? 'bg-[var(--oczki-primary-400)]' : 'bg-[var(--oczki-primary-200)]'
        }`}
        data-figma-node={
          isActive ? OCZKI_PILL_FIGMA_NODES.activeButton : OCZKI_PILL_FIGMA_NODES.inactiveButton
        }
        type={type}
        {...buttonProps}
      >
        <span
          className={`border-b-2 border-[var(--oczki-primary-100)] px-3 pb-1 pt-1.5 ${
            isActive ? 'oczki-body-m-medium text-[var(--oczki-primary-800)]' : 'oczki-body-m text-[var(--oczki-primary-700)]'
          }`}
        >
          {label}
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-4px] size-2 -translate-x-1/2 rounded-full bg-[var(--oczki-primary-100)]"
          data-figma-node={OCZKI_PILL_FIGMA_NODES.notchEllipse}
        />
      </button>
    </div>
  )
}
