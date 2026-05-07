import type { Block } from 'payload'

export const AboutDuoBio: Block = {
  slug: 'aboutDuoBio',
  interfaceName: 'AboutDuoBioBlock',
  labels: {
    singular: 'Duo — bio fotografa (O mnie)',
    plural: 'Duo — bio fotografa (O mnie)',
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
      label: 'Lead — pierwszy akapit',
    },
    {
      name: 'subLead',
      type: 'textarea',
      required: false,
      label: 'Lead — drugi akapit / podpis',
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
