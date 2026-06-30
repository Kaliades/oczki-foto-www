import type { Payload } from 'payload'

import { getSeedPayload } from './seedPayload'

/** Run a seed module standalone: `pnpm exec tsx scripts/seedFoo.ts` */
export function runSeedCli(fn: (payload: Payload) => Promise<void>, scriptBasename: string): void {
  if (!process.argv[1]?.includes(scriptBasename)) return

  getSeedPayload()
    .then(fn)
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
