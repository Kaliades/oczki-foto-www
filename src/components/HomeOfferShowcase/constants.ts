export const HOME_OFFER_FIGMA_NODES = {
  desktopMainContainer: '6781:17283',
  tabletMainContainer: '7105:11410',
  mobileMainContainer: '7105:13705',
} as const

export const homeOfferCopy = {
  headingStart: 'Wybierz',
  headingEmphasis: 'historię',
  headingEnd: ', którą chcesz teraz opowiedzieć',
  subtitle:
    'Każda forma współpracy ma inny rytm, ale wszystkie łączy jedno: spokój, uważność i zdjęcia, które powstają wtedy, gdy można być sobą.',
  inquiryTitle: 'Twojej historii nie ma w mojej ofercie?',
  inquiryText:
    'Czasem najlepsze zdjęcia powstają poza gotowymi schematami. Jeśli masz pomysł na sesję, który nie mieści się w żadnej kategorii — albo po prostu czujesz, że chcesz czegoś innego — napisz do mnie.',
  inquiryCta: 'Pogadajmy',
} as const

export const homeOfferItems = [
  {
    title: 'Sesja kobieca',
    description:
      'To czas, w którym możesz zwolnić i skupić się na sobie. Prowadzę Cię spokojnie przez cały proces — tak, żebyś mogła poczuć się swobodnie.',
    imageAlt: 'Kobieta z bukietem przy oknie',
    imageSrc: '/figma/offer-session-kobieca.png',
  },
  {
    title: 'Reportaż ślubny',
    description:
      'Jestem obok, ale nie na pierwszym planie. Łapię spojrzenia, gesty i momenty, które często umykają w dniu ślubu.',
    imageAlt: 'Para młoda patrząca na siebie podczas reportażu ślubnego',
    imageSrc: '/figma/offer-reportaz-slubny.png',
  },
  {
    title: 'Sesja wizerunkowa',
    description:
      'Dla kobiet i marek osobistych, które chcą zdjęć spójnych z tym, kim są. Pomagam stworzyć wizerunek, który jest naturalny, profesjonalny i prawdziwy jednocześnie.',
    imageAlt: 'Kobieta siedząca z notesem podczas sesji wizerunkowej',
    imageSrc: '/figma/offer-session-wizerunkowa.png',
    cropClassName: 'h-[150%] top-[-16.62%] w-full',
  },
  {
    title: 'Sesja rodzinna',
    description:
      'Bez ustawiania i sztucznego uśmiechu. Z ruchem, bliskością i przestrzenią na bycie razem. To pamiątka z codzienności, do której chce się wracać.',
    imageAlt: 'Mama trzymająca dziecko przy oknie',
    imageSrc: '/figma/offer-session-rodzinna.png',
  },
  {
    title: 'Sesja miłosna',
    description:
      'Dla kobiet i marek osobistych, które chcą zdjęć spójnych z tym, kim są. Pomagam stworzyć wizerunek, który jest naturalny, profesjonalny i prawdziwy jednocześnie.',
    imageAlt: 'Para podczas sesji miłosnej',
    imageSrc: '/figma/offer-session-milosna.png',
    cropClassName: 'h-[254.48%] left-[-40.69%] top-[-57.08%] w-[169.65%]',
  },
] as const
