/**
 * Offer service — FAQ ("Rozwiejmy ostatnie wątpliwości") on `/oferta/[slug]`.
 *
 * Figma references (desktop / tablet / mobile in parallel):
 *   - desktop 1366: https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7100-7617
 *   - tablet  768:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7100-8623
 *   - mobile  360:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7102-10289
 *
 * Same component tree as {@link FaqSection} — copy matches sesje-kobiece defaults.
 */
export const OFFER_SERVICE_FAQ_FIGMA_NODES = {
  desktop: '7100:7617',
  tablet: '7100:8623',
  mobile: '7102:10289',
} as const

export type { FaqSectionData as OfferServiceFaqData } from '@/components/FaqSection'

export { faqSesjeKobieceDefaults as offerServiceFaqSesjeKobieceDefaults } from '@/components/FaqSection'
