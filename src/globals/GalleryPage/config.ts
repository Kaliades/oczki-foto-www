import type { GlobalConfig } from 'payload'

import { GALLERY_SESSION_FILTERS } from '@/components/GalleryHero/constants'

import { revalidateGalleryPage } from './hooks/revalidateGalleryPage'

const SESSION_FILTER_OPTIONS = GALLERY_SESSION_FILTERS.map((f) => ({
  label: f.label,
  value: f.id,
}))

export const GalleryPage: GlobalConfig = {
  slug: 'galleryPage',
  label: 'Strona „Galeria"',
  access: { read: () => true },
  admin: {
    description:
      'Treść strony /galeria: nagłówek hero, filtry typów sesji i ustawienia siatki portfolio.',
    livePreview: { url: ({ req }) => `${req.payload.config.serverURL}/galeria` },
    preview: (_, { req }) => `${req.payload.config.serverURL}/galeria`,
  },
  versions: { drafts: { autosave: { interval: 100 }, schedulePublish: true } },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'heroContent',
          label: 'Hero i filtry',
          fields: [
            {
              name: 'title',
              type: 'group',
              label: 'Nagłówek',
              fields: [
                { name: 'lead', type: 'text', label: 'Początek' },
                { name: 'emphasis', type: 'text', label: 'Wyróżnienie' },
                { name: 'trail', type: 'text', label: 'Koniec' },
              ],
            },
            { name: 'description', type: 'textarea', label: 'Opis pod nagłówkiem' },
            {
              name: 'filters',
              type: 'array',
              label: 'Filtry typów sesji',
              minRows: 1,
              maxRows: 8,
              admin: {
                description:
                  'Etykiety filtrów na stronie galerii. Id kategorii musi odpowiadać polu „Kategoria” w galeriach.',
              },
              fields: [
                {
                  name: 'category',
                  type: 'select',
                  label: 'Kategoria',
                  required: true,
                  options: SESSION_FILTER_OPTIONS,
                },
                { name: 'label', type: 'text', label: 'Etykieta', required: true },
              ],
            },
            {
              name: 'defaultFilter',
              type: 'select',
              label: 'Domyślny filtr',
              defaultValue: 'kobieca',
              options: SESSION_FILTER_OPTIONS,
            },
          ],
        },
        {
          name: 'portfolioSettings',
          label: 'Siatka portfolio',
          fields: [
            {
              name: 'initialCount',
              type: 'number',
              label: 'Liczba zdjęć na start',
              defaultValue: 12,
              min: 1,
              max: 48,
              admin: {
                description: 'Ile kafelków pokazać przed kliknięciem „Zobacz więcej zdjęć”.',
              },
            },
            {
              name: 'loadMoreBatchSize',
              type: 'number',
              label: 'Liczba zdjęć po „Zobacz więcej”',
              defaultValue: 12,
              min: 1,
              max: 48,
            },
            {
              name: 'loadMoreLabel',
              type: 'text',
              label: 'Tekst przycisku „Zobacz więcej”',
              defaultValue: 'Zobacz więcej zdjęć',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGalleryPage],
  },
}
