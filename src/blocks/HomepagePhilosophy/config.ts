import type { Block } from 'payload'

export const HomepagePhilosophy: Block = {
  slug: 'homepagePhilosophy',
  interfaceName: 'HomepagePhilosophyBlock',
  labels: {
    singular: 'Filozofia (Strona główna)',
    plural: 'Filozofia (Strona główna)',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Nagłówek sekcji',
    },
    {
      name: 'lead',
      type: 'textarea',
      required: false,
      label: 'Lead',
    },
    {
      name: 'pillars',
      type: 'array',
      required: true,
      label: 'Karty filozofii',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Tytuł',
        },
        {
          name: 'body',
          type: 'textarea',
          required: true,
          label: 'Treść',
        },
      ],
    },
  ],
}
