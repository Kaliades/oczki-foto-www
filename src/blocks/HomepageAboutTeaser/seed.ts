// Seed data for HomepageAboutTeaser block.
// Extracted from Figma node 6724:13354 (Figma file olYfq47eVG9IV0p5Fvyme5).
//
// {{MEDIA:homepage-about-teaser__asia-portrait.jpg}} is a placeholder — the
// seed orchestrator replaces it with a real Media document ID after upload.

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

// Minimal Lexical editor state with 2 paragraphs from Figma TEXT nodes:
//   - 6724:13360: "Fotografia to dla mnie sposób patrzenia na świat…"
//   - 6724:13361: "Fotografuję od lat, ale najważniejsze jest dla mnie…"
const bodyContent = {
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        textFormat: 0,
        textStyle: '',
        children: [
          {
            type: 'text',
            format: 0,
            style: '',
            mode: 'normal',
            detail: 0,
            version: 1,
            text: 'Fotografia to dla mnie sposób patrzenia na świat. Szukam emocji, światła i momentów pomiędzy — tych, które czuje się bardziej, niż da się je zaplanować.',
          },
        ],
      },
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        textFormat: 0,
        textStyle: '',
        children: [
          {
            type: 'text',
            format: 0,
            style: '',
            mode: 'normal',
            detail: 0,
            version: 1,
            text: 'Fotografuję od lat, ale najważniejsze jest dla mnie nie to jak, tylko kogo mam przed obiektywem. Dlatego moje sesje są spokojne, naturalne i prowadzone tak, żebyś nie musiała nic udawać ani „umieć". Jeśli szukasz naturalnych zdjęć, w których widać prawdziwe emocje — jesteś w dobrym miejscu.',
          },
        ],
      },
    ],
  },
}

export const HomepageAboutTeaserSeed = {
  blockType: 'homepageAboutTeaser' as const,
  heading: 'Hej, jestem Asia! Fotografka z uśmiechem (i zapasem sucharów) w kieszeni',
  body: bodyContent as unknown as DefaultTypedEditorState,
  linkLabel: 'Poznaj mnie bliżej →',
  linkUrl: '/o-mnie',
  photo: '{{MEDIA:homepage-about-teaser__asia-portrait.jpg}}',
  photoAlt: 'Asia — fotografka Oczki fotografia, stoi z aparatem i uśmiecha się do obiektywu',
}
