import Image from 'next/image'
import Link from 'next/link'

import { resolveLinkHref, type SectionLink } from '@/utilities/resolveLinkHref'

import {
  OCZKI_CONSENT_CHECKBOX_EXTERNAL_ICON,
  OCZKI_CONSENT_CHECKBOX_FIGMA_NODES,
} from './constants'

type OczkiConsentCheckboxProps = {
  id: string
  name?: string
  privacyLink: SectionLink
  /** Leading copy before the privacy link — defaults to Figma `7064:14758`. */
  labelPrefix?: string
  /** Sage newsletter column vs cream contact form. */
  variant?: 'onSage' | 'onCream'
}

/**
 * Privacy consent row — Figma `Checkbox` (`7064:14927`).
 *
 * Checkbox (44×44 click area)
 * └── Text row — prefix + underlined link + external icon
 */
export function OczkiConsentCheckbox({
  id,
  name = 'consent',
  privacyLink,
  labelPrefix = 'Wyrażam zgodę na ',
  variant = 'onCream',
}: OczkiConsentCheckboxProps) {
  const privacyHref = resolveLinkHref(privacyLink)
  const isOnSage = variant === 'onSage'

  return (
    <div
      className="flex h-11 items-center"
      data-figma-node={OCZKI_CONSENT_CHECKBOX_FIGMA_NODES.root}
    >
      <div className="flex size-11 shrink-0 items-center justify-center">
        <input
          className="size-[26px] shrink-0 appearance-none border border-[var(--oczki-secondary-200)] bg-transparent checked:border-[var(--oczki-primary-300)] checked:bg-[var(--oczki-primary-300)]"
          data-figma-node={OCZKI_CONSENT_CHECKBOX_FIGMA_NODES.checkbox}
          id={id}
          name={name}
          required
          type="checkbox"
        />
      </div>
      <div className="flex flex-wrap items-center gap-1">
        <label
          className={`oczki-body-m ${isOnSage ? 'text-[var(--oczki-primary-100)]' : 'text-[var(--oczki-primary-700)]'}`}
          htmlFor={id}
        >
          {labelPrefix}
        </label>
        {privacyHref ? (
          <Link
            className={`oczki-body-m-medium inline-flex items-center gap-1 underline ${
              isOnSage
                ? 'text-[var(--oczki-primary-300)]'
                : 'text-[var(--oczki-primary-800)]'
            }`}
            data-figma-node={OCZKI_CONSENT_CHECKBOX_FIGMA_NODES.link}
            href={privacyHref}
            target={privacyLink.newTab ? '_blank' : undefined}
          >
            {privacyLink.label}
            <Image
              alt=""
              aria-hidden="true"
              className="size-4"
              height={16}
              src={OCZKI_CONSENT_CHECKBOX_EXTERNAL_ICON}
              width={16}
            />
          </Link>
        ) : null}
      </div>
    </div>
  )
}
