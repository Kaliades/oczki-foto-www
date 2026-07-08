import type { Payload } from 'payload'

import { clearSeededCropClasses } from './lib/clearSeededCropClasses'
import { splitCmsSharedMedia } from './lib/splitCmsSharedMedia'
import { runSeedCli } from './lib/seedCli'

const APPLY = process.argv.includes('--apply')

export async function splitCmsMedia(payload: Payload): Promise<void> {
  payload.logger.info(
    APPLY
      ? 'Splitting shared CMS media (APPLY mode — writing to database)…'
      : 'Splitting shared CMS media (dry-run — pass --apply to write)…',
  )

  payload.logger.info('— Step 1: Cross-collection media split (offers, galleries, pages, globals)')
  const split = await splitCmsSharedMedia(payload, { apply: APPLY })

  payload.logger.info('— Step 2: Clear seeded Figma crop classes from CMS fields')
  const crops = await clearSeededCropClasses(payload, { apply: APPLY })

  payload.logger.info('— Summary')
  payload.logger.info(
    `Entities checked: ${split.entitiesChecked}, shared media files: ${split.sharedMediaCount}`,
  )
  payload.logger.info(
    `Media split: ${APPLY ? split.entitiesUpdated : split.byEntity.length} entity/entities ${APPLY ? 'updated' : 'would update'}, ${split.mediaDuplicatesCreated} duplicate(s)`,
  )
  payload.logger.info(
    `Crop cleanup: ${crops.offersUpdated} offer(s), ${crops.pagesUpdated} page(s), aboutPage ${(APPLY ? crops.aboutPageUpdated : crops.aboutPageWouldUpdate) ? 'yes' : 'no'}`,
  )

  if (
    !APPLY &&
    (split.byEntity.length > 0 ||
      crops.offersUpdated > 0 ||
      crops.pagesUpdated > 0 ||
      crops.aboutPageWouldUpdate)
  ) {
    payload.logger.info('Re-run with --apply to persist changes.')
  }
}

runSeedCli(splitCmsMedia, 'splitCmsMedia')
