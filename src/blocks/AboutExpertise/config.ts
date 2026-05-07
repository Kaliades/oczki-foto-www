import type { Block } from 'payload'

export const AboutExpertise: Block = {
  slug: 'aboutExpertise',
  interfaceName: 'AboutExpertiseBlock',
  labels: {
    singular: 'Ekspertyza (O mnie)',
    plural: 'Ekspertyza (O mnie)',
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
      label: 'Lead',
    },
    {
      name: 'cards',
      type: 'array',
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
