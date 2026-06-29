import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { generateGlobalPreviewPath } from '@/utilities/generatePreviewPath'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Nagłówek',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'Linki nawigacji i przycisk CTA w navbarze. Podgląd na żywo otwiera stronę główną, gdzie nagłówek jest widoczny na każdej podstronie.',
    livePreview: { url: () => generateGlobalPreviewPath('/') },
    preview: () => generateGlobalPreviewPath('/'),
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
  versions: { drafts: { autosave: { interval: 100 }, schedulePublish: true } },
}
