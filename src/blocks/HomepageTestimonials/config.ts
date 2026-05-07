import type { Block } from 'payload'

export const HomepageTestimonials: Block = {
  slug: 'homepageTestimonials',
  interfaceName: 'HomepageTestimonialsBlock',
  labels: {
    singular: 'Opinie (Strona główna)',
    plural: 'Opinie (Strona główna)',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Nagłówek sekcji',
    },
    {
      name: 'testimonials',
      type: 'array',
      required: true,
      label: 'Opinie',
      minRows: 1,
      maxRows: 20,
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          label: 'Treść opinii',
        },
        {
          name: 'clientName',
          type: 'text',
          required: true,
          label: 'Imię i nazwisko klienta',
        },
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Zdjęcie klienta',
        },
      ],
    },
  ],
}
