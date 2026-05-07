// Seed content extracted from Figma node 6781:17283 (Wybierz historię / Karty usług)
// Text sourced directly from Figma TEXT nodes — do not translate or paraphrase.

export const HomepageServicesSeed = {
  blockType: 'homepageServices' as const,
  heading: 'Wybierz historię, którą chcesz teraz opowiedzieć',
  subheading:
    'Każda forma współpracy ma inny rytm, ale wszystkie łączy jedno: spokój, uważność i zdjęcia, które powstają wtedy, gdy można być sobą.',
  services: [
    {
      photo: '{{MEDIA:homepage-services__sesja-kobieca.jpg}}',
      title: 'Sesja kobieca',
      description:
        'To czas, w którym możesz zwolnić i skupić się na sobie. Prowadzę Cię spokojnie przez cały proces — tak, żebyś mogła poczuć się swobodnie.',
      linkUrl: null,
    },
    {
      photo: '{{MEDIA:homepage-services__reportaz-slubny.jpg}}',
      title: 'Reportaż ślubny',
      description:
        'Jestem obok, ale nie na pierwszym planie. Łapię spojrzenia, gesty i momenty, które często umykają w dniu ślubu.',
      linkUrl: null,
    },
    {
      photo: '{{MEDIA:homepage-services__sesja-wizerunkowa.jpg}}',
      title: 'Sesja wizerunkowa',
      description:
        'Dla kobiet i marek osobistych, które chcą zdjęć spójnych z tym, kim są. Pomagam stworzyć wizerunek, który jest naturalny, profesjonalny i prawdziwy jednocześnie.',
      linkUrl: null,
    },
    {
      photo: '{{MEDIA:homepage-services__sesja-rodzinna.jpg}}',
      title: 'Sesja rodzinna',
      description:
        'Bez ustawiania i sztucznego uśmiechu. Z ruchem, bliskością i przestrzenią na bycie razem. To pamiątka z codzienności, do której chce się wracać.',
      linkUrl: null,
    },
  ],
  customSessionHeading: 'Twojej historii nie ma w mojej ofercie?',
  customSessionText:
    'Czasem najlepsze zdjęcia powstają poza gotowymi schematami. Jeśli masz pomysł na sesję, który nie mieści się w żadnej kategorii — albo po prostu czujesz, że chcesz czegoś innego — napisz do mnie.',
  customSessionButtonLabel: 'Pogadajmy',
  customSessionButtonUrl: '/kontakt',
}
