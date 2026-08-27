/**
 * Read-only prod check: shared media refs + Payload folder inventory.
 * Usage: SEED_TARGET=production pnpm exec tsx scripts/checkSharedMediaAndFolders.ts
 */
import { loadSeedEnv } from './lib/seedEnv'

loadSeedEnv()

const MEDIA_KEY_RE = /(image|photo|media|portrait|landscape|cover|scallop|background|icon|logo|og)/i

function collectMediaRefs(node: unknown, path: string, out: number[]) {
  if (node == null) return
  if (typeof node === 'number' && Number.isInteger(node)) {
    const leaf = path.split('.').pop() || ''
    if (MEDIA_KEY_RE.test(leaf)) out.push(node)
    return
  }
  if (Array.isArray(node)) {
    node.forEach((n, i) => collectMediaRefs(n, `${path}[${i}]`, out))
    return
  }
  if (typeof node === 'object') {
    const o = node as Record<string, unknown>
    if ('id' in o && typeof o.id === 'number' && ('url' in o || 'filename' in o || 'mimeType' in o)) {
      out.push(o.id)
      return
    }
    for (const [k, v] of Object.entries(o)) {
      if (k === 'id' || k === 'relatedOfferItem') continue
      if (typeof v === 'number' && MEDIA_KEY_RE.test(k)) out.push(v)
      else collectMediaRefs(v, path ? `${path}.${k}` : k, out)
    }
  }
}

type Owner = { collection: string; docId: number | string; slug?: string }

async function main() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config')
  const payload = await getPayload({ config })

  const owners = new Map<number, Owner[]>()

  const addOwners = (collection: string, doc: { id: number | string; slug?: string }) => {
    const refs: number[] = []
    collectMediaRefs(doc, '', refs)
    for (const id of new Set(refs)) {
      const list = owners.get(id) || []
      list.push({ collection, docId: doc.id, slug: doc.slug })
      owners.set(id, list)
    }
  }

  for (const c of ['galleries', 'offerItems', 'pages', 'posts'] as const) {
    let page = 1
    while (true) {
      const res = await payload.find({
        collection: c,
        limit: 50,
        page,
        depth: 0,
        draft: true,
        overrideAccess: true,
      })
      for (const doc of res.docs) {
        addOwners(c, doc as { id: number | string; slug?: string })
      }
      if (!res.hasNextPage) break
      page++
    }
  }

  for (const g of [
    'header',
    'footer',
    'siteSettings',
    'galleryPage',
    'aboutPage',
    'contactPage',
    'privacyPolicyPage',
    'cookieConsent',
  ] as const) {
    try {
      const doc = await payload.findGlobal({ slug: g, depth: 0, overrideAccess: true, draft: true })
      addOwners(`global:${g}`, { ...doc, id: g })
    } catch {
      // ignore missing globals
    }
  }

  const shared = [...owners.entries()].filter(([, o]) => o.length > 1)
  const sharedAcross = shared.filter(([, o]) => new Set(o.map((x) => x.collection)).size > 1)

  const folders = await payload.find({
    collection: 'payload-folders',
    limit: 200,
    depth: 0,
    overrideAccess: true,
  })

  let mediaInFolders = 0
  let mediaNoFolder = 0
  let mediaTotal = 0
  let page = 1
  while (true) {
    const res = await payload.find({
      collection: 'media',
      limit: 100,
      page,
      depth: 0,
      overrideAccess: true,
    })
    mediaTotal += res.docs.length
    for (const m of res.docs) {
      if ((m as { folder?: unknown }).folder == null) mediaNoFolder++
      else mediaInFolders++
    }
    if (!res.hasNextPage) break
    page++
  }

  const portfolioLeft = await payload.find({
    collection: 'galleries',
    where: { slug: { like: 'portfolio-%' } },
    limit: 1,
    depth: 0,
    draft: true,
    overrideAccess: true,
  })
  const live = await payload.find({
    collection: 'galleries',
    where: {
      and: [{ showOnPortfolio: { equals: true } }, { _status: { equals: 'published' } }],
    },
    limit: 1,
    depth: 0,
  })

  console.log(
    JSON.stringify(
      {
        portfolioGalleriesLeft: portfolioLeft.totalDocs,
        livePublishedOnPortfolio: live.totalDocs,
        referencedMedia: owners.size,
        sharedCount: shared.length,
        sharedAcrossCollections: sharedAcross.length,
        sharedAcrossSample: sharedAcross.slice(0, 10).map(([id, o]) => ({ id, owners: o })),
        foldersCount: folders.totalDocs,
        folders: folders.docs.map((f) => ({
          id: f.id,
          name: (f as { name?: string }).name,
          parent: (f as { folder?: unknown }).folder,
        })),
        mediaTotal,
        mediaInFolders,
        mediaNoFolder,
      },
      null,
      2,
    ),
  )

  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
