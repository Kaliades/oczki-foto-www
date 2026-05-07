import type { Block } from 'payload'

export const HomepageProcess: Block = {
  slug: 'homepageProcess',
  interfaceName: 'HomepageProcessBlock',
  labels: {
    singular: 'Proces (Strona główna)',
    plural: 'Proces (Strona główna)',
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
      name: 'buttonLabel',
      type: 'text',
      required: false,
      label: 'Etykieta przycisku',
    },
    {
      name: 'buttonUrl',
      type: 'text',
      required: false,
      label: 'Link przycisku',
    },
    {
      name: 'steps',
      type: 'array',
      required: true,
      label: 'Kroki',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Tytuł kroku',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Opis kroku',
        },
      ],
    },
  ],
}
