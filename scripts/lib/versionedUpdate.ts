import type { CollectionSlug, GlobalSlug, Payload } from 'payload'

const DEFAULT_UPDATE_CONTEXT = { disableRevalidate: true } as const

type VersionedUpdateOptions = {
  apply: boolean
}

type UpdateContext = Record<string, unknown>

/**
 * Updates published content and an existing draft version (if any) in one pass.
 * Required for collections/globals with `versions.drafts` so autosaved drafts
 * do not keep stale shared media references after a migration.
 */
export async function updateVersionedCollectionDoc(
  payload: Payload,
  collection: CollectionSlug,
  id: number,
  data: Record<string, unknown>,
  options: VersionedUpdateOptions,
  context: UpdateContext = DEFAULT_UPDATE_CONTEXT,
): Promise<void> {
  if (!options.apply) return

  await payload.update({
    collection,
    id,
    data,
    draft: false,
    overrideAccess: true,
    context,
  })

  try {
    const draftDoc = await payload.findByID({
      collection,
      id,
      draft: true,
      depth: 0,
      overrideAccess: true,
    })

    if (draftDoc && '_status' in draftDoc && draftDoc._status === 'draft') {
      await payload.update({
        collection,
        id,
        data,
        draft: true,
        overrideAccess: true,
        context,
      })
    }
  } catch {
    // No draft version for this document — published update is enough.
  }
}

export async function updateVersionedGlobal(
  payload: Payload,
  slug: GlobalSlug,
  data: Record<string, unknown>,
  options: VersionedUpdateOptions,
  context: UpdateContext = DEFAULT_UPDATE_CONTEXT,
): Promise<void> {
  if (!options.apply) return

  await payload.updateGlobal({
    slug,
    data,
    draft: false,
    overrideAccess: true,
    context,
  })

  try {
    const draftDoc = await payload.findGlobal({
      slug,
      draft: true,
      depth: 0,
      overrideAccess: true,
    })

    if (draftDoc && '_status' in draftDoc && draftDoc._status === 'draft') {
      await payload.updateGlobal({
        slug,
        data,
        draft: true,
        overrideAccess: true,
        context,
      })
    }
  } catch {
    // No draft global — published update is enough.
  }
}
