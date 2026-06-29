import type { ConsentRuntimeConfig } from '@/consent/mapCookieConsentGlobal'
import type { ConsentChoices } from '@/consent/types'

import { CookiePreferencesCategoryRow } from './CookiePreferencesCategoryRow'
import { COOKIE_CONSENT_FIGMA_NODES, COOKIE_CONSENT_TEXTS_RADIUS } from './constants'

type CookiePreferencesCopyProps = {
  config: ConsentRuntimeConfig
  draftChoices: ConsentChoices
  onDraftChoiceChange: (key: keyof ConsentChoices, value: boolean) => void
}

export function CookiePreferencesCopy({
  config,
  draftChoices,
  onDraftChoiceChange,
}: CookiePreferencesCopyProps) {
  const { preferencesCopy: copy } = config

  return (
    <div
      className="flex w-full flex-col gap-4 bg-[var(--oczki-primary-100)] px-5 pt-3 pb-5 md:gap-5 md:px-8 md:pt-7 md:pb-9"
      data-figma-node={COOKIE_CONSENT_FIGMA_NODES.desktopTexts}
      data-name="Preferences texts"
      style={{ borderRadius: COOKIE_CONSENT_TEXTS_RADIUS }}
    >
      <div className="flex w-full flex-col gap-[10px]">
        <h2
          className="w-full text-[20px] leading-[21px] tracking-[-0.2px] text-[var(--oczki-primary-800)] [font-family:var(--font-oczki-display)] [font-feature-settings:'lnum'_1,'pnum'_1] md:text-[24px] md:leading-[25px] md:tracking-[-0.24px]"
          id="cookie-preferences-title"
        >
          {copy.title}
        </h2>
        <p className="oczki-body-l w-full leading-[24px] tracking-[-0.24px] text-[var(--oczki-primary-700)]">
          {copy.intro}
        </p>
      </div>

      <div className="flex w-full flex-col">
        <CookiePreferencesCategoryRow
          categoryId="necessary"
          checked
          copy={copy.necessary}
          disabled
        />

        {config.analyticsEnabled ? (
          <CookiePreferencesCategoryRow
            categoryId="analytics"
            checked={draftChoices.analytics}
            copy={copy.analytics}
            onCheckedChange={(value) => onDraftChoiceChange('analytics', value)}
          />
        ) : null}

        {config.marketingEnabled ? (
          <CookiePreferencesCategoryRow
            categoryId="marketing"
            checked={draftChoices.marketing}
            copy={copy.marketing}
            onCheckedChange={(value) => onDraftChoiceChange('marketing', value)}
          />
        ) : null}
      </div>
    </div>
  )
}
