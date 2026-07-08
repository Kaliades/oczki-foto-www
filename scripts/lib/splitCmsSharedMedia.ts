import type { Payload } from 'payload'

import type { AboutPage, Gallery, GalleryPage, OfferItem, Page, SiteSetting } from '@/payload-types'

import { duplicateMedia } from './duplicateMedia'
import {
  collectAboutPageMediaIds,
  collectGalleryPageMediaIds,
  collectSiteSettingsMediaIds,
  splitSharedMediaOnAboutPage,
  splitSharedMediaOnGalleryPage,
  splitSharedMediaOnSiteSettings,
} from './globalMediaRefs'
import { collectGalleryMediaIds, splitSharedMediaOnGallery } from './galleryMediaRefs'
import {
  buildGlobalCanonicalOwners,
  type CmsEntityDescriptor,
  entityKey,
  type MediaReplacement,
} from './mediaRefs'
import { collectOfferMediaIds, splitSharedMediaOnOffer } from './offerMediaRefs'
import { collectPageMediaIds, splitSharedMediaOnPage } from './pageMediaRefs'
import { updateVersionedCollectionDoc, updateVersionedGlobal } from './versionedUpdate'

export type EntitySplitSummary = {
  entityKey: string
  label: string
  replacements: MediaReplacement[]
}

export type SplitCmsSharedMediaResult = {
  entitiesChecked: number
  entitiesUpdated: number
  mediaDuplicatesCreated: number
  sharedMediaCount: number
  byEntity: EntitySplitSummary[]
}

export type SplitCmsSharedMediaOptions = {
  apply: boolean
}

const GLOBAL_SLUGS = ['aboutPage', 'siteSettings', 'galleryPage'] as const

function stripCollectionDoc<T extends { id: number; createdAt?: string; updatedAt?: string }>(
  doc: T,
): Omit<T, 'id' | 'createdAt' | 'updatedAt'> {
  const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...data } = doc
  return data
}

function stripGlobalDoc<T extends { id: number; createdAt?: string | null; updatedAt?: string | null }>(
  doc: T,
): Omit<T, 'id' | 'createdAt' | 'updatedAt'> {
  const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...data } = doc
  return data
}

function makeDuplicateFn(
  payload: Payload,
  entityLabel: string,
  apply: boolean,
): (sourceId: number, path: string) => Promise<number> {
  return async (sourceId, path) => {
    if (!apply) {
      payload.logger.info(`[dry-run] Would duplicate media #${sourceId} for ${entityLabel}:${path}`)
      return sourceId
    }

    const suffix = `${entityLabel}-${path}`.replace(/[^\w.-]+/g, '-')
    const newId = await duplicateMedia(payload, sourceId, { nameSuffix: suffix })
    payload.logger.info(`Duplicated media #${sourceId} -> #${newId} (${entityLabel}: ${path})`)
    return newId
  }
}

/**
 * Detaches cross-document media links across offers, galleries, pages, and globals.
 * The lexicographically first entity key keeps the original media record per shared file.
 */
export async function splitCmsSharedMedia(
  payload: Payload,
  options: SplitCmsSharedMediaOptions,
): Promise<SplitCmsSharedMediaResult> {
  const [offersResult, galleriesResult, pagesResult] = await Promise.all([
    payload.find({
      collection: 'offerItems',
      depth: 0,
      limit: 200,
      pagination: false,
      sort: 'id',
      overrideAccess: true,
    }),
    payload.find({
      collection: 'galleries',
      depth: 0,
      limit: 500,
      pagination: false,
      sort: 'id',
      overrideAccess: true,
    }),
    payload.find({
      collection: 'pages',
      depth: 0,
      limit: 100,
      pagination: false,
      sort: 'id',
      overrideAccess: true,
    }),
  ])

  const offers = offersResult.docs as OfferItem[]
  const galleries = galleriesResult.docs as Gallery[]
  const pages = pagesResult.docs as Page[]

  const aboutPage = (await payload.findGlobal({
    slug: 'aboutPage',
    depth: 0,
    overrideAccess: true,
  })) as AboutPage
  const siteSettings = (await payload.findGlobal({
    slug: 'siteSettings',
    depth: 0,
    overrideAccess: true,
  })) as SiteSetting
  const galleryPage = (await payload.findGlobal({
    slug: 'galleryPage',
    depth: 0,
    overrideAccess: true,
  })) as GalleryPage

  const entities: CmsEntityDescriptor[] = [
    ...offers.map((offer) => ({
      key: entityKey('offerItems', offer.id),
      label: offer.slug ?? String(offer.id),
      mediaIds: collectOfferMediaIds(offer),
    })),
    ...galleries.map((gallery) => ({
      key: entityKey('galleries', gallery.id),
      label: gallery.slug ?? String(gallery.id),
      mediaIds: collectGalleryMediaIds(gallery),
    })),
    ...pages.map((page) => ({
      key: entityKey('pages', page.slug),
      label: page.slug,
      mediaIds: collectPageMediaIds(page),
    })),
    {
      key: entityKey('globals', 'aboutPage'),
      label: 'aboutPage',
      mediaIds: collectAboutPageMediaIds(aboutPage),
    },
    {
      key: entityKey('globals', 'siteSettings'),
      label: 'siteSettings',
      mediaIds: collectSiteSettingsMediaIds(siteSettings),
    },
    {
      key: entityKey('globals', 'galleryPage'),
      label: 'galleryPage',
      mediaIds: collectGalleryPageMediaIds(galleryPage),
    },
  ]

  const canonicalOwner = buildGlobalCanonicalOwners(entities)
  const duplicateCache = new Map<string, number>()

  const summary: SplitCmsSharedMediaResult = {
    entitiesChecked: entities.length,
    entitiesUpdated: 0,
    mediaDuplicatesCreated: 0,
    sharedMediaCount: canonicalOwner.size,
    byEntity: [],
  }

  if (canonicalOwner.size === 0) {
    payload.logger.info('No cross-document shared media found — nothing to split.')
    return summary
  }

  payload.logger.info(
    `Found ${canonicalOwner.size} media file(s) shared across ${entities.length} CMS entity/entities.`,
  )

  for (const [mediaId, ownerKey] of canonicalOwner) {
    const users = entities
      .filter((entity) => entity.mediaIds.includes(mediaId))
      .map((entity) => entity.label)
    payload.logger.info(`media #${mediaId}: [${users.join(', ')}] — ${ownerKey} keeps original`)
  }

  for (const offer of offers) {
    const key = entityKey('offerItems', offer.id)
    const label = offer.slug ?? String(offer.id)
    const duplicate = makeDuplicateFn(payload, label, options.apply)
    const { offer: next, replacements } = await splitSharedMediaOnOffer(
      offer,
      key,
      canonicalOwner,
      duplicateCache,
      duplicate,
      { apply: options.apply },
    )

    if (replacements.length === 0) continue

    summary.byEntity.push({ entityKey: key, label, replacements })

    if (options.apply) {
      await updateVersionedCollectionDoc(
        payload,
        'offerItems',
        offer.id,
        stripCollectionDoc(next),
        options,
      )
      summary.entitiesUpdated += 1
      payload.logger.info(`Updated offer #${offer.id} (${label}) — ${replacements.length} reference(s).`)
    } else {
      payload.logger.info(
        `[dry-run] Would update offer #${offer.id} (${label}) — ${replacements.length} reference(s).`,
      )
    }
  }

  for (const gallery of galleries) {
    const key = entityKey('galleries', gallery.id)
    const label = gallery.slug ?? String(gallery.id)
    const duplicate = makeDuplicateFn(payload, label, options.apply)
    const { gallery: next, replacements } = await splitSharedMediaOnGallery(
      gallery,
      key,
      canonicalOwner,
      duplicateCache,
      duplicate,
      { apply: options.apply },
    )

    if (replacements.length === 0) continue

    summary.byEntity.push({ entityKey: key, label, replacements })

    if (options.apply) {
      await updateVersionedCollectionDoc(
        payload,
        'galleries',
        gallery.id,
        stripCollectionDoc(next),
        options,
      )
      summary.entitiesUpdated += 1
      payload.logger.info(
        `Updated gallery #${gallery.id} (${label}) — ${replacements.length} reference(s).`,
      )
    } else {
      payload.logger.info(
        `[dry-run] Would update gallery #${gallery.id} (${label}) — ${replacements.length} reference(s).`,
      )
    }
  }

  for (const page of pages) {
    const key = entityKey('pages', page.slug)
    const label = page.slug
    const duplicate = makeDuplicateFn(payload, label, options.apply)
    const { page: next, replacements } = await splitSharedMediaOnPage(
      page,
      key,
      canonicalOwner,
      duplicateCache,
      duplicate,
      { apply: options.apply },
    )

    if (replacements.length === 0) continue

    summary.byEntity.push({ entityKey: key, label, replacements })

    if (options.apply) {
      await updateVersionedCollectionDoc(payload, 'pages', page.id, stripCollectionDoc(next), options)
      summary.entitiesUpdated += 1
      payload.logger.info(`Updated page #${page.id} (${label}) — ${replacements.length} reference(s).`)
    } else {
      payload.logger.info(
        `[dry-run] Would update page #${page.id} (${label}) — ${replacements.length} reference(s).`,
      )
    }
  }

  const globalJobs: Array<{
    slug: (typeof GLOBAL_SLUGS)[number]
    doc: AboutPage | SiteSetting | GalleryPage
    split: () => Promise<{ doc: AboutPage | SiteSetting | GalleryPage; replacements: MediaReplacement[] }>
  }> = [
    {
      slug: 'aboutPage',
      doc: aboutPage,
      split: () =>
        splitSharedMediaOnAboutPage(
          aboutPage,
          entityKey('globals', 'aboutPage'),
          canonicalOwner,
          duplicateCache,
          makeDuplicateFn(payload, 'aboutPage', options.apply),
          { apply: options.apply },
        ),
    },
    {
      slug: 'siteSettings',
      doc: siteSettings,
      split: () =>
        splitSharedMediaOnSiteSettings(
          siteSettings,
          entityKey('globals', 'siteSettings'),
          canonicalOwner,
          duplicateCache,
          makeDuplicateFn(payload, 'siteSettings', options.apply),
          { apply: options.apply },
        ),
    },
    {
      slug: 'galleryPage',
      doc: galleryPage,
      split: () =>
        splitSharedMediaOnGalleryPage(
          galleryPage,
          entityKey('globals', 'galleryPage'),
          canonicalOwner,
          duplicateCache,
          makeDuplicateFn(payload, 'galleryPage', options.apply),
          { apply: options.apply },
        ),
    },
  ]

  for (const job of globalJobs) {
    const key = entityKey('globals', job.slug)
    const { doc: next, replacements } = await job.split()

    if (replacements.length === 0) continue

    summary.byEntity.push({ entityKey: key, label: job.slug, replacements })

    if (options.apply) {
      await updateVersionedGlobal(payload, job.slug, stripGlobalDoc(next), options)
      summary.entitiesUpdated += 1
      payload.logger.info(`Updated global ${job.slug} — ${replacements.length} reference(s).`)
    } else {
      payload.logger.info(`[dry-run] Would update global ${job.slug} — ${replacements.length} reference(s).`)
    }
  }

  summary.mediaDuplicatesCreated = options.apply
    ? duplicateCache.size
    : new Set(
        summary.byEntity.flatMap((entry) =>
          entry.replacements.map((item) => `${entry.entityKey}:${item.from}`),
        ),
      ).size

  return summary
}
