import type { Block } from 'payload'

export const HomepageGallery: Block = {
  slug: 'homepageGallery',
  interfaceName: 'HomepageGalleryBlock',
  labels: {
    singular: 'Galeria (Strona główna)',
    plural: 'Galeria (Strona główna)',
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
      label: 'Podtytuł',
    },
    {
      name: 'galleryLinkLabel',
      type: 'text',
      required: false,
      label: 'Etykieta linku',
    },
    {
      name: 'galleryLinkUrl',
      type: 'text',
      required: false,
      label: 'Link do galerii',
    },
    {
      name: 'photos',
      type: 'array',
      required: true,
      label: 'Zdjęcia',
      minRows: 3,
      maxRows: 12,
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
          name: 'captionTitle',
          type: 'text',
          required: false,
          label: 'Tytuł zdjęcia',
        },
        {
          name: 'captionSubtitle',
          type: 'text',
          required: false,
          label: 'Podtytuł zdjęcia',
        },
      ],
    },
  ],
}
