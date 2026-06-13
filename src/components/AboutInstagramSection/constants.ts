import type { InstagramSectionData } from '@/components/InstagramSection'

export type AboutInstagramSectionData = InstagramSectionData

export const ABOUT_INSTAGRAM_FIGMA_NODES = {
  desktop: '7105:7422',
  tablet: '7105:7437',
  mobile: '7105:7452',
} as const

export { instagramSectionDefaults as aboutInstagramDefaults } from '@/components/InstagramSection/constants'
