/**
 * Raster content for CMS seeding — files live in `scripts/seed-assets/` (not public).
 * Decorative SVGs and layout PNGs under `public/figma/` are intentionally omitted.
 */
export type SeedContentAsset = {
  path: `/seed-assets/${string}.png`
  alt: string
}

export const SEED_CONTENT_ASSETS: readonly SeedContentAsset[] = [
  { path: '/seed-assets/about-hero-portrait.png', alt: 'Portret Asi — hero O mnie' },
  { path: '/seed-assets/about-hero-secondary-photo.png', alt: 'Asia podczas sesji w plenerze' },
  { path: '/seed-assets/about-portrait-source.png', alt: 'Portret Asi — O mnie' },
  { path: '/seed-assets/about-portrait.png', alt: 'Portret Asi' },
  { path: '/seed-assets/beyond-photography-backdrop.png', alt: 'Tło sekcji poza fotografią' },
  { path: '/seed-assets/case-study-duo-photo-desktop.png', alt: 'Para młoda na vintageowej sofie podczas przygotowań' },
  { path: '/seed-assets/case-study-duo-photo-mobile.png', alt: 'Para młoda na vintageowej sofie podczas przygotowań' },
  { path: '/seed-assets/case-study-duo-photo-tablet.png', alt: 'Para młoda na vintageowej sofie podczas przygotowań' },
  { path: '/seed-assets/case-study-gallery-1.png', alt: 'Oprawione zdjęcie z dedykacją dla pary młodej' },
  { path: '/seed-assets/case-study-gallery-2.png', alt: 'Pan młody przy oknie podczas przygotowań' },
  { path: '/seed-assets/case-study-gallery-3.png', alt: 'Panowie podczas przygotowań do ślubu' },
  { path: '/seed-assets/case-study-gallery-4.png', alt: 'Pan młody poprawiający krawat' },
  { path: '/seed-assets/case-study-gallery-5.png', alt: 'Portret panów młodych podczas przygotowań' },
  { path: '/seed-assets/case-study-gallery-6.png', alt: 'Detal spinki do mankietu pana młodego' },
  { path: '/seed-assets/case-study-gallery-7.png', alt: 'Spinki do mankietów w pudełku' },
  { path: '/seed-assets/case-study-gallery-8.png', alt: 'Buty i zaproszenie ślubne' },
  { path: '/seed-assets/case-study-gallery-9.png', alt: 'Panna młoda w szlafroku podczas makijażu' },
  { path: '/seed-assets/case-study-gallery-10.png', alt: 'Panna młoda oglądająca suknię ślubną' },
  { path: '/seed-assets/case-study-gallery-11.png', alt: 'Przygotowania panny młodej w jasnym wnętrzu' },
  { path: '/seed-assets/case-study-gallery-12.png', alt: 'Panna młoda w sukni podczas ostatnich poprawek' },
  { path: '/seed-assets/case-study-hero-bg.png', alt: 'Para młoda tańcząca na parkiecie weselnym' },
  { path: '/seed-assets/case-study-memorable-landscape.png', alt: 'Para młoda podczas pierwszego tańca — ujęcie szerokie' },
  { path: '/seed-assets/case-study-memorable-portrait.png', alt: 'Para młoda podczas pierwszego tańca — portret' },
  { path: '/seed-assets/case-study-related-stories-1.png', alt: 'Para młoda na drewnianym pomoście nad jeziorem o zachodzie słońca' },
  { path: '/seed-assets/case-study-related-stories-2.png', alt: 'Para młoda w parku nad stawem w jesiennej scenerii' },
  { path: '/seed-assets/case-study-related-stories-3.png', alt: 'Para młoda całująca się przed białym pałacykiem' },
  {
    path: '/seed-assets/case-study-testimonial-polaroid-photo.png',
    alt: 'Para młoda podczas pierwszego tańca na weselu',
  },
  { path: '/seed-assets/case-study-venue-back-desktop.png', alt: 'Para młoda przy stole weselnym' },
  { path: '/seed-assets/case-study-venue-back-mobile.png', alt: 'Para młoda przy stole weselnym' },
  { path: '/seed-assets/case-study-venue-back-tablet.png', alt: 'Para młoda przy stole weselnym' },
  { path: '/seed-assets/case-study-venue-front-desktop.png', alt: 'Panna młoda z bliską osobą podczas przyjęcia' },
  { path: '/seed-assets/case-study-venue-front-mobile.png', alt: 'Panna młoda z bliską osobą podczas przyjęcia' },
  { path: '/seed-assets/case-study-venue-front-tablet.png', alt: 'Panna młoda z bliską osobą podczas przyjęcia' },
  { path: '/seed-assets/case-study-venue-scallop-desktop.png', alt: 'Goście tańczący na parkiecie weselnym' },
  { path: '/seed-assets/case-study-venue-scallop-mobile.png', alt: 'Goście tańczący na parkiecie weselnym' },
  { path: '/seed-assets/case-study-venue-scallop-tablet.png', alt: 'Goście tańczący na parkiecie weselnym' },
  { path: '/seed-assets/dual-perspective-portrait-b.png', alt: 'Portret Asi w czarno-białej tonacji' },
  { path: '/seed-assets/ease-tilted-photo.png', alt: 'Para podczas sesji plenerowej' },
  { path: '/seed-assets/footer-gallery-1.png', alt: 'Para w plenerze — reportaż ślubny' },
  { path: '/seed-assets/footer-gallery-2.png', alt: 'Twierdza w słońcu — plener ślubny' },
  { path: '/seed-assets/footer-gallery-3.png', alt: 'Pan młody niesie panią młodą' },
  { path: '/seed-assets/footer-gallery-4.png', alt: 'Portret kobiety w kwiatach' },
  { path: '/seed-assets/footer-gallery-5.png', alt: 'Para w plenerze — sesja ślubna' },
  { path: '/seed-assets/footer-gallery-6.png', alt: 'Portret kobiety w kwiatach — sesja kobieca' },
  { path: '/seed-assets/gallery-large.png', alt: 'Para młoda z bukietem podczas sesji ślubnej' },
  ...Array.from({ length: 12 }, (_, i) => ({
    path: `/seed-assets/gallery-portfolio-${i + 1}.png` as const,
    alt: `Portfolio — zdjęcie ${i + 1}`,
  })),
  { path: '/seed-assets/gallery-small-1.png', alt: 'Para podczas sesji plenerowej na łące' },
  { path: '/seed-assets/gallery-small-2.png', alt: 'Para idąca przez łąkę o zachodzie słońca' },
  { path: '/seed-assets/gallery-small-3.png', alt: 'Kobieta w czarnym kombinezonie i futrzanej kurtce' },
  { path: '/seed-assets/gallery-small-4.png', alt: 'Panna młoda przytulająca pana młodego w welonie' },
  { path: '/seed-assets/home-hero-bg.png', alt: 'Tło sekcji hero strony głównej' },
  { path: '/seed-assets/instagram-post-1.png', alt: 'Post na Instagramie — sesja w plenerze' },
  { path: '/seed-assets/instagram-post-2.png', alt: 'Post na Instagramie — portret' },
  { path: '/seed-assets/instagram-post-3.png', alt: 'Post na Instagramie — para młoda' },
  { path: '/seed-assets/instagram-post-4.png', alt: 'Post na Instagramie — detal ślubny' },
  { path: '/seed-assets/instagram-post-5.png', alt: 'Post na Instagramie — sesja kobieca' },
  { path: '/seed-assets/instagram-profile.png', alt: 'Zdjęcie profilowe na Instagramie' },
  { path: '/seed-assets/intro-couple.png', alt: 'Para podczas sesji plenerowej' },
  { path: '/seed-assets/newsletter-photo.png', alt: 'Para podczas sesji w plenerze' },
  { path: '/seed-assets/offer-gallery-small-1.png', alt: 'Galeria oferty — zdjęcie 1' },
  { path: '/seed-assets/offer-gallery-small-2.png', alt: 'Galeria oferty — zdjęcie 2' },
  { path: '/seed-assets/offer-gallery-small-3.png', alt: 'Galeria oferty — zdjęcie 3' },
  { path: '/seed-assets/offer-gallery-small-4.png', alt: 'Galeria oferty — zdjęcie 4' },
  { path: '/seed-assets/offer-inclusions-main-photo.png', alt: 'Kobieta w różowym garniturze podczas sesji w studio' },
  { path: '/seed-assets/offer-inclusions-scallop-photo.png', alt: 'Czarno-biały portret kobiety w ciąży w owalnej ramce' },
  { path: '/seed-assets/offer-package-premium-photo.png', alt: 'Pakiet premium — zdjęcie ilustracyjne' },
  { path: '/seed-assets/offer-package-starter-photo.png', alt: 'Pakiet starter — zdjęcie ilustracyjne' },
  { path: '/seed-assets/offer-package-story-photo.png', alt: 'Pakiet story — zdjęcie ilustracyjne' },
  { path: '/seed-assets/offer-reportaz-slubny.png', alt: 'Para młoda patrząca na siebie podczas reportażu ślubnego' },
  { path: '/seed-assets/offer-service-approach-portrait.png', alt: 'Portret podczas sesji kobiecej' },
  { path: '/seed-assets/offer-service-care-portrait.png', alt: 'Portret kobiety podczas sesji' },
  { path: '/seed-assets/offer-service-hero-main.png', alt: 'Główne zdjęcie hero oferty sesji kobiecej' },
  { path: '/seed-assets/offer-session-kobieca.png', alt: 'Kobieta z bukietem przy oknie' },
  { path: '/seed-assets/offer-session-milosna.png', alt: 'Para podczas sesji miłosnej' },
  { path: '/seed-assets/offer-session-rodzinna.png', alt: 'Mama trzymająca dziecko przy oknie' },
  { path: '/seed-assets/offer-session-wizerunkowa.png', alt: 'Kobieta siedząca z notesem podczas sesji wizerunkowej' },
  { path: '/seed-assets/testimonial-back-photo.png', alt: 'Para młoda podczas pierwszego tańca' },
] as const

export function seedAssetStem(path: string): string {
  return path.replace(/^\/?seed-assets\//, '').replace(/\.png$/, '')
}

/** @deprecated Use `seedAssetStem` */
export const figmaAssetStem = seedAssetStem

/** @deprecated Use `SEED_CONTENT_ASSETS` */
export const FIGMA_CONTENT_PNGS = SEED_CONTENT_ASSETS

export function getSeedAssetByStem(stem: string): SeedContentAsset | undefined {
  return SEED_CONTENT_ASSETS.find((asset) => seedAssetStem(asset.path) === stem)
}

/** Avoid false positives such as gallery-portfolio-1 matching gallery-portfolio-10. */
export function mediaFilenameMatchesStem(filename: string, stem: string): boolean {
  const escaped = stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`(^|-)${escaped}(-|\\.png)`).test(filename)
}
