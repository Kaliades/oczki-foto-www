// Seed data for AboutApproach block.
// Text extracted verbatim from Figma node 6593:13293.

type AboutApproachSeed = {
  blockType: 'aboutApproach'
  heading: string
  lead?: string
  cards: { title: string; body: string }[]
}

export const AboutApproachSeed: AboutApproachSeed = {
  blockType: 'aboutApproach',
  heading: 'Sesja jak spotkanie z przyjaciółką',
  lead: 'Prowadzę Cię, inspiruję do ruchu, łapię naturalne momenty',
  cards: [
    {
      title: 'Wspólna kawa na start (również online)',
      body: 'Nie zaczynamy od zdjęć. Zaczynamy od rozmowy, by oswoić się z moją obecnością.',
    },
    {
      title: 'Moje „suchary"',
      body: 'Tak, mam zapas kiepskich żartów, które zawsze działają. Nic tak nie rozluźnia atmosferę jak wspólny śmiech.',
    },
    {
      title: 'Naturalne prowadzenie',
      body: 'Podpowiem Ci, co zrobić z dłońmi i jak stanąć, byś czuła się lekko, ale nigdy nie będę Cię łamać w nienaturalne pozy.',
    },
    {
      title: 'Cierpliwość',
      body: 'Jeśli potrzebujesz chwili na zebranie myśli czy poprawienie włosów – masz ją. Nigdy nie poganiam.',
    },
  ],
}
