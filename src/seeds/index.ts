import type { Payload } from 'payload'

import { seedHomepage } from './homepage'
import { seedAbout } from './about'
import { seedGaleria } from './galeria'
import { seedNavbar } from './navbar'
import { seedFooter } from './footer'

export async function seedAll(payload: Payload): Promise<void> {
  await seedHomepage(payload)
  await seedAbout(payload)
  await seedGaleria(payload)
  await seedNavbar(payload)
  await seedFooter(payload)
}
