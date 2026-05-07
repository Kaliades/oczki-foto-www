import type { Block } from 'payload'

export const AboutInstagram: Block = {
  slug: 'aboutInstagram',
  interfaceName: 'AboutInstagramBlock',
  labels: {
    singular: 'Instagram (O mnie)',
    plural: 'Instagram (O mnie)',
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
      name: 'tiles',
      type: 'array',
      label: 'Kafelki',
      minRows: 5,
      maxRows: 6,
      fields: [
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Zdjęcie',
        },
        {
          name: 'photoAlt',
          type: 'text',
          label: 'Alt',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Link Instagram',
        },
      ],
    },
  ],
}
