import type { GlobalConfig } from 'payload'

import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  label: 'Ustawienia witryny',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'Centralne dane brandowe: kontakt, lokalizacje, social media oraz domyślny CTA. Używane w stopce i jako fallback w blokach contentowych.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Kontakt',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'email',
                  type: 'email',
                  admin: { width: '50%' },
                  label: 'Adres e-mail',
                },
                {
                  name: 'phone',
                  type: 'text',
                  admin: { width: '50%' },
                  label: 'Telefon',
                },
              ],
            },
            {
              name: 'locationsLabel',
              type: 'text',
              label: 'Etykieta lokalizacji',
              admin: {
                description:
                  'Krótki tekst typu "Kraków · Przemyśl i okolice" wyświetlany w stopce i przy CTA.',
              },
            },
          ],
        },
        {
          label: 'Social',
          fields: [
            {
              name: 'socials',
              type: 'array',
              label: 'Linki do social media',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      required: true,
                      admin: { width: '40%' },
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
                      name: 'label',
                      type: 'text',
                      required: true,
                      admin: { width: '30%' },
                      label: 'Etykieta',
                    },
                    {
                      name: 'url',
                      type: 'text',
                      required: true,
                      admin: { width: '30%' },
                      label: 'URL',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'CTA',
          fields: [
            {
              name: 'inquiryDefaults',
              type: 'group',
              label: 'Domyślny CTA „Pogadajmy”',
              admin: {
                description:
                  'Wartości używane jako fallback w blokach (np. OfferShowcase) gdy redaktor pominie własny CTA.',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  defaultValue: 'Pogadajmy',
                },
                {
                  name: 'url',
                  type: 'text',
                  defaultValue: '/kontakt',
                },
              ],
            },
          ],
        },
        {
          label: 'Stopka',
          fields: [
            {
              name: 'copyright',
              type: 'text',
              label: 'Tekst copyright',
              admin: {
                description:
                  'Bieżący rok zostanie wstawiony w miejsce literału `{year}`, np. "© {year} Oczki Fotografia".',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
}
