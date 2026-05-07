import type { Block } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  ParagraphFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const HomepageIntro: Block = {
  slug: 'homepageIntro',
  interfaceName: 'HomepageIntroBlock',
  labels: {
    singular: 'Intro (Strona główna)',
    plural: 'Intro (Strona główna)',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Nagłówek sekcji',
    },
    {
      name: 'pullQuote',
      type: 'text',
      required: false,
      label: 'Cytat wyróżniony',
      admin: {
        description: 'Kursywny blok cytatu, np. "Asia, ja naprawdę nie umiem pozować"',
      },
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      label: 'Treść',
      editor: lexicalEditor({
        features: [ParagraphFeature(), BoldFeature(), ItalicFeature()],
      }),
      admin: {
        description: 'Tekst główny sekcji (2–3 akapity). Dostępne: pogrubienie, kursywa.',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Zdjęcie',
      admin: {
        description: 'Zdjęcie w stylu polaroidu po prawej stronie.',
      },
    },
    {
      name: 'photoQuote',
      type: 'text',
      required: false,
      label: 'Napis na polaroidzie',
      admin: {
        description: 'Tekst w stylu odręcznym nakładany na polaroid, np. "I found a love for me…"',
      },
    },
    {
      name: 'photoAlt',
      type: 'text',
      required: false,
      label: 'Alt zdjęcia',
      admin: {
        description: 'Tekst alternatywny zdjęcia dla czytników ekranu.',
      },
    },
  ],
}
