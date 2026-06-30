import { config as loadEnv } from 'dotenv'

/** Align DB + secrets with `seedAll` when running individual seed scripts. */
export function loadSeedEnv(): void {
  loadEnv()

  const isProductionSeed = process.env.SEED_TARGET === 'production'

  if (isProductionSeed) {
    const payloadSecretBeforeProd = process.env.PAYLOAD_SECRET
    loadEnv({ path: '.env.local', override: true })
    loadEnv({ path: '.env.production.local', override: true })

    const prodDbUrl =
      process.env.DATABASE_URL ||
      process.env.POSTGRES_URL_NON_POOLING ||
      process.env.POSTGRES_URL_VERCEL ||
      process.env.POSTGRES_URL
    if (prodDbUrl) {
      process.env.POSTGRES_URL = prodDbUrl
    }
    if (!process.env.PAYLOAD_SECRET && payloadSecretBeforeProd) {
      process.env.PAYLOAD_SECRET = payloadSecretBeforeProd
    }
  } else if (process.env.POSTGRES_URL_LOCAL) {
    process.env.POSTGRES_URL = process.env.POSTGRES_URL_LOCAL
  }
}
