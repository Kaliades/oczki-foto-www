import type { ButtonHTMLAttributes } from 'react'

import { COOKIE_CONSENT_FIGMA_NODES } from './constants'

type CookieConsentTextActionProps = {
  label: string
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type' | 'className'>

/**
 * Figma `Link` instance (`7064:14831`) — 44 px hit target, underlined body/m medium.
 *
 * Link (h-44, flex, counter-axis center)
 * └── Text (py 4, flex, align center)
 *     └── label — 14 px / lh 21 / ls -0.14, underline, primary-800
 */
export function CookieConsentTextAction({
  label,
  className,
  type = 'button',
  ...buttonProps
}: CookieConsentTextActionProps) {
  return (
    <button
      className={`inline-flex h-11 shrink-0 cursor-pointer items-center justify-center transition-colors hover:text-[var(--oczki-primary-900)] disabled:cursor-not-allowed [font-family:var(--font-oczki-body)] ${className ?? ''}`}
      data-figma-node={COOKIE_CONSENT_FIGMA_NODES.textAction}
      type={type}
      {...buttonProps}
    >
      <span className="inline-flex items-center py-1">
        <span className="text-[14px] font-medium leading-[21px] tracking-[-0.14px] text-[var(--oczki-primary-800)] underline decoration-solid underline-offset-[2px]">
          {label}
        </span>
      </span>
    </button>
  )
}
