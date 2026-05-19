import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const HomeHero: Block = {
  slug: 'homeHero',
  interfaceName: 'HomeHeroBlock',
  labels: {
    singular: 'Hero — strona główna',
    plural: 'Hero — strona główna',
  },
  fields: [
    {
      type: 'group',
      name: 'title',
      label: 'Tytuł',
      admin: {
        description:
          'Cztery linie tytułu hero. Linie 2 (italik) i 3 są wyróżnione kursywą serif.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'lineOne',
              type: 'text',
              required: true,
              admin: { width: '50%' },
              label: 'Linia 1',
            },
            {
              name: 'lineTwoItalic',
              type: 'text',
              required: true,
              admin: { width: '50%' },
              label: 'Linia 2 — italik',
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'lineTwoRest',
              type: 'text',
              required: true,
              admin: { width: '50%' },
              label: 'Linia 2 — reszta',
            },
            {
              name: 'lineThree',
              type: 'text',
              required: true,
              admin: { width: '50%' },
              label: 'Linia 3 — italik',
            },
          ],
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Opis',
    },
    {
      name: 'background',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Tło hero',
      admin: {
        description: 'Pełnoekranowe zdjęcie tła (poziome, min. 1920×1080).',
      },
    },
    {
      name: 'showScallop',
      type: 'checkbox',
      defaultValue: true,
      label: 'Pokaż ozdobną falbankę na dole',
    },
    linkGroup({
      appearances: false,
      overrides: {
        name: 'ctas',
        label: 'Przyciski CTA',
        admin: {
          description:
            'Pierwszy przycisk renderowany jest jako pełny (primary). Drugi jako tekstowy ze strzałką (secondary).',
        },
        maxRows: 2,
      },
    }),
  ],
}
