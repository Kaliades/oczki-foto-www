import type { Block } from 'payload'

export const HomepageHero: Block = {
  slug: 'homepageHero',
  interfaceName: 'HomepageHeroBlock',
  labels: {
    singular: 'Hero (Strona główna)',
    plural: 'Hero (Strona główna)',
  },
  fields: [
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Zdjęcie tła',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Nagłówek główny',
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Podtytuł / lead',
    },
    {
      type: 'group',
      name: 'primaryButton',
      label: 'Przycisk główny',
      fields: [
        { name: 'label', type: 'text', required: true, label: 'Etykieta' },
        { name: 'url', type: 'text', required: true, label: 'Link' },
      ],
    },
    {
      type: 'group',
      name: 'secondaryButton',
      label: 'Przycisk drugi (opcjonalny)',
      fields: [
        { name: 'label', type: 'text', label: 'Etykieta' },
        { name: 'url', type: 'text', label: 'Link' },
      ],
    },
  ],
}
