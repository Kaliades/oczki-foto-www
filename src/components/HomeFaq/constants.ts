import { faqSesjeKobieceDefaults, type FaqSectionData } from '@/components/FaqSection'

export const HOME_FAQ_FIGMA_NODES = {
  desktop: '7104:17886',
  tablet: '7104:18237',
  mobile: '7104:19438',
} as const

export type HomeFaqData = FaqSectionData

// TODO(galeria/faq): Replace defaults with Payload gallery page block once CMS schema ships.
export const homeFaqDefaults: HomeFaqData = faqSesjeKobieceDefaults
