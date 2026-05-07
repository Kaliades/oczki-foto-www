import type { Block } from 'payload'

export const GalleryCta: Block = {
  slug: 'galleryCta',
  interfaceName: 'GalleryCtaBlock',
  labels: {
    singular: 'CTA (Galeria)',
    plural: 'CTA (Galeria)',
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
        { label: 'Ciemny', value: 'dark' },
        { label: 'Jasny', value: 'light' },
      ],
    },
  ],
}
