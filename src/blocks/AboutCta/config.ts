import type { Block } from 'payload'

export const AboutCta: Block = {
  slug: 'aboutCta',
  interfaceName: 'AboutCtaBlock',
  labels: {
    singular: 'CTA (O mnie)',
    plural: 'CTA (O mnie)',
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
    {
      name: 'tone',
      type: 'select',
      label: 'Wariant kolorystyczny',
      defaultValue: 'dark',
      options: [
        { label: 'Ciemny (czarne tło)', value: 'dark' },
        { label: 'Jasny (szare tło)', value: 'light' },
      ],
    },
  ],
}
