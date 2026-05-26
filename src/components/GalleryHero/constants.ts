export const GALLERY_HERO_FIGMA_NODES = {
  desktop: '6912:13147',
  tablet: '7104:17981',
  mobile: '7104:19182',
  headingContainer: {
    desktop: '6912:13148',
    tablet: '7104:17982',
    mobile: '7104:19266',
  },
  sessionFilters: {
    desktop: '7104:17689',
    tablet: '7104:18110',
    mobile: '7104:19311',
  },
  decorLeft: {
    desktop: '6950:16699',
    tablet: '7104:17986',
    mobile: '7104:19183',
  },
  decorRight: {
    desktop: '6950:16783',
    tablet: '7104:18991',
    mobile: '7104:20160',
  },
} as const

export type GallerySessionFilterId =
  | 'kobieca'
  | 'wizerunkowa'
  | 'slubny'
  | 'narzezenska'
  | 'rodzinna'

export type GallerySessionFilter = {
  id: GallerySessionFilterId
  label: string
}

export const GALLERY_SESSION_FILTERS: readonly GallerySessionFilter[] = [
  { id: 'kobieca', label: 'Sesja kobieca' },
  { id: 'wizerunkowa', label: 'Sesja wizerunkowa' },
  { id: 'slubny', label: 'Reportaż ślubny' },
  { id: 'narzezenska', label: 'Sesja narzeczeńska' },
  { id: 'rodzinna', label: 'Sesja rodzinna' },
] as const

export type GalleryHeroData = {
  title: {
    lead: string
    emphasis: string
    trail: string
  }
  description: string
  filters: readonly GallerySessionFilter[]
  defaultFilterId: GallerySessionFilterId
}

export const galleryHeroDefaults: GalleryHeroData = {
  title: {
    lead: 'Naturalna ',
    emphasis: 'fotografia kobieca i ślubna',
    trail: ' – portfolio z Krakowa i okolic',
  },
  description:
    'W moich kadrach szukam autentyczności, która broni się sama. Zobacz wybrane realizacje, które powstały z połączenia mojej wrażliwości i Waszego zaufania.',
  filters: GALLERY_SESSION_FILTERS,
  defaultFilterId: 'kobieca',
}

/** Vector ornaments — tablet export viewBox; scaled per breakpoint frame below. */
export const GALLERY_HERO_DECOR_ASSETS = {
  left: '/figma/gallery-hero-decor-left.svg',
  right: '/figma/gallery-hero-decor-right.svg',
} as const

/**
 * Ornament frames inside the hero 1366 cap.
 * Horizontal inset matches `OczkiNavbar` cap padding (logo / Umów sesję column).
 * Vertical values from Figma hero metadata; horizontal tuned to navbar gutter.
 */
export const GALLERY_HERO_DECOR_FRAMES = {
  left: {
    intrinsicWidth: 253,
    intrinsicHeight: 309,
    mobile: { insetInlineStart: 36, top: 216, width: 187, height: 228 },
    tablet: { insetInlineStart: 80, top: 159, width: 253, height: 309 },
    desktop: { insetInlineStart: 36, top: 73, width: 323, height: 394 },
  },
  right: {
    intrinsicWidth: 200,
    intrinsicHeight: 284,
    mobile: { insetInlineEnd: 36, top: -67, width: 147, height: 185 },
    tablet: { insetInlineEnd: 80, top: -45, width: 200, height: 284 },
    desktop: { insetInlineEnd: 36, top: -37, width: 255, height: 347 },
  },
} as const

/** Same horizontal rhythm as `OczkiNavbar` inner (`px-9` / `md:px-20` / `lg:px-9`). */
export const GALLERY_HERO_NAVBAR_GUTTER_CLASS = 'left-9 md:left-20 lg:left-9' as const
export const GALLERY_HERO_NAVBAR_GUTTER_END_CLASS = 'right-9 md:right-20 lg:right-9' as const
