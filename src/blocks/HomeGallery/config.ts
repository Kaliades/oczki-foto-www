import type { Block } from 'payload'

import { link } from '@/fields/link'

export const HomeGallery: Block = {
  slug: 'homeGallery',
  interfaceName: 'HomeGalleryBlock',
  labels: {
    singular: 'Sekcja galerii',
    plural: 'Sekcja galerii',
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
              admin: { width: '60%' },
              label: 'Początek',
            },
            {
              name: 'emphasis',
              type: 'text',
              required: true,
              admin: { width: '40%' },
              label: 'Wyróżniony fragment (italik)',
            },
          ],
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Opis pod nagłówkiem',
    },
    link({
      appearances: false,
      overrides: {
        name: 'cta',
        label: 'Link do pełnej galerii',
        admin: {
          description: 'Wyświetlany jako "→" link w sekcji nagłówka.',
        },
      },
    }),
    {
      type: 'array',
      name: 'items',
      label: 'Zdjęcia (5 slotów)',
      minRows: 3,
      maxRows: 9,
      admin: {
        initCollapsed: true,
        description:
          'Środkowy slot zawsze jest renderowany jako duże zdjęcie z podpisem. Pozostałe są małymi miniaturami.',
      },
      labels: {
        singular: 'Zdjęcie',
        plural: 'Zdjęcia',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: { width: '60%' },
            },
            {
              name: 'imageAlt',
              type: 'text',
              required: true,
              admin: { width: '40%' },
              label: 'Opis alt',
            },
          ],
        },
        {
          type: 'group',
          name: 'caption',
          label: 'Podpis (tylko dla środkowego "dużego" zdjęcia)',
          admin: {
            description:
              'Te pola są widoczne tylko gdy ten slot jest renderowany jako duży (środkowy). Dla pozostałych są ignorowane.',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  admin: { width: '40%' },
                  label: 'Tytuł podpisu',
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  admin: { width: '60%' },
                  label: 'Podtytuł',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
