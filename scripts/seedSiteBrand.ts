import { readFile } from 'fs/promises'
import path from 'path'

import config from '@payload-config'
import { getPayload } from 'payload'

import { BRAND_ASSETS } from '@/constants/brandAssets'

/**
 * Uploads the branded OG image to Media and wires it into SiteSettings.
 *
 *   pnpm tsx scripts/seedSiteBrand.ts
 */

async function run() {
  const payload = await getPayload({ config })
  const abs = path.resolve(process.cwd(), 'public', BRAND_ASSETS.ogDefault.replace(/^\//, ''))
  const buffer = await readFile(abs)

  const media = await payload.create({
    collection: 'media',
    data: {
      alt: BRAND_ASSETS.ogDefaultAlt,
    },
    file: {
      name: 'brand-og-default.png',
      data: buffer,
      mimetype: 'image/png',
      size: buffer.byteLength,
    },
    context: { disableRevalidate: true },
  })

  await payload.updateGlobal({
    slug: 'siteSettings',
    data: {
      defaultOgImage: media.id,
      defaultOgImageAlt: BRAND_ASSETS.ogDefaultAlt,
    },
    context: { disableRevalidate: true },
  })

  payload.logger.info(`✓ SiteSettings default OG image -> media #${media.id}`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
