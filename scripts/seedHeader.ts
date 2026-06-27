import config from '@payload-config'
import { getPayload } from 'payload'

/**
 * Seeds the Header global with the current hardcoded nav items and CTA.
 * Idempotent — re-running overwrites the global (standard Payload update).
 */
async function run() {
  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        {
          link: { type: 'custom', url: '/oferta', label: 'Oferta' },
          withDropdownIcon: true,
        },
        {
          link: { type: 'custom', url: '/galeria', label: 'Galeria' },
          withDropdownIcon: false,
        },
        {
          link: { type: 'custom', url: '/o-mnie', label: 'O mnie' },
          withDropdownIcon: false,
        },
        {
          link: { type: 'custom', url: '/kontakt', label: 'Kontakt' },
          withDropdownIcon: false,
        },
      ],
      ctaLabel: 'Umów sesję',
      ctaUrl: '/kontakt',
    },
    context: { disableRevalidate: true },
  })

  console.log('✓ Header global seeded')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
