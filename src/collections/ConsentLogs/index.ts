import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const ConsentLogs: CollectionConfig = {
  slug: 'consentLogs',
  labels: {
    singular: 'Log zgody cookies',
    plural: 'Logi zgód cookies',
  },
  access: {
    create: () => false,
    read: authenticated,
    update: () => false,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'consentId',
    defaultColumns: ['consentId', 'source', 'recordedAt', 'policyVersion'],
    description:
      'Rejestr wyborów użytkowników (RODO — dowód zgody). Wpisy powstają automatycznie z frontu.',
    group: 'System',
  },
  timestamps: true,
  fields: [
    {
      name: 'consentId',
      type: 'text',
      label: 'ID zgody (anonimowe)',
      required: true,
      index: true,
    },
    {
      name: 'policyVersion',
      type: 'number',
      label: 'Wersja polityki',
      required: true,
      min: 1,
    },
    {
      name: 'recordedAt',
      type: 'date',
      label: 'Czas wyboru użytkownika',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'source',
      type: 'select',
      label: 'Źródło',
      required: true,
      options: [
        { label: 'Baner — akceptuj wszystkie', value: 'banner-accept-all' },
        { label: 'Baner — odmowa', value: 'banner-reject-all' },
        { label: 'Panel preferencji', value: 'banner-preferences' },
        { label: 'Global Privacy Control', value: 'gpc' },
      ],
    },
    {
      name: 'choices',
      type: 'group',
      label: 'Wybór kategorii',
      fields: [
        {
          name: 'analytics',
          type: 'checkbox',
          label: 'Analityka',
          defaultValue: false,
        },
        {
          name: 'marketing',
          type: 'checkbox',
          label: 'Marketing',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'context',
      type: 'group',
      label: 'Kontekst konfiguracji',
      admin: { description: 'Stan flag CMS w momencie zapisu zgody.' },
      fields: [
        {
          name: 'bannerEnabled',
          type: 'checkbox',
          label: 'Baner włączony',
          defaultValue: false,
        },
        {
          name: 'analyticsCategoryEnabled',
          type: 'checkbox',
          label: 'Kategoria analityka aktywna',
          defaultValue: false,
        },
        {
          name: 'marketingCategoryEnabled',
          type: 'checkbox',
          label: 'Kategoria marketing aktywna',
          defaultValue: false,
        },
      ],
    },
  ],
}
