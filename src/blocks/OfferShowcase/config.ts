import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const OfferShowcase: Block = {
  slug: 'offerShowcase',
  interfaceName: 'OfferShowcaseBlock',
  labels: {
    singular: 'Sekcja oferty',
    plural: 'Sekcja oferty',
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
              name: 'start',
              type: 'text',
              required: true,
              admin: { width: '33%' },
              label: 'Początek',
            },
            {
              name: 'emphasis',
              type: 'text',
              required: true,
              admin: { width: '33%' },
              label: 'Wyróżniony (italik)',
            },
            {
              name: 'end',
              type: 'text',
              required: true,
              admin: { width: '34%' },
              label: 'Koniec',
            },
          ],
        },
      ],
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      label: 'Podtytuł',
    },
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'offerItems',
      hasMany: true,
      required: true,
      minRows: 1,
      label: 'Karty oferty',
      admin: {
        description: 'Wybierz oferty wyświetlane w karuzeli. Kolejność ma znaczenie.',
        sortOptions: 'title',
      },
    },
    {
      type: 'group',
      name: 'inquiry',
      label: 'Sekcja zapytania',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Tytuł',
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
          label: 'Treść',
        },
        linkGroup({
          appearances: false,
          overrides: {
            name: 'cta',
            label: 'Przycisk CTA',
            maxRows: 1,
            minRows: 1,
          },
        }),
      ],
    },
    {
      name: 'showFooterNotch',
      type: 'checkbox',
      defaultValue: true,
      label: 'Pokaż ozdobny notch na dole',
    },
    {
      name: 'backgroundTexture',
      type: 'upload',
      relationTo: 'media',
      label: 'Tekstura tła (opcjonalna)',
      admin: {
        description: 'Jeśli pusta, użyta zostanie domyślna tekstura projektu.',
      },
    },
  ],
}
