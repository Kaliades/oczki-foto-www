import type { Page } from '@/payload-types'

type LayoutBlock = NonNullable<Page['layout']>[number]

export const AboutInstagramSeed: Extract<LayoutBlock, { blockType: 'aboutInstagram' }> = {
  blockType: 'aboutInstagram',
  heading: 'Zostańmy w kontakcie na Instagramie',
  lead: '@oczki_fotografia',
  tiles: [
    {
      photo: '{{MEDIA:about__instagram-1.jpg}}' as unknown as number,
      photoAlt: 'Zdjęcie z Instagrama 1',
      url: 'https://www.instagram.com/oczki_fotografia/',
    },
    {
      photo: '{{MEDIA:about__instagram-2.jpg}}' as unknown as number,
      photoAlt: 'Zdjęcie z Instagrama 2',
      url: 'https://www.instagram.com/oczki_fotografia/',
    },
    {
      photo: '{{MEDIA:about__instagram-3.jpg}}' as unknown as number,
      photoAlt: 'Zdjęcie z Instagrama 3',
      url: 'https://www.instagram.com/oczki_fotografia/',
    },
    {
      photo: '{{MEDIA:about__instagram-4.jpg}}' as unknown as number,
      photoAlt: 'Zdjęcie z Instagrama 4',
      url: 'https://www.instagram.com/oczki_fotografia/',
    },
    {
      photo: '{{MEDIA:about__instagram-5.jpg}}' as unknown as number,
      photoAlt: 'Zdjęcie z Instagrama 5',
      url: 'https://www.instagram.com/oczki_fotografia/',
    },
  ],
}
