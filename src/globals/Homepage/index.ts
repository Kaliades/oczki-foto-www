import type { GlobalConfig } from 'payload'

import { HomepageAboutTeaser } from '@/blocks/HomepageAboutTeaser/config'
import { HomepageCta } from '@/blocks/HomepageCta/config'
import { HomepageGallery } from '@/blocks/HomepageGallery/config'
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
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          description: 'Sekcja pierwsza widoczna po wejściu na stronę. Zawsze obecna — nie da się jej usunąć.',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Zdjęcie tła hero',
            },
            {
              name: 'heroHeading',
              type: 'text',
              required: true,
              label: 'Nagłówek główny',
            },
            {
              name: 'heroSubheading',
              type: 'textarea',
              label: 'Podtytuł / lead',
            },
            {
              name: 'heroPrimaryButtonLabel',
              type: 'text',
              required: true,
              label: 'Etykieta przycisku głównego',
            },
            {
              name: 'heroPrimaryButtonUrl',
              type: 'text',
              required: true,
              label: 'Link przycisku głównego',
            },
            {
              name: 'heroSecondaryButtonLabel',
              type: 'text',
              label: 'Etykieta przycisku drugiego',
            },
            {
              name: 'heroSecondaryButtonUrl',
              type: 'text',
              label: 'Link przycisku drugiego',
            },
          ],
        },
        {
          label: 'Sekcje strony',
          description: 'Bloki układane w kolejności — możesz przesuwać, dodawać i usuwać.',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
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
              label: 'Sekcje',
              admin: { initCollapsed: true },
            },
          ],
        },
      ],
    },
  ],
}
