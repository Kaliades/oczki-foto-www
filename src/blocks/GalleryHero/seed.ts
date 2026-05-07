// Seed data for GalleryHero block.
// Text extracted from Figma node 6592:6186 (file olYfq47eVG9IV0p5Fvyme5):
//   - heading: node 6592:6190
//   - lead:    node 6592:6192
//   - pills:   nodes 6592:8939–8949

export const GalleryHeroSeed = {
  blockType: 'galleryHero' as const,
  breadcrumbLabel: 'Galeria',
  heading: 'Naturalna fotografia kobieca i ślubna – portfolio z Krakowa i okolic',
  lead: 'W moich kadrach szukam autentyczności, która broni się sama. Skupiam się na świetle, emocjach i kompozycji, które najlepiej oddają klimat Waszych najważniejszych dni oraz sesji portretowych. Zobacz wybrane realizacje, które powstały z połączenia mojej wrażliwości i Waszego zaufania.',
  categoryFilters: [
    { label: 'Sesje kobiece', slug: 'sesje-kobiece' },
    { label: 'Reportaże ślubne', slug: 'reportaze-slubne' },
    { label: 'Sesje rodzinne', slug: 'sesje-rodzinne' },
    { label: 'Sesje wizerunkowe', slug: 'sesje-wizerunkowe' },
    { label: 'Sesje narzeczeńskie', slug: 'sesje-narzeczenskie' },
  ],
}
