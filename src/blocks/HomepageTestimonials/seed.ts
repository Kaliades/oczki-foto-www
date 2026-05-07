// Seed content extracted from Figma node 7102:14473 (Opinie — Testimonials section)
// Text sourced directly from Figma TEXT nodes — do not translate or paraphrase.

export const HomepageTestimonialsSeed = {
  blockType: 'homepageTestimonials' as const,
  heading: 'Wasze słowa to moje paliwo do działania',
  testimonials: [
    {
      quote:
        '„Z ogromną przyjemnością mogę polecić sesję z Asią - osobą pełną energii, która sprawia, że sesja zdjęciowa staje się wspaniałym przeżyciem, pełnym energii, zabawy i uśmiechu. Efekty naszej współpracy przerosły nasze najśmielsze oczekiwania! Gorąco polecam!"',
      clientName: 'Justyna Kazimierz',
      // Photo placeholder — seed orchestrator will replace with Media document ID after upload
      photo: '{{MEDIA:homepage-testimonials__justyna-kazimierz.jpg}}',
    },
  ],
}
