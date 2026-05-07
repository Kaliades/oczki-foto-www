import type { Payload } from 'payload'

import { resolvePlaceholders } from './uploadMedia'

const NavbarSeed = {
  logo: '{{MEDIA:navbar__logo.svg}}',
  logoLabel: 'Oczki fotografia',
  navItems: [
    { label: 'Oferta', href: '/oferta', openInNewTab: false },
    { label: 'Galeria', href: '/galeria', openInNewTab: false },
    { label: 'O mnie', href: '/o-mnie', openInNewTab: false },
    { label: 'Kontakt', href: '/kontakt', openInNewTab: false },
  ],
  cta: { label: 'Umów sesję', href: '/kontakt', openInNewTab: false },
}

export async function seedNavbar(payload: Payload): Promise<void> {
  payload.logger.info('[seed] seeding navbar…')

  const cache = new Map<string, number | string>()
  const data = await resolvePlaceholders(payload, NavbarSeed, cache)

  await payload.updateGlobal({
    slug: 'navbar',
    data: data as never,
    draft: false,
  })

  payload.logger.info('[seed] navbar populated')
}
