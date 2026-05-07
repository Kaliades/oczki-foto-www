import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.js'
import { seedHomepage } from '../src/seeds/homepage.js'

const main = async () => {
  const payload = await getPayload({ config })
  try {
    await seedHomepage(payload)
    console.log('✅ Seed complete')
  } finally {
    process.exit(0)
  }
}

main().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
