import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.js'
import { seedHomepage } from '../src/seeds/homepage.js'

const main = async () => {
  const payload = await getPayload({ config })
  await seedHomepage(payload)
  console.log('✅ Seed complete')
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Seed failed:')
    console.error(err)
    process.exit(1)
  })
