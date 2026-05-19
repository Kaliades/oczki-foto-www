import type { Block } from 'payload'

export const IntroQuote: Block = {
  slug: 'introQuote',
  interfaceName: 'IntroQuoteBlock',
  labels: {
    singular: 'Intro z cytatem',
    plural: 'Intro z cytatem',
  },
  fields: [
    {
      type: 'group',
      name: 'heading',
      label: 'Nagłówek',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'start',
              type: 'text',
              required: true,
              admin: { width: '60%' },
              label: 'Początek',
            },
            {
              name: 'emphasis',
              type: 'text',
              required: true,
              admin: { width: '40%' },
              label: 'Wyróżniony fragment (italik)',
            },
          ],
        },
      ],
    },
    {
      name: 'introLeadIn',
      type: 'text',
      required: true,
      label: 'Tekst wprowadzający',
    },
    {
      name: 'quoteText',
      type: 'text',
      required: true,
      label: 'Cytat',
      admin: {
        description: 'Wyróżniony cytat w ramce z dekoracyjnym znacznikiem cudzysłowu.',
      },
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
      label: 'Treść',
    },
    {
      name: 'collageImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Zdjęcie w polaroidzie',
    },
    {
      name: 'collageImageAlt',
      type: 'text',
      required: true,
      label: 'Opis alt zdjęcia',
    },
    {
      name: 'handwrittenQuote',
      type: 'textarea',
      required: true,
      label: 'Cytat odręczny',
      admin: {
        description: 'Wyświetlany jako odręczny napis na karteczce. Krótkie zdanie.',
      },
    },
  ],
}
