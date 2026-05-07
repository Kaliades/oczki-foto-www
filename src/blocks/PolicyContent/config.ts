import type { Block } from 'payload'
import {
  HeadingFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  UnorderedListFeature,
  OrderedListFeature,
  LinkFeature,
  BlockquoteFeature,
  HorizontalRuleFeature,
  ParagraphFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const PolicyContent: Block = {
  slug: 'policyContent',
  interfaceName: 'PolicyContentBlock',
  labels: { singular: 'Treść polityki', plural: 'Treść polityki' },
  fields: [
    {
      name: 'body',
      type: 'richText',
      required: true,
      label: 'Treść',
      admin: {
        description:
          'Pełny tekst polityki prywatności. Dostępne: H2, H3, listy, pogrubienie, kursywa, linki, cytaty, separatory.',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
          ParagraphFeature(),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          UnorderedListFeature(),
          OrderedListFeature(),
          LinkFeature({ enabledCollections: ['pages'] }),
          BlockquoteFeature(),
          HorizontalRuleFeature(),
        ],
      }),
    },
  ],
}
