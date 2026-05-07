import type { GlobalConfig } from 'payload'

import { HomepageAboutTeaser } from '@/blocks/HomepageAboutTeaser/config'
import { HomepageCta } from '@/blocks/HomepageCta/config'
import { HomepageGallery } from '@/blocks/HomepageGallery/config'
import { HomepageHero } from '@/blocks/HomepageHero/config'
import { HomepageInstagram } from '@/blocks/HomepageInstagram/config'
import { HomepageIntro } from '@/blocks/HomepageIntro/config'
import { HomepagePhilosophy } from '@/blocks/HomepagePhilosophy/config'
import { HomepageProcess } from '@/blocks/HomepageProcess/config'
import { HomepageServices } from '@/blocks/HomepageServices/config'
import { HomepageTestimonials } from '@/blocks/HomepageTestimonials/config'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Strona główna',
  access: {
    read: () => true,
  },
  versions: {
    drafts: {
      autosave: { interval: 100 },
    },
    max: 50,
  },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      label: 'Sekcje strony',
      admin: { initCollapsed: true },
      blocks: [
        HomepageHero,
        HomepageIntro,
        HomepageServices,
        HomepagePhilosophy,
        HomepageGallery,
        HomepageProcess,
        HomepageTestimonials,
        HomepageAboutTeaser,
        HomepageInstagram,
        HomepageCta,
      ],
    },
  ],
}
