import type { Block } from 'payload'

export const AboutApproach: Block = {
  slug: 'aboutApproach',
  interfaceName: 'AboutApproachBlock',
  labels: {
    singular: 'Podejście do sesji (O mnie)',
    plural: 'Podejście do sesji (O mnie)',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Nagłówek',
    },
    {
      name: 'lead',
      type: 'textarea',
      required: false,
      label: 'Lead',
    },
    {
      name: 'cards',
      type: 'array',
      required: true,
      label: 'Karty',
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
          label: 'Opis',
        },
      ],
    },
  ],
}
