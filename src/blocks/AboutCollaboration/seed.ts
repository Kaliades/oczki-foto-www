// Seed data extracted from Figma node 6596:14541
// File: olYfq47eVG9IV0p5Fvyme5 — Sekcja "Jak wspólnie działamy nad Waszą historią?"

type AboutCollaborationSeedType = {
  blockType: 'aboutCollaboration'
  heading: string
  lead?: string | null
  cards: { title: string; body: string }[]
}

export const AboutCollaborationSeed: AboutCollaborationSeedType = {
  blockType: 'aboutCollaboration',
  heading: 'Jak wspólnie działamy nad Waszą historią?',
  lead: 'W duecie stajemy się Waszymi „cieniami" – jesteśmy wszędzie tam, gdzie dzieje się coś ważnego, ale pozostajemy niemal niewidoczni. Nasza wspólna filozofia opiera się na trzech filarach:',
  cards: [
    {
      title: 'Opowieści pisane światłem',
      body: 'Nie ingerujemy w bieg wydarzeń. Pozwalamy emocjom płynąć naturalnie, łapiąc te niepozowane momenty – od drżenia dłoni podczas przysięgi, po spontaniczny wybuch śmiechu rodziców.',
    },
    {
      title: 'Kompozycja i technika',
      body: 'Łączymy artystyczną wrażliwość z techniczną perfekcją. Wykorzystujemy naturalne światło, by wydobyć magię miejsc, które wybraliście na swój ślub.',
    },
    {
      title: 'Wasza historia, nasze kadry',
      body: 'Pamiętajcie, że to Wy jesteście głównymi bohaterami. My jesteśmy opowiadaczami, którzy dbają o to, byście po latach, patrząc na zdjęcia, poczuli ten sam zapach powietrza i te same dreszcze emocji.',
    },
  ],
}
