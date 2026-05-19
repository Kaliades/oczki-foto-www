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
import { revalidateGallery, revalidateGalleryDelete } from './hooks/revalidateGallery'

export const Galleries: CollectionConfig<'galleries'> = {
  slug: 'galleries',
  labels: {
    singular: 'Galeria',
    plural: 'Galerie',
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
    coverImage: true,
    intro: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'galleries',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'galleries',
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
          label: 'Treść',
          fields: [
            {
              name: 'intro',
              type: 'textarea',
              admin: {
                description: 'Krótkie wprowadzenie do galerii (1–3 zdania).',
              },
            },
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Zdjęcie okładkowe',
            },
            {
              name: 'relatedOfferItem',
              type: 'relationship',
              relationTo: 'offerItems',
              label: 'Powiązana oferta',
              admin: {
                description:
                  'Galeria może być powiązana z konkretną usługą (np. sesja kobieca). Wyświetlana na podstronie oferty.',
                position: 'sidebar',
              },
            },
            {
              name: 'photos',
              type: 'array',
              required: true,
              minRows: 1,
              labels: {
                singular: 'Zdjęcie',
                plural: 'Zdjęcia',
              },
              admin: {
                initCollapsed: true,
                description:
                  'Kolejność wpływa na układ w galerii. Każde zdjęcie wymaga osobnego opisu alt.',
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
                      name: 'caption',
                      type: 'text',
                      admin: { width: '40%' },
                      label: 'Podpis (opcjonalny)',
                    },
                  ],
                },
              ],
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
    afterChange: [revalidateGallery],
    afterDelete: [revalidateGalleryDelete],
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
