import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Stopka',
  access: {
    read: () => true,
  },
  versions: {
    drafts: {
      autosave: { interval: 250 },
    },
    max: 50,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      admin: {
        description: 'Logo wyświetlane w stopce. Jeśli nie ustawione, zostanie użyty placeholder tekstowy.',
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Linki społecznościowe',
      maxRows: 6,
      admin: {
        description: 'Maksymalnie 6 linków do mediów społecznościowych.',
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Platforma',
          required: true,
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'Pinterest', value: 'pinterest' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Inne', value: 'other' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          label: 'Adres URL',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Etykieta (opcjonalnie)',
          admin: {
            description: 'Tekst alternatywny / aria-label dla linku.',
          },
        },
      ],
    },
    {
      name: 'columnServices',
      type: 'group',
      label: 'Kolumna – Sesje',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Nagłówek kolumny',
          defaultValue: 'Sesje',
        },
        {
          name: 'links',
          type: 'array',
          label: 'Linki',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Tekst linku',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              label: 'Adres URL',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'columnSite',
      type: 'group',
      label: 'Kolumna – Strona',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Nagłówek kolumny',
          defaultValue: 'Strona',
        },
        {
          name: 'links',
          type: 'array',
          label: 'Linki',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Tekst linku',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              label: 'Adres URL',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'newsletter',
      type: 'group',
      label: 'Newsletter',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Włącz formularz newsletter w stopce',
          defaultValue: false,
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Nagłówek sekcji newsletter',
          defaultValue: 'Bądź na bieżąco',
          admin: {
            condition: (data) => Boolean(data?.newsletter?.enabled),
          },
        },
        {
          name: 'subheading',
          type: 'text',
          label: 'Podtytuł',
          defaultValue: 'Zapisz się, aby otrzymywać informacje o nowych sesjach i promocjach.',
          admin: {
            condition: (data) => Boolean(data?.newsletter?.enabled),
          },
        },
        {
          name: 'placeholder',
          type: 'text',
          label: 'Placeholder pola email',
          defaultValue: 'Twój adres e-mail',
          admin: {
            condition: (data) => Boolean(data?.newsletter?.enabled),
          },
        },
        {
          name: 'buttonLabel',
          type: 'text',
          label: 'Tekst przycisku',
          defaultValue: 'Zapisz się',
          admin: {
            condition: (data) => Boolean(data?.newsletter?.enabled),
          },
        },
        {
          name: 'successMessage',
          type: 'text',
          label: 'Komunikat sukcesu',
          defaultValue: 'Dziękujemy za zapisanie się!',
          admin: {
            condition: (data) => Boolean(data?.newsletter?.enabled),
          },
        },
        {
          name: 'errorMessage',
          type: 'text',
          label: 'Komunikat błędu',
          defaultValue: 'Coś poszło nie tak. Spróbuj ponownie.',
          admin: {
            condition: (data) => Boolean(data?.newsletter?.enabled),
          },
        },
        {
          name: 'consentText',
          type: 'text',
          label: 'Tekst zgody RODO',
          defaultValue:
            'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu wysyłki newslettera.',
          admin: {
            condition: (data) => Boolean(data?.newsletter?.enabled),
          },
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Tekst praw autorskich',
      defaultValue: '© {{year}} Oczki Fotografia. Wszystkie prawa zastrzeżone.',
      admin: {
        description: 'Użyj {{year}} jako placeholder dla bieżącego roku.',
      },
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Linki prawne',
      admin: {
        description: 'Np. Polityka prywatności, Ustawienia cookies.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Tekst linku',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          label: 'Adres URL',
          required: true,
        },
      ],
    },
  ],
}
