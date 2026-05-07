// Seed data for AboutHero block.
// Text extracted from Figma node 6593:10540 (file olYfq47eVG9IV0p5Fvyme5):
//   - heading: node 6593:10544
//   - lead:    node 6593:10546
//   - button:  node 6593:10548
//
// {{MEDIA:about__hero-portrait.jpg}} is a placeholder — the seed orchestrator
// replaces it with a real Media document ID after upload.

export const AboutHeroSeed = {
  blockType: 'aboutHero' as const,
  breadcrumbLabel: 'O mnie',
  heading: 'Fotografka z Krakowa, przy której możesz być sobą',
  lead: 'Wierzę, że najpiękniejsze rzeczy dzieją się „pomiędzy" – w nieśmiałym uśmiechu i czułym geście. Jako fotografka z Krakowa nie oferuję Ci tylko zdjęć, ale przestrzeń, w której możesz odetchnąć i poczuć się w pełni sobą.',
  primaryButton: {
    label: 'Umów sesję',
    url: '/kontakt',
    openInNewTab: false,
  },
  portrait: '{{MEDIA:about__hero-portrait.jpg}}',
  portraitAlt:
    'Asia — fotografka Oczki fotografia, portret w naturalnym świetle',
}
