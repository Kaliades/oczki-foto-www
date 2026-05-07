// Seed data for HomepageGallery block.
// Text extracted verbatim from Figma node 7105:8499 (Galeria section).
// Photo placeholders: {{MEDIA:<filename>}} — resolved by seed orchestrator after media upload.
//
// Required seed images (export from Figma):
//   homepage-gallery__couple-field-1.jpg    — small card, node I7105:8499;7105:8220 (couple in field, running)
//   homepage-gallery__couple-field-2.jpg    — small card, node I7105:8499;7105:8222 (family/couple in field)
//   homepage-gallery__gosia-leszek.jpg      — large centre card, node I7105:8499;7105:8224 (wedding portrait)
//   homepage-gallery__woman-street.jpg      — small card, node I7105:8499;7105:8229 (woman on street)
//   homepage-gallery__couple-portrait.jpg   — small card, node I7105:8499;7105:8231 (couple portrait)

type HomepageGallerySeed = {
  blockType: 'homepageGallery'
  heading: string
  subheading?: string
  galleryLinkLabel?: string
  galleryLinkUrl?: string
  photos: {
    image: string
    captionTitle?: string
    captionSubtitle?: string
  }[]
}

export const HomepageGallerySeed: HomepageGallerySeed = {
  blockType: 'homepageGallery',
  heading: 'Chwile zatrzymane w kadrze',
  subheading: 'Zajrzyj do mojego portfolio i zobacz, jak wyglądają moje sesje.',
  galleryLinkLabel: 'Zobacz wszystkie zdjęcia →',
  galleryLinkUrl: '/galeria',
  photos: [
    {
      image: '{{MEDIA:homepage-gallery__couple-field-1.jpg}}',
    },
    {
      image: '{{MEDIA:homepage-gallery__couple-field-2.jpg}}',
    },
    {
      image: '{{MEDIA:homepage-gallery__gosia-leszek.jpg}}',
      captionTitle: 'Gosia i Leszek',
      captionSubtitle: 'Wesele w hotelu Monte Carlo na Śląsku',
    },
    {
      image: '{{MEDIA:homepage-gallery__woman-street.jpg}}',
    },
    {
      image: '{{MEDIA:homepage-gallery__couple-portrait.jpg}}',
    },
  ],
}
