import { execSync } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

import { config as loadEnv } from 'dotenv'

loadEnv()

const localUrl = process.env.POSTGRES_URL_LOCAL ?? process.env.POSTGRES_URL
if (!localUrl) {
  console.error('Set POSTGRES_URL_LOCAL in .env (e.g. postgresql://oczki:oczki@localhost:5433/oczki)')
  process.exit(1)
}

process.env.POSTGRES_URL = localUrl

const run = (cmd: string) => {
  execSync(cmd, { stdio: 'inherit', env: process.env })
}

const waitForPostgres = async (maxAttempts = 30) => {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      run('docker compose -f docker-compose.db.yml exec -T postgres pg_isready -U oczki -d oczki')
      return
    } catch {
      await sleep(1000)
    }
  }
  throw new Error('Postgres did not become ready in time')
}

console.log('Resetting local Docker Postgres…\n')
run('docker compose -f docker-compose.db.yml down -v')
run('docker compose -f docker-compose.db.yml up -d')

console.log('Waiting for Postgres…')
await waitForPostgres()
console.log('✓ Postgres ready\n')

console.log('Running migrations…')
run('pnpm payload migrate')

console.log('\nSeeding CMS…')
run('pnpm seed:all')

console.log('\n✓ Local database reset complete')
console.log(`  POSTGRES_URL=${localUrl}`)
