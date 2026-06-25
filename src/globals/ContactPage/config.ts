import type { GlobalConfig } from 'payload'

import { revalidateContactPage } from './hooks/revalidateContactPage'

export const ContactPage: GlobalConfig = {
  slug: 'contactPage',
  label: 'Strona „Kontakt"',
  access: { read: () => true },
  admin: {
    description:
      'Treść podstrony /kontakt. Formularz, botanika i layout są zaszyte w kodzie — tu edytujesz tylko teksty.',
    livePreview: { url: ({ req }) => `${req.payload.config.serverURL}/kontakt` },
    preview: (_, { req }) => `${req.payload.config.serverURL}/kontakt`,
  },
  versions: { drafts: { autosave: { interval: 100 }, schedulePublish: true } },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          label: 'Hero (formularz)',
          fields: [
            {
              name: 'heading',
              type: 'group',
              label: 'Nagłówek (start + wyróżnienie + koniec)',
              fields: [
                { name: 'start', type: 'text', label: 'Początek' },
                { name: 'emphasis', type: 'text', label: 'Wyróżnienie' },
                { name: 'end', type: 'text', label: 'Koniec' },
              ],
            },
            { name: 'description', type: 'textarea', label: 'Opis pod nagłówkiem' },
            {
              name: 'sessionQuestion',
              type: 'text',
              label: 'Pytanie o typ sesji (nad filtrami)',
              defaultValue: 'O jakiej sesji marzysz?',
            },
            {
              name: 'submitLabel',
              type: 'text',
              label: 'Etykieta przycisku formularza',
              defaultValue: 'Wyślij wiadomość',
            },
          ],
        },
        {
          name: 'serviceArea',
          label: 'Obszar działania',
          fields: [
            { name: 'heading', type: 'text', label: 'Nagłówek' },
            {
              name: 'introParagraph1',
              type: 'textarea',
              label: 'Akapit wprowadzający 1',
            },
            {
              name: 'introParagraph2',
              type: 'textarea',
              label: 'Akapit wprowadzający 2',
            },
            {
              name: 'accordion',
              type: 'array',
              label: 'Akordeony (lokalizacje)',
              labels: { singular: 'Lokalizacja', plural: 'Lokalizacje' },
              admin: { initCollapsed: true },
              fields: [
                { name: 'id', type: 'text', label: 'ID (np. krakow)' },
                { name: 'title', type: 'text', label: 'Tytuł' },
                { name: 'body', type: 'textarea', label: 'Treść' },
              ],
            },
            { name: 'footer', type: 'textarea', label: 'Tekst pod akordeonami' },
            {
              name: 'cta',
              type: 'group',
              label: 'Przycisk (CTA)',
              fields: [
                { name: 'label', type: 'text', defaultValue: 'Umów sesję', label: 'Etykieta' },
                { name: 'url', type: 'text', defaultValue: '/kontakt', label: 'Adres (URL)' },
              ],
            },
          ],
        },
        {
          name: 'faq',
          label: 'FAQ',
          fields: [
            {
              name: 'heading',
              type: 'group',
              label: 'Nagłówek',
              admin: {
                description:
                  'Ten nagłówek zaczyna się od wyróżnienia, po którym następuje reszta tekstu.',
              },
              fields: [
                { name: 'emphasis', type: 'text', label: 'Wyróżnienie (początek)' },
                { name: 'start', type: 'text', label: 'Reszta tekstu (po wyróżnieniu)' },
              ],
            },
            { name: 'intro', type: 'textarea', label: 'Wprowadzenie' },
            {
              name: 'items',
              type: 'array',
              label: 'Pytania i odpowiedzi',
              labels: { singular: 'Pytanie', plural: 'Pytania' },
              admin: { initCollapsed: true },
              fields: [
                { name: 'id', type: 'text', label: 'ID (unikalne, np. date-location)' },
                { name: 'question', type: 'text', label: 'Pytanie' },
                { name: 'answer', type: 'textarea', label: 'Odpowiedź' },
              ],
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            { name: 'title', type: 'text', label: 'Tytuł strony (meta title)' },
            { name: 'description', type: 'textarea', label: 'Opis strony (meta description)' },
          ],
        },
      ],
    },
  ],
  hooks: { afterChange: [revalidateContactPage] },
}
