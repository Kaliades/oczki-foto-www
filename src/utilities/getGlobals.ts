import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { type DataFromGlobalSlug, getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Global = keyof Config['globals']

async function getGlobal<T extends Global>(
  slug: T,
  depth = 0,
  draft = false,
): Promise<DataFromGlobalSlug<T>> {
  const payload = await getPayload({ config: configPromise })

  return payload.findGlobal({
    slug,
    depth,
    draft,
    overrideAccess: draft,
  })
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug.
 * Bypassed automatically when Next.js draft mode is enabled (live preview).
 */
export const getCachedGlobal = <T extends Global>(slug: T, depth = 0) =>
  unstable_cache(async () => getGlobal<T>(slug, depth, false), [slug], {
    tags: [`global_${slug}`],
  })

/** Draft-aware global fetch for layout shells used during live preview. */
export async function getGlobalForRequest<T extends Global>(
  slug: T,
  depth = 0,
): Promise<DataFromGlobalSlug<T>> {
  const { isEnabled: draft } = await draftMode()

  if (draft) {
    return getGlobal<T>(slug, depth, true)
  }

  return getCachedGlobal<T>(slug, depth)()
}
