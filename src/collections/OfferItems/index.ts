import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateOfferItem, revalidateOfferItemDelete } from './hooks/revalidateOfferItem'

export const OfferItems: CollectionConfig<'offerItems'> = {
  slug: 'offerItems',
  labels: {
    singular: 'Oferta — usługa',
    plural: 'Oferty (usługi)',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    shortDescription: true,
    image: true,
    imageAlt: true,
    imageCropClassName: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'offerItems',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'offerItems',
        req,
      }),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Karta',
          fields: [
            {
              name: 'shortDescription',
              type: 'textarea',
              required: true,
              admin: {
                description:
                  'Treść wyświetlana na karcie w sekcji oferty na stronie głównej (2–4 zdania).',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Zdjęcie karty (rekomendowany format pionowy 4:5 lub 2:3).',
              },
            },
            {
              name: 'imageAlt',
              type: 'text',
              required: true,
              admin: {
                description:
                  'Opis alternatywny obrazu (dostępność, SEO). Najlepiej krótkie, opisowe zdanie.',
              },
            },
            {
              name: 'imageCropClassName',
              type: 'text',
              admin: {
                description:
                  'Opcjonalne klasy Tailwind do kadrowania obrazu na karcie (np. "h-[150%] top-[-16.62%] w-full"). Zostaw puste, by użyć domyślnego dopasowania cover.',
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateOfferItem],
    afterDelete: [revalidateOfferItemDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
