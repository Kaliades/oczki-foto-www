import type { Payload } from 'payload'

import { clearSeededCropClasses } from './lib/clearSeededCropClasses'
import { splitOfferSharedMedia } from './lib/splitOfferSharedMedia'
import { runSeedCli } from './lib/seedCli'

const APPLY = process.argv.includes('--apply')

export async function splitOfferMedia(payload: Payload): Promise<void> {
  payload.logger.info(
    APPLY
      ? 'Splitting shared offer media (APPLY mode — writing to database)…'
      : 'Splitting shared offer media (dry-run — pass --apply to write)…',
  )

  const split = await splitOfferSharedMedia(payload, { apply: APPLY })

  payload.logger.info('— Crop cleanup (seeded Figma values on offer cards)')
  const crops = await clearSeededCropClasses(payload, { apply: APPLY, scopes: ['offers'] })

  payload.logger.info('— Summary')
  payload.logger.info(`Offers checked: ${split.offersChecked}, shared media files: ${split.sharedMediaCount}`)
  payload.logger.info(
    `Media split: ${APPLY ? split.offersUpdated : split.replacements.length} offer(s) ${APPLY ? 'updated' : 'would update'}, ${split.mediaDuplicatesCreated} duplicate(s)`,
  )
  payload.logger.info(`Crop cleanup: ${crops.offersUpdated} offer listing card(s)`)

  if (!APPLY && (split.replacements.length > 0 || crops.offersUpdated > 0)) {
    payload.logger.info('Re-run with --apply to persist changes.')
  }
}

runSeedCli(splitOfferMedia, 'splitOfferMedia')
