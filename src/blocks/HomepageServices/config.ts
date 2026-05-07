import type { Block } from 'payload'

export const HomepageServices: Block = {
  slug: 'homepageServices',
  interfaceName: 'HomepageServicesBlock',
  labels: {
    singular: 'Karty usług (Strona główna)',
    plural: 'Karty usług (Strona główna)',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Nagłówek sekcji',
    },
    {
      name: 'subheading',
      type: 'textarea',
      required: false,
      label: 'Podtytuł sekcji',
    },
    {
      name: 'services',
      type: 'array',
      required: true,
      label: 'Karty usług',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Zdjęcie',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Nazwa usługi',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Opis',
        },
        {
          name: 'linkUrl',
          type: 'text',
          required: false,
          label: 'Link do strony usługi',
        },
      ],
    },
    {
      name: 'customSessionHeading',
      type: 'text',
      required: false,
      label: 'Nagłówek "poza ofertą"',
    },
    {
      name: 'customSessionText',
      type: 'textarea',
      required: false,
      label: 'Tekst "poza ofertą"',
    },
    {
      name: 'customSessionButtonLabel',
      type: 'text',
      required: false,
      label: 'Etykieta przycisku',
    },
    {
      name: 'customSessionButtonUrl',
      type: 'text',
      required: false,
      label: 'Link przycisku',
    },
  ],
}
