import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { HomeAbout } from '../../blocks/HomeAbout/config'
import { HomeCta } from '../../blocks/HomeCta/config'
import { HomeGallery } from '../../blocks/HomeGallery/config'
import { HomeHero } from '../../blocks/HomeHero/config'
import { HomeInstagram } from '../../blocks/HomeInstagram/config'
import { IntroQuote } from '../../blocks/IntroQuote/config'
import { OfferShowcase } from '../../blocks/OfferShowcase/config'
import { ProcessSteps } from '../../blocks/ProcessSteps/config'
import { Testimonial } from '../../blocks/Testimonial/config'
import { ADMIN_GROUP_PAGES } from '@/constants/adminGroups'
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

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  labels: {
    singular: 'Strona główna',
    plural: 'Strona główna',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    group: ADMIN_GROUP_PAGES,
    description:
      'Edytuj wyłącznie wpis ze slugiem „home” — to strona startowa (/). Nie dodawaj nowych stron; pozostałe podstrony są w sekcji „Strony witryny” po lewej.',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          // Home page lives at `/` in production, not `/home`.
          slug: data?.slug === 'home' ? '' : data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: (data?.slug === 'home' ? '' : (data?.slug as string)) as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Tytuł (w panelu)',
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
              label: 'Sekcje strony głównej',
              blocks: [
                HomeHero,
                IntroQuote,
                OfferShowcase,
                ProcessSteps,
                HomeGallery,
                Testimonial,
                HomeAbout,
                HomeInstagram,
                HomeCta,
              ],
              required: true,
              admin: {
                initCollapsed: true,
                description:
                  'Kolejność sekcji jest ustalona w projekcie. Edytuj treść i zdjęcia wewnątrz każdego bloku.',
              },
            },
          ],
          label: 'Treść',
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
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
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
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
