import type { Block } from 'payload'

export const AboutHero: Block = {
  slug: 'aboutHero',
  interfaceName: 'AboutHeroBlock',
  labels: {
    singular: 'Hero (O mnie)',
    plural: 'Hero (O mnie)',
  },
  fields: [
    {
      name: 'breadcrumbLabel',
      type: 'text',
      label: 'Etykieta okruszka',
      defaultValue: 'O mnie',
      admin: {
        description: 'Tekst wyświetlany jako okruszek nawigacyjny ponad nagłówkiem.',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Nagłówek',
    },
    {
      name: 'lead',
      type: 'textarea',
      label: 'Lead / opis',
      admin: {
        description: 'Krótki akapit opisowy pod nagłówkiem.',
      },
    },
    {
      type: 'group',
      name: 'primaryButton',
      label: 'Przycisk główny',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Etykieta przycisku',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'Link (URL)',
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Otwórz w nowej karcie',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Portret fotografki',
    },
    {
      name: 'portraitAlt',
      type: 'text',
      label: 'Alt portretu',
      admin: {
        description:
          'Alternatywny opis zdjęcia portretowego (dla czytników ekranu i SEO). Jeśli puste, używany jest alt z kolekcji Media.',
      },
    },
  ],
}
