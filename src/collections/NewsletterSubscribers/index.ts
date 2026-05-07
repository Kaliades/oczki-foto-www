import type { CollectionConfig, FieldHook } from 'payload'

const normalizeEmailBeforeChange: FieldHook = ({ value }) => {
  if (typeof value === 'string') {
    return value.toLowerCase().trim()
  }
  return value
}

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  labels: {
    singular: 'Subskrybent',
    plural: 'Subskrybenci',
  },
  admin: {
    group: 'Marketing',
    useAsTitle: 'email',
    defaultColumns: ['email', 'source', 'confirmed', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // Normalize email
        if (data.email && typeof data.email === 'string') {
          data.email = data.email.toLowerCase().trim()
        }

        // On public create (no user session), override security-sensitive fields
        if (operation === 'create' && !req.user) {
          data.confirmed = false
          data.consentGivenAt = new Date().toISOString()
          data.ipAddress =
            req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
            req.headers.get('x-real-ip') ??
            null
          data.userAgent = req.headers.get('user-agent') ?? null
          // unsubscribedAt must not be set on create
          delete data.unsubscribedAt
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      label: 'Adres e-mail',
      required: true,
      unique: true,
      index: true,
      admin: {
        readOnly: false,
        description: 'Adres e-mail subskrybenta. Pole readOnly po pierwszym zapisie.',
      },
    },
    {
      name: 'source',
      type: 'select',
      label: 'Źródło zapisu',
      defaultValue: 'footer',
      options: [
        { label: 'Stopka', value: 'footer' },
        { label: 'Strona lądowania', value: 'landing' },
        { label: 'Import', value: 'import' },
        { label: 'Inne', value: 'other' },
      ],
    },
    {
      name: 'confirmed',
      type: 'checkbox',
      label: 'Potwierdzony (double opt-in)',
      defaultValue: false,
      admin: {
        description: 'Czy subskrybent potwierdził zapis przez e-mail.',
      },
    },
    {
      name: 'consentGivenAt',
      type: 'date',
      label: 'Data wyrażenia zgody',
      admin: {
        readOnly: true,
        description: 'Ustawiane automatycznie na serwerze przy zapisie.',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'unsubscribedAt',
      type: 'date',
      label: 'Data wypisania',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      label: 'Adres IP',
      admin: {
        readOnly: true,
        description: 'Ustawiane automatycznie na serwerze przy zapisie.',
      },
    },
    {
      name: 'userAgent',
      type: 'text',
      label: 'User Agent',
      admin: {
        readOnly: true,
        description: 'Nagłówek User-Agent przeglądarki przy zapisie.',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notatki',
      admin: {
        description: 'Wewnętrzne notatki administratora.',
      },
    },
  ],
  timestamps: true,
}
