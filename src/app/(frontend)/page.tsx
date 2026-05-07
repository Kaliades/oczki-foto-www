import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'

const queryHomepage = cache(async () => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  return payload.findGlobal({
    slug: 'homepage',
    draft,
    overrideAccess: draft,
    depth: 2,
  })
})

export default async function HomePage() {
  const homepage = await queryHomepage()
  return <RenderBlocks blocks={homepage.layout ?? []} />
}
