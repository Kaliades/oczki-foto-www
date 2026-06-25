import type { Block } from 'payload'

import { link } from '@/fields/link'

export const HomeInstagram: Block = {
  slug: 'homeInstagram',
  interfaceName: 'HomeInstagramBlock',
  labels: {
    singular: 'Sekcja Instagram',
    plural: 'Sekcja Instagram',
  },
  fields: [
    {
      type: 'group',
      name: 'heading',
      label: 'Nagłówek',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'plain',
              type: 'text',
              required: true,
              admin: { width: '60%' },
              label: 'Tekst zwykły (np. „Zostańmy w kontakcie na ")',
            },
            {
              name: 'emphasis',
              type: 'text',
              required: true,
              admin: { width: '40%' },
              label: 'Wyróżnienie (np. „Instagramie")',
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'profile',
      label: 'Profil Instagram',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'avatar',
              type: 'upload',
              relationTo: 'media',
              admin: { width: '60%' },
              label: 'Zdjęcie profilowe',
            },
            {
              name: 'avatarAlt',
              type: 'text',
              admin: { width: '40%' },
              label: 'Opis alt avatara',
            },
          ],
        },
        link({
          appearances: false,
          overrides: {
            name: 'profileLink',
            label: 'Link do profilu',
            admin: { description: 'URL zewnętrzny do profilu Instagram.' },
          },
        }),
      ],
    },
    {
      name: 'posts',
      type: 'array',
      label: 'Posty (5 zdjęć)',
      minRows: 5,
      maxRows: 5,
      admin: {
        initCollapsed: true,
        description: 'Dokładnie 5 postów. Kolejność odpowiada kolejności na stronie.',
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
              label: 'Zdjęcie',
            },
            {
              name: 'imageAlt',
              type: 'text',
              required: true,
              admin: { width: '40%' },
              label: 'Opis alt',
            },
          ],
        },
        {
          name: 'href',
          type: 'text',
          label: 'Link do postu (opcjonalnie)',
          admin: {
            description: 'Bezpośredni URL posta. Gdy pusty — klika do profilu.',
          },
        },
        {
          name: 'cropClassName',
          type: 'text',
          label: 'Klasy kadrowania (techniczne)',
          admin: {
            description:
              'Tailwind klasy precyzującego kadrowanie zdjęcia w kafelku (np. "absolute h-[134%] top-[-0.5%]…"). Zostaw puste dla cover domyślnego.',
          },
        },
      ],
    },
  ],
}
