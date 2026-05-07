import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

type HomepageIntroSeed = {
  blockType: 'homepageIntro'
  heading: string
  pullQuote?: string | null
  body: DefaultTypedEditorState
  photo: string // replaced by orchestrator with Media doc ID
  photoQuote?: string | null
  photoAlt?: string | null
}

export const homepageIntroSeed: HomepageIntroSeed = {
  blockType: 'homepageIntro',
  heading: 'Twoja niefotogeniczność to mit, który wspólnie obalimy',
  pullQuote: 'Asia, ja naprawdę nie umiem pozować',
  body: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          version: 1,
          textFormat: 0,
          children: [
            {
              type: 'text',
              text: 'I wiesz co? To zupełnie normalne! Nie jesteś modelką z wybiegu, masz prawo czuć lekki stres. Moim zadaniem nie jest ustawienie Cię w geometrycznej, niewygodnej figurze. Ja Ci po prostu towarzyszę.',
              version: 1,
              format: 0,
              detail: 0,
              mode: 'normal',
              style: '',
            },
          ],
          direction: null,
          format: '',
          indent: 0,
        },
        {
          type: 'paragraph',
          version: 1,
          textFormat: 0,
          children: [
            {
              type: 'text',
              text: 'Rozmawiamy, śmiejemy się, a ja wyłapuję te momenty, gdy poprawiasz włosy lub szczerze się uśmiechasz. Zanim się obejrzysz, stres zniknie, a zostanie czysta radość z bycia „tu i teraz".',
              version: 1,
              format: 0,
              detail: 0,
              mode: 'normal',
              style: '',
            },
          ],
          direction: null,
          format: '',
          indent: 0,
        },
      ],
      direction: null,
      format: '',
      indent: 0,
      version: 1,
    },
  } as DefaultTypedEditorState,
  // Placeholder replaced by orchestrator/upload step with real Media document ID
  photo: '{{MEDIA:homepage-intro__couple-garden.jpg}}',
  photoQuote: "I found a love for me, Oh, darlin', just dive right in and follow my lead",
  photoAlt: 'Para młoda w ogrodzie podczas sesji ślubnej',
}
