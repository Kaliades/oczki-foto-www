import type { Payload } from 'payload'

import { splitOfferSharedMedia } from './lib/splitOfferSharedMedia'
import { runSeedCli } from './lib/seedCli'

const APPLY = process.argv.includes('--apply')

/** @deprecated Use `splitCmsMedia` — kept as alias for offers-only split. */
export async function splitOfferMedia(payload: Payload): Promise<void> {
  payload.logger.info(
    'Note: prefer `pnpm split:cms-media` to split offers and galleries together.',
  )
  await splitOfferSharedMedia(payload, { apply: APPLY })
}

runSeedCli(splitOfferMedia, 'splitOfferMedia')
