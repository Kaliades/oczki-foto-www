import type { OczkiBreadcrumbItemData } from '@/components/OczkiBreadcrumbs'

export const PRIVACY_POLICY_PAGE_BREADCRUMBS: readonly OczkiBreadcrumbItemData[] = [
  { label: 'Strona główna', href: '/' },
  { label: 'Polityka prywatności' },
]

export const PRIVACY_POLICY_PAGE_FIGMA_NODES = {
  header: {
    desktop: '7105:15539',
    tablet: '7108:16047',
    mobile: '7108:16683',
  },
  breadcrumbs: {
    desktop: '7105:15540',
    tablet: '7108:16048',
    mobile: '7108:16684',
  },
} as const
