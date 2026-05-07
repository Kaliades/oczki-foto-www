import type { Block } from 'payload'

export const PolicyHero: Block = {
  slug: 'policyHero',
  interfaceName: 'PolicyHeroBlock',
  labels: { singular: 'Hero (Polityka prywatności)', plural: 'Hero (Polityka prywatności)' },
  fields: [
    {
      name: 'breadcrumbLabel',
      type: 'text',
      label: 'Etykieta okruszka',
      defaultValue: 'Polityka prywatności',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Nagłówek',
      defaultValue: 'Polityka prywatności',
    },
    {
      name: 'lastUpdated',
      type: 'date',
      label: 'Ostatnia aktualizacja',
      admin: {
        description: 'Wyświetlana pod nagłówkiem w formacie dd.MM.yyyy',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'dd.MM.yyyy' },
      },
    },
  ],
}
