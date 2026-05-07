import type { Block } from 'payload'

export const GalleryGrid: Block = {
  slug: 'galleryGrid',
  interfaceName: 'GalleryGridBlock',
  labels: {
    singular: 'Siatka galerii',
    plural: 'Siatka galerii',
  },
  fields: [
    {
      name: 'initialVisible',
      type: 'number',
      label: 'Ile zdjęć widać na start',
      defaultValue: 16,
      min: 4,
      max: 60,
    },
    {
      name: 'loadMoreLabel',
      type: 'text',
      label: "Etykieta przycisku 'Pokaż więcej'",
      defaultValue: 'Pokaż więcej',
    },
    {
      name: 'emptyStateLabel',
      type: 'text',
      label: 'Komunikat: brak wyników',
      defaultValue: 'Brak zdjęć w tej kategorii',
    },
    {
      name: 'photos',
      type: 'array',
      label: 'Zdjęcia',
      required: true,
      minRows: 8,
      maxRows: 200,
      admin: {
        initCollapsed: true,
      },
      labels: {
        singular: 'Zdjęcie',
        plural: 'Zdjęcia',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Zdjęcie',
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt',
        },
        {
          name: 'category',
          type: 'text',
          required: true,
          label: 'Kategoria (slug)',
          admin: {
            description:
              "Musi pokrywać się ze slugiem filtra w bloku 'Hero (Galeria)'",
          },
        },
        {
          name: 'sortOrder',
          type: 'number',
          label: 'Kolejność (mniejsza = wyżej)',
        },
        {
          name: 'captionTitle',
          type: 'text',
          label: 'Tytuł',
        },
        {
          name: 'captionSubtitle',
          type: 'text',
          label: 'Podtytuł',
        },
        {
          name: 'href',
          type: 'text',
          label: 'Link (opcjonalny)',
        },
      ],
    },
  ],
}
