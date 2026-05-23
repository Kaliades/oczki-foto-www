import type { Block } from 'payload'

export const Testimonial: Block = {
  slug: 'testimonial',
  interfaceName: 'TestimonialBlock',
  labels: {
    singular: 'Sekcja opinii',
    plural: 'Sekcja opinii',
  },
  fields: [
    {
      type: 'group',
      name: 'heading',
      label: 'Nagłówek',
      admin: {
        description:
          'Nagłówek dzieli się na fragment regularny i wyróżniony italikiem ("Wasze słowa to moje" + "paliwo do działania").',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'start',
              type: 'text',
              required: true,
              admin: { width: '50%' },
              label: 'Początek',
            },
            {
              name: 'emphasis',
              type: 'text',
              required: true,
              admin: { width: '50%' },
              label: 'Wyróżniony fragment (italik)',
            },
          ],
        },
      ],
    },
    {
      type: 'array',
      name: 'items',
      label: 'Opinie',
      labels: {
        singular: 'Opinia',
        plural: 'Opinie',
      },
      minRows: 1,
      maxRows: 12,
      admin: {
        description: 'Karuzela cykluje po wszystkich opiniach w kolejności listy.',
      },
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          label: 'Treść opinii',
          admin: {
            description:
              'Polskie cudzysłowy („...") wpisywane ręcznie — komponent renderuje treść 1:1.',
          },
        },
        {
          name: 'author',
          type: 'text',
          required: true,
          label: 'Autor opinii',
        },
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Zdjęcie w polaroidzie',
          admin: {
            description:
              'Wyświetlane w dekoracyjnym polaroidzie po prawej stronie sekcji.',
          },
        },
        {
          name: 'photoAlt',
          type: 'text',
          required: false,
          label: 'Opis alt zdjęcia',
        },
      ],
    },
    {
      name: 'showPolaroid',
      type: 'checkbox',
      defaultValue: true,
      label: 'Pokaż dekoracyjny polaroid',
    },
  ],
}
