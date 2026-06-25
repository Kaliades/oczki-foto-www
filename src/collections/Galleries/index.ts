import type { CollectionConfig, Field } from 'payload'
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

/** Split heading: one sentence rendered in two/three typographic styles. */
const splitHeading = (config?: { withEnd?: boolean }): Field => ({
  name: 'heading',
  type: 'group',
  label: 'Nagłówek',
  admin: {
    description:
      'Jedno zdanie podzielone na części. „Wyróżnienie” jest renderowane innym krojem/kolorem.',
  },
  fields: [
    { name: 'start', type: 'text', label: 'Początek' },
    { name: 'emphasis', type: 'text', label: 'Wyróżnienie' },
    ...(config?.withEnd ? [{ name: 'end', type: 'text', label: 'Koniec' } as Field] : []),
  ],
})

/** Upload + alt text pair for a content photo. */
const imageWithAlt = (config: { imageName: string; altName: string; imageLabel: string }): Field[] => [
  {
    name: config.imageName,
    type: 'upload',
    relationTo: 'media',
    label: config.imageLabel,
  },
  {
    name: config.altName,
    type: 'text',
    label: 'Opis alternatywny zdjęcia',
    admin: { description: 'Opis dla dostępności i SEO (krótkie, opisowe zdanie).' },
  },
]

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
          label: 'Podstrona (case study)',
          description:
            'Treść podstrony pojedynczej realizacji (/galeria/[slug]). Układ, ozdobniki i kadrowanie są zaszyte w kodzie — tu edytujesz tylko teksty i zdjęcia. Bento z sekcji „Galeria zdjęć” korzysta ze zdjęć z zakładki „Treść”.',
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: 'Sekcja powitalna (hero)',
              admin: { description: 'Pierwszy ekran podstrony realizacji.' },
              fields: [
                {
                  name: 'heading',
                  type: 'group',
                  label: 'Nagłówek',
                  admin: {
                    description:
                      'Zdanie podzielone na trzy części: początek, wyróżnienie i końcówka (np. kropka).',
                  },
                  fields: [
                    { name: 'lead', type: 'textarea', label: 'Początek' },
                    { name: 'emphasis', type: 'text', label: 'Wyróżnienie' },
                    { name: 'end', type: 'text', label: 'Koniec' },
                  ],
                },
                { name: 'description', type: 'textarea', label: 'Opis' },
                ...imageWithAlt({
                  imageName: 'backgroundImage',
                  altName: 'backgroundAlt',
                  imageLabel: 'Zdjęcie tła',
                }),
              ],
            },
            {
              name: 'details',
              type: 'group',
              label: 'Detale realizacji',
              fields: [
                splitHeading(),
                {
                  name: 'items',
                  type: 'array',
                  label: 'Detale',
                  labels: { singular: 'Detal', plural: 'Detale' },
                  admin: { initCollapsed: true },
                  fields: [
                    { name: 'title', type: 'text', label: 'Tytuł' },
                    { name: 'description', type: 'textarea', label: 'Opis' },
                  ],
                },
              ],
            },
            {
              name: 'duoPerspective',
              type: 'group',
              label: 'Dwa spojrzenia',
              fields: [
                splitHeading(),
                { name: 'leadParagraph', type: 'textarea', label: 'Akapit wprowadzający' },
                { name: 'callout', type: 'text', label: 'Wyróżniony nagłówek listy' },
                ...imageWithAlt({
                  imageName: 'photo',
                  altName: 'photoAlt',
                  imageLabel: 'Zdjęcie',
                }),
                {
                  name: 'highlights',
                  type: 'array',
                  label: 'Wyróżnienia',
                  labels: { singular: 'Wyróżnienie', plural: 'Wyróżnienia' },
                  admin: { initCollapsed: true },
                  fields: [
                    { name: 'title', type: 'text', label: 'Tytuł' },
                    { name: 'description', type: 'textarea', label: 'Opis' },
                  ],
                },
              ],
            },
            {
              name: 'venueStory',
              type: 'group',
              label: 'Historia miejsca',
              admin: {
                description:
                  'Te same trzy zdjęcia są używane na wszystkich szerokościach (desktop/tablet/mobile).',
              },
              fields: [
                splitHeading(),
                { name: 'body', type: 'textarea', label: 'Treść' },
                ...imageWithAlt({
                  imageName: 'backImage',
                  altName: 'backAlt',
                  imageLabel: 'Zdjęcie w tle',
                }),
                ...imageWithAlt({
                  imageName: 'frontImage',
                  altName: 'frontAlt',
                  imageLabel: 'Zdjęcie na pierwszym planie',
                }),
                ...imageWithAlt({
                  imageName: 'scallopImage',
                  altName: 'scallopAlt',
                  imageLabel: 'Zdjęcie w ramce (scallop)',
                }),
              ],
            },
            {
              name: 'photoGallery',
              type: 'group',
              label: 'Galeria zdjęć (bento)',
              admin: {
                description:
                  'Same zdjęcia pochodzą z zakładki „Treść” → „Zdjęcia”. Tu ustawiasz tylko nagłówek i etykietę przycisku.',
              },
              fields: [
                splitHeading({ withEnd: true }),
                { name: 'loadMoreLabel', type: 'text', label: 'Etykieta przycisku „Zobacz więcej”' },
              ],
            },
            {
              name: 'testimonial',
              type: 'group',
              label: 'Opinie',
              fields: [
                splitHeading(),
                {
                  name: 'items',
                  type: 'array',
                  label: 'Opinie',
                  labels: { singular: 'Opinia', plural: 'Opinie' },
                  admin: { initCollapsed: true },
                  fields: [
                    { name: 'quote', type: 'textarea', label: 'Treść opinii' },
                    { name: 'author', type: 'text', label: 'Autor' },
                    ...imageWithAlt({
                      imageName: 'photo',
                      altName: 'photoAlt',
                      imageLabel: 'Zdjęcie (polaroid)',
                    }),
                  ],
                },
              ],
            },
            {
              name: 'memorableMoment',
              type: 'group',
              label: 'To, co zapamiętamy',
              fields: [
                { name: 'title', type: 'text', label: 'Tytuł' },
                { name: 'body', type: 'textarea', label: 'Treść' },
                ...imageWithAlt({
                  imageName: 'portraitPhoto',
                  altName: 'portraitAlt',
                  imageLabel: 'Zdjęcie pionowe',
                }),
                ...imageWithAlt({
                  imageName: 'landscapePhoto',
                  altName: 'landscapeAlt',
                  imageLabel: 'Zdjęcie poziome',
                }),
              ],
            },
            {
              name: 'closingCta',
              type: 'group',
              label: 'Podziękowanie (CTA)',
              fields: [
                splitHeading({ withEnd: true }),
                { name: 'body', type: 'textarea', label: 'Treść' },
                {
                  name: 'cta',
                  type: 'group',
                  label: 'Przycisk (CTA)',
                  fields: [
                    { name: 'label', type: 'text', defaultValue: 'Opowiedz też naszą historię', label: 'Etykieta' },
                    { name: 'url', type: 'text', defaultValue: '/kontakt', label: 'Adres (URL)' },
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
