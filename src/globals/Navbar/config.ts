import type { GlobalConfig } from 'payload'

export const Navbar: GlobalConfig = {
  slug: 'navbar',
  label: 'Nawigacja (Navbar)',
  access: {
    read: () => true,
  },
  versions: {
    drafts: {
      autosave: { interval: 100 },
    },
    max: 50,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      required: false,
    },
    {
      name: 'logoLabel',
      type: 'text',
      label: 'Tekst / etykieta logo',
      defaultValue: 'Oczki fotografia',
      admin: {
        description: 'Wyświetlane gdy logo nie jest ustawione (fallback wordmark)',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Pozycje nawigacji',
      maxRows: 8,
      admin: {
        description: 'Maksymalnie 8 pozycji',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Etykieta',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          label: 'Adres URL',
          required: true,
          admin: {
            description: 'np. /oferta, /galeria',
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Otwórz w nowej karcie',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Przycisk CTA',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Etykieta przycisku',
          defaultValue: 'Umów sesję',
        },
        {
          name: 'href',
          type: 'text',
          label: 'Adres URL',
          defaultValue: '/kontakt',
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Otwórz w nowej karcie',
          defaultValue: false,
        },
      ],
    },
  ],
}
