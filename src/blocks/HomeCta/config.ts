import type { Block } from 'payload'

import { link } from '@/fields/link'

export const HomeCta: Block = {
  slug: 'homeCta',
  interfaceName: 'HomeCtaBlock',
  labels: {
    singular: 'CTA końcowy (rezerwacja sesji)',
    plural: 'CTA końcowy (rezerwacja sesji)',
  },
  fields: [
    {
      type: 'group',
      name: 'heading',
      label: 'Nagłówek',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'plain',
              type: 'text',
              required: true,
              admin: { width: '70%' },
              label: 'Tekst zwykły (do wyróżnienia)',
            },
            {
              name: 'emphasis',
              type: 'text',
              required: true,
              admin: { width: '30%' },
              label: 'Wyróżniony fragment (italik)',
            },
          ],
        },
      ],
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
      label: 'Treść (2–3 zdania)',
    },
    link({
      appearances: false,
      overrides: {
        name: 'cta',
        label: 'Przycisk CTA',
        admin: { description: 'Prowadzi zwykle do /kontakt.' },
      },
    }),
  ],
}
