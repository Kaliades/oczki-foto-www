import type { Payload } from 'payload'

/** Run a seed module standalone: `pnpm exec tsx scripts/seedFoo.ts` */
export function runSeedCli(fn: (payload: Payload) => Promise<void>, scriptBasename: string): void {
  if (!process.argv[1]?.includes(scriptBasename)) return

  void (async () => {
    const { loadSeedEnv } = await import('./seedEnv')
    loadSeedEnv()
    const { getSeedPayload } = await import('./seedPayload')
    await fn(await getSeedPayload())
    process.exit(0)
  })().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
