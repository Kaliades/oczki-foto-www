import type { Block } from 'payload'

export const AboutHobbies: Block = {
  slug: 'aboutHobbies',
  interfaceName: 'AboutHobbiesBlock',
  labels: {
    singular: 'Pasje i hobby (O mnie)',
    plural: 'Pasje i hobby (O mnie)',
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
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Zdjęcie',
    },
    {
      name: 'photoAlt',
      type: 'text',
      label: 'Alt zdjęcia',
    },
    {
      name: 'imagePosition',
      type: 'radio',
      label: 'Pozycja zdjęcia',
      defaultValue: 'left',
      options: [
        { label: 'Lewo', value: 'left' },
        { label: 'Prawo', value: 'right' },
      ],
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
