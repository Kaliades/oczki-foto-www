import type { Payload } from 'payload'

import type { AboutPage, OfferItem, Page } from '@/payload-types'

import {
  isSeededCropClassName,
  isSeededOfferImageCropClassName,
} from './seededCropValues'
import { updateVersionedCollectionDoc, updateVersionedGlobal } from './versionedUpdate'

const UPDATE_CONTEXT = { disableRevalidate: true, disableMediaDedupe: true } as const

export type ClearSeededCropClassesResult = {
  offersChecked: number
  offersUpdated: number
  pagesChecked: number
  pagesUpdated: number
  aboutPageUpdated: boolean
  aboutPageWouldUpdate: boolean
}

export type ClearSeededCropClassesOptions = {
  apply: boolean
  scopes?: Array<'offers' | 'pages' | 'aboutPage'>
}

function stripCollectionDoc<T extends { id: number; createdAt?: string; updatedAt?: string }>(
  doc: T,
): Omit<T, 'id' | 'createdAt' | 'updatedAt'> {
  const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...data } = doc
  return data
}

function clearOfferCropFields(offer: OfferItem): boolean {
  let changed = false

  if (isSeededOfferImageCropClassName(offer.imageCropClassName)) {
    offer.imageCropClassName = null
    changed = true
  }

  return changed
}

function clearPageCropFields(page: Page): boolean {
  let changed = false

  for (const block of page.layout ?? []) {
    if (block.blockType !== 'homeInstagram' || !block.posts) continue

    for (const post of block.posts) {
      if (isSeededCropClassName(post.cropClassName)) {
        post.cropClassName = null
        changed = true
      }
    }
  }

  return changed
}

function clearAboutPageCropFields(doc: AboutPage): boolean {
  let changed = false

  for (const post of doc.instagram?.posts ?? []) {
    if (isSeededCropClassName(post.cropClassName)) {
      post.cropClassName = null
      changed = true
    }
  }

  return changed
}

/**
 * Removes Figma skeleton crop classes persisted by seed scripts.
 * Asia's custom crop values (if any) are left untouched.
 */
export async function clearSeededCropClasses(
  payload: Payload,
  options: ClearSeededCropClassesOptions,
): Promise<ClearSeededCropClassesResult> {
  const scopes = options.scopes ?? ['offers', 'pages', 'aboutPage']

  const summary: ClearSeededCropClassesResult = {
    offersChecked: 0,
    offersUpdated: 0,
    pagesChecked: 0,
    pagesUpdated: 0,
    aboutPageUpdated: false,
    aboutPageWouldUpdate: false,
  }

  if (scopes.includes('offers')) {
    const offersResult = await payload.find({
      collection: 'offerItems',
      depth: 0,
      limit: 200,
      pagination: false,
      overrideAccess: true,
    })

    for (const offer of offersResult.docs as OfferItem[]) {
      summary.offersChecked += 1
      const next = structuredClone(offer) as OfferItem
      if (!clearOfferCropFields(next)) continue

      if (options.apply) {
        await updateVersionedCollectionDoc(
          payload,
          'offerItems',
          offer.id,
          stripCollectionDoc(next),
          options,
          UPDATE_CONTEXT,
        )
        summary.offersUpdated += 1
        payload.logger.info(`Cleared seeded crop on offer #${offer.id} (${offer.slug})`)
      } else {
        summary.offersUpdated += 1
        payload.logger.info(`[dry-run] Would clear seeded crop on offer #${offer.id} (${offer.slug})`)
      }
    }
  }

  if (scopes.includes('pages')) {
    const pagesResult = await payload.find({
      collection: 'pages',
      depth: 0,
      limit: 100,
      pagination: false,
      overrideAccess: true,
    })

    for (const page of pagesResult.docs as Page[]) {
      summary.pagesChecked += 1
      const next = structuredClone(page) as Page
      if (!clearPageCropFields(next)) continue

      if (options.apply) {
        await updateVersionedCollectionDoc(
          payload,
          'pages',
          page.id,
          stripCollectionDoc(next),
          options,
        )
        summary.pagesUpdated += 1
        payload.logger.info(`Cleared seeded Instagram crops on page #${page.id} (${page.slug})`)
      } else {
        summary.pagesUpdated += 1
        payload.logger.info(
          `[dry-run] Would clear seeded Instagram crops on page #${page.id} (${page.slug})`,
        )
      }
    }
  }

  if (scopes.includes('aboutPage')) {
    const aboutPage = (await payload.findGlobal({
      slug: 'aboutPage',
      depth: 0,
      overrideAccess: true,
    })) as AboutPage

    const nextAbout = structuredClone(aboutPage) as AboutPage
    if (clearAboutPageCropFields(nextAbout)) {
      if (options.apply) {
        const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...data } = nextAbout
        await updateVersionedGlobal(payload, 'aboutPage', data, options)
        summary.aboutPageUpdated = true
        payload.logger.info('Cleared seeded Instagram crops on aboutPage global')
      } else {
        summary.aboutPageWouldUpdate = true
        payload.logger.info('[dry-run] Would clear seeded Instagram crops on aboutPage global')
      }
    }
  }

  return summary
}
