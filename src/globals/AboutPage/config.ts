import type { GlobalConfig } from 'payload'

import { generateGlobalPreviewPath } from '../../utilities/generatePreviewPath'
import { ADMIN_GROUP_PAGES } from '@/constants/adminGroups'
import { revalidateAboutPage } from './hooks/revalidateAboutPage'

export const AboutPage: GlobalConfig = {
  slug: 'aboutPage',
  label: 'Strona „O mnie"',
  access: { read: () => true },
  admin: {
    group: ADMIN_GROUP_PAGES,
    description:
      'Treść podstrony /o-mnie. Układ, ozdobniki botaniczne i piksele layoutu są zaszyte w kodzie — tu edytujesz tylko teksty i zdjęcia.',
    livePreview: { url: () => generateGlobalPreviewPath('/o-mnie') },
    preview: () => generateGlobalPreviewPath('/o-mnie'),
  },
  versions: { drafts: { autosave: { interval: 100 }, schedulePublish: true } },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          label: 'Hero',
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
            { name: 'description', type: 'textarea', label: 'Opis' },
            {
              name: 'cta',
              type: 'group',
              label: 'Przycisk (CTA)',
              fields: [
                { name: 'label', type: 'text', defaultValue: 'Umów sesję', label: 'Etykieta' },
                { name: 'url', type: 'text', defaultValue: '/kontakt', label: 'Adres (URL)' },
              ],
            },
            {
              name: 'portrait',
              type: 'upload',
              relationTo: 'media',
              label: 'Portret (główne zdjęcie)',
            },
            { name: 'portraitAlt', type: 'text', label: 'Opis alternatywny portretu' },
            {
              name: 'secondaryPhoto',
              type: 'upload',
              relationTo: 'media',
              label: 'Zdjęcie dodatkowe',
            },
            { name: 'secondaryPhotoAlt', type: 'text', label: 'Opis alternatywny zdjęcia dodatkowego' },
          ],
        },
        {
          name: 'philosophy',
          label: 'Filozofia',
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
            { name: 'intro', type: 'textarea', label: 'Wprowadzenie' },
            {
              name: 'principles',
              type: 'array',
              label: 'Zasady',
              labels: { singular: 'Zasada', plural: 'Zasady' },
              admin: { initCollapsed: true },
              fields: [
                { name: 'title', type: 'text', label: 'Tytuł' },
                { name: 'description', type: 'textarea', label: 'Opis' },
              ],
            },
          ],
        },
        {
          name: 'sessionFeel',
          label: 'Sesja jak spotkanie',
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
            { name: 'intro', type: 'textarea', label: 'Wprowadzenie' },
            {
              name: 'steps',
              type: 'array',
              label: 'Kroki',
              labels: { singular: 'Krok', plural: 'Kroki' },
              admin: {
                initCollapsed: true,
                description: 'Kolejność jest istotna — numery kroków są generowane automatycznie.',
              },
              fields: [
                { name: 'title', type: 'text', label: 'Tytuł' },
                { name: 'description', type: 'textarea', label: 'Opis' },
              ],
            },
          ],
        },
        {
          name: 'expertise',
          label: 'Wiedza i ekspertyza',
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
            { name: 'intro', type: 'textarea', label: 'Wprowadzenie' },
            {
              name: 'cards',
              type: 'array',
              label: 'Karty wiedzy',
              labels: { singular: 'Karta', plural: 'Karty' },
              admin: { initCollapsed: true },
              fields: [
                { name: 'title', type: 'text', label: 'Tytuł' },
                { name: 'description', type: 'textarea', label: 'Opis' },
              ],
            },
          ],
        },
        {
          name: 'beyond',
          label: 'A poza fotografią',
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
            { name: 'intro', type: 'textarea', label: 'Wprowadzenie' },
            {
              name: 'backdrop',
              type: 'upload',
              relationTo: 'media',
              label: 'Zdjęcie tła (B&W)',
            },
            { name: 'backdropAlt', type: 'text', label: 'Opis alternatywny zdjęcia tła' },
            {
              name: 'features',
              type: 'array',
              label: 'Pasje',
              labels: { singular: 'Pasja', plural: 'Pasje' },
              admin: { initCollapsed: true },
              fields: [
                { name: 'title', type: 'text', label: 'Tytuł' },
                { name: 'description', type: 'textarea', label: 'Opis' },
              ],
            },
          ],
        },
        {
          name: 'dual',
          label: 'Podwójne spojrzenie',
          fields: [
            {
              name: 'heading',
              type: 'group',
              label: 'Nagłówek (wyróżnienie + koniec)',
              admin: { description: 'Ten nagłówek zaczyna się od wyróżnienia.' },
              fields: [
                { name: 'emphasis', type: 'text', label: 'Wyróżnienie' },
                { name: 'end', type: 'text', label: 'Koniec' },
              ],
            },
            { name: 'intro', type: 'textarea', label: 'Wprowadzenie' },
            {
              name: 'portrait',
              type: 'upload',
              relationTo: 'media',
              label: 'Portret Łukasza',
            },
            { name: 'portraitAlt', type: 'text', label: 'Opis alternatywny portretu' },
            { name: 'profileHeading', type: 'text', label: 'Nagłówek profilu' },
            {
              name: 'profileItems',
              type: 'array',
              label: 'Elementy profilu',
              labels: { singular: 'Element', plural: 'Elementy' },
              admin: { initCollapsed: true },
              fields: [
                { name: 'title', type: 'text', label: 'Tytuł' },
                { name: 'description', type: 'textarea', label: 'Opis' },
              ],
            },
          ],
        },
        {
          name: 'pillars',
          label: 'Filary współpracy',
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
            { name: 'intro', type: 'textarea', label: 'Wprowadzenie' },
            {
              name: 'items',
              type: 'array',
              label: 'Filary',
              labels: { singular: 'Filar', plural: 'Filary' },
              admin: { initCollapsed: true },
              fields: [
                { name: 'title', type: 'text', label: 'Tytuł' },
                { name: 'description', type: 'textarea', label: 'Opis' },
              ],
            },
          ],
        },
        {
          name: 'instagram',
          label: 'Instagram',
          fields: [
            {
              name: 'heading',
              type: 'group',
              label: 'Nagłówek',
              fields: [
                { name: 'plain', type: 'text', label: 'Tekst normalny' },
                { name: 'emphasis', type: 'text', label: 'Wyróżnienie' },
              ],
            },
            { name: 'profileUrl', type: 'text', label: 'URL profilu Instagram' },
            {
              name: 'avatar',
              type: 'upload',
              relationTo: 'media',
              label: 'Zdjęcie profilowe',
            },
            { name: 'avatarAlt', type: 'text', label: 'Opis alternatywny avatara' },
            {
              name: 'posts',
              type: 'array',
              label: 'Posty w siatce',
              labels: { singular: 'Post', plural: 'Posty' },
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Zdjęcie',
                  required: true,
                },
                { name: 'imageAlt', type: 'text', label: 'Opis alternatywny' },
                {
                  name: 'cropClassName',
                  type: 'text',
                  label: 'Klasy kadrowania (opcjonalnie)',
                  admin: {
                    description: 'Zostaw puste — układ domyślny. Używane tylko przy nietypowym kadrze.',
                  },
                },
                { name: 'href', type: 'text', label: 'Link do posta (opcjonalnie)' },
              ],
            },
          ],
        },
        {
          name: 'cta',
          label: 'CTA końcowy',
          fields: [
            {
              name: 'headingText',
              type: 'text',
              label: 'Tekst nagłówka',
              admin: {
                description:
                  'Jednozdaniowy nagłówek — brak podziału na wyróżnienie w tym komponencie.',
              },
            },
            { name: 'body', type: 'textarea', label: 'Treść' },
            {
              name: 'button',
              type: 'group',
              label: 'Przycisk',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  defaultValue: 'Umów sesję zdjęciową',
                  label: 'Etykieta',
                },
                { name: 'url', type: 'text', defaultValue: '/kontakt', label: 'Adres (URL)' },
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
  hooks: { afterChange: [revalidateAboutPage] },
}
