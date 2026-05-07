import type { Block } from 'payload'

export const HomepageInstagram: Block = {
  slug: 'homepageInstagram',
  interfaceName: 'HomepageInstagramBlock',
  labels: {
    singular: 'Instagram (sekcja)',
    plural: 'Instagram (sekcja)',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Nagłówek sekcji',
    },
    {
      name: 'instagramHandle',
      type: 'text',
      required: true,
      label: 'Nazwa konta Instagram',
    },
    {
      name: 'instagramUrl',
      type: 'text',
      required: true,
      label: 'Link do Instagrama',
    },
    {
      name: 'avatarImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Zdjęcie profilowe',
    },
    {
      name: 'photos',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 10,
      label: 'Zdjęcia z Instagrama',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Zdjęcie',
        },
        {
          name: 'linkUrl',
          type: 'text',
          required: false,
          label: 'Link do posta',
        },
      ],
    },
  ],
}
