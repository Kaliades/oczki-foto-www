export const HOME_INTRO_FIGMA_NODES = {
  desktopContainer: '6794:1945',
  tabletContainer: '7105:11338',
  mobileContainer: '7105:13633',
} as const

export type HomeIntroData = {
  heading: {
    start: string
    emphasis: string
  }
  introLeadIn: string
  quoteText: string
  body: string
  collageImage: {
    src: string
    alt: string
  }
  handwrittenQuote: string
}

export const homeIntroDefaults: HomeIntroData = {
  heading: {
    start: 'Twoja niefotogeniczność to mit, który',
    emphasis: 'wspólnie obalimy',
  },
  introLeadIn: 'Większość moich klientek zaczyna naszą rozmowę od słów:',
  quoteText: 'Asia, ja naprawdę nie umiem pozować',
  body: 'I wiesz co? To zupełnie normalne! Nie jesteś modelką z wybiegu, masz prawo czuć lekki stres. Moim zadaniem nie jest ustawienie Cię w geometrycznej, niewygodnej figurze. Ja Ci po prostu towarzyszę. Rozmawiamy, śmiejemy się, a ja wyłapuję te momenty, gdy poprawiasz włosy lub szczerze się uśmiechasz. Zanim się obejrzysz, stres zniknie, a zostanie czysta radość z bycia „tu i teraz”.',
  collageImage: {
    src: '/figma/intro-couple.png',
    alt: 'Para podczas sesji fotograficznej w plenerze',
  },
  handwrittenQuote: "I found a love for me, Oh, darlin', just dive right in and follow my lead",
}
