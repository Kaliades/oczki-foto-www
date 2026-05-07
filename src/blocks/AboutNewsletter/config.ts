import type { Block } from 'payload'

export const AboutNewsletter: Block = {
  slug: 'aboutNewsletter',
  interfaceName: 'AboutNewsletterBlock',
  labels: {
    singular: 'Newsletter (O mnie)',
    plural: 'Newsletter (O mnie)',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Nagłówek',
    },
    {
      name: 'lead',
      type: 'textarea',
      required: false,
      label: 'Lead',
    },
    {
      name: 'nameLabel',
      type: 'text',
      required: false,
      defaultValue: 'Imię',
      label: 'Etykieta pola Imię',
    },
    {
      name: 'emailLabel',
      type: 'text',
      required: false,
      defaultValue: 'Email',
      label: 'Etykieta pola Email',
    },
    {
      name: 'consentText',
      type: 'text',
      required: true,
      defaultValue: 'Wyrażam zgodę na politykę prywatności',
      label: 'Tekst zgody',
    },
    {
      name: 'consentLinkLabel',
      type: 'text',
      required: false,
      defaultValue: 'politykę prywatności',
      label: 'Etykieta linku',
    },
    {
      name: 'consentLinkUrl',
      type: 'text',
      required: false,
      defaultValue: '/polityka-prywatnosci',
      label: 'URL linku zgody',
    },
    {
      name: 'submitLabel',
      type: 'text',
      required: true,
      defaultValue: 'Zapisz się',
      label: 'Etykieta przycisku',
    },
    {
      name: 'successMessage',
      type: 'text',
      required: false,
      defaultValue: 'Dziękujemy! Sprawdź skrzynkę.',
      label: 'Komunikat sukcesu',
    },
    {
      name: 'errorMessage',
      type: 'text',
      required: false,
      defaultValue: 'Coś poszło nie tak. Spróbuj ponownie.',
      label: 'Komunikat błędu',
    },
  ],
}
