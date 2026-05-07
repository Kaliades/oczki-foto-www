import type { Block } from 'payload'

export const GalleryQuoteBand: Block = {
  slug: 'galleryQuoteBand',
  interfaceName: 'GalleryQuoteBandBlock',
  labels: {
    singular: 'Zdjęcie z cytatem (Galeria)',
    plural: 'Zdjęcia z cytatem (Galeria)',
  },
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
      required: false,
      label: 'Alt',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Nagłówek',
    },
    {
      name: 'lead',
      type: 'textarea',
      required: true,
      label: 'Lead',
    },
    {
      name: 'side',
      type: 'select',
      label: 'Strona zdjęcia',
      defaultValue: 'left',
      options: [
        { label: 'Lewa', value: 'left' },
        { label: 'Prawa', value: 'right' },
      ],
    },
  ],
}
