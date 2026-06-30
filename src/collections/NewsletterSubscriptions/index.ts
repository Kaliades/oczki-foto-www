import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { ADMIN_GROUP_INBOX } from '@/constants/adminGroups'

export const NewsletterSubscriptions: CollectionConfig = {
  slug: 'newsletterSubscriptions',
  labels: {
    singular: 'Zapis na newsletter',
    plural: 'Zapisy na newsletter',
  },
  access: {
    create: () => false,
    read: authenticated,
    update: () => false,
    delete: authenticated,
  },
  admin: {
    group: ADMIN_GROUP_INBOX,
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'source', 'createdAt'],
    description:
      'Lista osób, które zapisały się przez formularz w stopce. Wpisy powstają automatycznie — nie dodajesz ich ręcznie.',
  },
  timestamps: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Imię',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Adres e-mail',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'source',
      type: 'select',
      label: 'Skąd zapisała się',
      required: true,
      options: [
        { label: 'Strona główna', value: 'home' },
        { label: 'O mnie', value: 'about' },
        { label: 'Kontakt', value: 'contact' },
        { label: 'Oferta', value: 'offer-service' },
        { label: 'Polityka prywatności', value: 'privacy' },
        { label: 'Galeria — lista', value: 'gallery' },
      ],
    },
    {
      name: 'consentGiven',
      type: 'checkbox',
      label: 'Zgoda na przetwarzanie (checkbox)',
      defaultValue: true,
      admin: {
        readOnly: true,
        description: 'Użytkownik musiał zaznaczyć zgodę przed wysłaniem formularza.',
      },
    },
  ],
}
