import type { Payload } from 'payload'

import { runSeedCli } from './lib/seedCli'

export async function seedHeader(payload: Payload): Promise<void> {
  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        { link: { type: 'custom', url: '/oferta', label: 'Oferta' }, withDropdownIcon: true },
        { link: { type: 'custom', url: '/galeria', label: 'Galeria' }, withDropdownIcon: false },
        { link: { type: 'custom', url: '/o-mnie', label: 'O mnie' }, withDropdownIcon: false },
        { link: { type: 'custom', url: '/kontakt', label: 'Kontakt' }, withDropdownIcon: false },
      ],
      ctaLabel: 'Umów sesję',
      ctaUrl: '/kontakt',
    },
    context: { disableRevalidate: true },
  })
}

runSeedCli(seedHeader, 'seedHeader')
