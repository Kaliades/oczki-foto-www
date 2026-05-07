import type { Block } from 'payload'
import { lexicalEditor, ParagraphFeature, BoldFeature, ItalicFeature } from '@payloadcms/richtext-lexical'

export const HomepageAboutTeaser: Block = {
  slug: 'homepageAboutTeaser',
  interfaceName: 'HomepageAboutTeaserBlock',
  labels: {
    singular: 'O fotografce — teaser (Strona główna)',
    plural: 'O fotografce — teaser (Strona główna)',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Nagłówek',
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      label: 'Treść',
      editor: lexicalEditor({
        features: [ParagraphFeature(), BoldFeature(), ItalicFeature()],
      }),
    },
    {
      name: 'linkLabel',
      type: 'text',
      required: false,
      label: 'Etykieta linku',
    },
    {
      name: 'linkUrl',
      type: 'text',
      required: false,
      label: 'URL linku',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Zdjęcie fotografki',
    },
    {
      name: 'photoAlt',
      type: 'text',
      required: false,
      label: 'Alt zdjęcia',
    },
  ],
}
