import type { Block } from 'payload'

export const AboutValues: Block = {
  slug: 'aboutValues',
  interfaceName: 'AboutValuesBlock',
  labels: {
    singular: 'Wartości — sekcja (O mnie)',
    plural: 'Wartości — sekcja (O mnie)',
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
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Zdjęcie',
    },
    {
      name: 'photoAlt',
      type: 'text',
      required: false,
      label: 'Alt zdjęcia',
    },
    {
      name: 'pillars',
      type: 'array',
      label: 'Wartości',
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
