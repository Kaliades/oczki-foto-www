// Seed data for HomepageHero block.
// Image extracted from Figma node 6730:17316 (the photo-only background of
// hero section 6730:17313, without the baked-in nav/text overlay).

export const HomepageHeroSeed = {
  blockType: 'homepageHero' as const,
  photo: '{{MEDIA:homepage-hero__photo.jpg}}',
  heading: 'Zdjęcia, przy których możesz odetchnąć',
  subheading:
    'Naturalna, ciepła i autentyczna fotografia kobieca, ślubna i rodzinna. Bez sztucznego pozowania, bez stresu — po prostu Ty, taka jaka jesteś.',
  primaryButton: {
    label: 'Poznaj mnie bliżej',
    url: '/o-mnie',
  },
  secondaryButton: {
    label: 'Zobacz moje kadry →',
    url: '/galeria',
  },
}
