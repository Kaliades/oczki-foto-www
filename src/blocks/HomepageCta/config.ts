import type { Block } from 'payload'

export const HomepageCta: Block = {
  slug: 'homepageCta',
  interfaceName: 'HomepageCtaBlock',
  labels: {
    singular: 'CTA (Strona główna)',
    plural: 'CTA (Strona główna)',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Nagłówek',
    },
    {
      name: 'subheading',
      type: 'textarea',
      required: false,
      label: 'Podtytuł',
    },
    {
      name: 'buttonLabel',
      type: 'text',
      required: true,
      label: 'Etykieta przycisku',
    },
    {
      name: 'buttonUrl',
      type: 'text',
      required: true,
      label: 'Link przycisku',
    },
  ],
}
