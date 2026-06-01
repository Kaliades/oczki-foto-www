import type { OczkiBreadcrumbItemData } from '@/components/OczkiBreadcrumbs'

export { GALLERY_FOOTER_NEWSLETTER_FIGMA_NODES } from '@/components/HomeFooterNewsletter/constants'

export const GALLERY_PAGE_BREADCRUMBS: readonly OczkiBreadcrumbItemData[] = [
  { label: 'Strona główna', href: '/' },
  { label: 'Galeria' },
] as const
