import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'withDropdownIcon',
          type: 'checkbox',
          label: 'Pokaż ikonę dropdown',
          defaultValue: false,
          admin: {
            description: 'Wyświetl strzałkę sugerującą podmenu (np. Oferta)',
          },
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'ctaLabel',
      label: 'Tekst przycisku CTA',
      type: 'text',
      defaultValue: 'Umów sesję',
      admin: {
        description: 'Tekst widoczny na przycisku "Umów sesję" w navbarze',
      },
    },
    {
      name: 'ctaUrl',
      label: 'URL przycisku CTA',
      type: 'text',
      defaultValue: '/kontakt',
      admin: {
        description: 'Adres URL do którego prowadzi przycisk CTA (np. /kontakt)',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
