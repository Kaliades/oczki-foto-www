import type { GlobalConfig } from 'payload'

import { GALLERY_SESSION_FILTERS } from '@/components/GalleryHero/constants'
import { ADMIN_GROUP_PAGES } from '@/constants/adminGroups'
import { generateGlobalPreviewPath } from '../../utilities/generatePreviewPath'

import { revalidateGalleryPage } from './hooks/revalidateGalleryPage'

const SESSION_FILTER_OPTIONS = GALLERY_SESSION_FILTERS.map((f) => ({
  label: f.label,
  value: f.id,
}))

export const GalleryPage: GlobalConfig = {
  slug: 'galleryPage',
  label: 'Galeria — ustawienia strony',
  access: { read: () => true },
  admin: {
    group: ADMIN_GROUP_PAGES,
    description:
      'Nagłówek, filtry i sekcje strony /galeria (nie pojedyncze realizacje — te są w „Realizacje”).',
    livePreview: { url: () => generateGlobalPreviewPath('/galeria') },
    preview: () => generateGlobalPreviewPath('/galeria'),
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
          name: 'easeSection',
          label: 'Sekcja „Lekkość”',
          fields: [
            {
              name: 'heading',
              type: 'group',
              label: 'Nagłówek',
              fields: [
                { name: 'start', type: 'text', label: 'Początek' },
                { name: 'emphasis', type: 'text', label: 'Wyróżnienie' },
              ],
            },
            { name: 'body', type: 'textarea', label: 'Treść' },
            {
              name: 'photo',
              type: 'upload',
              relationTo: 'media',
              label: 'Zdjęcie w ramce',
            },
            { name: 'photoAlt', type: 'text', label: 'Opis alternatywny zdjęcia' },
          ],
        },
        {
          name: 'faqSection',
          label: 'FAQ',
          fields: [
            {
              name: 'heading',
              type: 'group',
              label: 'Nagłówek',
              fields: [
                { name: 'emphasis', type: 'text', label: 'Wyróżnienie' },
                { name: 'start', type: 'text', label: 'Koniec nagłówka' },
              ],
            },
            { name: 'intro', type: 'textarea', label: 'Wprowadzenie' },
            {
              name: 'items',
              type: 'array',
              label: 'Pytania',
              labels: { singular: 'Pytanie', plural: 'Pytania' },
              admin: { initCollapsed: true },
              fields: [
                { name: 'id', type: 'text', label: 'Identyfikator (slug)' },
                { name: 'question', type: 'text', label: 'Pytanie' },
                { name: 'answer', type: 'textarea', label: 'Odpowiedź' },
              ],
            },
          ],
        },
        {
          name: 'ctaSection',
          label: 'CTA końcowe',
          fields: [
            {
              name: 'heading',
              type: 'group',
              label: 'Nagłówek',
              fields: [
                { name: 'start', type: 'text', label: 'Początek' },
                { name: 'emphasis', type: 'text', label: 'Wyróżnienie' },
                { name: 'end', type: 'text', label: 'Koniec' },
              ],
            },
            { name: 'body', type: 'textarea', label: 'Treść' },
            {
              name: 'button',
              type: 'group',
              label: 'Przycisk',
              fields: [
                { name: 'label', type: 'text', label: 'Etykieta' },
                { name: 'url', type: 'text', label: 'Adres (URL)' },
              ],
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
