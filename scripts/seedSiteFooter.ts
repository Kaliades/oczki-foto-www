/**
 * Populates SiteSettings with newsletter + footer content from
 * homeFooterNewsletterDefaults. Run once after the schema migration.
 *
 * Also seeds the home page layout in Payload with the three new blocks
 * (homeAbout, homeInstagram, homeCta) so they render without empty data.
 *
 *   pnpm tsx scripts/seedSiteFooter.ts
 */
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let uploadCounter = 0
async function uploadImage(
  payload: Awaited<ReturnType<typeof getPayload>>,
  relPath: string,
  altText: string,
): Promise<number | null> {
  const fullPath = path.resolve(__dirname, '..', 'public', relPath.replace(/^\//, ''))
  if (!fs.existsSync(fullPath)) {
    console.warn(`Image not found, skipping: ${fullPath}`)
    return null
  }
  const filename = `${String(++uploadCounter).padStart(3, '0')}-${path.basename(fullPath)}`
  const media = await payload.create({
    collection: 'media',
    data: { alt: altText },
    file: {
      data: fs.readFileSync(fullPath),
      mimetype: 'image/png',
      name: filename,
      size: fs.statSync(fullPath).size,
    },
  })
  return media.id
}

async function run() {
  const payload = await getPayload({ config: configPromise })

  console.log('Seeding SiteSettings newsletter + footer…')

  // -- Upload newsletter photo --
  const newsletterPhotoId = await uploadImage(
    payload,
    '/figma/newsletter-photo.png',
    'Kobieta siedząca na białej kanapie z filiżanką w dłoni',
  )

  // -- Upload footer gallery images --
  const galleryImageFiles = [
    { src: '/figma/footer-gallery-1.png', alt: 'Para w plenerze — reportaż ślubny' },
    { src: '/figma/footer-gallery-2.png', alt: 'Twierdza w słońcu — plener ślubny' },
    { src: '/figma/footer-gallery-3.png', alt: 'Pan młody niesie panią młodą' },
    { src: '/figma/footer-gallery-4.png', alt: 'Portret kobiety w kwiatach' },
    { src: '/figma/footer-gallery-5.png', alt: 'Para w plenerze — sesja ślubna' },
    { src: '/figma/footer-gallery-6.png', alt: 'Portret kobiety w kwiatach — sesja kobieca' },
  ]
  const galleryIds: { image: number; alt: string }[] = []
  for (const img of galleryImageFiles) {
    const id = await uploadImage(payload, img.src, img.alt)
    if (id) galleryIds.push({ image: id, alt: img.alt })
  }

  // -- Update SiteSettings --
  await payload.updateGlobal({
    slug: 'siteSettings',
    data: {
      // Newsletter tab
      newsletter: {
        heading: {
          plain: 'Małe wskazówki, wielka ',
          emphasis: 'pewność siebie',
          plainEnd: ' przed aparatem',
        },
        intro:
          'Nie musisz zapisywać się na sesję, żeby poczuć różnicę. W moim newsletterze dzielę się krótkimi poradami i inspiracjami, które pomagają.',
        submitLabel: 'Dołącz do newslettera',
        privacyLink: {
          type: 'custom',
          url: '/polityka-prywatnosci',
          label: 'politykę prywatności',
          newTab: false,
        },
        ...(newsletterPhotoId ? { photo: newsletterPhotoId } : {}),
        photoAlt: 'Kobieta siedząca na białej kanapie z filiżanką w dłoni',
      },
      // Social links (already in Socials tab, but seed defaults)
      socials: [
        { platform: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/oczki_fotografia/' },
        { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/oczki.fotografia/' },
        { platform: 'pinterest', label: 'Pinterest', url: 'https://pl.pinterest.com/oczki_fotografia/' },
        { platform: 'weselezklasa', label: 'Wesele z klasą', url: 'https://weselezklasa.pl/' },
      ],
      // Footer tab (fields are top-level on SiteSettings). The link group uses
      // disableLabel — the visible text comes from the sibling `label` field.
      serviceLinks: [
        { label: 'Sesje kobiece', link: { type: 'custom', url: '/oferta/sesje-kobiece' } },
        { label: 'Reportaże ślubne', link: { type: 'custom', url: '/oferta/reportaze-slubne' } },
        { label: 'Sesje wizerunkowe', link: { type: 'custom', url: '/oferta/sesje-wizerunkowe' } },
        { label: 'Sesje rodzinne', link: { type: 'custom', url: '/oferta/sesje-rodzinne' } },
      ],
      pageLinks: [
        { label: 'Galeria', link: { type: 'custom', url: '/galeria' } },
        { label: 'Kontakt', link: { type: 'custom', url: '/kontakt' } },
        { label: 'O mnie', link: { type: 'custom', url: '/o-mnie' } },
      ],
      ...(galleryIds.length > 0 ? { galleryImages: galleryIds } : {}),
    },
    context: { disableRevalidate: true },
  })
  console.log('✓ SiteSettings updated')

  // The home page renders from `homeStatic` (src/endpoints/seed/home-static.ts),
  // which already includes the homeAbout / homeInstagram / homeCta blocks. No
  // home Pages document is seeded here — to make the home editable in the admin,
  // create a page with slug "home" and Payload will prefer it over the fallback.

  console.log('Done.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
