import type { Block } from 'payload'

import { link } from '@/fields/link'

export const HomeAbout: Block = {
  slug: 'homeAbout',
  interfaceName: 'HomeAboutBlock',
  labels: {
    singular: '„Hej, jestem Asia" — sekcja bio',
    plural: '„Hej, jestem Asia" — sekcja bio',
  },
  fields: [
    {
      type: 'group',
      name: 'heading',
      label: 'Nagłówek (3 części)',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'start',
              type: 'text',
              required: true,
              admin: { width: '30%' },
              label: 'Początek (np. „Hej, jestem")',
            },
            {
              name: 'emphasis',
              type: 'text',
              required: true,
              admin: { width: '20%' },
              label: 'Imię / wyróżnienie',
            },
            {
              name: 'end',
              type: 'text',
              required: true,
              admin: { width: '50%' },
              label: 'Koniec (np. „! Fotografka z…")',
            },
          ],
        },
      ],
    },
    {
      name: 'paragraphOne',
      type: 'textarea',
      required: true,
      label: 'Akapit 1',
    },
    {
      name: 'paragraphTwo',
      type: 'textarea',
      required: true,
      label: 'Akapit 2',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'portrait',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: { width: '60%' },
          label: 'Portret fotografki',
        },
        {
          name: 'portraitAlt',
          type: 'text',
          admin: { width: '40%' },
          label: 'Opis alt portretu',
        },
      ],
    },
    link({
      appearances: false,
      overrides: {
        name: 'cta',
        label: 'Link „Poznaj mnie bliżej"',
        admin: { description: 'Prowadzi zwykle do /o-mnie.' },
      },
    }),
  ],
}
