/**
 * Cookie consent banner — Figma `cookies` component.
 *
 * Desktop 1366: https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7112-11480
 * Tablet  768:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7118-9192
 * Mobile  360:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7118-9219
 */
export const COOKIE_CONSENT_FIGMA_NODES = {
  desktopPanel: '7112:11480',
  tabletPanel: '7118:9192',
  mobilePanel: '7118:9219',
  desktopTexts: '7112:11481',
  tabletTexts: '7118:9193',
  mobileTexts: '7118:9220',
  desktopTitle: '7112:11483',
  tabletTitle: '7118:9194',
  mobileTitle: '7118:9221',
  desktopDescription: '7112:11486',
  tabletDescription: '7118:9195',
  mobileDescription: '7118:9222',
  desktopButtons: '7112:11487',
  tabletButtons: '7118:9196',
  mobileButtons: '7118:9223',
  acceptButton: '7063:14172',
  textAction: '7064:14831',
} as const

/** Figma `Buttons` fill — between primary-100 and primary-200 (`#f5f1ec`). */
export const COOKIE_CONSENT_ACTIONS_BG = '#f5f1ec' as const

/** Figma `Texts` (`7112:11481`) — bottom corners only. */
export const COOKIE_CONSENT_TEXTS_RADIUS = '0 0 24px 24px' as const

/** Figma `Buttons` (`7112:11487`) — top corners only. */
export const COOKIE_CONSENT_ACTIONS_RADIUS = '24px 24px 0 0' as const

export const COOKIE_CONSENT_PANEL_WIDTH = {
  mobile: 328,
  tablet: 608,
  desktop: 673,
} as const

export const COOKIE_CONSENT_TEXTS_PADDING = {
  mobile: { px: 20, pt: 12, pb: 20, gap: 10 },
  tabletDesktop: { px: 32, pt: 28, pb: 36, gap: 10 },
} as const

export const COOKIE_CONSENT_ACTIONS_PADDING = {
  mobile: { px: 20, pt: 16, pb: 20, gap: 4 },
  tabletDesktop: { px: 32, pt: 20, pb: 24, primarySecondaryGap: 48 },
} as const

export const COOKIE_CONSENT_SECONDARY_GAP = 16 as const

export type CookieConsentCopyData = {
  title: string
  descriptionBeforeLink: string
  learnMoreLabel: string
  learnMoreHref: string
  acceptLabel: string
  preferencesLabel: string
  rejectLabel: string
}

export const cookieConsentCopyDefaults: CookieConsentCopyData = {
  title: 'Korzystając ze strony zgadzasz się na\u00a0użycie ciasteczek',
  descriptionBeforeLink:
    'Korzystamy z\u00a0cookie i\u00a0podobnych technologii, by\u00a0analizować ruch na\u00a0stronie, dopasować ją do\u00a0Ciebie i\u00a0wyświetlać trafniejsze reklamy. ',
  learnMoreLabel: 'Dowiedz się więcej',
  learnMoreHref: '/polityka-prywatnosci#privacy-cookies',
  acceptLabel: 'Zgoda na wszystkie',
  preferencesLabel: 'Ustaw preferencje',
  rejectLabel: 'Odmowa',
}

export type CookieCategoryCopy = {
  title: string
  description: string
}

export type CookiePreferencesCopyData = {
  title: string
  intro: string
  saveLabel: string
  backLabel: string
  rejectAllLabel: string
  necessary: CookieCategoryCopy
  analytics: CookieCategoryCopy
  marketing: CookieCategoryCopy
}

export const cookiePreferencesCopyDefaults: CookiePreferencesCopyData = {
  title: 'Ustawienia cookies',
  intro: 'Wybierz, na\u00a0co wyrażasz zgodę. Cookies niezbędne są zawsze aktywne — bez nich strona nie działa poprawnie.',
  saveLabel: 'Zapisz wybór',
  backLabel: 'Wstecz',
  rejectAllLabel: 'Odrzuć wszystkie',
  necessary: {
    title: 'Niezbędne',
    description: 'Konieczne do poprawnego wyświetlania strony i\u00a0zapamiętania Twoich ustawień.',
  },
  analytics: {
    title: 'Analityczne',
    description:
      'Pozwalają nam badać, jak korzystasz ze\u00a0strony, abyśmy mogli ją ulepszać (Google Analytics).',
  },
  marketing: {
    title: 'Marketingowe',
    description:
      'Umożliwiają wyświetlanie reklam dopasowanych do\u00a0Twoich zainteresowań (np. Meta Pixel).',
  },
}
