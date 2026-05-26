export const OCZKI_BREADCRUMB_CONTAINER_FIGMA_NODES = {
  desktop: '6912:16286',
  tablet: '7104:17972',
  mobile: '7104:19173',
} as const

/** Figma component set root — `Breadcrumbs` */
export const OCZKI_BREADCRUMBS_COMPONENT_FIGMA_NODE = '3946:2708' as const

export type OczkiBreadcrumbItemData = {
  label: string
  href?: string
}
