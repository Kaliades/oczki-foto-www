import { homeOfferDefaults } from '@/components/HomeOfferShowcase/constants'
import { instagramSectionDefaults } from '@/components/InstagramSection/constants'

/** Figma skeleton crop strings written into CMS by seed scripts — safe to clear after upload. */
export const SEEDED_OFFER_IMAGE_CROP_CLASS_NAMES = new Set(
  homeOfferDefaults.items
    .map((item) => item.cropClassName)
    .filter((value): value is string => Boolean(value)),
)

export const SEEDED_INSTAGRAM_CROP_CLASS_NAMES = new Set(
  instagramSectionDefaults.posts
    .map((post) => post.cropClassName)
    .filter((value): value is string => Boolean(value)),
)

export function isSeededCropClassName(value: string | null | undefined): boolean {
  if (!value) return false
  return SEEDED_INSTAGRAM_CROP_CLASS_NAMES.has(value)
}

export function isSeededOfferImageCropClassName(value: string | null | undefined): boolean {
  if (!value) return false
  return SEEDED_OFFER_IMAGE_CROP_CLASS_NAMES.has(value)
}
