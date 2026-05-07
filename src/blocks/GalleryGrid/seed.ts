// Seed data for GalleryGrid block.
// Photo placeholders: {{MEDIA:<filename>}} — resolved by seed orchestrator after media upload.
// 16 placeholder photos distributed across 5 categories:
//   kobiece×5, slubne×4, rodzinne×3, wizerunkowe×2, narzeczenskie×2

type GalleryGridSeed = {
  blockType: 'galleryGrid'
  initialVisible: number
  loadMoreLabel: string
  emptyStateLabel: string
  photos: {
    image: string
    alt?: string
    category: string
    sortOrder: number
    captionTitle?: string
    captionSubtitle?: string
    href?: string
  }[]
}

export const GalleryGridSeed: GalleryGridSeed = {
  blockType: 'galleryGrid',
  initialVisible: 16,
  loadMoreLabel: 'Pokaż więcej',
  emptyStateLabel: 'Brak zdjęć w tej kategorii',
  photos: [
    {
      image: '{{MEDIA:gallery__photo-1.jpg}}',
      alt: 'Sesja kobieca 1',
      category: 'sesje-kobiece',
      sortOrder: 1,
    },
    {
      image: '{{MEDIA:gallery__photo-2.jpg}}',
      alt: 'Sesja ślubna 1',
      category: 'reportaze-slubne',
      sortOrder: 2,
    },
    {
      image: '{{MEDIA:gallery__photo-3.jpg}}',
      alt: 'Sesja rodzinna 1',
      category: 'sesje-rodzinne',
      sortOrder: 3,
    },
    {
      image: '{{MEDIA:gallery__photo-4.jpg}}',
      alt: 'Sesja kobieca 2',
      category: 'sesje-kobiece',
      sortOrder: 4,
    },
    {
      image: '{{MEDIA:gallery__photo-5.jpg}}',
      alt: 'Sesja narzeczeńska 1',
      category: 'sesje-narzeczenskie',
      sortOrder: 5,
    },
    {
      image: '{{MEDIA:gallery__photo-6.jpg}}',
      alt: 'Sesja ślubna 2',
      category: 'reportaze-slubne',
      sortOrder: 6,
    },
    {
      image: '{{MEDIA:gallery__photo-7.jpg}}',
      alt: 'Sesja wizerunkowa 1',
      category: 'sesje-wizerunkowe',
      sortOrder: 7,
    },
    {
      image: '{{MEDIA:gallery__photo-8.jpg}}',
      alt: 'Sesja rodzinna 2',
      category: 'sesje-rodzinne',
      sortOrder: 8,
    },
    {
      image: '{{MEDIA:gallery__photo-9.jpg}}',
      alt: 'Sesja kobieca 3',
      category: 'sesje-kobiece',
      sortOrder: 9,
    },
    {
      image: '{{MEDIA:gallery__photo-10.jpg}}',
      alt: 'Sesja ślubna 3',
      category: 'reportaze-slubne',
      sortOrder: 10,
    },
    {
      image: '{{MEDIA:gallery__photo-11.jpg}}',
      alt: 'Sesja narzeczeńska 2',
      category: 'sesje-narzeczenskie',
      sortOrder: 11,
    },
    {
      image: '{{MEDIA:gallery__photo-12.jpg}}',
      alt: 'Sesja wizerunkowa 2',
      category: 'sesje-wizerunkowe',
      sortOrder: 12,
    },
    {
      image: '{{MEDIA:gallery__photo-13.jpg}}',
      alt: 'Sesja kobieca 4',
      category: 'sesje-kobiece',
      sortOrder: 13,
    },
    {
      image: '{{MEDIA:gallery__photo-14.jpg}}',
      alt: 'Sesja rodzinna 3',
      category: 'sesje-rodzinne',
      sortOrder: 14,
    },
    {
      image: '{{MEDIA:gallery__photo-15.jpg}}',
      alt: 'Sesja kobieca 5',
      category: 'sesje-kobiece',
      sortOrder: 15,
    },
    {
      image: '{{MEDIA:gallery__photo-16.jpg}}',
      alt: 'Sesja ślubna 4',
      category: 'reportaze-slubne',
      sortOrder: 16,
    },
  ],
}
