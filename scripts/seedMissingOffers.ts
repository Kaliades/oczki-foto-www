import { readFile } from 'fs/promises'
import path from 'path'

import config from '@payload-config'
import { getPayload } from 'payload'

/**
 * Seeds the three placeholder offer items that use the sesje-kobiece content
 * skeleton as a starting point, with correct titles and card thumbnails.
 *
 * Run with:
 *   pnpm payload run scripts/seedMissingOffers.ts
 *
 * Idempotent — each slug is deleted before re-creating.
 */

function mimeFromExt(filePath: string): string {
  const ext = filePath.split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'png': return 'image/png'
    case 'jpg':
    case 'jpeg': return 'image/jpeg'
    case 'webp': return 'image/webp'
    default: return 'application/octet-stream'
  }
}

const OFFERS = [
  {
    slug: 'reportaze-slubne',
    title: 'Reportaż ślubny',
    shortDescription:
      'Jestem obok, ale nie na pierwszym planie. Łapię spojrzenia, gesty i momenty, które często umykają w dniu ślubu.',
    imageSrc: '/figma/offer-reportaz-slubny.png',
    imageAlt: 'Para młoda patrząca na siebie podczas reportażu ślubnego',
  },
  {
    slug: 'sesje-wizerunkowe',
    title: 'Sesja wizerunkowa',
    shortDescription:
      'Dla kobiet i marek osobistych, które chcą zdjęć spójnych z tym, kim są. Pomagam stworzyć wizerunek, który jest naturalny, profesjonalny i prawdziwy jednocześnie.',
    imageSrc: '/figma/offer-session-wizerunkowa.png',
    imageAlt: 'Kobieta siedząca z notesem podczas sesji wizerunkowej',
    imageCropClassName: 'h-[150%] top-[-16.62%] w-full',
  },
  {
    slug: 'sesje-rodzinne',
    title: 'Sesja rodzinna',
    shortDescription:
      'Bez ustawiania i sztucznego uśmiechu. Z ruchem, bliskością i przestrzenią na bycie razem. To pamiątka z codzienności, do której chce się wracać.',
    imageSrc: '/figma/offer-session-rodzinna.png',
    imageAlt: 'Mama trzymająca dziecko przy oknie',
  },
] as const

async function run() {
  const payload = await getPayload({ config })
  let uploadCounter = 0

  const uploadImage = async (src: string, alt: string): Promise<number> => {
    const rel = src.replace(/^\//, '')
    const abs = path.resolve(process.cwd(), 'public', rel)
    const buffer = await readFile(abs)
    const base = path.basename(abs)
    const uniqueName = `${String(++uploadCounter).padStart(3, '0')}-missing-${base}`

    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      file: { name: uniqueName, data: buffer, mimetype: mimeFromExt(abs), size: buffer.byteLength },
      context: { disableRevalidate: true },
    })

    payload.logger.info(`Uploaded ${rel} -> media #${doc.id}`)
    return doc.id
  }

  for (const offer of OFFERS) {
    const existing = await payload.find({
      collection: 'offerItems',
      where: { slug: { equals: offer.slug } },
      limit: 1,
      depth: 0,
    })

    if (existing.docs.length > 0) {
      await payload.delete({
        collection: 'offerItems',
        id: existing.docs[0].id,
        context: { disableRevalidate: true },
      })
      payload.logger.info(`Deleted existing offer #${existing.docs[0].id} (${offer.slug})`)
    }

    const imageId = await uploadImage(offer.imageSrc, offer.imageAlt)

    const created = await payload.create({
      collection: 'offerItems',
      data: {
        title: offer.title,
        shortDescription: offer.shortDescription,
        image: imageId,
        imageAlt: offer.imageAlt,
        imageCropClassName: 'imageCropClassName' in offer ? offer.imageCropClassName : undefined,
        slug: offer.slug,
        _status: 'published' as const,
        publishedAt: new Date().toISOString(),
      },
      context: { disableRevalidate: true },
    })

    payload.logger.info(`Seeded offer "${created.slug}" -> #${created.id}`)
  }
}

await run()
