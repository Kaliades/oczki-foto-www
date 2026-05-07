// Seed data for AboutValues block.
// Extracted from Figma node 6593:10549 (file olYfq47eVG9IV0p5Fvyme5).
//
// {{MEDIA:about__values.jpg}} is a placeholder — the seed orchestrator
// replaces it with a real Media document ID after the asset is uploaded.

export const AboutValuesSeed = {
  blockType: 'aboutValues' as const,
  heading: 'Oczki to spojrzenie na to, co w Tobie najbardziej naturalne',
  lead: 'Wierzę, że w oczach widać wszystko – radość, spokój i te iskierki, których nie da się wyreżyserować. Moje podejście opiera się na kilku zasadach:',
  photo: '{{MEDIA:about__values.jpg}}',
  photoAlt: 'Asia — fotografka Oczki fotografia podczas sesji zdjęciowej',
  pillars: [
    {
      title: 'Naturalność bez filtrów',
      body: 'Uwielbiam miękkie światło i kolory, które oddają rzeczywistość taką, jaka jest – ciepłą i szlachetną.',
    },
    {
      title: 'Komfort jako priorytet',
      body: 'Wiem, że poczucie bezpieczeństwa to klucz do pięknych zdjęć. Zawsze dbam o to, byś czuła się zaopiekowana od pierwszego maila aż po odbiór albumu.',
    },
    {
      title: 'Brak sztywnych schematów',
      body: 'Każda sesja to dla mnie nowa historia. Nie ustawiam Was pod linijkę – pozwalam wydarzeniom płynąć, łapiąc te najbardziej szczere chwile.',
    },
  ],
}
