import type { AboutPage, GalleryPage, SiteSetting } from '@/payload-types'

import {
  type CmsEntityKey,
  type DuplicateFn,
  type MediaReplacement,
  resolveMediaId,
} from './mediaRefs'

export type { MediaReplacement } from './mediaRefs'

export type CmsGlobalSlug = 'aboutPage' | 'siteSettings' | 'galleryPage'

export function collectAboutPageMediaIds(doc: AboutPage): number[] {
  const ids: number[] = []
  const push = (value: unknown) => {
    const id = resolveMediaId(value)
    if (id != null) ids.push(id)
  }

  push(doc.hero?.portrait)
  push(doc.hero?.secondaryPhoto)
  push(doc.beyond?.backdrop)
  push(doc.dual?.portrait)
  push(doc.instagram?.avatar)
  doc.instagram?.posts?.forEach((post) => push(post.image))

  return ids
}

export function collectSiteSettingsMediaIds(doc: SiteSetting): number[] {
  const ids: number[] = []
  const push = (value: unknown) => {
    const id = resolveMediaId(value)
    if (id != null) ids.push(id)
  }

  push(doc.defaultOgImage)
  push(doc.newsletter?.photo)
  doc.galleryImages?.forEach((row) => push(row.image))

  return ids
}

export function collectGalleryPageMediaIds(doc: GalleryPage): number[] {
  const ids: number[] = []
  const push = (value: unknown) => {
    const id = resolveMediaId(value)
    if (id != null) ids.push(id)
  }

  push(doc.easeSection?.photo)

  return ids
}

async function runReplacements(
  entityKey: CmsEntityKey,
  canonicalOwner: Map<number, CmsEntityKey>,
  duplicateCache: Map<string, number>,
  duplicate: DuplicateFn,
  options: { apply: boolean },
  tasks: Array<{
    path: string
    get: () => unknown
    set: (id: number) => void
  }>,
): Promise<MediaReplacement[]> {
  const replacements: MediaReplacement[] = []

  for (const task of tasks) {
    const mediaId = resolveMediaId(task.get())
    if (mediaId == null) continue

    const owner = canonicalOwner.get(mediaId)
    if (owner == null || owner === entityKey) continue

    const cacheKey = `${entityKey}:${mediaId}`
    let newId = duplicateCache.get(cacheKey)
    if (newId == null) {
      newId = await duplicate(mediaId, task.path)
      duplicateCache.set(cacheKey, newId)
    }

    if (options.apply) {
      task.set(newId)
    }

    replacements.push({ path: task.path, from: mediaId, to: newId })
  }

  return replacements
}

export async function splitSharedMediaOnAboutPage(
  doc: AboutPage,
  entityKey: CmsEntityKey,
  canonicalOwner: Map<number, CmsEntityKey>,
  duplicateCache: Map<string, number>,
  duplicate: DuplicateFn,
  options: { apply: boolean },
): Promise<{ doc: AboutPage; replacements: MediaReplacement[] }> {
  const next = structuredClone(doc) as AboutPage

  const tasks: Array<{ path: string; get: () => unknown; set: (id: number) => void }> = []

  if (next.hero) {
    tasks.push({
      path: 'hero.portrait',
      get: () => next.hero?.portrait,
      set: (id) => {
        if (next.hero) next.hero.portrait = id
      },
    })
    tasks.push({
      path: 'hero.secondaryPhoto',
      get: () => next.hero?.secondaryPhoto,
      set: (id) => {
        if (next.hero) next.hero.secondaryPhoto = id
      },
    })
  }

  if (next.beyond) {
    tasks.push({
      path: 'beyond.backdrop',
      get: () => next.beyond?.backdrop,
      set: (id) => {
        if (next.beyond) next.beyond.backdrop = id
      },
    })
  }

  if (next.dual) {
    tasks.push({
      path: 'dual.portrait',
      get: () => next.dual?.portrait,
      set: (id) => {
        if (next.dual) next.dual.portrait = id
      },
    })
  }

  if (next.instagram) {
    tasks.push({
      path: 'instagram.avatar',
      get: () => next.instagram?.avatar,
      set: (id) => {
        if (next.instagram) next.instagram.avatar = id
      },
    })
    next.instagram.posts?.forEach((post, index) => {
      tasks.push({
        path: `instagram.posts[${index}].image`,
        get: () => post.image,
        set: (id) => {
          post.image = id
        },
      })
    })
  }

  const replacements = await runReplacements(
    entityKey,
    canonicalOwner,
    duplicateCache,
    duplicate,
    options,
    tasks,
  )

  return { doc: next, replacements }
}

export async function splitSharedMediaOnSiteSettings(
  doc: SiteSetting,
  entityKey: CmsEntityKey,
  canonicalOwner: Map<number, CmsEntityKey>,
  duplicateCache: Map<string, number>,
  duplicate: DuplicateFn,
  options: { apply: boolean },
): Promise<{ doc: SiteSetting; replacements: MediaReplacement[] }> {
  const next = structuredClone(doc) as SiteSetting
  const tasks: Array<{ path: string; get: () => unknown; set: (id: number) => void }> = []

  tasks.push({
    path: 'defaultOgImage',
    get: () => next.defaultOgImage,
    set: (id) => {
      next.defaultOgImage = id
    },
  })

  if (next.newsletter) {
    tasks.push({
      path: 'newsletter.photo',
      get: () => next.newsletter?.photo,
      set: (id) => {
        if (next.newsletter) next.newsletter.photo = id
      },
    })
  }

  next.galleryImages?.forEach((row, index) => {
    tasks.push({
      path: `galleryImages[${index}].image`,
      get: () => row.image,
      set: (id) => {
        row.image = id
      },
    })
  })

  const replacements = await runReplacements(
    entityKey,
    canonicalOwner,
    duplicateCache,
    duplicate,
    options,
    tasks,
  )

  return { doc: next, replacements }
}

export async function splitSharedMediaOnGalleryPage(
  doc: GalleryPage,
  entityKey: CmsEntityKey,
  canonicalOwner: Map<number, CmsEntityKey>,
  duplicateCache: Map<string, number>,
  duplicate: DuplicateFn,
  options: { apply: boolean },
): Promise<{ doc: GalleryPage; replacements: MediaReplacement[] }> {
  const next = structuredClone(doc) as GalleryPage
  const tasks: Array<{ path: string; get: () => unknown; set: (id: number) => void }> = []

  if (next.easeSection) {
    tasks.push({
      path: 'easeSection.photo',
      get: () => next.easeSection?.photo,
      set: (id) => {
        if (next.easeSection) next.easeSection.photo = id
      },
    })
  }

  const replacements = await runReplacements(
    entityKey,
    canonicalOwner,
    duplicateCache,
    duplicate,
    options,
    tasks,
  )

  return { doc: next, replacements }
}
