// Seed data for AboutDuoBio block.
// Text content extracted from Figma node 6596:14368 (file olYfq47eVG9IV0p5Fvyme5).
//
// {{MEDIA:about__duo-bio.jpg}} is a placeholder — the seed orchestrator replaces
// it with a real Media document ID after upload.

export const AboutDuoBioSeed = {
  blockType: 'aboutDuoBio' as const,
  heading: 'Podwójne spojrzenie na Waszą historię',
  lead: 'Choć na sesjach kobiecych spotykamy się sam na sam, podczas reportaży ślubnych działam w duecie z Łukaszem. Dlaczego? Bo wierzymy, że Wasz dzień zasługuje na to, by widzieć go z dwóch perspektyw jednocześnie. Tam, gdzie ja szukam czułego gestu i łzy wzruszenia, Łukasz wyłapuje szeroki kadr i szaleństwo na parkiecie.',
  subLead: 'Poznajcie Łukasza (Oczko) – Drugi fotograf ślubny',
  photo: '{{MEDIA:about__duo-bio.jpg}}',
  photoAlt: 'Łukasz — drugi fotograf ślubny Oczki fotografia',
  cards: [
    {
      title: 'Geny i pasja',
      body: 'Optymizm to jego drugie imię, a fotografia? Ma ją w genach. Jego dziadek wywoływał zdjęcia w łazience, a on sam pierwszy aparat kupił za oszczędności już w gimnazjum.',
    },
    {
      title: 'Nasza historia',
      body: 'Na studiach przypomniałam mu o tej pasji, pożyczając moją lustrzankę. Po dwóch latach kupił własną, a 3 lata później... zostałam jego żoną. Dziś fotografujemy w duecie by dać Wam najpiękniejszą pamiątkę',
    },
    {
      title: 'Poza klatką',
      body: 'Gadżeciarz i fan ultramaratonów. Jeśli nie ma go w krakowskim studiu, prawdopodobnie zaszył się w Bieszczadach albo biega w górach. Interesuje się finansami i produktywnością, co sprawia, że w naszym duecie to on dba o to, by każdy plan był dopięty na ostatni guzik.',
    },
  ],
}
