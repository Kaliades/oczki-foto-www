import type { OfferItem } from '@/payload-types'

import {
  type CmsEntityKey,
  type MediaReplacement,
  resolveMediaId,
} from '@/utilities/cmsMedia/mediaRefs'
import type { DuplicateFn } from '@/utilities/cmsMedia/offerMedia'

export type { MediaReplacement } from '@/utilities/cmsMedia/mediaRefs'
export type { DuplicateFn } from '@/utilities/cmsMedia/offerMedia'
export { collectOfferMediaIds, splitSharedMediaOnOffer } from '@/utilities/cmsMedia/offerMedia'
export { buildOfferCanonicalOwners as buildCanonicalMediaOwners } from '@/utilities/cmsMedia/offerMedia'

export type { CmsEntityKey }

export { resolveMediaId }
