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
import { ADMIN_GROUP_PAGES } from '@/constants/adminGroups'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateOfferItem, revalidateOfferItemDelete } from './hooks/revalidateOfferItem'

/**
 * Split heading shared across most offer sections. The sentence is one
 * thought rendered in two (optionally three) typographic styles — the
 * `emphasis` part uses a different face/colour. See `docs/CMS-INSTRUKCJA.md`
 * §8.1 for why this is two fields instead of one rich-text field.
 */
const splitHeading = (config?: { withEnd?: boolean; emphasisOptional?: boolean }): Field => ({
  name: 'heading',
  type: 'group',
  label: 'Nagłówek',
  admin: {
    description:
      'Jedno zdanie podzielone na części. „Wyróżnienie” jest renderowane innym krojem/kolorem — razem tworzą całość.',
  },
  fields: [
    { name: 'start', type: 'text', label: 'Początek' },
    {
      name: 'emphasis',
      type: 'text',
      label: 'Wyróżnienie',
      admin: config?.emphasisOptional
        ? { description: 'Opcjonalne — zostaw puste, jeśli nagłówek nie ma wyróżnionego fragmentu.' }
        : undefined,
    },
    ...(config?.withEnd ? [{ name: 'end', type: 'text', label: 'Koniec' } as Field] : []),
  ],
})

/** Simple CTA modelled as label + URL (decision: text, not a relation). */
const ctaGroup = (defaultLabel: string, defaultUrl = '/kontakt'): Field => ({
  name: 'cta',
  type: 'group',
  label: 'Przycisk (CTA)',
  fields: [
    { name: 'label', type: 'text', defaultValue: defaultLabel, label: 'Etykieta' },
    { name: 'url', type: 'text', defaultValue: defaultUrl, label: 'Adres (URL)' },
  ],
})

/** Upload + required alt text pair, used for every content photo. */
const imageWithAlt = (config: {
  imageName: string
  altName: string
  imageLabel: string
  altLabel?: string
  description?: string
}): Field[] => [
  {
    name: config.imageName,
    type: 'upload',
    relationTo: 'media',
    label: config.imageLabel,
    admin: config.description ? { description: config.description } : undefined,
  },
  {
    name: config.altName,
    type: 'text',
    label: config.altLabel ?? 'Opis alternatywny zdjęcia',
    admin: {
      description: 'Opis dla dostępności i SEO (krótkie, opisowe zdanie).',
    },
  },
]

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
    group: ADMIN_GROUP_PAGES,
    description:
      'Każda oferta to kafelek na /oferta oraz pełna podstrona /oferta/[slug]. Edytuj zakładkami — hero, pakiety, galeria itd.',
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
      label: 'Nazwa usługi',
      required: true,
      admin: {
        description: 'Np. „Sesja kobieca”. Używana w tytule karty, podstrony i SEO.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Karta',
          description: 'Treść kafelka w sekcji oferty na stronie głównej.',
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
          label: 'Podstrona',
          description:
            'Treść podstrony usługi (/oferta/[slug]). Każda sekcja jest opcjonalna — puste sekcje używają treści domyślnej.',
          fields: [
            {
              type: 'collapsible',
              label: 'Hero (nagłówek strony)',
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'hero',
                  type: 'group',
                  label: false,
                  fields: [
                    splitHeading(),
                    { name: 'description', type: 'textarea', label: 'Opis' },
                    ctaGroup('Umów sesję'),
                    ...imageWithAlt({
                      imageName: 'image',
                      altName: 'imageAlt',
                      imageLabel: 'Zdjęcie hero',
                    }),
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Podejście (jak pracuję)',
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'approach',
                  type: 'group',
                  label: false,
                  fields: [
                    splitHeading({ withEnd: true }),
                    {
                      name: 'introParagraph1',
                      type: 'textarea',
                      label: 'Wprowadzenie — akapit 1',
                    },
                    {
                      name: 'introParagraph2',
                      type: 'textarea',
                      label: 'Wprowadzenie — akapit 2',
                    },
                    {
                      name: 'blocks',
                      type: 'array',
                      label: 'Bloki',
                      minRows: 3,
                      maxRows: 3,
                      admin: {
                        description: 'Dokładnie 3 bloki. Układ graficzny każdego bloku jest stały.',
                      },
                      fields: [
                        { name: 'title', type: 'text', required: true, label: 'Tytuł' },
                        { name: 'description', type: 'textarea', required: true, label: 'Opis' },
                      ],
                    },
                    ...imageWithAlt({
                      imageName: 'portraitImage',
                      altName: 'portraitAlt',
                      imageLabel: 'Portret',
                    }),
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Pakiety',
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'packages',
                  type: 'group',
                  label: false,
                  fields: [
                    {
                      name: 'catalogDownload',
                      type: 'group',
                      label: 'Pobierz katalog',
                      fields: [
                        { name: 'label', type: 'text', defaultValue: 'Pobierz katalog', label: 'Etykieta' },
                        { name: 'url', type: 'text', defaultValue: '/katalog', label: 'Adres (URL)' },
                      ],
                    },
                    {
                      name: 'items',
                      type: 'array',
                      label: 'Pakiety',
                      minRows: 3,
                      maxRows: 3,
                      admin: {
                        description:
                          'Dokładnie 3 pakiety. Kolorystyka (sage/cream/rose) i kadrowanie są przypisane wg kolejności.',
                      },
                      fields: [
                        ...imageWithAlt({
                          imageName: 'image',
                          altName: 'imageAlt',
                          imageLabel: 'Zdjęcie pakietu',
                        }),
                        { name: 'title', type: 'text', required: true, label: 'Nazwa pakietu' },
                        {
                          name: 'price',
                          type: 'text',
                          required: true,
                          label: 'Cena',
                          admin: { description: 'Tekst wyświetlany wprost, np. „750 zł”.' },
                        },
                        {
                          name: 'badgeLabel',
                          type: 'text',
                          label: 'Plakietka (opcjonalna)',
                          admin: { description: 'Np. „Najczęściej wybierany”.' },
                        },
                        {
                          name: 'features',
                          type: 'array',
                          label: 'Co zawiera',
                          minRows: 1,
                          fields: [{ name: 'text', type: 'text', required: true, label: 'Pozycja' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'W cenie sesji',
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'inclusions',
                  type: 'group',
                  label: false,
                  fields: [
                    splitHeading({ withEnd: true }),
                    { name: 'intro', type: 'textarea', label: 'Wprowadzenie' },
                    {
                      name: 'checklist',
                      type: 'array',
                      label: 'Lista (checklista)',
                      maxRows: 6,
                      admin: {
                        description: 'Maksymalnie 6 pozycji (przekrzywienia i ozdoby są przypisane wg kolejności).',
                      },
                      fields: [
                        { name: 'title', type: 'text', required: true, label: 'Tytuł' },
                        { name: 'description', type: 'textarea', required: true, label: 'Opis' },
                      ],
                    },
                    {
                      name: 'accordionHeading',
                      type: 'text',
                      defaultValue: 'Dodatkowe informacje',
                      label: 'Nagłówek dodatkowych informacji',
                    },
                    {
                      name: 'accordion',
                      type: 'array',
                      label: 'Dodatkowe informacje (akordeon)',
                      fields: [
                        { name: 'title', type: 'text', required: true, label: 'Pytanie / tytuł' },
                        { name: 'body', type: 'textarea', required: true, label: 'Treść' },
                      ],
                    },
                    {
                      name: 'mainImage',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Zdjęcie główne (kolaż)',
                    },
                    {
                      name: 'scallopImage',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Zdjęcie w ramce (kolaż)',
                    },
                    {
                      name: 'mainImageAlt',
                      type: 'text',
                      label: 'Opis zdjęcia głównego',
                      admin: {
                        description: 'Opis alternatywny zdjęcia głównego w kolażu.',
                      },
                    },
                    { name: 'scallopImageAlt', type: 'text', label: 'Opis zdjęcia w ramce' },
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Opieka',
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'care',
                  type: 'group',
                  label: false,
                  fields: [
                    splitHeading({ withEnd: true }),
                    { name: 'intro', type: 'textarea', label: 'Wprowadzenie' },
                    {
                      name: 'features',
                      type: 'array',
                      label: 'Elementy opieki',
                      fields: [
                        { name: 'title', type: 'text', required: true, label: 'Tytuł' },
                        { name: 'description', type: 'textarea', required: true, label: 'Opis' },
                      ],
                    },
                    ...imageWithAlt({
                      imageName: 'image',
                      altName: 'imageAlt',
                      imageLabel: 'Zdjęcie',
                    }),
                    ctaGroup('Umów sesję'),
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Opinie',
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'testimonial',
                  type: 'group',
                  label: false,
                  fields: [
                    splitHeading(),
                    {
                      name: 'items',
                      type: 'array',
                      label: 'Opinie',
                      fields: [
                        { name: 'quote', type: 'textarea', required: true, label: 'Treść opinii' },
                        { name: 'author', type: 'text', required: true, label: 'Autor' },
                        ...imageWithAlt({
                          imageName: 'photo',
                          altName: 'photoAlt',
                          imageLabel: 'Zdjęcie',
                        }),
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Proces (kroki)',
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'processSteps',
                  type: 'group',
                  label: false,
                  fields: [
                    {
                      name: 'heading',
                      type: 'group',
                      label: 'Nagłówek',
                      fields: [
                        { name: 'plain', type: 'text', label: 'Początek' },
                        { name: 'emphasis', type: 'text', label: 'Wyróżnienie' },
                      ],
                    },
                    { name: 'intro', type: 'textarea', label: 'Wprowadzenie' },
                    ctaGroup('Umów sesję'),
                    {
                      name: 'items',
                      type: 'array',
                      label: 'Kroki',
                      admin: { description: 'Numery kroków są nadawane automatycznie wg kolejności.' },
                      fields: [
                        { name: 'title', type: 'text', required: true, label: 'Tytuł kroku' },
                        {
                          name: 'paragraphs',
                          type: 'array',
                          label: 'Akapity',
                          minRows: 1,
                          fields: [{ name: 'text', type: 'textarea', required: true, label: 'Akapit' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Galeria (zajawka)',
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'gallery',
                  type: 'group',
                  label: false,
                  fields: [
                    splitHeading({ emphasisOptional: true }),
                    { name: 'description', type: 'textarea', label: 'Opis' },
                    ctaGroup('Zobacz wszystkie zdjęcia', '/galeria'),
                    {
                      name: 'items',
                      type: 'array',
                      label: 'Zdjęcia',
                      maxRows: 5,
                      admin: { description: 'Maksymalnie 5 zdjęć (układ kafelków jest stały).' },
                      fields: [
                        ...imageWithAlt({
                          imageName: 'image',
                          altName: 'imageAlt',
                          imageLabel: 'Zdjęcie',
                        }),
                        { name: 'captionTitle', type: 'text', label: 'Podpis — tytuł' },
                        { name: 'captionSubtitle', type: 'text', label: 'Podpis — opis' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'CTA końcowe',
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'closingCta',
                  type: 'group',
                  label: false,
                  fields: [
                    { name: 'heading', type: 'textarea', label: 'Nagłówek' },
                    { name: 'body', type: 'textarea', label: 'Treść' },
                    ctaGroup('Zarezerwuj czas dla siebie'),
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'FAQ',
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'faq',
                  type: 'group',
                  label: false,
                  fields: [
                    splitHeading(),
                    { name: 'intro', type: 'textarea', label: 'Wprowadzenie' },
                    {
                      name: 'items',
                      type: 'array',
                      label: 'Pytania i odpowiedzi',
                      fields: [
                        { name: 'question', type: 'text', required: true, label: 'Pytanie' },
                        { name: 'answer', type: 'textarea', required: true, label: 'Odpowiedź' },
                      ],
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
