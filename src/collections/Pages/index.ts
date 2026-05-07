import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { AboutHero } from '@/blocks/AboutHero/config'
import { AboutValues } from '@/blocks/AboutValues/config'
import { AboutApproach } from '@/blocks/AboutApproach/config'
import { AboutExpertise } from '@/blocks/AboutExpertise/config'
import { AboutHobbies } from '@/blocks/AboutHobbies/config'
import { AboutDuoBio } from '@/blocks/AboutDuoBio/config'
import { AboutCollaboration } from '@/blocks/AboutCollaboration/config'
import { AboutInstagram } from '@/blocks/AboutInstagram/config'
import { AboutCta } from '@/blocks/AboutCta/config'
import { AboutNewsletter } from '@/blocks/AboutNewsletter/config'
import { GalleryHero } from '@/blocks/GalleryHero/config'
import { GalleryGrid } from '@/blocks/GalleryGrid/config'
import { GalleryQuoteBand } from '@/blocks/GalleryQuoteBand/config'
import { GalleryFaq } from '@/blocks/GalleryFaq/config'
import { GalleryCta } from '@/blocks/GalleryCta/config'
import { GalleryNewsletter } from '@/blocks/GalleryNewsletter/config'
import { PolicyHero } from '@/blocks/PolicyHero/config'
import { PolicyContent } from '@/blocks/PolicyContent/config'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
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
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                AboutHero,
                AboutValues,
                AboutApproach,
                AboutExpertise,
                AboutHobbies,
                AboutDuoBio,
                AboutCollaboration,
                AboutInstagram,
                AboutCta,
                AboutNewsletter,
                GalleryHero,
                GalleryGrid,
                GalleryQuoteBand,
                GalleryFaq,
                GalleryCta,
                GalleryNewsletter,
                PolicyHero,
                PolicyContent,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
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
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

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
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
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
