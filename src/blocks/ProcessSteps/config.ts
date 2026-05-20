import type { Block } from 'payload'

export const ProcessSteps: Block = {
  slug: 'processSteps',
  interfaceName: 'ProcessStepsBlock',
  labels: {
    singular: 'Sekcja kroków procesu',
    plural: 'Sekcja kroków procesu',
  },
  fields: [
    {
      type: 'group',
      name: 'heading',
      label: 'Nagłówek',
      admin: {
        description:
          'Naprzemienne fragmenty „italic — tekst” składają się na pełen tytuł sekcji.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'italicOne',
              type: 'text',
              required: true,
              admin: { width: '25%' },
              label: 'Italik 1',
            },
            {
              name: 'plainOne',
              type: 'text',
              required: true,
              admin: { width: '25%' },
              label: 'Tekst po italiku 1',
            },
            {
              name: 'italicTwo',
              type: 'text',
              required: true,
              admin: { width: '25%' },
              label: 'Italik 2',
            },
            {
              name: 'plainTwo',
              type: 'text',
              required: true,
              admin: { width: '25%' },
              label: 'Tekst po italiku 2',
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'intro',
      label: 'Tekst wprowadzający',
      fields: [
        {
          name: 'paragraphOne',
          type: 'textarea',
          required: true,
          label: 'Akapit 1',
        },
        {
          name: 'paragraphTwo',
          type: 'textarea',
          required: true,
          label: 'Akapit 2',
        },
      ],
    },
    {
      type: 'array',
      name: 'items',
      label: 'Kroki',
      labels: {
        singular: 'Krok',
        plural: 'Kroki',
      },
      minRows: 1,
      maxRows: 6,
      admin: {
        description:
          'Dekoracje (ornament botaniczny, kąt obrotu kart) przypisywane są automatycznie na podstawie kolejności kroku.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Tytuł kroku',
        },
        {
          name: 'paragraphOne',
          type: 'textarea',
          required: true,
          label: 'Akapit 1',
        },
        {
          name: 'paragraphTwo',
          type: 'textarea',
          required: true,
          label: 'Akapit 2',
        },
      ],
    },
    {
      name: 'showWaxStamp',
      type: 'checkbox',
      defaultValue: true,
      label: 'Pokaż dekoracyjny stempel z wosku',
    },
  ],
}
