import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { ADMIN_GROUP_SITE } from '@/constants/adminGroups'
import { revalidateCookieConsent } from './hooks/revalidateCookieConsent'

export const CookieConsent: GlobalConfig = {
  slug: 'cookieConsent',
  label: 'Zgoda na cookies',
  access: { read: () => true },
  admin: {
    group: ADMIN_GROUP_SITE,
    description:
      'Baner cookies i kategorie zgody. Domyślnie wyłączone — włącz dopiero po aktualizacji polityki prywatności i podłączeniu skryptów (env).',
  },
  versions: { drafts: { autosave: { interval: 100 }, schedulePublish: true } },
  fields: [
    {
      type: 'collapsible',
      label: 'Przełączniki',
      admin: { initCollapsed: false },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'bannerEnabled',
              type: 'checkbox',
              label: 'Włącz baner cookies',
              defaultValue: false,
              admin: {
                width: '33%',
                description:
                  'Master switch — baner, link w stopce i mechanizm zgody. Włącz na końcu, po aktualizacji polityki.',
              },
            },
            {
              name: 'analyticsEnabled',
              type: 'checkbox',
              label: 'Kategoria: analityka',
              defaultValue: false,
              admin: {
                width: '33%',
                description:
                  'Pokaż kategorię analityczną i ładuj GA po zgodzie (wymaga NEXT_PUBLIC_GA_MEASUREMENT_ID).',
              },
            },
            {
              name: 'marketingEnabled',
              type: 'checkbox',
              label: 'Kategoria: marketing',
              defaultValue: false,
              admin: {
                width: '33%',
                description:
                  'Pokaż kategorię marketingową i ładuj Meta Pixel po zgodzie (wymaga NEXT_PUBLIC_META_PIXEL_ID).',
              },
            },
          ],
        },
        {
          name: 'policyVersion',
          type: 'number',
          label: 'Wersja polityki cookies',
          defaultValue: 1,
          min: 1,
          required: true,
          admin: {
            description:
              'Podbij po zmianie polityki prywatności lub dodaniu nowego trackera — użytkownicy ze starą wersją zobaczą baner ponownie.',
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Treść banera',
      admin: { initCollapsed: true },
      fields: [
        { name: 'title', type: 'text', label: 'Tytuł' },
        {
          name: 'descriptionBeforeLink',
          type: 'textarea',
          label: 'Opis (przed linkiem „Dowiedz się więcej”)',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'learnMoreLabel',
              type: 'text',
              label: 'Etykieta linku',
              admin: { width: '50%' },
            },
            {
              name: 'learnMoreHref',
              type: 'text',
              label: 'URL linku',
              defaultValue: '/polityka-prywatnosci#privacy-cookies',
              admin: { width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'acceptLabel',
              type: 'text',
              label: 'Przycisk: akceptuj wszystkie',
              admin: { width: '33%' },
            },
            {
              name: 'preferencesLabel',
              type: 'text',
              label: 'Link: ustaw preferencje',
              admin: { width: '33%' },
            },
            {
              name: 'rejectLabel',
              type: 'text',
              label: 'Link: odmowa',
              admin: { width: '33%' },
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Panel preferencji',
      admin: { initCollapsed: true },
      fields: [
        { name: 'preferencesTitle', type: 'text', label: 'Tytuł panelu' },
        { name: 'preferencesIntro', type: 'textarea', label: 'Wstęp' },
        {
          type: 'row',
          fields: [
            {
              name: 'saveLabel',
              type: 'text',
              label: 'Przycisk: zapisz wybór',
              admin: { width: '33%' },
            },
            {
              name: 'backLabel',
              type: 'text',
              label: 'Link: wstecz',
              admin: { width: '33%' },
            },
            {
              name: 'rejectAllLabel',
              type: 'text',
              label: 'Link: odrzuć wszystkie',
              admin: { width: '33%' },
            },
          ],
        },
        {
          type: 'group',
          name: 'necessaryCategory',
          label: 'Kategoria: niezbędne',
          fields: [
            { name: 'title', type: 'text', label: 'Tytuł' },
            { name: 'description', type: 'textarea', label: 'Opis' },
          ],
        },
        {
          type: 'group',
          name: 'analyticsCategory',
          label: 'Kategoria: analityczne',
          fields: [
            { name: 'title', type: 'text', label: 'Tytuł' },
            { name: 'description', type: 'textarea', label: 'Opis' },
          ],
        },
        {
          type: 'group',
          name: 'marketingCategory',
          label: 'Kategoria: marketingowe',
          fields: [
            { name: 'title', type: 'text', label: 'Tytuł' },
            { name: 'description', type: 'textarea', label: 'Opis' },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Stopka',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'settingsLinkLabel',
          type: 'text',
          label: 'Etykieta linku „Ustawienia cookies”',
          defaultValue: 'Ustawienia cookies',
        },
        link({
          appearances: false,
          overrides: {
            name: 'privacyLink',
            label: 'Link do polityki prywatności (opcjonalny override)',
            admin: {
              description:
                'Opcjonalnie — baner używa learnMoreHref powyżej. Pole na przyszłe rozszerzenia.',
            },
          },
        }),
      ],
    },
  ],
  hooks: { afterChange: [revalidateCookieConsent] },
}
