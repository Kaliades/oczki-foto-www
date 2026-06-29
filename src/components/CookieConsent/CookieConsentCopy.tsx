import Link from 'next/link'

import type { CookieConsentCopyData } from './constants'
import { COOKIE_CONSENT_FIGMA_NODES, COOKIE_CONSENT_TEXTS_RADIUS } from './constants'

type CookieConsentCopyProps = {
  copy: CookieConsentCopyData
}

/**
 * Figma `Texts` (`7112:11481`) — separate top band, bottom corners rounded 24 px.
 *
 * Texts (column, gap 10, primary-100 bg, radius 0 0 24 24)
 * ├── Main Text — The Seasons 20 px / lh 21 (mobile), 24 px / lh 25 (tablet+)
 * └── Description — Instrument Sans 16 px / lh 24 + underlined learn-more link
 */
export function CookieConsentCopy({ copy }: CookieConsentCopyProps) {
  return (
    <div
      className="flex w-full flex-col gap-[10px] bg-[var(--oczki-primary-100)] px-5 pt-3 pb-5 md:px-8 md:pt-7 md:pb-9"
      data-figma-node={COOKIE_CONSENT_FIGMA_NODES.desktopTexts}
      data-name="Texts"
      style={{ borderRadius: COOKIE_CONSENT_TEXTS_RADIUS }}
    >
      <h2
        className="w-full text-[20px] leading-[21px] tracking-[-0.2px] text-[var(--oczki-primary-800)] [font-family:var(--font-oczki-display)] [font-feature-settings:'lnum'_1,'pnum'_1] md:text-[24px] md:leading-[25px] md:tracking-[-0.24px]"
        data-figma-node={COOKIE_CONSENT_FIGMA_NODES.desktopTitle}
        id="cookie-consent-title"
      >
        {copy.title}
      </h2>

      <p
        className="oczki-body-l w-full leading-[24px] tracking-[-0.24px] text-[var(--oczki-primary-700)]"
        data-figma-node={COOKIE_CONSENT_FIGMA_NODES.desktopDescription}
      >
        {copy.descriptionBeforeLink}
        <Link
          className="cursor-pointer underline decoration-solid underline-offset-[2px] transition-colors hover:text-[var(--oczki-primary-800)]"
          href={copy.learnMoreHref}
        >
          {copy.learnMoreLabel}
        </Link>
      </p>
    </div>
  )
}
