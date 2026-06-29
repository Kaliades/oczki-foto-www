import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { generateGlobalPreviewPath } from '@/utilities/generatePreviewPath'
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
    livePreview: { url: () => generateGlobalPreviewPath('/') },
    preview: () => generateGlobalPreviewPath('/'),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'SEO i social',
          fields: [
            {
              name: 'defaultOgImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Domyślny obraz Open Graph',
              admin: {
                description:
                  'Wyświetlany przy udostępnianiu linku w social mediach (Facebook, LinkedIn, Messenger). Zalecany format ok. 1200×630 px.',
              },
            },
            {
              name: 'defaultOgImageAlt',
              type: 'text',
              label: 'Opis alt obrazu OG',
              admin: {
                description:
                  'Krótki opis obrazu dla czytników ekranu i platform social — np. nazwa marki + hasło.',
              },
            },
          ],
        },
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
                        { label: 'Wesele z Klasą', value: 'weselezklasa' },
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
          name: 'newsletter',
          label: 'Newsletter',
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
                      name: 'plain',
                      type: 'text',
                      admin: { width: '40%' },
                      label: 'Tekst zwykły',
                    },
                    {
                      name: 'emphasis',
                      type: 'text',
                      admin: { width: '30%' },
                      label: 'Wyróżniony fragment (italik)',
                    },
                    {
                      name: 'plainEnd',
                      type: 'text',
                      admin: { width: '30%' },
                      label: 'Tekst po wyróżnieniu',
                    },
                  ],
                },
              ],
            },
            {
              name: 'intro',
              type: 'textarea',
              label: 'Tekst wprowadzający',
            },
            {
              name: 'submitLabel',
              type: 'text',
              label: 'Etykieta przycisku',
            },
            link({
              appearances: false,
              overrides: {
                name: 'privacyLink',
                label: 'Link do polityki prywatności',
                admin: {
                  description: 'Wyświetlany jako "politykę prywatności" pod formularzem.',
                },
              },
            }),
            {
              type: 'row',
              fields: [
                {
                  name: 'photo',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { width: '50%' },
                  label: 'Zdjęcie (po prawej stronie formularza)',
                },
                {
                  name: 'photoAlt',
                  type: 'text',
                  admin: { width: '50%' },
                  label: 'Opis alt zdjęcia',
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
            {
              name: 'serviceLinks',
              type: 'array',
              label: 'Linki do usług (lewa kolumna)',
              admin: {
                initCollapsed: true,
                description: 'Linki do podstron oferty wyświetlane w stopce.',
              },
              fields: [
                { name: 'label', type: 'text', required: true, label: 'Etykieta' },
                link({
                  appearances: false,
                  disableLabel: true,
                  overrides: { name: 'link', label: 'Cel linku' },
                }),
              ],
            },
            {
              name: 'pageLinks',
              type: 'array',
              label: 'Linki do stron (prawa kolumna)',
              admin: {
                initCollapsed: true,
                description: 'Linki do pozostałych podstron wyświetlane w stopce.',
              },
              fields: [
                { name: 'label', type: 'text', required: true, label: 'Etykieta' },
                link({
                  appearances: false,
                  disableLabel: true,
                  overrides: { name: 'link', label: 'Cel linku' },
                }),
              ],
            },
            {
              name: 'galleryImages',
              type: 'array',
              label: 'Zdjęcia w stopce (siatka)',
              maxRows: 6,
              admin: {
                initCollapsed: true,
                description: 'Portfolio w stopce — od 4 do 6 zdjęć, wyświetlane jako siatka.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      required: true,
                      admin: { width: '60%' },
                    },
                    {
                      name: 'alt',
                      type: 'text',
                      required: true,
                      admin: { width: '40%' },
                      label: 'Opis alt',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
  versions: { drafts: { autosave: { interval: 100 }, schedulePublish: true } },
}
