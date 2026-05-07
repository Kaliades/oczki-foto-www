import type { Block } from 'payload'

export const GalleryFaq: Block = {
  slug: 'galleryFaq',
  interfaceName: 'GalleryFaqBlock',
  labels: {
    singular: 'FAQ (Galeria)',
    plural: 'FAQ (Galeria)',
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
      label: 'Lead',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Pytania',
      required: true,
      minRows: 1,
      maxRows: 30,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Pytanie',
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
          label: 'Odpowiedź',
        },
        {
          name: 'defaultOpen',
          type: 'checkbox',
          label: 'Otwarte domyślnie',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'contactBox',
      type: 'group',
      label: 'Boczny formularz kontaktu',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Nagłówek',
        },
        {
          name: 'messageLabel',
          type: 'text',
          label: 'Etykieta pola',
          defaultValue: 'Wiadomość',
        },
        {
          name: 'submitLabel',
          type: 'text',
          label: 'Etykieta przycisku',
          defaultValue: 'Wyślij wiadomość',
        },
        {
          name: 'successMessage',
          type: 'text',
          label: 'Komunikat sukcesu',
          defaultValue: 'Dziękujemy! Odezwiemy się wkrótce.',
        },
        {
          name: 'errorMessage',
          type: 'text',
          label: 'Komunikat błędu',
          defaultValue: 'Coś poszło nie tak.',
        },
      ],
    },
  ],
}
