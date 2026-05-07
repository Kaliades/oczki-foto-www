import type { Block } from 'payload'

export const GalleryHero: Block = {
  slug: 'galleryHero',
  interfaceName: 'GalleryHeroBlock',
  labels: {
    singular: 'Hero (Galeria)',
    plural: 'Hero (Galeria)',
  },
  fields: [
    {
      name: 'breadcrumbLabel',
      type: 'text',
      label: 'Etykieta okruszka',
      defaultValue: 'Galeria',
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
      label: 'Lead / opis',
    },
    {
      name: 'categoryFilters',
      type: 'array',
      label: 'Filtry kategorii',
      minRows: 0,
      maxRows: 8,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Etykieta',
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          label: 'Identyfikator (slug)',
          admin: {
            description:
              "Musi pokrywać się ze slugiem kategorii w bloku 'Siatka zdjęć (Galeria)'",
          },
        },
      ],
    },
  ],
}
