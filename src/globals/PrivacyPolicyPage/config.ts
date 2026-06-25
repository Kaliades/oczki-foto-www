import type { GlobalConfig } from 'payload'

import { revalidatePrivacyPolicyPage } from './hooks/revalidatePrivacyPolicyPage'

export const PrivacyPolicyPage: GlobalConfig = {
  slug: 'privacyPolicyPage',
  label: 'Polityka prywatności',
  access: { read: () => true },
  admin: {
    description:
      'Treść podstrony /polityka-prywatnosci. Układ i ozdobniki są zaszyte w kodzie — tu edytujesz przepisy prawne.',
    livePreview: { url: ({ req }) => `${req.payload.config.serverURL}/polityka-prywatnosci` },
    preview: (_, { req }) => `${req.payload.config.serverURL}/polityka-prywatnosci`,
  },
  versions: { drafts: { autosave: { interval: 100 }, schedulePublish: true } },
  fields: [
    { name: 'pageTitle', type: 'text', label: 'Tytuł strony (h1 i meta)' },
    { name: 'intro', type: 'textarea', label: 'Wstęp (akapit przed sekcjami)' },
    {
      name: 'sections',
      type: 'array',
      label: 'Sekcje',
      labels: { singular: 'Sekcja', plural: 'Sekcje' },
      admin: {
        initCollapsed: true,
        description:
          'Każda sekcja ma numer (generowany kolejnością), tytuł, opcjonalny wstęp, opcjonalną treść główną i opcjonalną listę punktowaną.',
      },
      fields: [
        { name: 'id', type: 'text', label: 'ID (kotwica dla TOC, np. privacy-cookies)' },
        { name: 'title', type: 'text', label: 'Tytuł sekcji' },
        {
          name: 'body',
          type: 'textarea',
          label: 'Treść główna (opcjonalna, zamiast lub przed listą)',
        },
        { name: 'intro', type: 'textarea', label: 'Wstęp do listy punktowanej (opcjonalny)' },
        {
          name: 'bullets',
          type: 'array',
          label: 'Lista punktowana',
          labels: { singular: 'Punkt', plural: 'Punkty' },
          admin: { initCollapsed: true },
          fields: [
            { name: 'id', type: 'text', label: 'ID (unikalne, np. scope-contract)' },
            { name: 'title', type: 'text', label: 'Tytuł punktu' },
            {
              name: 'description',
              type: 'textarea',
              label: 'Opis (opcjonalny — zostaw puste dla punktu bez opisu)',
            },
          ],
        },
      ],
    },
    {
      name: 'meta',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'title', type: 'text', label: 'Tytuł strony (meta title)' },
        { name: 'description', type: 'textarea', label: 'Opis strony (meta description)' },
      ],
    },
  ],
  hooks: { afterChange: [revalidatePrivacyPolicyPage] },
}
